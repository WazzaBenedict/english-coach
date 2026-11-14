'use strict';
// 開始設定、首頁、學習路線、單字複習

// ---------- 開始設定（第一次開啟時顯示） ----------
function start() {
  let step = 0;
  const s = S.settings;
  const test = 'Could you speak a little slower, please?';
  const pages = [
    () => `<h1>先說清楚目標</h1>
      <p>這個 App 每天帶你上一堂課，照順序做完就好，不用自己挑功能。</p>
      <div class="card"><table>
        <tr><th style="white-space:nowrap">3 個月</th><td>能用慢速、簡單的句子和有耐心的外國人對話。<b>做得到。</b></td></tr>
        <tr><th>1 年</th><td>日常話題大致能溝通，約 IELTS 4.5 到 5.5。</td></tr>
        <tr><th>之後</th><td>IELTS 8.5 等於接近母語者的程度，從基礎出發通常需要好幾年。它是方向，每個階段的小目標才是每天的動力。</td></tr>
      </table></div>
      <div class="note">這套課程特別照顧聽力：所有聲音都有文字，容易聽不見的字尾會畫底線，辨音不計分，語音辨識只當參考。</div>`,
    () => `<h1>每天要花多少時間？</h1>
      <p class="muted">選一個做得到的。固定時間、固定地點最容易養成習慣。休息一天不會中斷紀錄。</p>
      <div class="opts">${[[30, '30 分鐘', '只上核心課。進度會比上面的時間表慢。'], [60, '1 小時', '核心課加複習和自由練習。'], [90, '1.5 小時', '跟得上三個月開口的目標。'], [120, '2 小時以上', '核心課加閱讀、字幕影片和真人對話。']].map(([m, t, d]) =>
    `<button data-min="${m}" class="${s.daily === m ? 'on' : ''}" style="flex-direction:column;align-items:flex-start"><b>${t}</b><span class="muted">${d}</span></button>`).join('')}</div>`,
    () => {
      const list = TTS.voices.filter((v) => accentRe().test(v.lang));
      return `<h1>選一個你聽得最清楚的聲音</h1>
      <p class="muted">請先戴上耳機或助聽器。每個聲音都試聽，選最清楚的；低沉的聲音通常比較容易聽到 s 這類高頻音。之後可以在設定裡更改。</p>
      <div class="card"><p class="en" id="vt">${spanify(test)}</p>
        ${list.length ? list.map((v) => `<div class="task"><input type="radio" name="voice" value="${esc(v.name)}" ${v.name === s.voice ? 'checked' : ''} aria-label="${esc(v.name)}">
          <div class="grow">${esc(v.name)}</div><button class="small" data-try="${esc(v.name)}">▶ 試聽</button></div>`).join('')
    : `<div class="note">${TTS.ok ? '這台裝置沒有找到英國口音的語音，會由瀏覽器自動選擇。電腦建議用 Edge 或 Chrome；手機可到系統的「文字轉語音」設定下載 English (United Kingdom)。' : '這個瀏覽器不支援語音朗讀，請改用 Chrome、Edge 或 Safari。'}</div>${sayBtn(test, 'vt', '▶ 試聽')}`}
        <label for="rate">語速 <span id="rv">${s.rate}</span></label>
        <input type="range" id="rate" min="0.4" max="1.2" step="0.05" value="${s.rate}"></div>`;
    },
  ];
  const draw = () => {
    app.innerHTML = `<p class="muted">開始設定 ${step + 1} / ${pages.length}</p>${pages[step]()}
      <div class="row between" style="margin-top:16px">${step ? '<button id="back">上一步</button>' : '<span></span>'}
      <button class="primary" id="go">${step < pages.length - 1 ? '下一步' : '開始第一課'}</button></div>`;
    const back = $('#back'); if (back) back.onclick = () => { TTS.stop(); step--; draw(); };
    $('#go').onclick = () => {
      TTS.stop();
      if (step < pages.length - 1) { step++; draw(); window.scrollTo(0, 0); return; }
      s.onboarded = true; if (!s.daily) s.daily = 60; saveSettings();
      location.hash = '#/'; route();
    };
    $$('[data-min]').forEach((b) => b.onclick = () => { s.daily = Number(b.dataset.min); saveSettings(); draw(); });
    $$('[data-try]').forEach((b) => b.onclick = () => {
      s.voice = b.dataset.try; saveSettings();
      $$('input[name=voice]').forEach((r) => { r.checked = r.value === s.voice; });
      speakEl($('#vt'), test);
    });
    $$('input[name=voice]').forEach((r) => r.onchange = () => { s.voice = r.value; saveSettings(); speakEl($('#vt'), test); });
    const rate = $('#rate'); if (rate) rate.oninput = (e) => { s.rate = Number(e.target.value); $('#rv').textContent = s.rate; saveSettings(); };
  };
  draw();
  if (TTS.ok && !TTS.voices.length) {
    const again = () => { if (step === 2) draw(); };
    speechSynthesis.addEventListener('voiceschanged', again);
    onLeave(() => speechSynthesis.removeEventListener('voiceschanged', again));
  }
}

