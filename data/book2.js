// 第二冊：單元 13 到 24（A1 後半到 A2）。
// 內容範圍對照 British Council–EAQUALS Core Inventory 的 A1、A2 功能與文法清單，句子全部自行撰寫。
// 這個檔案把新的會話、單元、文法和單字接到第一冊後面。

// ---------- 會話（每段 9 句，分 3 堂課） ----------
DIALOGUES.push(
  { id: 'd13', title: '家人', tip: '聊家人是最常見的閒聊話題。have got 是英國人說「有」的常用說法。', lines: [
    ['A', 'Have you got any brothers or sisters?', '你有兄弟姊妹嗎？'],
    ['B', 'Yes, I\'ve got one sister. She\'s a nurse.', '有，我有一個姊姊。她是護理師。'],
    ['B', 'She works in a hospital.', '她在醫院工作。'],
    ['A', 'Are you married?', '你結婚了嗎？'],
    ['B', 'No, I\'m not. I live with my parents.', '沒有。我和爸媽住在一起。'],
    ['A', 'Is this your family in the photo?', '照片裡是你的家人嗎？'],
    ['B', 'Yes. This is my mother, and that\'s my father.', '對。這是我媽媽，那是我爸爸。'],
    ['A', 'Who are the children?', '這些小孩是誰？'],
    ['B', 'They\'re my sister\'s children.', '他們是我姊姊的孩子。'],
  ]},
  { id: 'd14', title: '每天的作息', tip: '時間的說法要多練：half past six 是六點半，quarter past 是十五分，quarter to 是差十五分。', lines: [
    ['A', 'What time do you get up?', '你幾點起床？'],
    ['B', 'I usually get up at half past six.', '我通常六點半起床。'],
    ['A', 'That\'s early! When do you start work?', '好早！你幾點開始上班？'],
    ['B', 'I start at nine and finish at six.', '我九點開始，六點下班。'],
    ['A', 'What do you do in the evening?', '你晚上做什麼？'],
    ['B', 'I have dinner at home. Then I study English.', '我在家吃晚餐。然後讀英文。'],
    ['A', 'Do you ever go out on weekdays?', '你平日會出門嗎？'],
    ['B', 'Not often. I sometimes go to the gym on Fridays.', '不常。我星期五有時候去健身房。'],
    ['B', 'I always go to bed before midnight.', '我總是在午夜前上床睡覺。'],
  ]},
  { id: 'd15', title: '數字、價錢與日期', tip: 'fifteen 和 fifty 很容易聽錯。聽不清楚就請對方一個數字一個數字說：One five, or five zero?', lines: [
    ['B', 'Excuse me, how much is a ticket to Oxford?', '請問，到牛津的車票多少錢？'],
    ['A', 'A single is fifteen pounds fifty.', '單程票是十五鎊五十。'],
    ['B', 'Sorry, did you say fifteen or fifty?', '抱歉，你是說十五還是五十？'],
    ['A', 'Fifteen. One, five. Fifteen pounds fifty.', '十五。一、五。十五鎊五十。'],
    ['B', 'Thank you. What time is the next train?', '謝謝。下一班火車是幾點？'],
    ['A', 'It leaves at quarter past three, from platform two.', '三點十五分開，在第二月台。'],
    ['B', 'Can I have two tickets for the thirtieth of June, please?', '請給我兩張六月三十日的票。'],
    ['A', 'That\'s thirty-one pounds altogether.', '總共三十一鎊。'],
    ['B', 'Here you are. Could I have a receipt, please?', '給你。可以給我收據嗎？'],
  ]},
  { id: 'd16', title: '我的家與附近', tip: 'there is 接單數，there are 接複數。英國說 flat（公寓）和 lift（電梯）。', lines: [
    ['A', 'Where do you live?', '你住在哪裡？'],
    ['B', 'I live in a small flat near the station.', '我住在車站附近的一間小公寓。'],
    ['A', 'Is there a supermarket near your flat?', '你的公寓附近有超市嗎？'],
    ['B', 'Yes, there\'s one opposite my building.', '有，我那棟樓對面有一間。'],
    ['A', 'How many rooms are there?', '有幾個房間？'],
    ['B', 'There are two bedrooms and a small kitchen.', '有兩間臥室和一間小廚房。'],
    ['A', 'Is it quiet?', '安靜嗎？'],
    ['B', 'Yes, it is. There aren\'t any noisy neighbours.', '很安靜。沒有吵鬧的鄰居。'],
    ['B', 'But there isn\'t a lift, so I use the stairs.', '但是沒有電梯，所以我走樓梯。'],
  ]},
  { id: 'd17', title: '上個週末', tip: '過去式的 -ed 字尾很輕，常常聽不到。看到 yesterday、last 這類字，動詞就是過去式。', lines: [
    ['A', 'How was your weekend?', '你的週末過得如何？'],
    ['B', 'It was great, thanks. I visited my grandparents.', '很棒，謝謝。我去看了我的祖父母。'],
    ['A', 'Lovely. What did you do there?', '真好。你們在那裡做了什麼？'],
    ['B', 'We cooked lunch together and talked a lot.', '我們一起煮午餐，聊了很多。'],
    ['A', 'Did you go out on Sunday?', '你星期天有出門嗎？'],
    ['B', 'No, I didn\'t. I stayed at home and watched a film.', '沒有。我待在家看了一部電影。'],
    ['A', 'Was it good?', '好看嗎？'],
    ['B', 'Yes, it was. I turned on the subtitles.', '好看。我開了字幕。'],
    ['B', 'What about you? What did you do?', '你呢？你做了什麼？'],
  ]},
  { id: 'd18', title: '假期回憶', tip: '說故事時用 first、then、finally 排順序，對方比較容易跟上。', lines: [
    ['A', 'Did you go anywhere last summer?', '你去年夏天有去哪裡嗎？'],
    ['B', 'Yes, I went to Japan for a week.', '有，我去了日本一個星期。'],
    ['A', 'How did you get there?', '你怎麼去的？'],
    ['B', 'I flew from Taipei. It took three hours.', '我從台北搭飛機。花了三個小時。'],
    ['A', 'What was the weather like?', '天氣怎麼樣？'],
    ['B', 'It was hot, but it didn\'t rain.', '很熱，但是沒有下雨。'],
    ['A', 'What did you do?', '你做了什麼？'],
    ['B', 'First we visited Tokyo. Then we took a train to Kyoto.', '我們先去了東京。然後搭火車到京都。'],
    ['B', 'Finally, we bought some presents for my family.', '最後，我們買了一些禮物給我的家人。'],
  ]},
  { id: 'd19', title: '計畫與邀請', tip: '受邀時說 I\'d love to. 不能去就說 I\'m afraid I can\'t. 地址和時間請對方傳訊息最保險。', lines: [
    ['A', 'What are you going to do this weekend?', '你這個週末打算做什麼？'],
    ['B', 'I\'m going to have a rest. I\'m not going to work.', '我打算休息。我不打算工作。'],
    ['A', 'We\'re having a barbecue on Saturday. Would you like to come?', '我們星期六要烤肉。你想來嗎？'],
    ['B', 'I\'d love to. What time does it start?', '我很樂意。幾點開始？'],
    ['A', 'About two o\'clock, at my house.', '大約兩點，在我家。'],
    ['B', 'Great. Shall I bring something?', '太好了。我要帶點什麼嗎？'],
    ['A', 'Just a drink. Is your sister free too?', '帶飲料就好。你姊姊也有空嗎？'],
    ['B', 'I\'m afraid she can\'t come. She\'s working on Saturday.', '她恐怕不能來。她星期六要上班。'],
    ['B', 'Could you send me the address by message?', '可以傳訊息告訴我地址嗎？'],
  ]},
  { id: 'd20', title: '描述人與比較', tip: 'What\'s she like? 問個性，What does she look like? 問長相，兩句很像但意思不同。', lines: [
    ['A', 'What\'s your new manager like?', '你的新主管是怎樣的人？'],
    ['B', 'She\'s really friendly, and she\'s very patient.', '她真的很友善，而且很有耐心。'],
    ['A', 'What does she look like?', '她長什麼樣子？'],
    ['B', 'She\'s tall, and she\'s got short dark hair.', '她很高，留著深色短髮。'],
    ['A', 'Is she older than you?', '她年紀比你大嗎？'],
    ['B', 'No, she\'s a bit younger than me.', '不，她比我年輕一點。'],
    ['A', 'Is this job better than your old one?', '這份工作比你以前的好嗎？'],
    ['B', 'Yes, it\'s more interesting, and the office is quieter.', '是的，比較有趣，辦公室也比較安靜。'],
    ['B', 'My old office was the noisiest place in the world!', '我以前的辦公室是全世界最吵的地方！'],
  ]},
  { id: 'd21', title: '建議與幫忙', tip: '給建議用 Why don\'t you…? 或 You should…。主動幫忙用 Shall I…?', lines: [
    ['B', 'I\'ve got a problem. I can\'t hear people on the phone.', '我有個問題。我在電話上聽不清楚別人說話。'],
    ['A', 'Why don\'t you use video calls?', '你何不用視訊通話？'],
    ['B', 'That\'s a good idea. I can see people\'s faces.', '好主意。我看得到對方的臉。'],
    ['A', 'You should turn on the captions as well.', '你也應該打開字幕。'],
    ['B', 'Could you show me how to do that?', '你可以教我怎麼做嗎？'],
    ['A', 'Sure. Shall I set it up for you now?', '當然。要我現在幫你設定嗎？'],
    ['B', 'Yes, please. That\'s very kind of you.', '好，麻煩你。你人真好。'],
    ['A', 'No problem. Do you have to phone the bank today?', '沒問題。你今天一定要打電話給銀行嗎？'],
    ['B', 'No, I don\'t have to. I\'ll send them an email instead.', '不用。我改寄電子郵件給他們。'],
  ]},
  { id: 'd22', title: '電話與視訊', tip: '電話最難聽清楚。可以直接請對方改用視訊或傳訊息，最後重複一次重點來確認。', lines: [
    ['A', 'Hello, this is Tom from the language school.', '你好，我是語言學校的 Tom。'],
    ['B', 'Hello. I\'m sorry, I can\'t hear you very well.', '你好。抱歉，我聽不太清楚。'],
    ['B', 'Could we do a video call instead?', '我們可以改用視訊通話嗎？'],
    ['A', 'Of course. I\'m calling about your lesson on Monday.', '當然。我打來是要談你星期一的課。'],
    ['B', 'Just a moment, please. I\'m turning on the captions.', '請等一下。我正在打開字幕。'],
    ['A', 'The lesson is now at four, not three.', '課現在改到四點，不是三點。'],
    ['B', 'So the new time is four o\'clock on Monday. Is that right?', '所以新的時間是星期一四點。對嗎？'],
    ['A', 'Yes, that\'s right.', '對，沒錯。'],
    ['B', 'Could you send me a message to confirm?', '可以傳訊息跟我確認嗎？'],
  ]},
  { id: 'd23', title: '聊經驗', tip: 'Have you ever…? 問「有沒有過」的經驗。回答 Yes, I have. 或 No, I haven\'t.', lines: [
    ['A', 'Have you ever been to England?', '你去過英格蘭嗎？'],
    ['B', 'No, I haven\'t, but I\'ve always wanted to go.', '沒有，但是我一直很想去。'],
    ['A', 'Have you tried English food?', '你吃過英國食物嗎？'],
    ['B', 'Yes, I have. I\'ve had fish and chips twice.', '吃過。我吃過兩次炸魚薯條。'],
    ['A', 'How long have you studied English?', '你學英文多久了？'],
    ['B', 'I\'ve studied for six months.', '我學了六個月。'],
    ['A', 'Really? You\'ve learnt a lot!', '真的嗎？你學了好多！'],
    ['B', 'Thanks. I\'ve never spoken to so many people before.', '謝謝。我以前從來沒有和這麼多人說過話。'],
    ['B', 'I went to a language café last week, and I loved it.', '我上星期去了語言交換咖啡館，我很喜歡。'],
  ]},
  { id: 'd24', title: '把話聊下去', tip: '聊天靠的是短短的固定用語：Really? I think… What do you think? as well、at the moment。整句背起來用。', lines: [
    ['A', 'Hi! We met at the language café, didn\'t we?', '嗨！我們在語言交換咖啡館見過，對吧？'],
    ['B', 'Yes, that\'s right. How are things?', '對，沒錯。最近怎麼樣？'],
    ['A', 'Not bad, thanks. I\'m a bit busy at the moment.', '還不錯，謝謝。我最近有點忙。'],
    ['B', 'Really? What are you working on?', '真的嗎？你在忙什麼？'],
    ['A', 'A new project. What do you think of the café?', '一個新專案。你覺得那家咖啡館怎麼樣？'],
    ['B', 'I think it\'s great. I like the people as well.', '我覺得很棒。我也喜歡那裡的人。'],
    ['A', 'Me too. Are you coming next week?', '我也是。你下星期會來嗎？'],
    ['B', 'I don\'t know yet. I\'ll have a look at my diary.', '我還不知道。我看一下我的行事曆。'],
    ['B', 'Anyway, it was nice talking to you. See you soon!', '總之，很高興和你聊天。再見！'],
  ]},
);

