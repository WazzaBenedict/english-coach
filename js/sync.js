'use strict';
// 跨裝置同步：把學習進度存在使用者自己的私人 GitHub Gist。
// 權杖只存在這台裝置，不會進入匯出的備份檔。

const SYNC_KEY = 'english-coach-sync';
const SYNC_FILE = 'english-coach-progress.json';
const API = 'https://api.github.com';

// ---------- 合併兩份進度 ----------
// 規則：卡片取較新的；每日紀錄取聯集與最大值；自訂單字依加入與刪除時間決定；
// 設定取較晚修改的那一份。兩台裝置各自離線練習後合併也不會遺失紀錄。
// 某台裝置按過「清除全部進度」時，另一邊在清除之前的紀錄要丟掉，不能再合併回來
function dropBefore(x, r) {
  if ((x.resetAt || 0) >= r) return x;
  const keep = (o, ok) => Object.fromEntries(Object.entries(o || {}).filter(ok));
  return Object.assign({}, x, {
    resetAt: r,
    cards: keep(x.cards, ([, c]) => (c.t || 0) > r),
    custom: (x.custom || []).filter((c) => (c.t || 0) > r),
    essays: keep(x.essays, ([k]) => ((x.essayT || {})[k] || 0) > r),
    log: {}, grammar: {}, dialogs: {},
  });
}
function mergeStates(a, b) {
  if (!b || typeof b !== 'object') return a;
  const r = Math.max(a.resetAt || 0, b.resetAt || 0);
  if (r) { a = dropBefore(a, r); b = dropBefore(b, r); }
  const m = JSON.parse(JSON.stringify(a));
  const newer = (x, y) => (x || 0) >= (y || 0);

  // 設定與開始日
  if (!newer(a.settingsT, b.settingsT)) { m.settings = Object.assign({}, a.settings, b.settings); m.start = b.start || a.start; m.settingsT = b.settingsT; }

  // 單字卡
  for (const [id, cb] of Object.entries(b.cards || {})) {
    const ca = m.cards[id];
    if (!ca || (cb.t || 0) > (ca.t || 0) || (!cb.t && !ca.t && (cb.reps || 0) > (ca.reps || 0))) m.cards[id] = cb;
  }

  // 每日紀錄
  for (const [d, lb] of Object.entries(b.log || {})) {
    const la = m.log[d] || { done: {}, reviews: 0, newCount: 0 };
    m.log[d] = {
      done: Object.assign({}, la.done, lb.done),
      reviews: Math.max(la.reviews || 0, lb.reviews || 0),
      newCount: Math.max(la.newCount || 0, lb.newCount || 0),
    };
  }

  // 自訂單字（含刪除紀錄）
  m.removed = Object.assign({}, a.removed);
  for (const [w, t] of Object.entries(b.removed || {})) if (!m.removed[w] || t > m.removed[w]) m.removed[w] = t;
  const byWord = {};
  for (const c of (a.custom || []).concat(b.custom || [])) {
    const k = c.word.toLowerCase();
    if (!byWord[k] || (c.t || 0) > (byWord[k].t || 0)) byWord[k] = c;
  }
  m.custom = Object.values(byWord).filter((c) => !(m.removed[c.word.toLowerCase()] > (c.t || 0)));

  // 文法最高分、完成的會話
  for (const [id, s] of Object.entries(b.grammar || {})) m.grammar[id] = Math.max(m.grammar[id] || 0, s);
  m.dialogs = Object.assign({}, b.dialogs, a.dialogs);

  // 作文：取較新的版本
  m.essayT = Object.assign({}, a.essayT);
  for (const [k, txt] of Object.entries(b.essays || {})) {
    const tb = (b.essayT || {})[k] || 0, ta = (a.essayT || {})[k] || 0;
    if (!(k in (a.essays || {})) || tb > ta) { m.essays[k] = txt; m.essayT[k] = tb; }
  }

  m.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
  return m;
}

