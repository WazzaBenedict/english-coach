'use strict';
// 各頁面畫面與路由

const app = $('#app');
let cleanups = [];
const onLeave = (fn) => cleanups.push(fn);
const fmtTime = (s) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
const sayBtn = (text, hl, label = '▶ 聽', rate = '') =>
  `<button class="small" data-say="${esc(text)}" data-hl="${hl || ''}" data-rate="${rate}">${label}</button>`;
const sayPair = (text, hl) => sayBtn(text, hl) + sayBtn(text, hl, '🐢 慢速', '0.55');
const seg = (items, cur, attr) => `<div class="seg">${items.map(([k, label]) =>
  `<button class="small ${k === cur ? 'on' : ''}" ${attr}="${k}">${label}</button>`).join('')}</div>`;

// 所有帶 data-say 的按鈕：朗讀並逐字標示
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-say]');
  if (!b) return;
  stopListening();
  const el = b.dataset.hl ? document.getElementById(b.dataset.hl) : null;
  speakEl(el, b.dataset.say, { rate: Number(b.dataset.rate) || undefined });
});

// ---------- 今日 ----------
function home() {
  const p = currentPhase(), w = currentWeek(), st = wordStats(), l = todayLog();
  const doneN = p.tasks.filter((t) => l.done[t.id]).length;
  const total = p.tasks.reduce((n, t) => n + t.min, 0);
  const tip = TIPS[dayNum() % TIPS.length];
  app.innerHTML = `
    <p class="muted">第 ${w} 週 · 階段 ${PHASES.indexOf(p) + 1}「${p.name}」· ${p.cefr}</p>
    <h1>今天的練習</h1>
    <div class="stats">
      <div class="stat"><b>${streak()}</b><span>連續天數</span></div>
      <div class="stat"><b>${st.learned}</b><span>已學單字</span></div>
      <div class="stat"><b>${st.due}</b><span>待複習</span></div>
    </div>
    <div class="card">
      <div class="row between"><b>今日任務 ${doneN} / ${p.tasks.length}</b><span class="muted">約 ${total} 分鐘</span></div>
      <div class="bar" style="margin:8px 0 4px"><i style="width:${(doneN / p.tasks.length) * 100}%"></i></div>
      ${p.tasks.map((t) => `
        <div class="task ${l.done[t.id] ? 'done' : ''}">
          <input type="checkbox" data-task="${t.id}" ${l.done[t.id] ? 'checked' : ''} aria-label="${esc(t.label)}">
          <div class="grow">${esc(t.label)} <span class="muted">${t.min} 分</span></div>
          <a class="btn small" href="${t.link}">開始</a>
        </div>`).join('')}
    </div>
    <div class="note">💡 ${esc(tip)}</div>
    <div class="card">
      <b>這個階段的目標</b>
      <p>${esc(p.goal)}</p>
      <a href="#/plan">看完整的一年路線</a>
    </div>`;
  $$('[data-task]').forEach((c) => c.addEventListener('change', () => { markTask(c.dataset.task, c.checked); home(); }));
}

