'use strict';
// 每日引導課：把複習、會話、新字、跟讀、組句、聽寫、角色扮演排成一堂照順序做的課。
// 課程依「完成了幾堂」前進，不是依日期，所以漏掉一天不會跳過內容。
// 12 個單元，每單元 3 堂一般課（各學一段對話）加 1 堂整合課；全部完成後進入複習課。

const STEP_INFO = {
  review: ['複習', 3], dialog: ['今日會話', 4], fresh: ['新單字', 5], shadow: ['跟讀', 5], build: ['組句', 3],
  dict: ['聽寫', 2], pairs: ['辨音', 2], recall: ['看中文說英文', 3], sub: ['替換練習', 4], roleplay: ['角色扮演', 5],
  grammar: ['文法', 5], reading: ['短文閱讀', 4], cando: ['我可以', 1], ielts: ['IELTS 問答', 3],
};
const NEW_PER_LESSON = 6;
const PER_UNIT = 4;
const TOTAL_LESSONS = UNITS.length * PER_UNIT;

// 把一個場景切成 3 段
function segsOf(d) {
  const parts = 3, base = Math.floor(d.lines.length / parts), extra = d.lines.length % parts;
  const out = []; let at = 0;
  for (let p = 0; p < parts; p++) { const size = base + (p < extra ? 1 : 0); out.push({ lines: d.lines.slice(at, at + size), offset: at }); at += size; }
  return out;
}
const dialogOf = (unit) => DIALOGUES.find((x) => x.id === unit.d);

function lessonContent(n) {
  if (n <= TOTAL_LESSONS) {
    const u = Math.floor((n - 1) / PER_UNIT), k = (n - 1) % PER_UNIT, unit = UNITS[u], d = dialogOf(unit);
    if (k < 3) return Object.assign({ mode: 'learn', unit, u, k, d }, segsOf(d)[k]);
    return { mode: 'integrate', unit, u, k, d, lines: d.lines, offset: 0 };
  }
  const j = n - TOTAL_LESSONS - 1, u = j % UNITS.length, unit = UNITS[u], d = dialogOf(unit);
  return { mode: 'review', unit, u, k: 0, d, lines: d.lines, offset: 0, q: IELTS.speak['Part 1'][j % IELTS.speak['Part 1'].length] };
}
function freshWords() {
  return allWords().filter((w) => !S.cards[w.id]).sort((a, b) => (a.level === 'MY' ? -1 : 0) - (b.level === 'MY' ? -1 : 0)).slice(0, NEW_PER_LESSON);
}
function lessonTypes(n) {
  const c = lessonContent(n), t = [];
  if (buildQueue().due.length) t.push('review');
  if (c.mode === 'learn') { t.push('dialog'); if (freshWords().length) t.push('fresh'); t.push('shadow', 'build', 'dict', 'pairs', 'recall'); }
  else if (c.mode === 'integrate') { t.push('dialog', 'sub', 'roleplay'); if (c.unit.grammar) t.push('grammar'); t.push('reading', 'cando'); }
  else t.push('dialog', 'roleplay', 'dict', 'ielts');
  return t;
}
const lessonMinutes = (types) => types.reduce((m, t) => m + STEP_INFO[t][1], 0);
function lessonTitle(n) {
  const c = lessonContent(n);
  if (c.mode === 'learn') return `單元 ${c.u + 1}：${c.d.title}（第 ${c.k + 1} / ${PER_UNIT} 堂）`;
  if (c.mode === 'integrate') return `單元 ${c.u + 1}：${c.d.title}（整合課）`;
  return `複習課：${c.d.title}`;
}
// 目前這一課的狀態。不同裝置同步後可以接續
function lessonState() {
  const n = (S.lessonN || 0) + 1;
  const st = S.lessonStep && S.lessonStep.n === n ? S.lessonStep : null;
  return { n, i: st ? st.i : 0, types: st ? st.types : lessonTypes(n), started: !!st && st.i > 0 };
}
const myLines = (c) => { const b = c.lines.filter((l) => l[0] === 'B'); return b.length ? b : c.lines; };
const lineHtml = (l, id) => `<div><span class="who ${l[0] === 'B' ? 'me' : ''}">${l[0]}</span><span class="en" id="${id}">${spanify(l[1])}</span></div>`;
const centre = 'style="justify-content:center;margin-top:12px"';
const legend = '<p class="muted">畫<u class="end">底線</u>的是容易聽不見的字尾（-s、-ed、縮寫），用眼睛記住它們。</p>';
let lessonToken = 0;

