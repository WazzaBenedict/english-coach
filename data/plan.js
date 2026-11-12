// 四階段學習路線與每日任務
const PHASES = [
  {
    name: '生存溝通', weeks: [1, 12], cefr: 'A1 → A2', time: '60–90 分鐘',
    goal: '能自我介紹、點餐、問路、簡單聊天，聽不清楚時知道怎麼請對方配合。',
    focus: ['高頻單字 800 個', '12 個會話場景全部跟讀到熟', '基礎文法 10 課', '高頻子音的嘴型與辨音'],
    tasks: [
      { id: 'words', label: '單字：複習到期卡片並學新字', min: 15, link: '#/words' },
      { id: 'talk', label: '會話：跟讀一個場景，每句至少 3 次', min: 20, link: '#/talk' },
      { id: 'listen', label: '聽力：辨音 10 題加聽寫 5 句', min: 15, link: '#/listen' },
      { id: 'grammar', label: '文法：讀一課並完成測驗', min: 10, link: '#/grammar' },
      { id: 'speak', label: '開口：用今天學的句子對鏡子說 1 分鐘', min: 5, link: '#/talk' },
    ],
  },
  {
    name: '流暢表達', weeks: [13, 26], cefr: 'A2 → B1', time: '90–120 分鐘',
    goal: '能描述經驗、表達意見，和外國人聊 10 分鐘以上。',
    focus: ['單字累積到 2000 個', '每天聽寫', '每週至少一次真人對話（語言交換或線上家教）', '開始讀分級讀本與簡易新聞'],
    tasks: [
      { id: 'words', label: '單字：複習並學新字', min: 20, link: '#/words' },
      { id: 'listen', label: '聽力：聽寫 10 句', min: 20, link: '#/listen' },
      { id: 'talk', label: '會話：不看中文跟讀，再自己改寫句子', min: 20, link: '#/talk' },
      { id: 'read', label: '閱讀：讀一篇短文並記下 5 個生字加入自訂單字', min: 20, link: '#/wordlist' },
      { id: 'speak', label: '口說：回答 2 題 IELTS Part 1 題目', min: 10, link: '#/ielts/speak' },
    ],
  },
  {
    name: '學術入門', weeks: [27, 40], cefr: 'B1 → B2', time: '120 分鐘以上',
    goal: '熟悉 IELTS 四科題型，口說能連續講 2 分鐘，寫作能完成 250 字。',
    focus: ['學術單字', 'IELTS 口說 Part 1 到 3', 'Task 2 寫作結構', '閱讀題型與時間分配'],
    tasks: [
      { id: 'words', label: '單字：複習並學學術單字', min: 20, link: '#/words' },
      { id: 'speak', label: '口說：Part 2 練習一題，講滿 2 分鐘', min: 20, link: '#/ielts/speak' },
      { id: 'write', label: '寫作：寫一段論述或完成一篇 Task 2', min: 40, link: '#/ielts/write' },
      { id: 'listen', label: '聽力：聽寫 10 句（語速調到 1.0）', min: 20, link: '#/listen' },
      { id: 'read', label: '閱讀：做一篇 IELTS 閱讀並檢討', min: 20, link: '#/ielts' },
    ],
  },
  {
    name: '考試衝刺', weeks: [41, 52], cefr: 'B2 以上', time: '120–180 分鐘',
    goal: '每週完整模考，穩定分數，完成弱聽特殊安排申請。',
    focus: ['每週一次完整模考', '錯題檢討', '口說與寫作限時練習', '提前向考場申請特殊安排'],
    tasks: [
      { id: 'words', label: '單字：複習到期卡片', min: 15, link: '#/words' },
      { id: 'write', label: '寫作：限時 40 分鐘完成一篇 Task 2', min: 40, link: '#/ielts/write' },
      { id: 'speak', label: '口說：完整跑一次 Part 1 到 3', min: 20, link: '#/ielts/speak' },
      { id: 'mock', label: '模考：做一科官方模擬題並檢討錯題', min: 60, link: '#/ielts' },
    ],
  },
];

const TIPS = [
  '聽不清楚不是你的錯。先看字、再聽聲音，讓大腦把文字和聲音連起來。',
  '高頻子音（s、sh、f、th）聽不到時，用句子的意思去猜，這是所有人都在用的技巧。',
  '和外國人說話前先講一句：I\'m hard of hearing. Could you speak slowly? 對方幾乎都會配合。',
  '戴耳機或助聽器練習，並把語速調慢。聽懂之後再慢慢加快。',
  '看對方的嘴型很有幫助。視訊通話比純語音電話容易得多。',
  '每天 15 分鐘勝過週末 2 小時。連續天數比單日時數重要。',
  '發音練習時把手放在喉嚨，感覺有沒有震動，就能分辨有聲和無聲子音。',
  '跟讀時不必追求聽清每個音，先模仿節奏和重音，別人就容易聽懂你。',
];