// ---------- 單字複習 ----------
function words() {
  const q = buildQueue();
  let queue = [...q.due.map((w) => ({ w, isNew: false })), ...q.fresh.map((w) => ({ w, isNew: true }))];
  let flipped = false, count = 0;
  const head = `<div class="row between"><h1>單字</h1><a class="btn small" href="#/wordlist">單字表與自訂單字</a></div>`;

  function finish() {
    if (count > 0) markTask('words');
    const st = wordStats();
    const more = allWords().filter((w) => !S.cards[w.id]).length;
    app.innerHTML = `${head}
      <div class="card flash">
        <div class="big">${count > 0 ? '🎉 今天的單字完成了' : '目前沒有要複習的單字'}</div>
        <p class="muted">已學 ${st.learned} / ${st.total} 個，其中 ${st.mature} 個已經記熟。</p>
        ${more ? '<button class="primary" id="more">再學 5 個新字</button>' : '<p>單字庫的字都學過了。到單字表加入你自己遇到的生字吧。</p>'}
      </div>`;
    const b = $('#more');
    if (b) b.onclick = () => {
      queue = allWords().filter((w) => !S.cards[w.id]).sort((a, c) => (a.level === 'MY' ? -1 : 0) - (c.level === 'MY' ? -1 : 0)).slice(0, 5).map((w) => ({ w, isNew: true }));
      draw();
    };
  }

  function draw() {
    if (!queue.length) return finish();
    const { w, isNew } = queue[0];
    app.innerHTML = `${head}
      <p class="muted">剩下 ${queue.length} 張 ${isNew ? '<span class="pill">新字</span>' : ''}</p>
      <div class="card flash">
        <div class="w">${esc(w.word)}</div>
        <div class="ipa">${esc(w.ipa || '')} <span class="muted">${esc(w.pos || '')}</span></div>
        <div class="row" style="justify-content:center;margin-top:12px">${sayPair(w.word)}</div>
        ${flipped ? `
          <div class="zh">${esc(w.zh)}</div>
          ${w.ex ? `<p class="en" id="ex">${spanify(w.ex)}</p><p class="zh">${esc(w.exZh || '')}</p>
          <div class="row" style="justify-content:center">${sayPair(w.ex, 'ex')}</div>` : ''}
          <div class="grades">
            ${['忘記', '困難', '記得', '簡單'].map((t, g) => `<button data-g="${g}">${t}<small>${nextIntervalLabel(w.id, g)}</small></button>`).join('')}
          </div>` : `
          <p class="muted" style="margin-top:18px">先在心裡想中文意思，並試著唸出來</p>
          <button class="primary" id="flip">顯示答案</button>`}
      </div>`;
    if (!flipped) $('#flip').onclick = () => { flipped = true; draw(); TTS.speak(w.word); };
    $$('[data-g]').forEach((b) => b.onclick = () => {
      const g = Number(b.dataset.g);
      gradeCard(w.id, g);
      const cur = queue.shift();
      if (g === 0) queue.push({ w: cur.w, isNew: false });
      count++; flipped = false; TTS.stop(); draw();
    });
  }
  draw();
}

// ---------- 單字表 ----------
function wordlist() {
  let level = 'all', kw = '';
  function rows() {
    const today = dayNum();
    const list = allWords().filter((w) => (level === 'all' || w.level === level) && (!kw || w.word.toLowerCase().includes(kw) || w.zh.includes(kw)));
    if (!list.length) return '<p class="muted">沒有符合的單字。</p>';
    return `<table>${list.map((w) => {
      const c = S.cards[w.id];
      const status = !c ? '<span class="pill">未學</span>' : c.ivl >= 21 ? '<span class="pill ok">記熟</span>' : c.due <= today ? '<span class="pill">待複習</span>' : `<span class="pill">${c.due - today} 天後</span>`;
      return `<tr><td><b>${esc(w.word)}</b> <span class="ipa">${esc(w.ipa || '')}</span><br><span class="zh">${esc(w.pos || '')} ${esc(w.zh)}</span></td>
        <td style="white-space:nowrap;text-align:right">${status}<br>${sayBtn(w.word, '', '▶')}${w.level === 'MY' ? ` <button class="small" data-del="${esc(w.word)}" aria-label="刪除 ${esc(w.word)}">✕</button>` : ''}</td></tr>`;
    }).join('')}</table>`;
  }
  function draw() {
    app.innerHTML = `
      <div class="row between"><h1>單字表</h1><a class="btn small" href="#/words">開始複習</a></div>
      <div class="card">
        <b>加入自訂單字</b>
        <p class="muted">閱讀或聊天時遇到的生字加進來，會優先排進每日複習。</p>
        <form id="add">
          <div class="row"><input class="grow" type="text" name="word" placeholder="英文單字" required autocomplete="off" autocapitalize="off">
          <input class="grow" type="text" name="zh" placeholder="中文意思" required autocomplete="off"></div>
          <input type="text" name="ex" placeholder="例句（可不填）" style="margin:8px 0" autocomplete="off">
          <button class="primary">加入</button>
        </form>
      </div>
      <input type="text" id="kw" placeholder="搜尋單字或中文" value="${esc(kw)}">
      ${seg([['all', '全部']].concat(LEVELS), level, 'data-level')}
      <div class="card" id="rows">${rows()}</div>`;
    $('#kw').oninput = (e) => { kw = e.target.value.trim().toLowerCase(); $('#rows').innerHTML = rows(); };
    $$('[data-level]').forEach((b) => b.onclick = () => { level = b.dataset.level; draw(); });
    $('#add').onsubmit = (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const word = f.get('word').trim(), zh = f.get('zh').trim(), ex = f.get('ex').trim();
      if (!word || !zh) return;
      if (allWords().some((w) => w.word.toLowerCase() === word.toLowerCase())) return toast('這個字已經在單字表裡了');
      S.custom.push({ word, zh, ex }); save(); toast(`已加入 ${word}`); level = 'MY'; draw();
    };
    $('#rows').onclick = (e) => {
      const b = e.target.closest('[data-del]'); if (!b) return;
      const word = b.dataset.del;
      if (!confirm(`刪除自訂單字「${word}」？`)) return;
      S.custom = S.custom.filter((c) => c.word !== word); delete S.cards['my:' + word]; save(); $('#rows').innerHTML = rows();
    };
  }
  draw();
}