// ---------- 首頁 ----------
function home() {
  if (!S.settings.onboarded) return start();
  const st = lessonState(), c = lessonContent(st.n), ws = wordStats();
  const doneToday = S.lessonDate === dateStr();
  const done = Math.min(S.lessonN || 0, TOTAL_LESSONS);
  const daily = S.settings.daily || 60;
  const extras = [
    ['#/words', '單字複習', `待複習 ${ws.due} 張`],
    ['#/talk', '會話場景', '自由跟讀任何場景'],
    ['#/listen', '聽力', '辨音與聽寫'],
    ['#/sounds', '發音嘴型', '用看的學發音'],
  ];
  app.innerHTML = `
    <p class="muted">第 ${currentWeek()} 週 · 階段「${currentPhase().name}」· 已完成 ${S.lessonN || 0} 課</p>
    <div class="card">
      ${doneToday ? '<span class="pill ok">✓ 今天的課完成了</span>' : ''}
      <h1 style="margin-top:6px">${doneToday ? '下一課' : '今天的課'}：第 ${st.n} 課</h1>
      <p>${esc(lessonTitle(st.n))}</p>
      <p class="muted">目標：${esc(c.unit.cando)}</p>
      <ol class="steps">${st.types.map((t, k) => `<li class="${k < st.i ? 'done' : ''}">${STEP_INFO[t][0]} <span class="muted">${STEP_INFO[t][1]} 分</span></li>`).join('')}</ol>
      <a class="btn primary big-btn" href="#/lesson">${st.started ? `繼續上課（步驟 ${st.i + 1} / ${st.types.length}）` : doneToday ? '再上一堂' : `開始上課（約 ${lessonMinutes(st.types)} 分鐘）`}</a>
      ${doneToday ? '' : '<p style="text-align:center;margin:10px 0 0"><a href="#/lesson/mini">今天很忙？做 5 分鐘版</a></p>'}
    </div>
    <div class="stats">
      <div class="stat"><b>${streak()}</b><span>連續天數</span></div>
      <div class="stat"><b>${ws.learned}</b><span>已學單字</span></div>
      <div class="stat"><b>${ws.chunks}</b><span>會說的句子</span></div>
    </div>
    <div class="card">
      <div class="row between"><b>第一個里程碑：12 個場景都能對話</b><span class="muted">${done} / ${TOTAL_LESSONS} 課</span></div>
      <div class="bar" style="margin-top:8px"><i style="width:${(done / TOTAL_LESSONS) * 100}%"></i></div>
      <p class="muted" style="margin-bottom:0">每天一課，大約 ${Math.ceil((TOTAL_LESSONS - done) / 6)} 週後完成。<a href="#/plan">看完整路線</a></p>
    </div>
    <h2>${doneToday ? '還有時間？延伸練習' : '自由練習'}</h2>
    ${daily >= 90 ? '<p class="muted">你設定每天 1.5 小時以上。上完課後，建議再看 15 分鐘開英文字幕的短片（例如 BBC Learning English），並每週安排一次視訊對話。</p>' : ''}
    <div class="card list">${extras.map((e) => `<a class="item" href="${e[0]}"><span><b>${e[1]}</b><br><span class="muted">${e[2]}</span></span><span class="muted">›</span></a>`).join('')}</div>
    <div class="note">💡 ${esc(TIPS[dayNum() % TIPS.length])}</div>`;
}

