'use strict';
// 每日課程：把複習、新字、會話、跟讀、聽力、文法、開口排成一堂照順序做的課。
// 課程依「完成了幾堂」前進，不是依日期，所以漏掉一天不會跳過內容。

// 步驟名稱與預估分鐘
const STEP_INFO = {
  review: ['複習單字', 3], fresh: ['新單字', 5], dialog: ['今日會話', 4], shadow: ['跟讀', 5],
  pairs: ['辨音', 2], dict: ['聽寫', 3], grammar: ['文法', 5], recall: ['看中文說英文', 3], ielts: ['IELTS 問答', 3],
};
const NEW_PER_LESSON = 6;

// 把每個會話場景切成每段約 3 句，一堂課學一段
const SEGS = (() => {
  const out = [];
  DIALOGUES.forEach((d) => {
    const parts = Math.max(1, Math.round(d.lines.length / 3));
    const base = Math.floor(d.lines.length / parts), extra = d.lines.length % parts;
    let at = 0;
    for (let p = 0; p < parts; p++) {
      const size = base + (p < extra ? 1 : 0);
      out.push({ d, lines: d.lines.slice(at, at + size), part: p + 1, parts });
      at += size;
    }
  });
  return out;
})();

// 第 n 課的會話內容。學完全部分段後，進入整個場景的複習課
function lessonContent(n) {
  if (n <= SEGS.length) return Object.assign({ mode: 'learn' }, SEGS[n - 1]);
  const k = n - SEGS.length - 1;
  const d = DIALOGUES[k % DIALOGUES.length];
  return { mode: 'review', d, lines: d.lines, part: 1, parts: 1, q: IELTS.speak['Part 1'][k % IELTS.speak['Part 1'].length] };
}
const lessonGrammar = (n) => (n % 3 === 0 ? GRAMMAR[n / 3 - 1] || null : null);
function freshWords() {
  return allWords().filter((w) => !S.cards[w.id]).sort((a, b) => (a.level === 'MY' ? -1 : 0) - (b.level === 'MY' ? -1 : 0)).slice(0, NEW_PER_LESSON);
}
function lessonTypes(n) {
  const t = [];
  if (buildQueue().due.length) t.push('review');
  if (freshWords().length) t.push('fresh');
  t.push('dialog', 'shadow', 'pairs', 'dict');
  if (lessonGrammar(n)) t.push('grammar');
  t.push('recall');
  if (lessonContent(n).mode === 'review') t.push('ielts');
  return t;
}
const lessonMinutes = (types) => types.reduce((m, t) => m + STEP_INFO[t][1], 0);
function lessonTitle(n) {
  const c = lessonContent(n);
  return c.mode === 'learn' ? `${c.d.title}${c.parts > 1 ? `（${c.part} / ${c.parts}）` : ''}` : `複習：${c.d.title}`;
}
// 目前這一課的狀態：{ n, i, types }。不同裝置同步後可以接續
function lessonState() {
  const n = (S.lessonN || 0) + 1;
  const st = S.lessonStep && S.lessonStep.n === n ? S.lessonStep : null;
  return { n, i: st ? st.i : 0, types: st ? st.types : lessonTypes(n), started: !!st && st.i > 0 };
}
const myLines = (c) => { const b = c.lines.filter((l) => l[0] === 'B'); return b.length ? b : c.lines; };
const lineHtml = (l, id) => `<div><span class="who ${l[0] === 'B' ? 'me' : ''}">${l[0]}</span><span class="en" id="${id}">${spanify(l[1])}</span></div>`;
const centre = 'style="justify-content:center;margin-top:12px"';

let lessonToken = 0;