// ---------- 會話 ----------
function talk(id) {
  const d = DIALOGUES.find((x) => x.id === id);
  if (!d) {
    app.innerHTML = `<h1>會話場景</h1>
      <p class="muted">每個場景先看字聽一遍，再逐句跟讀。B 是你的角色。</p>
      <div class="card list">${DIALOGUES.map((x, i) => `
        <a class="item" href="#/talk/${x.id}"><span>${i + 1}. ${esc(x.title)}</span>${S.dialogs[x.id] ? '<span class="pill ok">已完成</span>' : '<span class="muted">›</span>'}</a>`).join('')}
      </div>`;
    return;
  }
  let playing = false, token = 0;
  app.innerHTML = `
    <a href="#/talk">‹ 所有場景</a>
    <h1>${esc(d.title)}</h1>
    <div class="note">💡 ${esc(d.tip)}</div>
    <div class="row">
      <button class="primary" id="all">▶ 全部播放</button>
      <button id="tz">${S.settings.showZh ? '隱藏中文' : '顯示中文'}</button>
    </div>
    <div class="card ${S.settings.showZh ? '' : 'hide-zh'}" id="lines">
      ${d.lines.map((l, i) => `
        <div class="line">
          <div><span class="who ${l[0] === 'B' ? 'me' : ''}">${l[0]}</span><span class="en" id="l${i}">${spanify(l[1])}</span></div>
          <div class="zh t">${esc(l[2])}</div>
          <div class="row" style="margin-top:6px">${sayPair(l[1], 'l' + i)}<button class="small" data-mic="${i}">🎤 跟讀</button></div>
          <div class="result" id="r${i}" hidden></div>
        </div>`).join('')}
    </div>
    <p class="muted">跟讀會把你說的話轉成文字，綠色是辨識到的字，紅色是沒辨識到的字。辨識不是百分之百準確，當作參考就好。</p>
    <button class="primary" id="done">✓ 完成這個場景</button>`;

  const allBtn = $('#all');
  const stopAll = () => { playing = false; token++; TTS.stop(); allBtn.textContent = '▶ 全部播放'; };
  allBtn.onclick = () => {
    if (playing) return stopAll();
    playing = true; allBtn.textContent = '■ 停止';
    const my = ++token;
    const step = (i) => {
      if (my !== token) return;
      if (i >= d.lines.length) return stopAll();
      const el = $('#l' + i);
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      speakEl(el, d.lines[i][1], { onend: () => setTimeout(() => step(i + 1), 500) });
    };
    step(0);
  };
  $('#lines').addEventListener('click', (e) => { if (e.target.closest('[data-say]') && playing) { playing = false; token++; allBtn.textContent = '▶ 全部播放'; } }, true);
  $('#tz').onclick = () => {
    S.settings.showZh = !S.settings.showZh; save();
    $('#lines').classList.toggle('hide-zh', !S.settings.showZh);
    $('#tz').textContent = S.settings.showZh ? '隱藏中文' : '顯示中文';
  };
  $$('[data-mic]').forEach((b) => b.onclick = () => {
    if (playing) stopAll();
    const i = Number(b.dataset.mic), target = d.lines[i][1], out = $('#r' + i);
    startListening({
      onfinal: (text) => {
        const { html, score } = compareHtml(target, text);
        out.hidden = false;
        out.className = 'result ' + (score >= 80 ? 'ok' : score < 50 ? 'bad' : '');
        out.innerHTML = `<div class="en">${html}</div><div class="muted">辨識結果：${esc(text)}（${score}%）${score >= 80 ? ' 很好！' : ' 再試一次，放慢速度、嘴型做大。'}</div>`;
      },
      onstate: (on) => { b.textContent = on ? '🔴 請說…' : '🎤 跟讀'; b.classList.toggle('on', on); },
    });
  });
  $('#done').onclick = () => { S.dialogs[d.id] = true; markTask('talk'); toast('已完成，做得好！'); location.hash = '#/talk'; };
  onLeave(() => { token++; });
}