// 閃卡：單字卡是「看英文想中文」，句子卡是「看中文說英文」
function cardRunner(box, queue, done, intro) {
  let flipped = false;
  const draw = () => {
    if (!queue.length) return done();
    const w = queue[0], chunk = w.kind === 'chunk';
    const grades = `<div class="grades">${['忘記', '困難', '記得', '簡單'].map((t, g) => `<button data-g="${g}">${t}<small>${nextIntervalLabel(w.id, g)}</small></button>`).join('')}</div>`;
    box.innerHTML = `<p class="muted">${intro || ''}剩下 ${queue.length} 張 ${S.cards[w.id] ? '' : '<span class="pill">新字</span>'}</p>
      <div class="card flash">${chunk ? `
        <div class="muted">用英文怎麼說？</div><div class="zh" style="font-size:1.3rem;color:var(--ink)">${esc(w.zh)}</div>
        ${flipped ? `<p class="en" id="ex" style="margin-top:14px">${spanify(w.en)}</p><div class="row" ${centre}>${sayPair(w.en, 'ex')}</div>${grades}`
    : '<p class="muted" style="margin-top:18px">先大聲說出來</p><button class="primary" id="flip">顯示答案</button>'}` : `
        <div class="w">${esc(w.word)}</div><div class="ipa">${esc(w.ipa || '')} <span class="muted">${esc(w.pos || '')}</span></div>
        <div class="row" ${centre}>${sayPair(w.word)}</div>
        ${flipped ? `<div class="zh">${esc(w.zh)}</div>
          ${w.ex ? `<p class="en" id="ex">${spanify(w.ex)}</p><p class="zh">${esc(w.exZh || '')}</p><div class="row" style="justify-content:center">${sayPair(w.ex, 'ex')}</div>` : ''}${grades}`
    : '<p class="muted" style="margin-top:18px">先想中文意思，並試著唸出來</p><button class="primary" id="flip">顯示答案</button>'}`}
      </div>`;
    if (!flipped) $('#flip').onclick = () => { flipped = true; draw(); if (chunk) speakEl($('#ex'), w.en); else TTS.speak(w.word); };
    $$('[data-g]', box).forEach((b) => b.onclick = () => {
      const g = Number(b.dataset.g); gradeCard(w.id, g);
      const cur = queue.shift(); if (g === 0) queue.push(cur);
      flipped = false; TTS.stop(); draw();
    });
  };
  draw();
}

// 把今天學的句子加入複習卡（明天開始出現）
function addChunkCards(c) {
  c.lines.forEach((l, i) => {
    if (l[0] !== 'B') return;
    const id = `c:${c.d.id}:${c.offset + i}`;
    if (!S.cards[id]) S.cards[id] = { ivl: 1, ease: 2.5, reps: 1, due: dayNum() + 1, t: Date.now() };
  });
}