// ---------- 單字與句子複習 ----------
function words() {
  const q = buildQueue();
  const queue = [...q.due, ...q.fresh];
  const had = queue.length;
  const head = `<div class="row between"><h1>複習</h1><a class="btn small" href="#/wordlist">單字表與自訂單字</a></div>`;
  const finish = () => {
    if (had) markTask('words');
    const st = wordStats();
    const more = allWords().filter((w) => !S.cards[w.id]);
    app.innerHTML = `${head}
      <div class="card flash">
        <div class="big">${had ? '🎉 複習完成了' : '目前沒有要複習的卡片'}</div>
        <p class="muted">已學 ${st.learned} / ${st.total} 個單字，其中 ${st.mature} 個已經記熟。會說的句子 ${st.chunks} 句。</p>
        ${more.length ? '<button class="primary" id="more">再學 5 個新字</button>' : '<p>單字庫的字都學過了。到單字表加入你自己遇到的生字吧。</p>'}
      </div>`;
    const b = $('#more');
    if (b) b.onclick = () => {
      const next = more.sort((a, c) => (a.level === 'MY' ? -1 : 0) - (c.level === 'MY' ? -1 : 0)).slice(0, 5);
      app.innerHTML = `${head}<div id="box"></div>`;
      cardRunner($('#box'), next, words);
    };
  };
  if (!had) return finish();
  app.innerHTML = `${head}<div id="box"></div>`;
  cardRunner($('#box'), queue, finish);
}

// ---------- 學習路線 ----------
function plan() {
  const w = currentWeek(), cur = currentPhase();
  const mark = (u) => { const l = S.cando[u.d] || 0; return l >= 3 ? '<span class="pill ok">可以</span>' : l === 2 ? '<span class="pill ok">差不多</span>' : l === 1 ? '<span class="pill">再練</span>' : S.dialogs[u.d] ? '<span class="pill">已上完</span>' : ''; };
  app.innerHTML = `<h1>學習路線</h1>
    <div class="card"><div class="row between"><b>第 ${w} 週 / 52 週</b><span class="muted">開始日 ${S.start}</span></div>
      <div class="bar" style="margin-top:8px"><i style="width:${Math.min(100, (w / 52) * 100)}%"></i></div></div>
    <div class="note"><b>誠實的時間表：</b>依據劍橋的學習時數估計與 IELTS 進步幅度的研究，三個月達到慢速日常對話是做得到的（每天約 1.5 到 2 小時）。一年後的務實落點是 A2+ 到 B1，約 IELTS 4.5 到 5.5。IELTS 8.5 相當於 C2，沒有研究支持從基礎一年內達成，通常需要好幾年。這個 App 把它當方向，用每個階段的小目標帶你往前。</div>
    ${PHASES.map((p, i) => `
      <div class="card phase ${p === cur ? 'current' : ''}">
        <div class="row between"><b>階段 ${i + 1}：${p.name}</b><span class="pill">第 ${p.weeks[0]}–${p.weeks[1]} 週</span></div>
        <p class="muted">${p.cefr}${p === cur ? ' · <b>目前階段</b>' : ''}</p>
        <p>${esc(p.goal)}</p>
        <ul>${p.focus.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
      </div>`).join('')}
    <div class="card"><b>之後：第二年起</b><p class="muted">B2 → C1 → C2</p><p>學術單字、計時模擬考、對照評分標準練寫作和口說。階段目標依序是 IELTS 5.5、6.5、7、8、8.5。</p></div>
    <h2>我可以做到的事</h2>
    <div class="card">${UNITS.map((u, i) => `<div class="task"><div class="grow"><span class="muted">單元 ${i + 1}</span><br>${esc(u.cando)}</div>${mark(u)}</div>`).join('')}</div>
    <h2>App 以外一定要做的事</h2>
    <div class="card"><ul>
      <li><b>找真人對話。</b>第 4 週起每週至少一次，可用語言交換 App 或線上家教。優先選視訊，看得到嘴型，並先說明你的聽力狀況。</li>
      <li><b>看開英文字幕的短片。</b>研究顯示英文字幕對學單字的幫助很大，短的教學片或新聞比電影有效。</li>
      <li><b>從第三階段開始讀分級讀本。</b>邊聽邊讀，生字加進自訂單字。</li>
      <li><b>問聽力師。</b>帶著聽力圖詢問助聽器能不能加強高頻，這會直接影響你聽得到哪些英文音。</li>
      <li><b>考 IELTS 前三個月聯絡考場</b>（British Council 或 IDP）申請聽障考生安排，例如耳機擴音、播放兩次的版本或讀唇版。</li>
    </ul></div>`;
}