// ---------- 聽力 ----------
const listenCount = { pairs: 0, dict: 0 };
function listenProgress() { if (listenCount.pairs >= 10 || listenCount.dict >= 5) markTask('listen'); }
function listen(mode) {
  mode = mode === 'dict' ? 'dict' : 'pairs';
  const tabs = `<h1>聽力訓練</h1>${seg([['pairs', '辨音'], ['dict', '聽寫']], mode, 'data-mode')}`;
  const bindTabs = () => $$('[data-mode]').forEach((b) => b.onclick = () => { location.hash = '#/listen/' + b.dataset.mode; });

  if (mode === 'pairs') {
    let right = 0, n = 0, cur, ans, answered;
    const next = () => { cur = pick(PAIRS); ans = Math.random() < 0.5 ? 'a' : 'b'; answered = null; draw(); TTS.speak(cur[ans]); };
    const draw = () => {
      app.innerHTML = `${tabs}
        <p class="muted">聽到的是哪一個字？可以重播無限次。高頻子音聽不出來很正常，答完看下面的提示，學會用嘴型和母音長度來分辨。</p>
        <div class="card">
          <div class="row between"><b>答對 ${right} / ${n}</b>
          <span>${sayBtn(cur[ans], '', '▶ 播放題目')}${sayBtn(cur[ans], '', '🐢', '0.5')}</span></div>
          <div class="choices">
            ${['a', 'b'].map((k) => `<button data-k="${k}" class="${answered ? (k === ans ? 'right' : k === answered ? 'wrong' : '') : ''}" ${answered ? 'disabled' : ''}>${esc(cur[k])}<small class="ipa">${esc(cur['i' + k])}</small></button>`).join('')}
          </div>
          ${answered ? `
            <div class="result ${answered === ans ? 'ok' : 'bad'}">${answered === ans ? '✓ 答對了' : '✗ 答案是 ' + esc(cur[ans])}。${esc(cur.hint)}</div>
            <div class="row" style="margin-top:10px">${sayBtn(cur.a, '', '▶ ' + esc(cur.a))}${sayBtn(cur.b, '', '▶ ' + esc(cur.b))}
            <button class="primary" id="next">下一題</button></div>` : ''}
        </div>
        <a href="#/sounds">看發音嘴型指南</a>`;
      bindTabs();
      $$('[data-k]').forEach((b) => b.onclick = () => {
        answered = b.dataset.k; n++; if (answered === ans) right++;
        listenCount.pairs++; listenProgress(); draw();
      });
      const nb = $('#next'); if (nb) nb.onclick = next;
    };
    cur = pick(PAIRS); ans = Math.random() < 0.5 ? 'a' : 'b'; answered = null; draw();
    return;
  }

  // 聽寫
  const maxLen = PHASES.indexOf(currentPhase()) === 0 ? 8 : 99;
  const pool = allSentences().filter((s) => normWords(s.en).length <= maxLen);
  let cur, checked;
  const next = () => { cur = pick(pool); checked = null; draw(); TTS.speak(cur.en); };
  const draw = () => {
    const words = cur.en.split(/\s+/);
    app.innerHTML = `${tabs}
      <p class="muted">聽句子，把聽到的打出來。聽不清的字先空著，用前後文猜。今天已完成 ${listenCount.dict} 句。</p>
      <div class="card">
        <div class="row">${sayPair(cur.en)}<button class="small" id="hint">提示</button></div>
        <p class="muted" id="hintBox" hidden>共 ${words.length} 個字：${words.map((w) => esc(w[0]) + '＿').join(' ')}<br>中文：${esc(cur.zh || '')}</p>
        <label for="ans">你聽到的句子</label>
        <input type="text" id="ans" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" value="${esc(checked || '')}">
        <div class="row" style="margin-top:10px">
          <button class="primary" id="check">檢查</button><button id="next">下一句</button>
        </div>
        ${checked !== null ? (() => { const c = compareHtml(cur.en, checked); return `
          <div class="result ${c.score === 100 ? 'ok' : ''}"><div class="en">${c.html}</div><div class="zh">${esc(cur.zh || '')}</div>
          <div class="muted">答對 ${c.score}% 的字${c.score === 100 ? '，完全正確！' : '。紅色是漏掉或寫錯的字，再聽一次確認。'}</div></div>`; })() : ''}
      </div>`;
    bindTabs();
    $('#hint').onclick = () => { $('#hintBox').hidden = false; };
    const doCheck = () => { const first = checked === null; checked = $('#ans').value; if (first) { listenCount.dict++; listenProgress(); } draw(); };
    $('#check').onclick = doCheck;
    $('#ans').onkeydown = (e) => { if (e.key === 'Enter') doCheck(); };
    $('#next').onclick = next;
  };
  cur = pick(pool); checked = null; draw();
}