// ---------- 文法（g11 到 g15） ----------
GRAMMAR.push(
  { id: 'g11', title: '所有格與 have got', points: [
    '「誰的」用 my / your / his / her / our / their 加名詞：my sister、her job。',
    '人名或名詞後面加 \'s 也表示「誰的」：my sister\'s children（我姊姊的孩子）。',
    '英國人常用 have got 說「有」：I\'ve got a brother. 第三人稱用 has got：She\'s got two children.',
    '\'s 有三種意思：所有格（Tom\'s car）、is（She\'s a nurse）、has（She\'s got a car）。這個音很輕，用前後的字判斷。',
  ], examples: [['I\'ve got one sister.', '我有一個姊姊。'], ['This is my mother\'s phone.', '這是我媽媽的手機。'], ['Have you got any children?', '你有小孩嗎？']],
    quiz: [
      { q: 'She ___ got two brothers.', opts: ['have', 'has', 'is'], a: 1, why: '主詞是 she，用 has got。' },
      { q: 'This is my ___ car.', opts: ['father', 'father\'s', 'fathers'], a: 1, why: '「爸爸的」要加 \'s。' },
      { q: '___ you got a pen?', opts: ['Have', 'Do', 'Are'], a: 0, why: 'have got 的問句把 have 放到句首。' },
      { q: 'They live with ___ parents.', opts: ['they', 'them', 'their'], a: 2, why: '名詞前面用所有格 their。' },
    ] },
  { id: 'g12', title: '頻率副詞與時間的說法', points: [
    '頻率由高到低：always（總是）、usually（通常）、often（常常）、sometimes（有時）、never（從不）。',
    '頻率副詞放在一般動詞前面、be 動詞後面：I usually get up at six. She is always late.',
    '時間：half past six（6:30）、quarter past three（3:15）、quarter to nine（8:45）、ten to eight（7:50）。',
    '聽時間時先抓 past（過了）或 to（差幾分），再抓數字。聽不清楚就說：Sorry, what time?',
  ], examples: [['I usually get up at half past six.', '我通常六點半起床。'], ['He never drinks coffee.', '他從不喝咖啡。'], ['The train leaves at quarter to nine.', '火車八點四十五分開。']],
    quiz: [
      { q: 'I ___ go to bed before midnight.', opts: ['always', 'am always', 'always am'], a: 0, why: '頻率副詞放在一般動詞 go 前面。' },
      { q: 'She ___ late.', opts: ['never is', 'is never', 'never'], a: 1, why: '頻率副詞放在 be 動詞後面。' },
      { q: 'quarter past three 是幾點？', opts: ['2:45', '3:15', '3:30'], a: 1, why: 'quarter 是十五分，past 是過了。' },
      { q: 'ten to eight 是幾點？', opts: ['7:50', '8:10', '10:08'], a: 0, why: 'to 是「差幾分到」，差十分八點就是 7:50。' },
    ] },
  { id: 'g13', title: 'there is / there are 與 how much / how many', points: [
    '說「有」某個東西存在：單數用 there is（there\'s），複數用 there are。',
    '否定：there isn\'t a… / there aren\'t any…。問句：Is there a…? / Are there any…?',
    '可以數的東西問數量用 How many：How many rooms are there?',
    '問價錢或不可數的東西用 How much：How much is it? How much water do you need?',
  ], examples: [['There\'s a bank near the station.', '車站附近有一間銀行。'], ['There aren\'t any shops here.', '這裡沒有商店。'], ['How much is a ticket?', '一張票多少錢？']],
    quiz: [
      { q: 'There ___ two bedrooms.', opts: ['is', 'are', 'have'], a: 1, why: 'two bedrooms 是複數，用 are。' },
      { q: '___ there a lift?', opts: ['Is', 'Are', 'Has'], a: 0, why: 'a lift 是單數，問句用 Is there。' },
      { q: 'How ___ people are there?', opts: ['much', 'many', 'long'], a: 1, why: 'people 可以數，用 many。' },
      { q: 'How ___ is this coat?', opts: ['much', 'many', 'old'], a: 0, why: '問價錢用 How much。' },
    ] },
  { id: 'g14', title: '建議、提議與必須', points: [
    '給建議：You should…（你應該…）、Why don\'t you…?（你何不…）。',
    '主動幫忙：Shall I…?（要我…嗎？）。一起做某事：Shall we…? / Why don\'t we…?',
    '必須做：have to。不必做：don\'t have to。第三人稱用 has to / doesn\'t have to。',
    'should 和 have to 後面都接原形動詞：You should rest. I have to go.',
  ], examples: [['You should turn on the captions.', '你應該打開字幕。'], ['Shall I write it down?', '要我寫下來嗎？'], ['I don\'t have to work tomorrow.', '我明天不用上班。']],
    quiz: [
      { q: 'You ___ see a doctor.', opts: ['should', 'should to', 'shoulds'], a: 0, why: 'should 後面直接接原形動詞。' },
      { q: 'Why don\'t you ___ a video call?', opts: ['using', 'use', 'to use'], a: 1, why: 'Why don\'t you 後面接原形動詞。' },
      { q: 'She ___ to get up early.', opts: ['have', 'has', 'is'], a: 1, why: '主詞是 she，用 has to。' },
      { q: '___ I open the window?', opts: ['Shall', 'Do', 'Am'], a: 0, why: '主動提議幫忙用 Shall I…?' },
    ] },
  { id: 'g15', title: '連接詞與說故事的順序', points: [
    'and（而且）、but（但是）、because（因為）、so（所以）把兩個短句接成一句。',
    '說一連串的事：First…（首先）、Then…（然後）、After that…（之後）、Finally…（最後）。',
    '過去式的問句和否定句用 did / didn\'t，後面的動詞回到原形：Did you go? I didn\'t go.',
    '常用的不規則過去式：go → went、take → took、buy → bought、fly → flew、have → had、see → saw。',
  ], examples: [['It was hot, but it didn\'t rain.', '很熱，但是沒有下雨。'], ['First we visited Tokyo. Then we took a train.', '我們先去了東京。然後搭火車。'], ['I stayed at home because I was tired.', '我待在家，因為我很累。']],
    quiz: [
      { q: 'I was tired, ___ I went to bed early.', opts: ['but', 'so', 'because'], a: 1, why: '「所以」用 so。' },
      { q: 'Did you ___ to Japan?', opts: ['went', 'go', 'going'], a: 1, why: 'did 後面的動詞用原形。' },
      { q: 'We ___ some presents yesterday.', opts: ['buy', 'buyed', 'bought'], a: 2, why: 'buy 的過去式是 bought。' },
      { q: 'I like tea, ___ I don\'t like coffee.', opts: ['but', 'so', 'because'], a: 0, why: '前後意思相反，用 but。' },
    ] },
);