// ---------- Gist 同步 ----------
const Sync = {
  cfg: (() => { try { return JSON.parse(localStorage.getItem(SYNC_KEY) || 'null'); } catch (e) { return null; } })(),
  busy: false, again: false, timer: null, lastOk: 0, lastErr: '',
  get on() { return !!(this.cfg && this.cfg.token && this.cfg.gist); },
  store() { try { if (this.cfg) localStorage.setItem(SYNC_KEY, JSON.stringify(this.cfg)); else localStorage.removeItem(SYNC_KEY); } catch (e) { /* 忽略 */ } },
  async api(path, opt = {}) {
    const res = await fetch(API + path, Object.assign({}, opt, {
      headers: Object.assign({ Authorization: 'Bearer ' + this.cfg.token, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' }, opt.headers || {}),
    }));
    if (res.status === 401) throw new Error('權杖無效或已過期，請重新連結');
    if (res.status === 403 || res.status === 404) throw new Error('權杖沒有 Gist 權限，或同步檔已被刪除');
    if (!res.ok) throw new Error('GitHub 回應錯誤 ' + res.status);
    return res.json();
  },
  // 用權杖連結：找現有的同步檔，找不到就建立一個私人 Gist
  async connect(token) {
    this.cfg = { token: token.trim(), gist: '' };
    try {
      let page = 1, found = null;
      while (!found && page <= 5) {
        const list = await this.api(`/gists?per_page=100&page=${page}`);
        found = list.find((g) => g.files && g.files[SYNC_FILE]);
        if (list.length < 100) break;
        page++;
      }
      if (found) this.cfg.gist = found.id;
      else {
        const g = await this.api('/gists', { method: 'POST', body: JSON.stringify({ description: 'English Coach 學習進度（自動同步，請勿手動修改）', public: false, files: { [SYNC_FILE]: { content: JSON.stringify(S) } } }) });
        this.cfg.gist = g.id;
      }
      this.store();
      await this.run();
      return found ? 'merged' : 'created';
    } catch (e) { this.cfg = null; this.store(); throw e; }
  },
  disconnect() { this.cfg = null; this.store(); clearTimeout(this.timer); },
  async pull() {
    const g = await this.api('/gists/' + this.cfg.gist);
    const f = g.files[SYNC_FILE];
    if (!f) return null;
    let text = f.content;
    if (f.truncated && f.raw_url) text = await (await fetch(f.raw_url)).text();
    try { return JSON.parse(text); } catch (e) { return null; }
  },
  async push(state) {
    await this.api('/gists/' + this.cfg.gist, { method: 'PATCH', body: JSON.stringify({ files: { [SYNC_FILE]: { content: JSON.stringify(state) } } }) });
  },
  // 下載、合併、上傳。overwrite 為 true 時直接用本機覆蓋雲端（清除進度用）
  async run(overwrite = false) {
    if (!this.on) return;
    if (this.busy) { this.again = true; return; }
    this.busy = true; this.status();
    try {
      if (!overwrite) {
        const remote = await this.pull();
        if (remote) {
          const before = JSON.stringify(S);
          S = mergeStates(S, remote);
          if (JSON.stringify(S) !== before) { saveLocal(); window.dispatchEvent(new Event('synced')); }
        }
      }
      await this.push(S);
      this.lastOk = Date.now(); this.lastErr = '';
    } catch (e) {
      this.lastErr = e.message || '同步失敗';
    } finally {
      this.busy = false; this.status();
      if (this.again) { this.again = false; this.run(); }
    }
  },
  soon() { if (!this.on) return; clearTimeout(this.timer); this.timer = setTimeout(() => this.run(), 4000); },
  text() {
    if (!this.on) return '未開啟';
    if (this.busy) return '同步中…';
    if (this.lastErr) return '⚠ ' + this.lastErr;
    if (this.lastOk) { const d = new Date(this.lastOk); return `已同步 ${pad(d.getHours())}:${pad(d.getMinutes())}`; }
    return '已連結';
  },
  status() { const el = document.getElementById('syncState'); if (el) el.textContent = this.text(); const dot = document.getElementById('syncDot'); if (dot) { dot.hidden = !this.on; dot.title = this.text(); dot.textContent = this.busy ? '⟳' : this.lastErr ? '⚠' : '☁'; } },
};

// 開啟 App、回到前景時同步；切到背景時把變更送出
if (Sync.on) setTimeout(() => Sync.run(), 300);
document.addEventListener('visibilitychange', () => { if (!Sync.on) return; if (document.visibilityState === 'visible') Sync.run(); else if (Sync.timer) { clearTimeout(Sync.timer); Sync.run(); } });
window.addEventListener('online', () => Sync.run());
Sync.status();