// ---------- 發音 ----------
function sounds() {
  app.innerHTML = `<h1>發音嘴型指南</h1>
    <p class="muted">這裡不靠耳朵，靠嘴型、舌頭位置、氣流和喉嚨震動來學發音。建議對著鏡子練。</p>
    ${SOUNDS.map((s) => `
      <div class="card">
        <div class="row between"><b class="big ipa" style="color:var(--ink)">${esc(s.sym)}</b><span class="muted">${esc(s.name)}</span></div>
        <p><b>怎麼發：</b>${esc(s.how)}</p>
        <div class="note">👂 ${esc(s.hint)}</div>
        <div class="row">${s.ex.map((w) => sayBtn(w, '', '▶ ' + esc(w))).join('')}</div>
      </div>`).join('')}
    <a class="btn primary" href="#/listen">去做辨音練習</a>`;
}

// ---------- 文法 ----------
function grammar(id) {
  const g = GRAMMAR.find((x) => x.id === id);
  if (!g) {
    app.innerHTML = `<h1>文法</h1><p class="muted">10 課基礎文法，足夠應付日常溝通。每課讀完做 4 題測驗。</p>
      <div class="card list">${GRAMMAR.map((x, i) => `
        <a class="item" href="#/grammar/${x.id}"><span>${i + 1}. ${esc(x.title)}</span>${x.id in S.grammar ? `<span class="pill ${S.grammar[x.id] === x.quiz.length ? 'ok' : ''}">${S.grammar[x.id]} / ${x.quiz.length}</span>` : '<span class="muted">›</span>'}</a>`).join('')}
      </div>`;
    return;
  }
  const picked = {};
  app.innerHTML = `<a href="#/grammar">‹ 所有課程</a><h1>${esc(g.title)}</h1>
    <div class="card"><ul>${g.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>
    <div class="card">${g.examples.map((ex, i) => `
      <div class="line"><div class="en" id="e${i}">${spanify(ex[0])}</div><div class="zh">${esc(ex[1])}</div>${sayPair(ex[0], 'e' + i)}</div>`).join('')}</div>
    <h2>測驗</h2>
    ${g.quiz.map((q, i) => `
      <div class="card" data-q="${i}"><div class="en">${i + 1}. ${esc(q.q)}</div>
        <div class="opts">${q.opts.map((o, k) => `<button data-o="${k}">${esc(o)}</button>`).join('')}</div>
        <div class="result" hidden></div></div>`).join('')}
    <div id="score"></div>`;
  $$('[data-q]').forEach((card) => {
    const i = Number(card.dataset.q), q = g.quiz[i];
    $$('[data-o]', card).forEach((b) => b.onclick = () => {
      if (i in picked) return;
      const k = Number(b.dataset.o); picked[i] = k;
      $$('[data-o]', card).forEach((x, n) => { x.disabled = true; if (n === q.a) x.classList.add('right'); else if (n === k) x.classList.add('wrong'); });
      const r = $('.result', card); r.hidden = false; r.className = 'result ' + (k === q.a ? 'ok' : 'bad');
      r.textContent = (k === q.a ? '✓ 正確。' : '✗ 不對。') + q.why;
      if (Object.keys(picked).length === g.quiz.length) {
        const score = g.quiz.filter((x, n) => picked[n] === x.a).length;
        S.grammar[g.id] = Math.max(S.grammar[g.id] || 0, score); markTask('grammar');
        $('#score').innerHTML = `<div class="card flash"><div class="big">${score} / ${g.quiz.length}</div>
          <div class="row" style="justify-content:center;margin-top:10px"><a class="btn" href="#/grammar">回課程列表</a></div></div>`;
      }
    });
  });
}