// ---------- 單元 13 到 24 ----------
UNITS.push(
  { d: 'd13', grammar: 'g11', cando: '我可以介紹我的家人，並問對方的家庭狀況。',
    gist: { q: '他們在聊什麼？', opts: ['工作', '家人', '天氣'], a: 1 },
    frames: [
      { en: 'I\'ve got ___.', zh: '我有＿。', opts: [['one sister', '一個姊妹'], ['two brothers', '兩個兄弟'], ['a big family', '一個大家庭']] },
      { en: 'My ___ works in a hospital.', zh: '我的＿在醫院工作。', opts: [['sister', '姊妹'], ['father', '爸爸'], ['friend', '朋友']] },
      { en: 'I live with my ___.', zh: '我和我的＿住在一起。', opts: [['parents', '爸媽'], ['family', '家人'], ['husband', '先生'], ['wife', '太太']] },
    ],
    read: { title: 'My family', text: [
      ['I\'ve got a small family.', '我的家庭很小。'],
      ['My father is a driver, and my mother is a teacher.', '我爸爸是司機，我媽媽是老師。'],
      ['I\'ve got one sister, but I haven\'t got any brothers.', '我有一個姊姊，但是沒有兄弟。'],
      ['My sister\'s name is Emma.', '我姊姊的名字是 Emma。'],
      ['She has got two children.', '她有兩個小孩。'],
      ['We have dinner together every Sunday.', '我們每個星期天一起吃晚餐。'],
    ], qs: [{ q: '作者有一個兄弟。', a: false }, { q: 'Emma 有兩個小孩。', a: true }] } },

  { d: 'd14', grammar: 'g12', cando: '我可以說出每天的作息，並說出和聽懂時間。',
    gist: { q: 'B 晚上通常做什麼？', opts: ['去健身房', '在家吃晚餐、讀英文', '上班'], a: 1 },
    frames: [
      { en: 'I usually get up at ___.', zh: '我通常＿起床。', opts: [['half past six', '六點半'], ['seven o\'clock', '七點'], ['quarter to eight', '七點四十五分']] },
      { en: 'I ___ go to the gym.', zh: '我＿去健身房。', opts: [['always', '總是'], ['sometimes', '有時候'], ['never', '從不']] },
      { en: 'In the evening, I ___.', zh: '晚上我＿。', opts: [['study English', '讀英文'], ['watch TV', '看電視'], ['cook dinner', '煮晚餐']] },
    ],
    read: { title: 'A normal day', text: [
      ['Emma gets up at seven o\'clock.', 'Emma 七點起床。'],
      ['She always has breakfast at home.', '她總是在家吃早餐。'],
      ['She starts work at half past eight.', '她八點半開始上班。'],
      ['She usually has lunch with her friends.', '她通常和朋友一起吃午餐。'],
      ['After work, she sometimes goes to the gym.', '下班後，她有時候去健身房。'],
      ['She never goes to bed late.', '她從不晚睡。'],
    ], qs: [{ q: 'Emma 八點半開始上班。', a: true }, { q: 'Emma 常常很晚睡。', a: false }] } },

  { d: 'd15', grammar: 'g8', cando: '我可以問價錢、時間和日期，聽不清楚數字時會確認。',
    gist: { q: 'B 在做什麼？', opts: ['買火車票', '訂飯店', '點餐'], a: 0 },
    frames: [
      { en: 'How much is ___?', zh: '＿多少錢？', opts: [['a ticket to Oxford', '到牛津的票'], ['this coat', '這件外套'], ['a cup of tea', '一杯茶']] },
      { en: 'Did you say ___?', zh: '你是說＿嗎？', opts: [['fifteen or fifty', '十五還是五十'], ['thirteen or thirty', '十三還是三十'], ['platform two or ten', '第二還是第十月台']] },
      { en: 'The train leaves at ___.', zh: '火車＿開。', opts: [['quarter past three', '三點十五分'], ['half past ten', '十點半'], ['ten to six', '五點五十分']] },
    ],
    read: { title: 'At the station', text: [
      ['The train to Oxford leaves at ten past two.', '到牛津的火車兩點十分開。'],
      ['A single ticket is fifteen pounds.', '單程票十五鎊。'],
      ['A return ticket is twenty-four pounds.', '來回票二十四鎊。'],
      ['The train leaves from platform four.', '火車從第四月台出發。'],
      ['It arrives in Oxford at three o\'clock.', '三點到牛津。'],
      ['There is another train at half past two.', '兩點半還有一班車。'],
    ], qs: [{ q: '來回票是十五鎊。', a: false }, { q: '火車從第四月台出發。', a: true }] } },

  { d: 'd16', grammar: 'g13', cando: '我可以描述我住的地方和附近有什麼。',
    gist: { q: 'B 住的地方怎麼樣？', opts: ['又大又吵', '小而安靜', '離車站很遠'], a: 1 },
    frames: [
      { en: 'I live in ___.', zh: '我住在＿。', opts: [['a small flat', '一間小公寓'], ['a house', '一棟房子'], ['the city centre', '市中心']] },
      { en: 'There\'s a ___ near my home.', zh: '我家附近有一間＿。', opts: [['supermarket', '超市'], ['park', '公園'], ['bank', '銀行'], ['café', '咖啡館']] },
      { en: 'There isn\'t a ___.', zh: '沒有＿。', opts: [['lift', '電梯'], ['garden', '花園'], ['car park', '停車場']] },
    ],
    read: { title: 'My street', text: [
      ['I live on a quiet street.', '我住在一條安靜的街上。'],
      ['There is a park opposite my flat.', '我的公寓對面有一座公園。'],
      ['There are two cafés and a small supermarket.', '有兩間咖啡館和一間小超市。'],
      ['The station is ten minutes from my home.', '車站離我家十分鐘。'],
      ['There aren\'t any big shops here.', '這裡沒有大商店。'],
      ['I like my street because it is quiet.', '我喜歡我住的街，因為很安靜。'],
    ], qs: [{ q: '公寓對面有一座公園。', a: true }, { q: '這條街上有很多大商店。', a: false }] } },

  { d: 'd17', grammar: 'g4', cando: '我可以說出上個週末做了什麼，並問對方。',
    gist: { q: 'B 星期天做了什麼？', opts: ['去上班', '待在家看電影', '去旅行'], a: 1 },
    frames: [
      { en: 'Last weekend, I ___.', zh: '上個週末，我＿。', opts: [['visited my family', '去看了家人'], ['stayed at home', '待在家'], ['watched a film', '看了一部電影'], ['cooked dinner', '煮了晚餐']] },
      { en: 'It was ___.', zh: '那＿。', opts: [['great', '很棒'], ['boring', '很無聊'], ['very busy', '很忙']] },
      { en: 'Did you ___ on Sunday?', zh: '你星期天有＿嗎？', opts: [['go out', '出門'], ['work', '工作'], ['study', '讀書']] },
    ],
    read: { title: 'A quiet Sunday', text: [
      ['Last Sunday, I stayed at home.', '上星期天，我待在家。'],
      ['In the morning, I cleaned my flat.', '早上，我打掃了公寓。'],
      ['Then I cooked lunch and called my mother.', '然後我煮了午餐，打電話給媽媽。'],
      ['We talked for an hour.', '我們聊了一個小時。'],
      ['In the evening, I watched a film with subtitles.', '晚上，我看了一部有字幕的電影。'],
      ['I didn\'t go out, but I enjoyed the day.', '我沒有出門，但是那天過得很開心。'],
    ], qs: [{ q: '作者星期天出門了。', a: false }, { q: '作者和媽媽聊了一個小時。', a: true }] } },

  { d: 'd18', grammar: 'g15', cando: '我可以照順序說出一次旅行或假期的經過。',
    gist: { q: 'B 去年夏天去了哪裡？', opts: ['英格蘭', '日本', '沒有出門'], a: 1 },
    frames: [
      { en: 'I went to ___ last year.', zh: '我去年去了＿。', opts: [['Japan', '日本'], ['Korea', '韓國'], ['the beach', '海邊']] },
      { en: 'I went there by ___.', zh: '我搭＿去的。', opts: [['plane', '飛機'], ['train', '火車'], ['bus', '公車']] },
      { en: 'First we ___.', zh: '我們先＿。', opts: [['visited a museum', '參觀了博物館'], ['had lunch', '吃了午餐'], ['went shopping', '去買了東西']] },
    ],
    read: { title: 'My trip', text: [
      ['Last year, I went to London with a friend.', '去年，我和朋友去了倫敦。'],
      ['We flew from Taipei, and it took a long time.', '我們從台北搭飛機，花了很久的時間。'],
      ['First we visited a famous museum.', '我們先參觀了一間有名的博物館。'],
      ['Then we had fish and chips near the river.', '然後我們在河邊吃了炸魚薯條。'],
      ['It rained every day, but we didn\'t mind.', '每天都下雨，但是我們不在意。'],
      ['Finally, we bought presents and flew home.', '最後，我們買了禮物，搭飛機回家。'],
    ], qs: [{ q: '他們先去了博物館。', a: true }, { q: '那幾天天氣很好，沒有下雨。', a: false }] } },

  { d: 'd19', grammar: 'g5', cando: '我可以說出我的計畫，並邀請別人、接受或婉拒邀請。',
    gist: { q: 'A 邀請 B 做什麼？', opts: ['去烤肉', '去上班', '去看醫生'], a: 0 },
    frames: [
      { en: 'I\'m going to ___ this weekend.', zh: '我這個週末打算＿。', opts: [['have a rest', '休息'], ['visit my parents', '去看爸媽'], ['study English', '讀英文']] },
      { en: 'Would you like to ___?', zh: '你想＿嗎？', opts: [['come', '來'], ['have dinner with us', '和我們吃晚餐'], ['go for a coffee', '去喝杯咖啡']] },
      { en: 'I\'m afraid I can\'t. I\'m ___ on Saturday.', zh: '恐怕不行。我星期六＿。', opts: [['working', '要上班'], ['busy', '很忙'], ['away', '不在']] },
    ],
    read: { title: 'Weekend plans', text: [
      ['This weekend is going to be busy.', '這個週末會很忙。'],
      ['On Saturday, I\'m going to a barbecue at Tom\'s house.', '星期六，我要去 Tom 家烤肉。'],
      ['I\'m going to bring some drinks.', '我打算帶一些飲料。'],
      ['My sister isn\'t going to come because she is working.', '我姊姊不會來，因為她要上班。'],
      ['On Sunday, I\'m going to study English in the morning.', '星期天早上，我打算讀英文。'],
      ['Then I\'m going to have a rest.', '然後我打算休息。'],
    ], qs: [{ q: '作者的姊姊會一起去烤肉。', a: false }, { q: '作者星期天早上打算讀英文。', a: true }] } },

  { d: 'd20', grammar: 'g9', cando: '我可以描述一個人的個性和外表，並做簡單的比較。',
    gist: { q: 'B 覺得新主管怎麼樣？', opts: ['很兇', '友善又有耐心', '不認識'], a: 1 },
    frames: [
      { en: 'She\'s really ___.', zh: '她真的很＿。', opts: [['friendly', '友善'], ['patient', '有耐心'], ['funny', '風趣'], ['quiet', '安靜']] },
      { en: 'He\'s got ___ hair.', zh: '他留著＿頭髮。', opts: [['short dark', '深色短'], ['long', '長'], ['grey', '灰白']] },
      { en: 'This one is ___ than that one.', zh: '這個比那個＿。', opts: [['better', '好'], ['cheaper', '便宜'], ['more interesting', '有趣'], ['quieter', '安靜']] },
    ],
    read: { title: 'My best friend', text: [
      ['My best friend is called David.', '我最好的朋友叫 David。'],
      ['He is taller than me, and he has got short hair.', '他比我高，留著短髮。'],
      ['He is the funniest person in our office.', '他是我們辦公室最風趣的人。'],
      ['He is also very patient.', '他也很有耐心。'],
      ['He always faces me when he talks.', '他說話時總是面對著我。'],
      ['That makes our conversations much easier.', '這讓我們的對話容易多了。'],
    ], qs: [{ q: 'David 比作者矮。', a: false }, { q: 'David 說話時會面對作者。', a: true }] } },

  { d: 'd21', grammar: 'g14', cando: '我可以說出我的困難、請人幫忙，並給別人簡單的建議。',
    gist: { q: 'A 建議 B 怎麼做？', opts: ['不要打電話', '改用視訊並打開字幕', '換一支手機'], a: 1 },
    frames: [
      { en: 'Why don\'t you ___?', zh: '你何不＿？', opts: [['use video calls', '用視訊通話'], ['send an email', '寄電子郵件'], ['ask your teacher', '問你的老師']] },
      { en: 'You should ___.', zh: '你應該＿。', opts: [['turn on the captions', '打開字幕'], ['have a rest', '休息一下'], ['see a doctor', '去看醫生']] },
      { en: 'Shall I ___?', zh: '要我＿嗎？', opts: [['write it down', '寫下來'], ['help you', '幫你'], ['say it again', '再說一次']] },
    ],
    read: { title: 'Good advice', text: [
      ['I can\'t hear well on the phone.', '我在電話上聽不清楚。'],
      ['My friend said, "Why don\'t you use video calls?"', '我朋友說：「你何不用視訊通話？」'],
      ['Now I can see people\'s faces.', '現在我看得到對方的臉。'],
      ['I also turn on the captions.', '我也會打開字幕。'],
      ['I don\'t have to guess the words any more.', '我不用再猜對方說了什麼。'],
      ['You should ask for help when you need it.', '需要的時候就應該開口請人幫忙。'],
    ], qs: [{ q: '朋友建議作者用視訊通話。', a: true }, { q: '作者現在還是要猜對方說的話。', a: false }] } },

  { d: 'd22', grammar: 'g3', cando: '我可以在電話上請對方改用視訊或訊息，並重複重點來確認。',
    gist: { q: '這通電話的重點是什麼？', opts: ['上課時間改了', '學費漲價了', '老師換人了'], a: 0 },
    frames: [
      { en: 'Could we ___ instead?', zh: '我們可以改成＿嗎？', opts: [['do a video call', '視訊通話'], ['use messages', '傳訊息'], ['meet in person', '當面談']] },
      { en: 'I\'m calling about ___.', zh: '我打來是要談＿。', opts: [['my lesson', '我的課'], ['my appointment', '我的預約'], ['my order', '我的訂單']] },
      { en: 'So the new time is ___. Is that right?', zh: '所以新的時間是＿。對嗎？', opts: [['four o\'clock on Monday', '星期一四點'], ['half past two', '兩點半'], ['Friday morning', '星期五早上']] },
    ],
    read: { title: 'Phone calls', text: [
      ['Phone calls are difficult for me.', '打電話對我來說很難。'],
      ['I can\'t see the person\'s face.', '我看不到對方的臉。'],
      ['So I usually ask for a video call.', '所以我通常會請對方改用視訊。'],
      ['I am turning on the captions more often now.', '我現在更常打開字幕。'],
      ['At the end, I repeat the important information.', '最後，我會重複一次重要的資訊。'],
      ['Then I ask the person to send a message.', '然後請對方傳訊息給我。'],
    ], qs: [{ q: '作者覺得打電話很容易。', a: false }, { q: '作者最後會重複重要的資訊。', a: true }] } },

  { d: 'd23', grammar: 'g10', cando: '我可以問別人有沒有做過某件事，並說出自己的經驗。',
    gist: { q: 'B 去過英格蘭嗎？', opts: ['去過兩次', '沒去過，但很想去', '住在那裡'], a: 1 },
    frames: [
      { en: 'Have you ever ___?', zh: '你有沒有＿過？', opts: [['been to England', '去英格蘭'], ['tried English food', '吃英國食物'], ['seen snow', '看雪']] },
      { en: 'I\'ve never ___.', zh: '我從來沒有＿。', opts: [['been abroad', '出過國'], ['eaten that', '吃過那個'], ['done that before', '做過那件事']] },
      { en: 'I\'ve studied English for ___.', zh: '我學英文學了＿。', opts: [['six months', '六個月'], ['three weeks', '三個星期'], ['a year', '一年']] },
    ],
    read: { title: 'New experiences', text: [
      ['I have studied English for six months.', '我學英文六個月了。'],
      ['I have learnt a lot of new words.', '我學了很多新單字。'],
      ['I have never been to England, but I want to go.', '我從來沒去過英格蘭，但是我想去。'],
      ['Last week, I went to a language café for the first time.', '上星期，我第一次去語言交換咖啡館。'],
      ['I spoke to three people in English.', '我用英文和三個人說了話。'],
      ['I have never felt so happy about my English.', '我從來沒有對自己的英文這麼開心過。'],
    ], qs: [{ q: '作者去過英格蘭。', a: false }, { q: '作者上星期用英文和三個人說了話。', a: true }] } },

  { d: 'd24', grammar: 'g7', cando: '我可以開始一段閒聊、用問題把話接下去，並有禮貌地結束。',
    gist: { q: '這兩個人是什麼關係？', opts: ['第一次見面', '之前見過面', '家人'], a: 1 },
    frames: [
      { en: 'I\'m a bit ___ at the moment.', zh: '我最近有點＿。', opts: [['busy', '忙'], ['tired', '累'], ['worried', '擔心']] },
      { en: 'What do you think of ___?', zh: '你覺得＿怎麼樣？', opts: [['the café', '那家咖啡館'], ['this film', '這部電影'], ['your new job', '你的新工作']] },
      { en: 'I think it\'s ___.', zh: '我覺得它＿。', opts: [['great', '很棒'], ['a bit expensive', '有點貴'], ['very interesting', '很有趣']] },
    ],
    read: { title: 'Small talk', text: [
      ['Small talk was very difficult for me.', '閒聊以前對我來說很難。'],
      ['Now I use a few easy questions.', '現在我會用幾個簡單的問題。'],
      ['I ask, "How are things?" or "What do you think?"', '我會問「最近怎麼樣？」或「你覺得呢？」'],
      ['When I don\'t understand, I say, "Sorry?"', '聽不懂的時候，我會說「Sorry?」'],
      ['People are usually kind, and they say it again.', '大家通常很友善，會再說一次。'],
      ['At the end, I say, "It was nice talking to you."', '最後，我會說「很高興和你聊天」。'],
    ], qs: [{ q: '作者聽不懂時會說 "Sorry?"', a: true }, { q: '作者覺得大家通常不願意再說一次。', a: false }] } },
);

