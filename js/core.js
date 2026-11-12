'use strict';
// 核心：資料儲存、日期、間隔重複、語音朗讀與辨識、文字比對

const KEY = 'english-coach-v1';
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (n) => String(n).padStart(2, '0');
const dateStr = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const dayNum = (s = dateStr()) => { const [y, m, d] = s.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 864e5); };
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a) => a[Math.floor(Math.random() * a.length)];

// ---------- 狀態 ----------
const DEFAULTS = {
  start: dateStr(),
  settings: { rate: 0.8, pitch: 0.9, voice: '', newPerDay: 10, showZh: true },
  cards: {},     // 單字 id -> { due, ivl, ease, reps }
  custom: [],    // 自訂單字
  log: {},       // 日期 -> { done: {taskId:true}, reviews, newCount }
  grammar: {},   // 課程 id -> 最佳答對題數
  dialogs: {},   // 場景 id -> true
  essays: {},    // 題目索引 -> 文字
  essayT: {},    // 題目索引 -> 最後修改時間（同步用）
  removed: {},   // 已刪除的自訂單字 -> 刪除時間（同步用）
  settingsT: 0,  // 設定最後修改時間（同步用）
  updatedAt: 0,
  resetAt: 0,    // 最後一次清除全部進度的時間（同步用）
};
function loadState() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }
  const s = Object.assign({}, JSON.parse(JSON.stringify(DEFAULTS)), saved);
  s.settings = Object.assign({}, DEFAULTS.settings, saved.settings || {});
  return s;
}
let S = loadState();
function saveLocal() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('無法儲存進度，請檢查瀏覽器設定'); }
}
function save() {
  S.updatedAt = Date.now();
  saveLocal();
  if (typeof Sync !== 'undefined') Sync.soon();
}
function saveSettings() { S.settingsT = Date.now(); save(); }
function todayLog() {
  const d = dateStr();
  if (!S.log[d]) S.log[d] = { done: {}, reviews: 0, newCount: 0 };
  return S.log[d];
}
function markTask(id, on = true) {
  const l = todayLog();
  if (on) l.done[id] = true; else delete l.done[id];
  save();
}
function streak() {
  const active = (n) => { const d = new Date((n) * 864e5); const k = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`; const l = S.log[k]; return !!l && (Object.keys(l.done || {}).length > 0 || l.reviews > 0); };
  let n = dayNum(), count = 0;
  if (!active(n)) n--;            // 今天還沒做不算中斷
  while (active(n)) { count++; n--; }
  return count;
}
function currentWeek() { return Math.max(1, Math.floor((dayNum() - dayNum(S.start)) / 7) + 1); }
function currentPhase() {
  const w = currentWeek();
  return PHASES.find((p) => w >= p.weeks[0] && w <= p.weeks[1]) || PHASES[PHASES.length - 1];
}

// ---------- 單字 ----------
function parseWords() {
  const out = [];
  for (const [level, text] of Object.entries(WORD_DATA)) {
    text.trim().split('\n').forEach((row) => {
      const [word, pos, ipa, zh, ex, exZh] = row.split('|');
      if (word && zh) out.push({ id: word, word, pos, ipa, zh, ex, exZh, level });
    });
  }
  return out;
}
const BASE_WORDS = parseWords();
function allWords() {
  return BASE_WORDS.concat(S.custom.map((c) => Object.assign({ level: 'MY', pos: '', ipa: '', ex: '', exZh: '' }, c, { id: 'my:' + c.word })));
}

// 間隔重複：g = 0 忘記, 1 困難, 2 記得, 3 簡單
function gradeCard(id, g) {
  const today = dayNum();
  const isNew = !S.cards[id];
  const c = S.cards[id] || { ivl: 0, ease: 2.5, reps: 0, due: today };
  if (g === 0) {
    c.ivl = 0; c.reps = 0; c.ease = Math.max(1.3, c.ease - 0.2); c.due = today;
  } else {
    if (c.ivl === 0) c.ivl = g === 3 ? 3 : 1;
    else c.ivl = Math.max(c.ivl + 1, Math.round(c.ivl * (g === 1 ? 1.2 : g === 2 ? c.ease : c.ease * 1.3)));
    if (g === 1) c.ease = Math.max(1.3, c.ease - 0.15);
    if (g === 3) c.ease += 0.15;
    c.reps++; c.due = today + c.ivl;
  }
  c.t = Date.now();
  S.cards[id] = c;
  const l = todayLog();
  l.reviews++;
  if (isNew) l.newCount++;
  save();
  return c;
}
function nextIntervalLabel(id, g) {
  const c = S.cards[id] || { ivl: 0, ease: 2.5 };
  if (g === 0) return '馬上再看';
  const ivl = c.ivl === 0 ? (g === 3 ? 3 : 1) : Math.max(c.ivl + 1, Math.round(c.ivl * (g === 1 ? 1.2 : g === 2 ? c.ease : c.ease * 1.3)));
  return ivl >= 30 ? `${Math.round(ivl / 30)} 個月後` : `${ivl} 天後`;
}
function buildQueue() {
  const today = dayNum();
  const words = allWords();
  const due = words.filter((w) => S.cards[w.id] && S.cards[w.id].due <= today);
  const left = Math.max(0, S.settings.newPerDay - todayLog().newCount);
  const fresh = words.filter((w) => !S.cards[w.id]);
  // 自訂單字優先，其餘依等級順序
  fresh.sort((a, b) => (a.level === 'MY' ? -1 : 0) - (b.level === 'MY' ? -1 : 0));
  return { due: shuffle(due), fresh: fresh.slice(0, left), freshTotal: fresh.length };
}
function wordStats() {
  const today = dayNum();
  const cards = Object.values(S.cards);
  return {
    total: allWords().length,
    learned: cards.length,
    mature: cards.filter((c) => c.ivl >= 21).length,
    due: cards.filter((c) => c.due <= today).length,
  };
}

// ---------- 語音朗讀 ----------
const TTS = {
  voices: [],
  ok: 'speechSynthesis' in window,
  init() {
    if (!this.ok) return;
    const load = () => { this.voices = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang)); };
    load();
    speechSynthesis.addEventListener('voiceschanged', load);
  },
  voice() {
    return this.voices.find((v) => v.name === S.settings.voice)
      || this.voices.find((v) => /en[-_]US/i.test(v.lang) && v.localService)
      || this.voices.find((v) => /en[-_]US/i.test(v.lang))
      || this.voices[0] || null;
  },
  stop() { if (this.ok) speechSynthesis.cancel(); },
  // opt: { rate, onword(charIndex), onend() }
  speak(text, opt = {}) {
    if (!this.ok) { toast('這個瀏覽器不支援語音朗讀，請改用 Chrome 或 Edge'); if (opt.onend) opt.onend(); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = this.voice();
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
    u.rate = opt.rate || S.settings.rate;
    u.pitch = S.settings.pitch;
    let ended = false;
    const end = () => { if (ended) return; ended = true; if (opt.onend) opt.onend(); };
    if (opt.onword) u.onboundary = (e) => { if (!e.name || e.name === 'word') opt.onword(e.charIndex); };
    u.onend = end; u.onerror = end;
    speechSynthesis.speak(u);
  },
};
TTS.init();

// 把句子包成逐字 span，朗讀時可以逐字標示
function spanify(text) {
  let i = 0;
  return text.split(/(\s+)/).map((tok) => {
    const start = i; i += tok.length;
    return /\S/.test(tok) ? `<span class="w" data-i="${start}">${esc(tok)}</span>` : tok;
  }).join('');
}
function speakEl(el, text, opt = {}) {
  const spans = el ? $$('span.w', el) : [];
  const clear = () => spans.forEach((s) => s.classList.remove('now'));
  TTS.speak(text, {
    rate: opt.rate,
    onword: (ci) => {
      clear();
      let cur = null;
      for (const s of spans) { if (Number(s.dataset.i) <= ci) cur = s; else break; }
      if (cur) cur.classList.add('now');
    },
    onend: () => { clear(); if (opt.onend) opt.onend(); },
  });
}

// ---------- 語音辨識 ----------
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let activeRec = null;
function stopListening() { if (activeRec) { try { activeRec.stop(); } catch (e) { /* 已停止 */ } activeRec = null; } }
// opt: { continuous, onfinal(text), oninterim(text), onstate(bool) }
function startListening(opt) {
  if (!SR) { toast('這個瀏覽器不支援語音辨識，請改用電腦或 Android 的 Chrome、Edge'); return null; }
  stopListening(); TTS.stop();
  const r = new SR();
  r.lang = 'en-US'; r.continuous = !!opt.continuous; r.interimResults = !!opt.oninterim;
  r.onresult = (e) => {
    let fin = '', inter = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) fin += e.results[i][0].transcript + ' '; else inter += e.results[i][0].transcript;
    }
    if (fin && opt.onfinal) opt.onfinal(fin.trim());
    if (inter && opt.oninterim) opt.oninterim(inter);
  };
  r.onerror = (e) => {
    const msg = { 'not-allowed': '請允許使用麥克風', 'no-speech': '沒有偵測到聲音，再試一次', 'audio-capture': '找不到麥克風', network: '語音辨識需要網路連線' }[e.error];
    if (e.error !== 'aborted') toast(msg || '辨識失敗：' + e.error);
  };
  r.onend = () => { if (activeRec === r) activeRec = null; if (opt.onstate) opt.onstate(false); };
  try { r.start(); } catch (e) { toast('無法啟動麥克風'); return null; }
  activeRec = r;
  if (opt.onstate) opt.onstate(true);
  return r;
}

// ---------- 文字比對 ----------
const normWords = (s) => s.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean);
// 回傳目標句每個字是否被說對或寫對（最長共同子序列）
function compareWords(target, said) {
  const a = normWords(target), b = normWords(said);
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Array(a.length).fill(false);
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { hit[i] = true; i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
  }
  const n = hit.filter(Boolean).length;
  return { hit, score: a.length ? Math.round((n / a.length) * 100) : 0 };
}
function compareHtml(target, said) {
  const { hit, score } = compareWords(target, said);
  let k = 0;
  const html = target.split(/(\s+)/).map((tok) => {
    if (!/\S/.test(tok)) return tok;
    if (!normWords(tok).length) return esc(tok);
    const ok = hit[k++];
    return `<span class="${ok ? 'hit' : 'miss'}">${esc(tok)}</span>`;
  }).join('');
  return { html, score };
}

// ---------- 其他 ----------
let toastTimer = null;
function toast(msg) {
  const t = $('#toast'); if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}
function allSentences() {
  const out = [];
  DIALOGUES.forEach((d) => d.lines.forEach((l) => out.push({ en: l[1], zh: l[2] })));
  BASE_WORDS.forEach((w) => { if (w.ex) out.push({ en: w.ex, zh: w.exZh }); });
  return out;
}