// ---------- 各步驟：(box, done, c, reveal) ----------
// 做完呼叫 done() 進下一步；reveal() 只顯示「下一步」按鈕
const STEPS = {
  review(box, done) { cardRunner(box, buildQueue().due.slice(0, 15), done, '先複習之前學過的字和句子。'); },

  dialog(box, done, c, reveal) {
    const hide = c.mode !== 'learn';
    const gist = c.mode === 'learn' && c.k === 0 ? c.unit.gist : null;
    box.innerHTML = `<p class="muted">${hide ? '這個場景你學過了。先不看中文聽一遍，看看懂多少。' : `第 ${c.k + 1} 段。先看著字聽一遍，B 是你的角色。`}</p>
      <div class="note">💡 ${esc(c.d.tip)}</div>
      <div class="row"><button class="primary" id="all">▶ 全部播放</button><button id="tz">${hide ? '顯示中文' : '隱藏中文'}</button></div>
      <div class="card ${hide ? 'hide-zh' : ''}" id="lines">${c.lines.map((l, i) => `
        <div class="line">${lineHtml(l, 'l' + i)}<div class="zh t">${esc(l[2])}</div>
          <div class="row" style="margin-top:6px">${sayPair(l[1], 'l' + i)}</div></div>`).join('')}</div>
      ${legend}
      ${gist ? `<div class="card" id="gist"><b>${esc(gist.q)}</b><div class="opts">${gist.opts.map((o, k) => `<button data-o="${k}">${esc(o)}</button>`).join('')}</div></div>` : ''}`;
    const all = $('#all');
    let playing = false;
    const stop = () => { playing = false; lessonToken++; TTS.stop(); all.textContent = '▶ 再播一次'; };
    all.onclick = () => {
      if (playing) return stop();
      playing = true; all.textContent = '■ 停止';
      const my = ++lessonToken;
      const step = (i) => {
        if (my !== lessonToken) return;
        if (i >= c.lines.length) { stop(); return reveal(); }
        const el = $('#l' + i); if (!el) return;
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        speakEl(el, c.lines[i][1], { onend: () => setTimeout(() => step(i + 1), 500) });
      };
      step(0);
    };
    $('#lines').addEventListener('click', (e) => { if (!e.target.closest('[data-say]')) return; if (playing) { playing = false; lessonToken++; all.textContent = '▶ 再播一次'; } reveal(); }, true);
    $('#tz').onclick = () => { const on = $('#lines').classList.toggle('hide-zh'); $('#tz').textContent = on ? '顯示中文' : '隱藏中文'; };
    $$('#gist [data-o]').forEach((b) => b.onclick = () => {
      const k = Number(b.dataset.o);
      $$('#gist [data-o]').forEach((x, m) => { x.disabled = true; if (m === gist.a) x.classList.add('right'); else if (m === k) x.classList.add('wrong'); });
      reveal();
    });
    if (!TTS.ok) reveal();
  },

  fresh(box, done) {
    const ws = freshWords();
    if (!ws.length) return done();
    let i = 0, qi = 0;
    const order = shuffle(ws);
    const learn = () => {
      const w = ws[i];
      box.innerHTML = `<p class="muted">新單字 ${i + 1} / ${ws.length}。看字、聽聲音、跟著唸兩次。</p>
        <div class="card flash"><div class="w">${esc(w.word)}</div><div class="ipa">${esc(w.ipa || '')} <span class="muted">${esc(w.pos || '')}</span></div>
          <div class="zh">${esc(w.zh)}</div>
          ${w.ex ? `<p class="en" id="ex">${spanify(w.ex)}</p><p class="zh">${esc(w.exZh || '')}</p>` : ''}
          <div class="row" ${centre}>${sayPair(w.word)}${w.ex ? sayBtn(w.ex, 'ex', '▶ 例句') : ''}</div>
          <button class="primary" id="k" style="margin-top:14px">${i < ws.length - 1 ? '記住了，下一個' : '開始小測驗'}</button>
        </div>`;
      TTS.speak(w.word);
      $('#k').onclick = () => { i++; if (i < ws.length) learn(); else quiz(); };
    };
    const quiz = () => {
      TTS.stop();
      if (qi >= order.length) return done();
      const w = order[qi];
      const opts = shuffle([w].concat(shuffle(allWords().filter((x) => x.id !== w.id && x.zh !== w.zh)).slice(0, 3)));
      box.innerHTML = `<p class="muted">小測驗 ${qi + 1} / ${order.length}。這個字是什麼意思？</p>
        <div class="card"><div class="flash" style="padding:6px 0 12px"><div class="w">${esc(w.word)}</div><div class="ipa">${esc(w.ipa || '')}</div>
          <div class="row" ${centre}>${sayBtn(w.word)}</div></div>
          <div class="opts">${opts.map((o) => `<button data-id="${esc(o.id)}">${esc(o.zh)}</button>`).join('')}</div>
          <div class="result" id="qr" hidden></div>
          <button class="primary" id="k" hidden style="margin-top:10px">${qi < order.length - 1 ? '下一題' : '完成'}</button></div>`;
      $$('[data-id]', box).forEach((b) => b.onclick = () => {
        const good = b.dataset.id === w.id;
        $$('[data-id]', box).forEach((x) => { x.disabled = true; if (x.dataset.id === w.id) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
        gradeCard(w.id, good ? 2 : 0);
        const r = $('#qr'); r.hidden = false; r.className = 'result ' + (good ? 'ok' : 'bad');
        r.textContent = good ? '✓ 答對了' : `✗ ${w.word} 是「${w.zh}」。這個字下次會再出現。`;
        $('#k').hidden = false;
      });
      $('#k').onclick = () => { qi++; quiz(); };
    };
    learn();
  },

  shadow(box, done, c) {
    const lines = c.lines;
    let i = 0;
    const draw = () => {
      const l = lines[i];
      box.innerHTML = `<p class="muted">第 ${i + 1} / ${lines.length} 句。先聽，再跟著大聲唸 3 次。嘴型做大，速度放慢，字尾要唸出來。</p>
        <div class="card">${lineHtml(l, 'sl')}<div class="zh">${esc(l[2])}</div>
          <div class="row" style="margin-top:8px">${sayPair(l[1], 'sl')}${SR ? '<button class="small" id="mic">🎤 跟讀檢查</button>' : ''}</div>
          <div class="result" id="sr" hidden></div>
          <button class="primary" id="k" style="margin-top:14px">我唸了 3 次${i < lines.length - 1 ? '，下一句' : ''}</button></div>
        ${SR ? '<p class="muted">跟讀檢查會把你說的話轉成文字，只當參考。機器聽錯很常見，你覺得說對了就繼續。</p>' : ''}`;
      speakEl($('#sl'), l[1]);
      const mic = $('#mic');
      if (mic) mic.onclick = () => startListening({
        onfinal: (text) => {
          const out = $('#sr'); if (!out) return;
          const r = compareHtml(l[1], text);
          out.hidden = false; out.className = 'result ' + (r.score >= 80 ? 'ok' : '');
          out.innerHTML = `<div class="en">${r.html}</div><div class="muted">辨識結果：${esc(text)}（${r.score}%）</div>`;
        },
        onstate: (on) => { mic.textContent = on ? '🔴 請說…' : '🎤 跟讀檢查'; mic.classList.toggle('on', on); },
      });
      $('#k').onclick = () => { TTS.stop(); stopListening(); i++; if (i < lines.length) draw(); else done(); };
    };
    draw();
  },

  build(box, done, c) {
    const strip = (w) => w.replace(/[.,!?]+$/, '');
    const pool0 = myLines(c).filter((l) => { const n = l[1].split(/\s+/).length; return n >= 3 && n <= 10; });
    const lines = shuffle(pool0.length ? pool0 : c.lines).slice(0, 2);
    let i = 0;
    const ask = () => {
      const l = lines[i], target = l[1].split(/\s+/).map(strip);
      let pool = shuffle(target.map((w, k) => ({ w, k }))), picked = [], state = null;
      const draw = () => {
        box.innerHTML = `<p class="muted">第 ${i + 1} / ${lines.length} 句。看中文，依序點英文字，排成正確的句子。</p>
          <div class="card"><div class="zh" style="font-size:1.15rem;color:var(--ink)">${esc(l[2])}</div>
            <div class="slots" id="picked">${picked.map((t, k) => `<button class="tile" data-un="${k}">${esc(t.w)}</button>`).join('') || '<span class="muted">點下面的字</span>'}</div>
            ${state === null ? `<div class="tiles">${pool.map((t, k) => `<button class="tile" data-pick="${k}">${esc(t.w)}</button>`).join('')}</div>` : `
              <div class="result ${state ? 'ok' : 'bad'}">${state ? '✓ 正確' : '✗ 正確的順序是：'}<div class="en" id="ba">${spanify(l[1])}</div></div>
              <div class="row" style="margin-top:10px">${sayPair(l[1], 'ba')}${state ? '' : '<button id="retry">再排一次</button>'}
              <button class="primary" id="k">${i < lines.length - 1 ? '下一句' : '完成'}</button></div>`}</div>`;
        $$('[data-pick]', box).forEach((b) => b.onclick = () => {
          picked.push(pool.splice(Number(b.dataset.pick), 1)[0]);
          if (!pool.length) { state = picked.map((t) => t.w.toLowerCase()).join(' ') === target.join(' ').toLowerCase(); draw(); speakEl($('#ba'), l[1]); } else draw();
        });
        if (state === null) $$('[data-un]', box).forEach((b) => b.onclick = () => { pool.push(picked.splice(Number(b.dataset.un), 1)[0]); draw(); });
        const r = $('#retry'); if (r) r.onclick = () => { TTS.stop(); ask(); };
        const k = $('#k'); if (k) k.onclick = () => { TTS.stop(); i++; if (i < lines.length) ask(); else done(); };
      };
      draw();
    };
    ask();
  },

  dict(box, done, c) {
    const qs = shuffle(c.lines).slice(0, c.mode === 'learn' ? 1 : 2);
    let i = 0;
    const ask = () => {
      const l = qs[i];
      let checked = null;
      const draw = () => {
        const words = l[1].split(/\s+/);
        box.innerHTML = `<p class="muted">${qs.length > 1 ? `第 ${i + 1} / ${qs.length} 句。` : ''}這是會話裡的句子，把聽到的打出來。聽不清的字用前後文和文法去猜，例如主詞是 she 時動詞要加 s。</p>
          <div class="card"><div class="row">${sayPair(l[1])}<button class="small" id="hint">提示</button></div>
            <p class="muted" id="hintBox" hidden>共 ${words.length} 個字：${words.map((w) => esc(w[0]) + '＿').join(' ')}<br>中文：${esc(l[2])}</p>
            <label for="ans">你聽到的句子</label>
            <input type="text" id="ans" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" value="${esc(checked || '')}">
            ${checked === null ? '<button class="primary" id="check" style="margin-top:10px">檢查</button>' : (() => { const r = compareHtml(l[1], checked); return `
              <div class="result ${r.score === 100 ? 'ok' : ''}"><div class="en">${r.html}</div><div class="zh">${esc(l[2])}</div>
              <div class="muted">答對 ${r.score}% 的字${r.score === 100 ? '，完全正確！' : '。紅色是漏掉或寫錯的字，再聽一次確認。'}</div></div>
              <button class="primary" id="k" style="margin-top:10px">${i < qs.length - 1 ? '下一句' : '完成'}</button>`; })()}</div>`;
        $('#hint').onclick = () => { $('#hintBox').hidden = false; };
        const check = () => { checked = $('#ans').value; draw(); };
        const cb = $('#check'); if (cb) { cb.onclick = check; $('#ans').onkeydown = (e) => { if (e.key === 'Enter') check(); }; }
        const k = $('#k'); if (k) k.onclick = () => { TTS.stop(); i++; if (i < qs.length) ask(); else done(); };
      };
      draw(); TTS.speak(l[1]);
    };
    ask();
  },

  pairs(box, done) {
    const qs = shuffle(pairsL()).slice(0, 2);
    let i = 0;
    const ask = () => {
      const cur = qs[i], ans = Math.random() < 0.5 ? 'a' : 'b';
      let picked = null;
      const draw = () => {
        box.innerHTML = `<p class="muted">第 ${i + 1} / ${qs.length} 題。聽到的是哪一個字？可以一直重播。這一步不計分，聽不出來很正常，重點是看答案後面的嘴型提示。</p>
          <div class="card"><div class="row">${sayBtn(cur[ans], '', '▶ 播放題目')}${sayBtn(cur[ans], '', '🐢 慢速', '0.5')}</div>
            <div class="choices">${['a', 'b'].map((k) => `<button data-k="${k}" class="${picked ? (k === ans ? 'right' : k === picked ? 'wrong' : '') : ''}" ${picked ? 'disabled' : ''}>${esc(cur[k])}<small class="ipa">${esc(cur['i' + k])}</small></button>`).join('')}</div>
            ${picked ? `<div class="result ${picked === ans ? 'ok' : ''}">${picked === ans ? '✓ 答對了' : '答案是 ' + esc(cur[ans])}。${esc(cur.hint)}</div>
              <div class="row" style="margin-top:10px">${sayBtn(cur.a, '', '▶ ' + esc(cur.a))}${sayBtn(cur.b, '', '▶ ' + esc(cur.b))}
              <button class="primary" id="k">${i < qs.length - 1 ? '下一題' : '完成'}</button></div>` : ''}</div>`;
        $$('[data-k]', box).forEach((b) => b.onclick = () => { picked = b.dataset.k; draw(); });
        const k = $('#k'); if (k) k.onclick = () => { TTS.stop(); i++; if (i < qs.length) ask(); else done(); };
      };
      draw(); TTS.speak(cur[ans]);
    };
    ask();
  },

  recall(box, done, c) {
    const lines = shuffle(myLines(c)).slice(0, 3);
    let i = 0, shown = false;
    const draw = () => {
      const l = lines[i];
      box.innerHTML = `<p class="muted">第 ${i + 1} / ${lines.length} 句。看中文，把英文大聲說出來，再看答案。這是真正對話時要用的能力。</p>
        <div class="card flash"><div class="zh" style="font-size:1.3rem;color:var(--ink)">${esc(l[2])}</div>
          ${shown ? `<p class="en" id="ra" style="margin-top:14px">${spanify(l[1])}</p>
            <div class="row" ${centre}>${sayPair(l[1], 'ra')}</div>
            <div class="row" ${centre}><button id="no">還不熟</button><button class="primary" id="yes">說對了</button></div>`
    : '<p class="muted" style="margin-top:18px">先自己說一次</p><button class="primary" id="show">顯示答案</button>'}</div>`;
      if (!shown) { $('#show').onclick = () => { shown = true; draw(); speakEl($('#ra'), l[1]); }; return; }
      const next = (again) => { TTS.stop(); if (again && lines.length < 6) lines.push(l); i++; shown = false; if (i < lines.length) draw(); else done(); };
      $('#yes').onclick = () => next(false);
      $('#no').onclick = () => next(true);
    };
    draw();
  },

  sub(box, done, c) {
    const frames = c.unit.frames;
    let i = 0;
    const ask = () => {
      const f = frames[i], tried = new Set();
      let cur = null;
      const draw = () => {
        const [head, tail] = f.en.split('___');
        const full = cur === null ? null : head + f.opts[cur][0] + tail;
        box.innerHTML = `<p class="muted">句型 ${i + 1} / ${frames.length}。點一個詞放進空格，聽完大聲說一次。至少試兩個，最後換成你自己的資料說一句。</p>
          <div class="card"><div class="en" style="font-size:1.3rem" id="fr">${full ? spanify(full) : esc(head) + '<b>＿＿</b>' + esc(tail)}</div>
            <div class="zh">${esc(full ? f.zh.replace('＿', f.opts[cur][1]) : f.zh)}</div>
            <div class="tiles">${f.opts.map((o, k) => `<button class="tile ${k === cur ? 'on' : ''}" data-o="${k}">${esc(o[0])}</button>`).join('')}</div>
            ${full ? `<div class="row" style="margin-top:10px">${sayPair(full, 'fr')}</div>` : ''}
            ${tried.size >= Math.min(2, f.opts.length) ? `<button class="primary" id="k" style="margin-top:14px">${i < frames.length - 1 ? '下一個句型' : '完成'}</button>` : ''}</div>`;
        $$('[data-o]', box).forEach((b) => b.onclick = () => { cur = Number(b.dataset.o); tried.add(cur); draw(); speakEl($('#fr'), head + f.opts[cur][0] + tail); });
        const k = $('#k'); if (k) k.onclick = () => { TTS.stop(); i++; if (i < frames.length) ask(); else done(); };
      };
      draw();
    };
    ask();
  },

  roleplay(box, done, c) {
    const lines = c.lines;
    let i = 0, shown = false;
    const draw = () => {
      const l = lines[i], mine = l[0] === 'B', prev = lines.slice(Math.max(0, i - 2), i);
      box.innerHTML = `<p class="muted">第 ${i + 1} / ${lines.length} 句。App 說 A，你說 B。輪到你時先看中文自己說，再看答案。</p>
        <div class="card">
          ${prev.map((p) => `<div class="line" style="opacity:.6"><span class="who ${p[0] === 'B' ? 'me' : ''}">${p[0]}</span><span class="en">${esc(p[1])}</span></div>`).join('')}
          <div class="line">${mine && !shown ? `<div><span class="who me">B</span><b>輪到你：</b>${esc(l[2])}</div>
              <button class="primary" id="show" style="margin-top:10px">我說了，顯示答案</button>`
    : `${lineHtml(l, 'rl')}<div class="zh">${esc(l[2])}</div><div class="row" style="margin-top:6px">${sayPair(l[1], 'rl')}</div>
              ${mine ? '<div class="row" style="margin-top:10px"><button id="no">還不熟</button><button class="primary" id="yes">說對了</button></div>'
      : `<button class="primary" id="k" style="margin-top:10px">${i < lines.length - 1 ? '下一句' : '完成'}</button>`}`}</div></div>`;
      const next = () => { TTS.stop(); i++; shown = false; if (i < lines.length) draw(); else done(); };
      if (mine && !shown) { $('#show').onclick = () => { shown = true; draw(); speakEl($('#rl'), l[1]); }; return; }
      if (!mine) { speakEl($('#rl'), l[1]); $('#k').onclick = next; return; }
      $('#yes').onclick = next;
      $('#no').onclick = () => { const id = `c:${c.d.id}:${c.offset + i}`; if (S.cards[id]) gradeCard(id, 0); next(); };
    };
    draw();
  },

  grammar(box, done, c) {
    const g = GRAMMAR.find((x) => x.id === c.unit.grammar);
    if (!g) return done();
    const picked = {};
    box.innerHTML = `<p class="muted">${esc(g.title)}。你在這個單元已經用過這些句子，現在看規則。</p>
      <div class="card"><ul>${g.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>
      <div class="card">${g.examples.map((ex, i) => `<div class="line"><div class="en" id="e${i}">${spanify(ex[0])}</div><div class="zh">${esc(ex[1])}</div>${sayPair(ex[0], 'e' + i)}</div>`).join('')}</div>
      ${g.quiz.map((q, i) => `<div class="card" data-q="${i}"><div class="en">${i + 1}. ${esc(q.q)}</div>
        <div class="opts">${q.opts.map((o, k) => `<button data-o="${k}">${esc(o)}</button>`).join('')}</div><div class="result" hidden></div></div>`).join('')}
      <button class="primary" id="k" hidden>完成文法</button>`;
    $('#k').onclick = done;
    $$('[data-q]', box).forEach((card) => {
      const i = Number(card.dataset.q), q = g.quiz[i];
      $$('[data-o]', card).forEach((b) => b.onclick = () => {
        if (i in picked) return;
        const k = Number(b.dataset.o); picked[i] = k;
        $$('[data-o]', card).forEach((x, m) => { x.disabled = true; if (m === q.a) x.classList.add('right'); else if (m === k) x.classList.add('wrong'); });
        const r = $('.result', card); r.hidden = false; r.className = 'result ' + (k === q.a ? 'ok' : 'bad');
        r.textContent = (k === q.a ? '✓ 正確。' : '✗ 不對。') + q.why;
        if (Object.keys(picked).length === g.quiz.length) {
          const score = g.quiz.filter((x, m) => picked[m] === x.a).length;
          S.grammar[g.id] = Math.max(S.grammar[g.id] || 0, score); markTask('grammar');
          const kb = $('#k'); kb.hidden = false; kb.textContent = `完成文法（答對 ${score} / ${g.quiz.length}）`;
        }
      });
    });
  },

  reading(box, done, c) {
    const r = c.unit.read, picked = {};
    box.innerHTML = `<p class="muted">邊聽邊讀。這篇短文只用你學過的句型。先不看中文，讀完回答兩題。</p>
      <div class="row"><button class="primary" id="all">▶ 全部播放</button><button id="tz">顯示中文</button></div>
      <div class="card hide-zh" id="lines"><b>${esc(r.title)}</b>${r.text.map((l, i) => `
        <div class="line"><div class="en" id="t${i}">${spanify(l[0])}</div><div class="zh t">${esc(l[1])}</div>${sayBtn(l[0], 't' + i, '▶')}</div>`).join('')}</div>
      ${r.qs.map((q, i) => `<div class="card" data-q="${i}"><div>${i + 1}. ${esc(q.q)}</div>
        <div class="row" style="margin-top:8px"><button data-a="1">對</button><button data-a="0">不對</button></div></div>`).join('')}
      <button class="primary" id="k" hidden>完成閱讀</button>`;
    const all = $('#all');
    let playing = false;
    const stop = () => { playing = false; lessonToken++; TTS.stop(); all.textContent = '▶ 再播一次'; };
    all.onclick = () => {
      if (playing) return stop();
      playing = true; all.textContent = '■ 停止';
      const my = ++lessonToken;
      const step = (i) => {
        if (my !== lessonToken) return;
        if (i >= r.text.length) return stop();
        const el = $('#t' + i); if (!el) return;
        speakEl(el, r.text[i][0], { onend: () => setTimeout(() => step(i + 1), 400) });
      };
      step(0);
    };
    $('#lines').addEventListener('click', (e) => { if (e.target.closest('[data-say]') && playing) { playing = false; lessonToken++; all.textContent = '▶ 再播一次'; } }, true);
    $('#tz').onclick = () => { const on = $('#lines').classList.toggle('hide-zh'); $('#tz').textContent = on ? '顯示中文' : '隱藏中文'; };
    $('#k').onclick = () => { stop(); done(); };
    $$('[data-q]', box).forEach((card) => {
      const i = Number(card.dataset.q), q = r.qs[i];
      $$('[data-a]', card).forEach((b) => b.onclick = () => {
        if (i in picked) return;
        picked[i] = true;
        $$('[data-a]', card).forEach((x) => { x.disabled = true; const isTrue = x.dataset.a === '1'; if (isTrue === q.a) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
        if (Object.keys(picked).length === r.qs.length) $('#k').hidden = false;
      });
    });
  },

  cando(box, done, c) {
    box.innerHTML = `<p class="muted">這個單元的目標。誠實評估，還不行的話之後的複習會再帶你練。</p>
      <div class="card flash"><div class="muted">單元 ${c.u + 1}</div><div class="zh" style="font-size:1.3rem;color:var(--ink)">${esc(c.unit.cando)}</div>
        <div class="opts" style="margin-top:16px">
          <button data-l="3">可以，不用看字也說得出來</button>
          <button data-l="2">差不多，偶爾要看一下</button>
          <button data-l="1">還不行，需要再練</button></div></div>`;
    $$('[data-l]', box).forEach((b) => b.onclick = () => { S.cando[c.unit.d] = Math.max(S.cando[c.unit.d] || 0, Number(b.dataset.l)); save(); done(); });
  },

  ielts(box, done, c) {
    let text = '';
    box.innerHTML = `<p class="muted">用 2 到 3 句回答：直接回答，加一個理由，再加一個例子。</p>
      <div class="card"><p class="en" id="iq">${spanify(c.q)}</p>
        <div class="row">${sayPair(c.q, 'iq')}${SR ? '<button class="small" id="mic">🎤 開始回答</button>' : ''}</div>
        <div class="result" id="ir" hidden></div>
        <button class="primary" id="k" style="margin-top:14px">我回答了</button></div>`;
    speakEl($('#iq'), c.q);
    const mic = $('#mic');
    if (mic) mic.onclick = () => {
      if (mic.classList.contains('on')) return stopListening();
      text = '';
      startListening({
        continuous: true,
        onfinal: (s) => { text += (text ? ' ' : '') + s; const r = $('#ir'); if (r) { r.hidden = false; r.textContent = `${text}（${normWords(text).length} 個字）`; } },
        onstate: (on) => { mic.textContent = on ? '■ 停止' : '🎤 開始回答'; mic.classList.toggle('on', on); },
      });
    };
    $('#k').onclick = done;
  },
};

// ---------- 課程畫面 ----------
function lesson(arg) {
  const mini = arg === 'mini';
  const st = lessonState();
  // 5 分鐘版：只複習，加上最近一課的看中文說英文，不推進課程
  const n = mini ? Math.max(1, S.lessonN || 0) : st.n;
  const c = lessonContent(n);
  const types = mini ? (buildQueue().due.length ? ['review', 'recall'] : ['recall']) : st.types;
  let i = mini ? 0 : st.i;
  const persist = () => { if (mini) return; S.lessonStep = { n, i, types }; save(); };
  if (!mini && (!S.lessonStep || S.lessonStep.n !== n)) persist();
  onLeave(() => { lessonToken++; });

  const finish = () => {
    const l = todayLog();
    if (mini) { l.done.mini = true; save(); } else {
      S.lessonN = n; S.lessonDate = dateStr(); S.lessonStep = null;
      if (c.mode === 'learn') addChunkCards(c); else S.dialogs[c.d.id] = true;
      l.done.lesson = true;
      save();
    }
    const ws = wordStats();
    app.innerHTML = `<div class="card flash"><div class="big">🎉 ${mini ? '今天的 5 分鐘完成了' : `第 ${n} 課完成`}</div>
        <p>${mini ? '忙的日子也沒有中斷，這比偶爾念很久更有用。' : `你做完了 ${types.length} 個練習。${c.mode === 'learn' ? '今天的句子已經加入複習卡，明天開始出現。' : ''}`}</p>
        <div class="stats" style="margin:14px 0"><div class="stat"><b>${streak()}</b><span>連續天數</span></div>
          <div class="stat"><b>${S.lessonN || 0}</b><span>完成課數</span></div><div class="stat"><b>${ws.learned}</b><span>已學單字</span></div></div>
        ${mini ? '' : `<p class="muted">下一課：${esc(lessonTitle(n + 1))}</p>`}
        <a class="btn primary" href="#/">回首頁</a></div>
      <div class="note">💡 今天找機會把學到的句子說出口，對鏡子說也可以。說過的句子才會變成你的。</div>`;
    window.scrollTo(0, 0);
  };

  const draw = () => {
    TTS.stop(); stopListening(); lessonToken++;
    if (i >= types.length) return finish();
    const type = types[i];
    app.innerHTML = `
      <div class="row between"><a href="#/">‹ 回首頁</a><span class="muted">${mini ? '5 分鐘版' : `第 ${n} 課`} · 步驟 ${i + 1} / ${types.length}</span></div>
      <div class="bar" style="margin:8px 0 14px"><i style="width:${(i / types.length) * 100}%"></i></div>
      <h1>${STEP_INFO[type][0]}</h1>
      <div id="box"></div>
      <div class="row between" style="margin-top:16px"><button class="small" id="skip">跳過這一步</button><button class="primary" id="nx" hidden>下一步 ›</button></div>`;
    const next = () => { i++; persist(); draw(); };
    $('#skip').onclick = next; $('#nx').onclick = next;
    const reveal = () => { const b = $('#nx'); if (b) { b.hidden = false; $('#skip').hidden = true; } };
    window.scrollTo(0, 0);
    STEPS[type]($('#box'), next, c, reveal);
  };
  draw();
}