// ---------- IELTS ----------
function ielts(tab) {
  const tabsDef = [['info', '考試介紹'], ['access', '弱聽安排'], ['speak', '口說練習'], ['write', '寫作練習']];
  if (!tabsDef.some((t) => t[0] === tab)) tab = 'info';
  const head = `<h1>IELTS</h1>${seg(tabsDef, tab, 'data-tab')}`;
  const bind = () => $$('[data-tab]').forEach((b) => b.onclick = () => { location.hash = '#/ielts/' + b.dataset.tab; });

  if (tab === 'info') {
    app.innerHTML = `${head}
      <div class="card"><table>${IELTS.intro.map((r) => `<tr><th style="white-space:nowrap">${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join('')}</table></div>
      <h2>分數對照</h2>
      <div class="card"><table><tr><th>分數</th><th>CEFR</th><th>程度</th></tr>${IELTS.bands.map((r) => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${esc(r[2])}</td></tr>`).join('')}</table></div>
      <div class="note">閱讀和聽力的模擬題請使用官方資源：ielts.org 的 Sample test questions，以及劍橋出版的 Cambridge IELTS 系列（俗稱劍雅）。每做完一份就把生字加進自訂單字。</div>`;
    return bind();
  }
  if (tab === 'access') {
    app.innerHTML = `${head}<div class="card"><ul>${IELTS.access.map((t) => `<li style="margin-bottom:10px">${esc(t)}</li>`).join('')}</ul></div>`;
    return bind();
  }
  if (tab === 'speak') {
    let part = 'Part 1', q = pick(IELTS.speak[part]), text = '', secs = 0, timer = null, on = false;
    const stop = () => { clearInterval(timer); timer = null; stopListening(); };
    const stats = () => { const n = normWords(text).length; return `${n} 個字 · 每分鐘 ${secs ? Math.round((n / secs) * 60) : 0} 字`; };
    const draw = () => {
      app.innerHTML = `${head}
        ${seg(Object.keys(IELTS.speak).map((k) => [k, k]), part, 'data-part')}
        <div class="card">
          <p class="en" id="q">${spanify(q)}</p>
          <div class="row">${sayPair(q, 'q')}<button class="small" id="nq">換一題</button></div>
          <div class="note">💡 ${esc(IELTS.speakTips[part])}</div>
          <div class="row between"><span class="timer" id="t">${fmtTime(secs)}</span>
            <button class="primary" id="rec">${on ? '■ 停止' : '🎤 開始回答'}</button></div>
          <div class="result" id="out" ${text ? '' : 'hidden'}><div id="tx">${esc(text)}</div><div class="muted" id="st">${stats()}</div></div>
          <p class="muted">你說的話會即時轉成文字。流利的英文大約每分鐘 120 到 150 字，初期能到 60 到 80 字就很好。${SR ? '' : '<br>這個瀏覽器不支援語音辨識，可以只用計時器練習。'}</p>
        </div>`;
      bind();
      $$('[data-part]').forEach((b) => b.onclick = () => { stop(); on = false; part = b.dataset.part; q = pick(IELTS.speak[part]); text = ''; secs = 0; draw(); });
      $('#nq').onclick = () => { stop(); on = false; q = pick(IELTS.speak[part].filter((x) => x !== q)); text = ''; secs = 0; draw(); };
      $('#rec').onclick = () => {
        if (on) { on = false; stop(); markTask('speak'); return draw(); }
        TTS.stop(); on = true; text = ''; secs = 0; draw();
        timer = setInterval(() => { secs++; const t = $('#t'); if (t) t.textContent = fmtTime(secs); }, 1000);
        if (SR) startListening({
          continuous: true,
          onfinal: (s) => { text += (text ? ' ' : '') + s; $('#out').hidden = false; $('#tx').textContent = text; $('#st').textContent = stats(); },
          onstate: (live) => { if (!live && on) { on = false; stop(); markTask('speak'); draw(); } },
        });
      };
    };
    draw();
    onLeave(stop);
    return;
  }
  // 寫作
  let idx = 0, left = 40 * 60, timer = null;
  const draw = () => {
    const val = S.essays[idx] || '';
    app.innerHTML = `${head}
      <label for="pr">題目（Task 2）</label>
      <select id="pr">${IELTS.write.map((p, i) => `<option value="${i}" ${i === idx ? 'selected' : ''}>${i + 1}. ${esc(p.slice(0, 60))}…</option>`).join('')}</select>
      <div class="card"><p class="en">${esc(IELTS.write[idx])}</p>
        <details><summary>四段式結構與句型</summary>
          <table>${IELTS.writeTemplate.map((r) => `<tr><td><b>${esc(r[0])}</b><br>${esc(r[1])}<br><span class="muted">${esc(r[2])}</span></td></tr>`).join('')}</table>
        </details></div>
      <div class="row between"><span class="timer" id="t">${fmtTime(left)}</span>
        <span><button class="small" id="tm">${timer ? '暫停' : '開始計時 40 分鐘'}</button> <span class="pill" id="wc"></span></span></div>
      <textarea id="essay" placeholder="在這裡寫作，內容會自動儲存。目標 250 字以上。" spellcheck="true" lang="en">${esc(val)}</textarea>
      <div class="row" style="margin-top:10px"><button class="primary" id="fin">完成並標記今日任務</button><button id="cp">複製文章</button></div>
      <p class="muted">寫完後可以把文章貼給 Claude，請它依 IELTS 評分標準給分數和修改建議。</p>`;
    bind();
    const ta = $('#essay'), wc = $('#wc');
    const count = () => { const n = normWords(ta.value).length; wc.textContent = `${n} 字`; wc.classList.toggle('ok', n >= 250); };
    count();
    ta.oninput = () => { S.essays[idx] = ta.value; save(); count(); };
    $('#pr').onchange = (e) => { idx = Number(e.target.value); draw(); };
    $('#tm').onclick = () => {
      if (timer) { clearInterval(timer); timer = null; } else {
        if (left <= 0) left = 40 * 60;
        timer = setInterval(() => { left--; const t = $('#t'); if (t) t.textContent = fmtTime(Math.max(0, left)); if (left <= 0) { clearInterval(timer); timer = null; toast('時間到'); } }, 1000);
      }
      $('#tm').textContent = timer ? '暫停' : '繼續計時';
    };
    $('#fin').onclick = () => { markTask('write'); toast('已標記完成'); };
    $('#cp').onclick = () => { navigator.clipboard.writeText(`IELTS Writing Task 2\n\n${IELTS.write[idx]}\n\n${ta.value}`).then(() => toast('已複製題目和文章'), () => toast('複製失敗，請手動選取')); };
  };
  draw();
  onLeave(() => clearInterval(timer));
}

// ---------- 學習路線 ----------
function plan() {
  const w = currentWeek(), cur = currentPhase();
  app.innerHTML = `<h1>一年學習路線</h1>
    <div class="card"><div class="row between"><b>第 ${w} 週 / 52 週</b><span class="muted">開始日 ${S.start}</span></div>
      <div class="bar" style="margin-top:8px"><i style="width:${Math.min(100, (w / 52) * 100)}%"></i></div></div>
    <div class="note"><b>對目標的誠實評估：</b>三個月達到日常溝通（A2）是做得到的。IELTS 8.5 接近母語者水準，從國小程度一年內達成非常困難，這份路線把它當長期方向，一年內的實際里程碑是 6 個月 B1（約 5 分）、12 個月 B2（約 6 到 6.5 分）。每天投入越多、越常和真人對話，進度越快。</div>
    ${PHASES.map((p, i) => `
      <div class="card phase ${p === cur ? 'current' : ''}">
        <div class="row between"><b>階段 ${i + 1}：${p.name}</b><span class="pill">第 ${p.weeks[0]}–${p.weeks[1]} 週</span></div>
        <p class="muted">${p.cefr} · 每天 ${p.time}${p === cur ? ' · <b>目前階段</b>' : ''}</p>
        <p>${esc(p.goal)}</p>
        <ul>${p.focus.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
      </div>`).join('')}
    <h2>工具以外一定要做的事</h2>
    <div class="card"><ul>
      <li><b>找真人對話。</b>第 4 週起每週至少一次，可用語言交換 App 或線上家教。優先選視訊，看得到嘴型。</li>
      <li><b>大量看有字幕的英文影片。</b>先開英文字幕，看得懂再關掉試聽。</li>
      <li><b>從第二階段開始閱讀。</b>分級讀本、簡易新聞，生字加進自訂單字。</li>
      <li><b>考前三個月聯絡 IELTS 考場</b>申請弱聽特殊安排。</li>
    </ul></div>`;
}

// ---------- 更多 ----------
function more() {
  const items = [['#/sounds', '發音嘴型指南', '用看的學發音'], ['#/grammar', '文法', '10 課基礎文法與測驗'], ['#/ielts', 'IELTS', '考試介紹、弱聽安排、口說與寫作練習'],
    ['#/wordlist', '單字表', '查看全部單字、加入自訂單字'], ['#/plan', '一年學習路線', '四個階段與里程碑'], ['#/settings', '設定', '語音、語速、資料備份']];
  app.innerHTML = `<h1>更多</h1><div class="card list">${items.map((i) => `
    <a class="item" href="${i[0]}"><span><b>${i[1]}</b><br><span class="muted">${i[2]}</span></span><span class="muted">›</span></a>`).join('')}</div>`;
}

// ---------- 設定 ----------
function settings() {
  const s = S.settings;
  app.innerHTML = `<h1>設定</h1>
    <div class="card">
      <b>聲音</b>
      <p class="muted">建議戴耳機或助聽器。每個語音的清晰度不同，逐一試聽，選你聽得最清楚的。</p>
      <label for="voice">語音</label>
      <select id="voice"><option value="">自動選擇</option>${TTS.voices.map((v) => `<option value="${esc(v.name)}" ${v.name === s.voice ? 'selected' : ''}>${esc(v.name)}（${esc(v.lang)}）</option>`).join('')}</select>
      <label for="rate">語速 <span id="rv">${s.rate}</span></label>
      <input type="range" id="rate" min="0.4" max="1.2" step="0.05" value="${s.rate}">
      <label for="pitch">音高 <span id="pv">${s.pitch}</span></label>
      <input type="range" id="pitch" min="0.5" max="1.5" step="0.05" value="${s.pitch}">
      <p class="muted">音高調低會讓聲音比較低沉，有些高頻聽損的人覺得比較清楚。</p>
      <p class="en" id="test">${spanify('Could you speak a little slower, please?')}</p>
      ${sayBtn('Could you speak a little slower, please?', 'test', '▶ 試聽')}
      ${TTS.ok ? '' : '<div class="note">這個瀏覽器不支援語音朗讀，請改用 Chrome、Edge 或 Safari。</div>'}
    </div>
    <div class="card">
      <b>學習</b>
      <label for="npd">每天新單字數</label>
      <input type="number" id="npd" min="0" max="50" value="${s.newPerDay}">
      <label for="start">開始日期（用來計算第幾週）</label>
      <input type="date" id="start" value="${S.start}" max="${dateStr()}">
    </div>
    <div class="card">
      <b>資料備份</b>
      <p class="muted">進度只存在這台裝置的瀏覽器裡。換裝置或清除瀏覽資料前，先匯出備份。</p>
      <div class="row"><button id="exp">匯出備份</button><button id="imp">匯入備份</button><button id="reset">清除全部進度</button></div>
      <input type="file" id="file" accept="application/json,.json" hidden>
    </div>`;
  $('#voice').onchange = (e) => { s.voice = e.target.value; save(); };
  $('#rate').oninput = (e) => { s.rate = Number(e.target.value); $('#rv').textContent = s.rate; save(); };
  $('#pitch').oninput = (e) => { s.pitch = Number(e.target.value); $('#pv').textContent = s.pitch; save(); };
  $('#npd').onchange = (e) => { s.newPerDay = Math.max(0, Math.min(50, Number(e.target.value) || 0)); save(); };
  $('#start').onchange = (e) => { if (e.target.value && e.target.value <= dateStr()) { S.start = e.target.value; save(); toast(`現在是第 ${currentWeek()} 週`); } };
  $('#exp').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' }));
    a.download = `english-coach-${dateStr()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };
  $('#imp').onclick = () => $('#file').click();
  $('#file').onchange = async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (!data || typeof data !== 'object' || !data.cards || !data.settings) throw new Error('format');
      if (!confirm('匯入會覆蓋目前的進度，確定嗎？')) return;
      localStorage.setItem(KEY, JSON.stringify(data)); S = loadState(); toast('已匯入'); settings();
    } catch (err) { toast('這不是有效的備份檔'); }
  };
  $('#reset').onclick = () => {
    if (!confirm('確定要清除全部學習進度嗎？這個動作無法復原。')) return;
    localStorage.removeItem(KEY); S = loadState(); toast('已清除'); settings();
  };
  if (TTS.ok && !TTS.voices.length) {
    const again = () => { if (location.hash === '#/settings') settings(); };
    speechSynthesis.addEventListener('voiceschanged', again, { once: true });
    onLeave(() => speechSynthesis.removeEventListener('voiceschanged', again));
  }
}

// ---------- 路由 ----------
const ROUTES = { '': home, words, wordlist, talk, listen, sounds, grammar, ielts, plan, more, settings };
const TAB_OF = { '': '', words: 'words', wordlist: 'words', talk: 'talk', listen: 'listen', sounds: 'listen' };
function route() {
  cleanups.forEach((fn) => { try { fn(); } catch (e) { /* 忽略 */ } });
  cleanups = [];
  TTS.stop(); stopListening();
  const [name = '', arg] = location.hash.replace(/^#\/?/, '').split('/');
  const view = ROUTES[name] || home;
  view(arg);
  const tab = name in TAB_OF ? TAB_OF[name] : 'more';
  $$('.tabs a').forEach((a) => a.classList.toggle('active', a.dataset.tab === (ROUTES[name] ? tab : '')));
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => { /* 離線功能非必要 */ });
}