// ---------- 單元單字與常用短語 ----------
// 格式和 words.js 相同：單字|詞性|音標（英式）|中文|例句|例句中文。phr. 是整組背起來用的短語。
// 這些字會在上到對應單元時才出現。
const UNIT_WORDS = {
  d13: ['A1', `
brother|n.|/ˈbrʌðə/|兄弟|I've got one brother.|我有一個兄弟。
sister|n.|/ˈsɪstə/|姊妹|My sister is a nurse.|我的姊姊是護理師。
mother|n.|/ˈmʌðə/|媽媽|This is my mother.|這是我媽媽。
father|n.|/ˈfɑːðə/|爸爸|My father is a driver.|我爸爸是司機。
parents|n.|/ˈpeərənts/|父母|I live with my parents.|我和爸媽住在一起。
children|n.|/ˈtʃɪldrən/|孩子們|They have two children.|他們有兩個孩子。
married|adj.|/ˈmærid/|已婚的|Are you married?|你結婚了嗎？
husband|n.|/ˈhʌzbənd/|丈夫|Her husband is a teacher.|她的先生是老師。
wife|n.|/waɪf/|妻子|His wife works in a bank.|他的太太在銀行工作。
photo|n.|/ˈfəʊtəʊ/|照片|Is this your family in the photo?|照片裡是你的家人嗎？
hospital|n.|/ˈhɒspɪtəl/|醫院|She works in a hospital.|她在醫院工作。
have got|phr.||有（英式）|I've got one sister.|我有一個姊姊。
`],
  d14: ['A1', `
get up|phr.||起床|I get up at seven.|我七點起床。
early|adj./adv.|/ˈɜːli/|早的、早|That's early!|好早！
late|adj./adv.|/leɪt/|晚的、遲到|Sorry I'm late.|抱歉我遲到了。
evening|n.|/ˈiːvnɪŋ/|晚上|What do you do in the evening?|你晚上做什麼？
breakfast|n.|/ˈbrekfəst/|早餐|I have breakfast at home.|我在家吃早餐。
dinner|n.|/ˈdɪnə/|晚餐|We have dinner at seven.|我們七點吃晚餐。
always|adv.|/ˈɔːlweɪz/|總是|I always go to bed early.|我總是很早睡。
often|adv.|/ˈɒfən/|常常|I often walk to work.|我常常走路上班。
never|adv.|/ˈnevə/|從不|He never drinks coffee.|他從不喝咖啡。
half past|phr.||…點半|It's half past six.|現在六點半。
go to bed|phr.||上床睡覺|I go to bed at eleven.|我十一點上床睡覺。
study|v.|/ˈstʌdi/|學習、讀書|I study English every day.|我每天讀英文。
`],
  d15: ['A1', `
pound|n.|/paʊnd/|英鎊|It's ten pounds.|十英鎊。
single|n./adj.|/ˈsɪŋɡəl/|單程票；單一的|A single to Oxford, please.|一張到牛津的單程票。
return|n./v.|/rɪˈtɜːn/|來回票；返回|A return is twenty pounds.|來回票二十鎊。
train|n.|/treɪn/|火車|The next train is at three.|下一班火車是三點。
platform|n.|/ˈplætfɔːm/|月台|It leaves from platform two.|它從第二月台出發。
leave|v.|/liːv/|離開、出發|The train leaves at ten.|火車十點開。
next|adj.|/nekst/|下一個|What time is the next bus?|下一班公車是幾點？
altogether|adv.|/ˌɔːltəˈɡeðə/|總共|That's thirty pounds altogether.|總共三十鎊。
quarter|n.|/ˈkwɔːtə/|四分之一、十五分鐘|It's quarter past three.|現在三點十五分。
hundred|num.|/ˈhʌndrəd/|一百|It costs two hundred pounds.|要兩百鎊。
date|n.|/deɪt/|日期|What's the date today?|今天幾月幾號？
how much|phr.||多少錢、多少|How much is it?|這個多少錢？
`],
  d16: ['A1', `
flat|n.|/flæt/|公寓（英式）|I live in a small flat.|我住在一間小公寓。
supermarket|n.|/ˈsuːpəmɑːkɪt/|超市|Is there a supermarket near here?|這附近有超市嗎？
opposite|prep.|/ˈɒpəzɪt/|在…對面|The bank is opposite the station.|銀行在車站對面。
building|n.|/ˈbɪldɪŋ/|建築物、大樓|It's a tall building.|那是一棟高樓。
bedroom|n.|/ˈbedruːm/|臥室|There are two bedrooms.|有兩間臥室。
kitchen|n.|/ˈkɪtʃɪn/|廚房|The kitchen is small.|廚房很小。
bathroom|n.|/ˈbɑːθruːm/|浴室|Where is the bathroom?|浴室在哪裡？
lift|n.|/lɪft/|電梯（英式）|There isn't a lift.|沒有電梯。
stairs|n.|/steəz/|樓梯|I use the stairs.|我走樓梯。
near|prep.|/nɪə/|在…附近|I live near the station.|我住在車站附近。
between|prep.|/bɪˈtwiːn/|在…之間|It's between the bank and the café.|它在銀行和咖啡館之間。
there is|phr.||有（某個東西）|There's a park near my flat.|我的公寓附近有一座公園。
`],
  d17: ['A1', `
weekend|n.|/ˌwiːkˈend/|週末|How was your weekend?|你的週末過得如何？
grandparents|n.|/ˈɡrænpeərənts/|祖父母|I visited my grandparents.|我去看了祖父母。
cook|v.|/kʊk/|煮、烹飪|We cooked lunch together.|我們一起煮了午餐。
lunch|n.|/lʌntʃ/|午餐|What did you have for lunch?|你午餐吃了什麼？
stay|v.|/steɪ/|停留、待|I stayed at home.|我待在家。
watch|v.|/wɒtʃ/|觀看|I watched a film.|我看了一部電影。
film|n.|/fɪlm/|電影（英式）|It's a good film.|那是一部好電影。
subtitles|n.|/ˈsʌbtaɪtəlz/|字幕|I turned on the subtitles.|我開了字幕。
last|adj.|/lɑːst/|上一個|I saw him last week.|我上星期見過他。
great|adj.|/ɡreɪt/|很棒的|It was great.|很棒。
turn on|phr.||打開（電器、功能）|Can you turn on the light?|你可以開燈嗎？
a lot|phr.||很多|We talked a lot.|我們聊了很多。
`],
  d18: ['A2', `
summer|n.|/ˈsʌmə/|夏天|I went to Japan last summer.|我去年夏天去了日本。
holiday|n.|/ˈhɒlədeɪ/|假期（英式）|We went on holiday in July.|我們七月去度假。
fly|v.|/flaɪ/|搭飛機、飛|I flew from Taipei.|我從台北搭飛機。
rain|v./n.|/reɪn/|下雨；雨|It didn't rain.|沒有下雨。
present|n.|/ˈprezənt/|禮物|I bought a present for my mother.|我買了禮物給媽媽。
museum|n.|/mjuːˈziːəm/|博物館|We visited a museum.|我們參觀了博物館。
trip|n.|/trɪp/|旅行|How was your trip?|你的旅行如何？
first|adv.|/fɜːst/|首先|First we visited Tokyo.|我們先去了東京。
then|adv.|/ðen/|然後|Then we took a train.|然後我們搭了火車。
finally|adv.|/ˈfaɪnəli/|最後|Finally, we went home.|最後，我們回家了。
ago|adv.|/əˈɡəʊ/|…以前|I came here two years ago.|我兩年前來這裡。
anywhere|adv.|/ˈeniweə/|任何地方|Did you go anywhere?|你有去哪裡嗎？
`],
  d19: ['A2', `
plan|n./v.|/plæn/|計畫|What are your plans?|你有什麼計畫？
rest|n./v.|/rest/|休息|I'm going to have a rest.|我打算休息。
bring|v.|/brɪŋ/|帶來|Shall I bring something?|我要帶點什麼嗎？
free|adj.|/friː/|有空的；免費的|Are you free on Saturday?|你星期六有空嗎？
address|n.|/əˈdres/|地址|What's your address?|你的地址是什麼？
message|n.|/ˈmesɪdʒ/|訊息|Could you send me a message?|可以傳訊息給我嗎？
send|v.|/send/|寄、傳送|I'll send you the address.|我會把地址傳給你。
party|n.|/ˈpɑːti/|派對|We're having a party.|我們要辦派對。
going to|phr.||打算、將要|I'm going to study tonight.|我今晚打算讀書。
would you like|phr.||你想要…嗎|Would you like to come?|你想來嗎？
I'd love to|phr.||我很樂意|Thanks, I'd love to.|謝謝，我很樂意。
I'm afraid|phr.||恐怕、很抱歉|I'm afraid I can't come.|我恐怕不能來。
`],
  d20: ['A2', `
manager|n.|/ˈmænɪdʒə/|主管、經理|My manager is very kind.|我的主管人很好。
friendly|adj.|/ˈfrendli/|友善的|She's really friendly.|她真的很友善。
patient|adj.|/ˈpeɪʃənt/|有耐心的|Please be patient.|請有耐心。
tall|adj.|/tɔːl/|高的|He's very tall.|他很高。
short|adj.|/ʃɔːt/|短的、矮的|She's got short hair.|她留著短髮。
hair|n.|/heə/|頭髮|He's got dark hair.|他的頭髮是深色的。
young|adj.|/jʌŋ/|年輕的|She's younger than me.|她比我年輕。
better|adj.|/ˈbetə/|比較好的|This one is better.|這個比較好。
worse|adj.|/wɜːs/|比較差的|The weather is worse today.|今天天氣比較差。
funny|adj.|/ˈfʌni/|風趣的、好笑的|He's very funny.|他很風趣。
look like|phr.||看起來像、長得|What does she look like?|她長什麼樣子？
a bit|phr.||有一點|I'm a bit tired.|我有點累。
`],
  d21: ['A2', `
should|modal|/ʃʊd/|應該|You should have a rest.|你應該休息一下。
idea|n.|/aɪˈdɪə/|主意、想法|That's a good idea.|好主意。
face|n./v.|/feɪs/|臉；面對|Please face me when you talk.|說話時請面對我。
captions|n.|/ˈkæpʃənz/|即時字幕|Can you turn on the captions?|你可以打開字幕嗎？
show|v.|/ʃəʊ/|給…看、示範|Could you show me?|可以示範給我看嗎？
kind|adj.|/kaɪnd/|親切的|That's very kind of you.|你人真好。
bank|n.|/bæŋk/|銀行|I have to go to the bank.|我必須去銀行。
email|n./v.|/ˈiːmeɪl/|電子郵件|I'll send you an email.|我會寄電子郵件給你。
have to|phr.||必須|I have to go now.|我現在必須走了。
why don't you|phr.||你何不…|Why don't you ask him?|你何不問他？
shall I|phr.||要我…嗎|Shall I help you?|要我幫你嗎？
as well|phr.||也（放句尾）|I'd like a tea as well.|我也要一杯茶。
`],
  d22: ['A2', `
call|v./n.|/kɔːl/|打電話；通話|I'll call you tomorrow.|我明天打給你。
video call|phr.||視訊通話|Could we do a video call?|我們可以用視訊通話嗎？
school|n.|/skuːl/|學校|She works in a school.|她在學校工作。
lesson|n.|/ˈlesən/|課|My lesson is on Monday.|我的課在星期一。
moment|n.|/ˈməʊmənt/|片刻|Just a moment, please.|請等一下。
confirm|v.|/kənˈfɜːm/|確認|Could you confirm the time?|可以確認時間嗎？
mobile|n.|/ˈməʊbaɪl/|手機（英式）|What's your mobile number?|你的手機號碼是幾號？
ring|v.|/rɪŋ/|打電話（英式）|I'll ring you later.|我晚點打給你。
information|n.|/ˌɪnfəˈmeɪʃən/|資訊|I need some information.|我需要一些資訊。
of course|phr.||當然|Of course. No problem.|當然。沒問題。
is that right|phr.||這樣對嗎|Four o'clock. Is that right?|四點。對嗎？
speak up|phr.||說大聲一點|Could you speak up, please?|可以請你說大聲一點嗎？
`],
  d23: ['A2', `
ever|adv.|/ˈevə/|曾經（用在問句）|Have you ever been to England?|你去過英格蘭嗎？
twice|adv.|/twaɪs/|兩次|I've been there twice.|我去過那裡兩次。
once|adv.|/wʌns/|一次|I've tried it once.|我試過一次。
before|adv./prep.|/bɪˈfɔː/|以前；在…之前|I've never done this before.|我以前從來沒做過這件事。
yet|adv.|/jet/|還（沒）|I haven't finished yet.|我還沒做完。
just|adv.|/dʒʌst/|剛剛；只是|I've just arrived.|我剛到。
month|n.|/mʌnθ/|月|I've studied for six months.|我學了六個月。
abroad|adv.|/əˈbrɔːd/|在國外|I've never been abroad.|我從來沒出過國。
café|n.|/ˈkæfeɪ/|咖啡館|Let's meet at the café.|我們在咖啡館見面吧。
how long|phr.||多久|How long have you lived here?|你住在這裡多久了？
have been to|phr.||去過|I've been to Japan.|我去過日本。
so many|phr.||這麼多|There are so many people.|人好多。
`],
  d24: ['A2', `
really|adv.|/ˈrɪəli/|真的（表示有興趣）|Really? That's great.|真的嗎？太好了。
project|n.|/ˈprɒdʒekt/|專案、計畫|I'm working on a new project.|我在做一個新專案。
diary|n.|/ˈdaɪəri/|行事曆、日記（英式）|I'll check my diary.|我查一下行事曆。
soon|adv.|/suːn/|很快|See you soon!|再見！
anyway|adv.|/ˈeniweɪ/|總之、反正|Anyway, I have to go.|總之，我得走了。
at the moment|phr.||目前、最近|I'm busy at the moment.|我最近很忙。
I think|phr.||我覺得|I think it's great.|我覺得很棒。
I don't know|phr.||我不知道|I don't know yet.|我還不知道。
what do you think|phr.||你覺得呢|What do you think of it?|你覺得它怎麼樣？
have a look|phr.||看一下|Can I have a look?|我可以看一下嗎？
how are things|phr.||最近怎麼樣|Hi! How are things?|嗨！最近怎麼樣？
me too|phr.||我也是|I like it. Me too.|我喜歡。我也是。
`],
};