// ---------- 各步驟 ----------
// 每個步驟：(box, done, c, n, reveal)。做完呼叫 done() 進下一步；reveal() 只顯示「下一步」按鈕
const STEPS = {
  review(box, done) {
    const queue = buildQueue().due.slice(0, 15).map((w) => w);
    let flipped = false;
    const draw = () => {
      if (!queue.length) return done();
      const w = queue[0];
      box.innerHTML = `<p class="muted">先複習之前學過的字。剩下 ${queue.length} 張</p>
        <div class="card flash"><div class="w">${esc(w.word)}</div><div class="ipa">${esc(w.ipa || '')}</div>
          <div class="row" ${centre}>${sayPair(w.word)}</div>
          ${flipped ? `<div class="zh">${esc(w.zh)}</div>
            ${w.ex ? `<p class="en" id="ex">${spanify(w.ex)}</p><p class="zh">${esc(w.exZh || '')}</p>` : ''}
            <div class="grades">${['忘記', '困難', '記得', '簡單'].map((t, g) => `<button data-g="${g}">${t}<small>${nextIntervalLabel(w.id, g)}</small></button>`).join('')}</div>`
    : '<p class="muted" style="margin-top:18px">先想中文意思，並試著唸出來</p><button class="primary" id="flip">顯示答案</button>'}
        </div>`;
      if (!flipped) $('#flip').onclick = () => { flipped = true; draw(); TTS.speak(w.word); };
      $$('[data-g]', box).forEach((b) => b.onclick = () => {
        const g = Number(b.dataset.g); gradeCard(w.id, g);
        const cur = queue.shift(); if (g === 0) queue.push(cur);
        flipped = false; TTS.stop(); draw();
      });
    };
    draw();
  },

  fresh(box, done) {
    const ws = freshWords();
    if (!ws.length) return done();
    let i = 0, qi = 0, right = 0;
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
        gradeCard(w.id, good ? 2 : 0); if (good) right++;
        const r = $('#qr'); r.hidden = false; r.className = 'result ' + (good ? 'ok' : 'bad');
        r.textContent = good ? '✓ 答對了' : `✗ ${w.word} 是「${w.zh}」。這個字下次會再出現。`;
        $('#k').hidden = false;
      });
      $('#k').onclick = () => { qi++; quiz(); };
    };
    learn();
  },

  dialog(box, done, c, n, reveal) {
    const hide = c.mode === 'review';
    box.innerHTML = `<p class="muted">${esc(c.d.title)}${c.parts > 1 ? `，第 ${c.part} / ${c.parts} 段` : ''}。${hide ? '這個場景你學過了，先不看中文聽一遍，看看懂多少。' : '先看著字聽一遍。B 是你的角色。'}</p>
      <div class="note">💡 ${esc(c.d.tip)}</div>
      <div class="row"><button class="primary" id="all">▶ 全部播放</button><button id="tz">${hide ? '顯示中文' : '隱藏中文'}</button></div>
      <div class="card ${hide ? 'hide-zh' : ''}" id="lines">${c.lines.map((l, i) => `
        <div class="line">${lineHtml(l, 'l' + i)}<div class="zh t">${esc(l[2])}</div>
          <div class="row" style="margin-top:6px">${sayPair(l[1], 'l' + i)}</div></div>`).join('')}</div>`;
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
    if (!TTS.ok) reveal();
  },

  shadow(box, done, c) {
    const lines = c.mode === 'review' ? myLines(c) : c.lines;
    let i = 0;
    const draw = () => {
      const l = lines[i];
      box.innerHTML = `<p class="muted">第 ${i + 1} / ${lines.length} 句。先聽，再跟著大聲唸 3 次。嘴型做大，速度放慢。</p>
        <div class="card">${lineHtml(l, 'sl')}<div class="zh">${esc(l[2])}</div>
          <div class="row" style="margin-top:8px">${sayPair(l[1], 'sl')}${SR ? '<button class="small" id="mic">🎤 跟讀檢查</button>' : ''}</div>
          <div class="result" id="sr" hidden></div>
          <button class="primary" id="k" style="margin-top:14px">我唸了 3 次${i < lines.length - 1 ? '，下一句' : ''}</button></div>
        ${SR ? '<p class="muted">跟讀檢查會把你說的話轉成文字。綠色是辨識到的字，紅色是沒辨識到的字，當作參考就好。</p>' : ''}`;
      speakEl($('#sl'), l[1]);
      const mic = $('#mic');
      if (mic) mic.onclick = () => startListening({
        onfinal: (text) => {
          const out = $('#sr'); if (!out) return;
          const r = compareHtml(l[1], text);
          out.hidden = false; out.className = 'result ' + (r.score >= 80 ? 'ok' : r.score < 50 ? 'bad' : '');
          out.innerHTML = `<div class="en">${r.html}</div><div class="muted">辨識結果：${esc(text)}（${r.score}%）${r.score >= 80 ? ' 很好！' : ' 再試一次。'}</div>`;
        },
        onstate: (on) => { mic.textContent = on ? '🔴 請說…' : '🎤 跟讀檢查'; mic.classList.toggle('on', on); },
      });
      $('#k').onclick = () => { TTS.stop(); stopListening(); i++; if (i < lines.length) draw(); else done(); };
    };
    draw();
  },

  pairs(box, done) {
    const qs = shuffle(pairsL()).slice(0, 3);
    let i = 0, right = 0;
    const ask = () => {
      const cur = qs[i], ans = Math.random() < 0.5 ? 'a' : 'b';
      let picked = null;
      const draw = () => {
        box.innerHTML = `<p class="muted">第 ${i + 1} / ${qs.length} 題。聽到的是哪一個字？可以一直重播。聽不出來很正常，答完看提示。</p>
          <div class="card"><div class="row">${sayBtn(cur[ans], '', '▶ 播放題目')}${sayBtn(cur[ans], '', '🐢 慢速', '0.5')}</div>
            <div class="choices">${['a', 'b'].map((k) => `<button data-k="${k}" class="${picked ? (k === ans ? 'right' : k === picked ? 'wrong' : '') : ''}" ${picked ? 'disabled' : ''}>${esc(cur[k])}<small class="ipa">${esc(cur['i' + k])}</small></button>`).join('')}</div>
            ${picked ? `<div class="result ${picked === ans ? 'ok' : 'bad'}">${picked === ans ? '✓ 答對了' : '✗ 答案是 ' + esc(cur[ans])}。${esc(cur.hint)}</div>
              <div class="row" style="margin-top:10px">${sayBtn(cur.a, '', '▶ ' + esc(cur.a))}${sayBtn(cur.b, '', '▶ ' + esc(cur.b))}
              <button class="primary" id="k">${i < qs.length - 1 ? '下一題' : '完成'}</button></div>` : ''}</div>`;
        $$('[data-k]', box).forEach((b) => b.onclick = () => { picked = b.dataset.k; if (picked === ans) right++; draw(); });
        const k = $('#k'); if (k) k.onclick = () => { TTS.stop(); i++; if (i < qs.length) ask(); else done(); };
      };
      draw(); TTS.speak(cur[ans]);
    };
    ask();
  },

  dict(box, done, c) {
    const qs = shuffle(c.lines).slice(0, 2);
    let i = 0;
    const ask = () => {
      const l = qs[i];
      let checked = null;
      const draw = () => {
        const words = l[1].split(/\s+/);
        box.innerHTML = `<p class="muted">第 ${i + 1} / ${qs.length} 句。這是剛剛會話裡的句子，把聽到的打出來。聽不清的字用前後文猜。</p>
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

  grammar(box, done, c, n) {
    const g = lessonGrammar(n);
    if (!g) return done();
    const picked = {};
    box.innerHTML = `<p class="muted">${esc(g.title)}</p>
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
function lesson() {
  const st = lessonState();
  const n = st.n, types = st.types, c = lessonContent(n);
  let i = st.i;
  const persist = () => { S.lessonStep = { n, i, types }; save(); };
  if (!S.lessonStep || S.lessonStep.n !== n) persist();
  onLeave(() => { lessonToken++; });

  const finish = () => {
    S.lessonN = n; S.lessonDate = dateStr(); S.lessonStep = null;
    if (c.part === c.parts) S.dialogs[c.d.id] = true;
    const l = todayLog();
    ['words', 'talk', 'listen', 'speak'].forEach((t) => { l.done[t] = true; });
    save();
    const ws = wordStats();
    app.innerHTML = `<div class="card flash"><div class="big">🎉 第 ${n} 課完成</div>
        <p>你今天做完了 ${types.length} 個練習。</p>
        <div class="stats" style="margin:14px 0"><div class="stat"><b>${streak()}</b><span>連續天數</span></div>
          <div class="stat"><b>${n}</b><span>完成課數</span></div><div class="stat"><b>${ws.learned}</b><span>已學單字</span></div></div>
        <p class="muted">下一課：${esc(lessonTitle(n + 1))}</p>
        <a class="btn primary" href="#/">回首頁</a></div>
      <div class="note">💡 今天找機會把學到的句子說出口，對鏡子說也可以。說過的句子才會變成你的。</div>`;
    window.scrollTo(0, 0);
  };

  const draw = () => {
    TTS.stop(); stopListening(); lessonToken++;
    if (i >= types.length) return finish();
    const type = types[i];
    app.innerHTML = `
      <div class="row between"><a href="#/">‹ 回首頁</a><span class="muted">第 ${n} 課 · 步驟 ${i + 1} / ${types.length}</span></div>
      <div class="bar" style="margin:8px 0 14px"><i style="width:${(i / types.length) * 100}%"></i></div>
      <h1>${STEP_INFO[type][0]}</h1>
      <div id="box"></div>
      <div class="row between" style="margin-top:16px"><button class="small" id="skip">跳過這一步</button><button class="primary" id="nx" hidden>下一步 ›</button></div>`;
    const next = () => { i++; persist(); draw(); };
    $('#skip').onclick = next; $('#nx').onclick = next;
    const reveal = () => { const b = $('#nx'); if (b) { b.hidden = false; $('#skip').hidden = true; } };
    window.scrollTo(0, 0);
    STEPS[type]($('#box'), next, c, n, reveal);
  };
  draw();
}
