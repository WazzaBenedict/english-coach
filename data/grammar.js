// 文法課程。quiz 的 a 是正確選項的索引。
const GRAMMAR = [
  { id: 'g1', title: 'be 動詞（am / is / are）', points: [
    'I 用 am，he / she / it 和單數名詞用 is，you / we / they 和複數名詞用 are。',
    '否定句在 be 動詞後面加 not：is not（isn\'t）、are not（aren\'t）。',
    '疑問句把 be 動詞搬到最前面：Are you busy?',
  ], examples: [['I am a student.', '我是學生。'], ['She is not at home.', '她不在家。'], ['Are they your friends?', '他們是你的朋友嗎？']],
    quiz: [
      { q: 'My brother ___ a doctor.', opts: ['am', 'is', 'are'], a: 1, why: 'My brother 是單數第三人稱，用 is。' },
      { q: 'We ___ from Taiwan.', opts: ['am', 'is', 'are'], a: 2, why: 'We 用 are。' },
      { q: '___ you tired?', opts: ['Am', 'Is', 'Are'], a: 2, why: 'you 用 are，疑問句移到句首。' },
      { q: 'I ___ not hungry.', opts: ['am', 'is', 'are'], a: 0, why: 'I 用 am。' },
    ] },
  { id: 'g2', title: '現在簡單式', points: [
    '用來說習慣、事實和經常發生的事。',
    '主詞是 he / she / it 時，動詞要加 s 或 es：He works. She watches TV.',
    '否定用 don\'t / doesn\'t 加原形動詞，疑問用 Do / Does 開頭。',
    '字尾的 s 是高頻音，很可能聽不到。聽不到時看主詞就能判斷。',
  ], examples: [['I work every day.', '我每天工作。'], ['She doesn\'t drink coffee.', '她不喝咖啡。'], ['Does he live here?', '他住這裡嗎？']],
    quiz: [
      { q: 'She ___ English every day.', opts: ['study', 'studies', 'studying'], a: 1, why: '主詞 she，動詞加 es（y 改 ies）。' },
      { q: 'They ___ like fish.', opts: ['don\'t', 'doesn\'t', 'isn\'t'], a: 0, why: 'They 的否定用 don\'t。' },
      { q: '___ your father work here?', opts: ['Do', 'Does', 'Is'], a: 1, why: 'your father 是第三人稱單數，用 Does。' },
      { q: 'He doesn\'t ___ meat.', opts: ['eat', 'eats', 'eating'], a: 0, why: 'doesn\'t 後面用原形動詞。' },
    ] },
  { id: 'g3', title: '現在進行式', points: [
    '用來說現在正在做的事：be 動詞加動詞 ing。',
    'I am eating. / She is working. / They are waiting.',
    '也可以說已經安排好的未來：I am meeting him tomorrow.',
  ], examples: [['I am learning English now.', '我現在正在學英文。'], ['What are you doing?', '你正在做什麼？'], ['It is raining.', '正在下雨。']],
    quiz: [
      { q: 'Look! The baby ___.', opts: ['sleeps', 'is sleeping', 'sleep'], a: 1, why: '此刻正在發生，用進行式。' },
      { q: 'What ___ you doing now?', opts: ['do', 'is', 'are'], a: 2, why: 'you 搭配 are。' },
      { q: 'I ___ dinner right now.', opts: ['am cooking', 'cook', 'cooks'], a: 0, why: 'right now 表示正在進行。' },
      { q: 'She usually ___ tea, but today she is drinking coffee.', opts: ['drinks', 'is drinking', 'drink'], a: 0, why: 'usually 表示習慣，用現在簡單式。' },
    ] },
  { id: 'g4', title: '過去簡單式', points: [
    '用來說過去已經結束的事。規則動詞加 ed：work → worked。',
    '常見不規則動詞要背：go → went、eat → ate、see → saw、have → had、buy → bought。',
    '否定用 didn\'t 加原形，疑問用 Did 開頭。be 動詞的過去式是 was / were。',
    '字尾的 ed 常常很輕。聽不到時，靠 yesterday、last week 這類時間詞判斷。',
  ], examples: [['I went to Japan last year.', '我去年去了日本。'], ['She didn\'t call me.', '她沒有打給我。'], ['Did you eat breakfast?', '你吃早餐了嗎？']],
    quiz: [
      { q: 'I ___ a movie yesterday.', opts: ['watch', 'watched', 'watching'], a: 1, why: 'yesterday 是過去時間。' },
      { q: 'We ___ to the park last Sunday.', opts: ['go', 'goed', 'went'], a: 2, why: 'go 的過去式是 went。' },
      { q: 'Did you ___ him?', opts: ['see', 'saw', 'seen'], a: 0, why: 'Did 後面用原形動詞。' },
      { q: 'They ___ at home last night.', opts: ['was', 'were', 'are'], a: 1, why: 'They 的過去式 be 動詞是 were。' },
    ] },
  { id: 'g5', title: '未來式（will / be going to）', points: [
    'will 加原形動詞：當下的決定、預測、承諾。I will help you.',
    'be going to 加原形動詞：已經計畫好的事。I am going to visit my parents.',
    '否定：will not（won\'t）。',
  ], examples: [['I will call you later.', '我晚點打給你。'], ['We are going to travel next month.', '我們下個月要去旅行。'], ['It won\'t rain tomorrow.', '明天不會下雨。']],
    quiz: [
      { q: 'I ___ you tomorrow.', opts: ['call', 'will call', 'called'], a: 1, why: 'tomorrow 是未來時間。' },
      { q: 'She is going to ___ a new car.', opts: ['buy', 'buys', 'buying'], a: 0, why: 'be going to 後面用原形動詞。' },
      { q: 'Don\'t worry. I ___ help you.', opts: ['am', 'will', 'did'], a: 1, why: '當下的承諾用 will。' },
      { q: 'They ___ come to the party. They are busy.', opts: ['will', 'won\'t', 'aren\'t'], a: 1, why: '他們很忙，所以不會來。' },
    ] },
  { id: 'g6', title: '助動詞 can / could / would', points: [
    'can 表示能力或許可：I can swim. Can I sit here?',
    'Could you …? 和 Would you …? 是禮貌的請求，溝通時非常好用。',
    'I would like …（I\'d like …）是 I want 的禮貌說法。',
    '助動詞後面一律接原形動詞。',
  ], examples: [['Could you speak slowly?', '你可以說慢一點嗎？'], ['I\'d like a coffee, please.', '我想要一杯咖啡，麻煩你。'], ['I can\'t hear you.', '我聽不到你說的。']],
    quiz: [
      { q: '___ you write it down, please?', opts: ['Could', 'Are', 'Do'], a: 0, why: '禮貌請求用 Could you。' },
      { q: 'She can ___ three languages.', opts: ['speaks', 'speak', 'speaking'], a: 1, why: '助動詞後面用原形。' },
      { q: 'I ___ like some water.', opts: ['will', 'would', 'can'], a: 1, why: 'would like 表示想要。' },
      { q: 'Sorry, I ___ come tomorrow. I have to work.', opts: ['can', 'can\'t', 'could'], a: 1, why: '要工作所以不能來。' },
    ] },
  { id: 'g7', title: '疑問詞（what / where / when / why / how）', points: [
    'what 什麼、where 哪裡、when 何時、who 誰、why 為什麼、how 如何。',
    '句型：疑問詞 + 助動詞或 be 動詞 + 主詞 + 動詞。Where do you live?',
    'How much 問價錢和不可數的量，How many 問可數的數量，How long 問多久。',
    '聽不清楚對方的問題時，先抓住第一個字（疑問詞），就知道對方要問什麼類型的資訊。',
  ], examples: [['Where do you work?', '你在哪裡工作？'], ['How much is this?', '這個多少錢？'], ['Why are you learning English?', '你為什麼學英文？']],
    quiz: [
      { q: '___ is the station? — It\'s next to the bank.', opts: ['When', 'Where', 'Who'], a: 1, why: '回答是地點，用 Where。' },
      { q: '___ do you get up? — At seven.', opts: ['What time', 'Where', 'How'], a: 0, why: '回答是時間。' },
      { q: '___ brothers do you have?', opts: ['How much', 'How many', 'How long'], a: 1, why: 'brothers 可數，用 How many。' },
      { q: '___ are you late? — Because of the traffic.', opts: ['Why', 'What', 'When'], a: 0, why: '回答是原因，用 Why。' },
    ] },
  { id: 'g8', title: '介系詞（in / on / at）', points: [
    '時間：at 用在時刻（at 7:00），on 用在日期和星期（on Monday），in 用在月份、年份、一段時間（in May、in 2026、in the morning）。',
    '地點：at 表示一個點（at the station），on 表示在表面上（on the table），in 表示在裡面（in the room、in Taiwan）。',
  ], examples: [['The class starts at nine.', '課九點開始。'], ['I was born in May.', '我在五月出生。'], ['See you on Friday.', '星期五見。']],
    quiz: [
      { q: 'I get up ___ six o\'clock.', opts: ['in', 'on', 'at'], a: 2, why: '時刻用 at。' },
      { q: 'My birthday is ___ July.', opts: ['in', 'on', 'at'], a: 0, why: '月份用 in。' },
      { q: 'We have a meeting ___ Monday.', opts: ['in', 'on', 'at'], a: 1, why: '星期用 on。' },
      { q: 'She lives ___ Canada.', opts: ['in', 'on', 'at'], a: 0, why: '國家用 in。' },
    ] },
  { id: 'g9', title: '比較級與最高級', points: [
    '短的形容詞加 er / est：tall → taller → the tallest。',
    '長的形容詞用 more / the most：expensive → more expensive → the most expensive。',
    '不規則：good → better → the best，bad → worse → the worst。',
    '比較級後面用 than。',
  ], examples: [['This one is cheaper than that one.', '這個比那個便宜。'], ['English is more useful than I thought.', '英文比我想的更有用。'], ['It is the best restaurant in town.', '這是鎮上最好的餐廳。']],
    quiz: [
      { q: 'My room is ___ than yours.', opts: ['small', 'smaller', 'smallest'], a: 1, why: 'than 前面用比較級。' },
      { q: 'This is the ___ movie I have ever seen.', opts: ['good', 'better', 'best'], a: 2, why: 'the 後面用最高級。' },
      { q: 'A taxi is ___ than a bus.', opts: ['expensiver', 'more expensive', 'most expensive'], a: 1, why: '長形容詞用 more。' },
      { q: 'Today is ___ than yesterday.', opts: ['hot', 'hotter', 'hottest'], a: 1, why: 'hot 重複字尾加 er。' },
    ] },
  { id: 'g10', title: '現在完成式', points: [
    '句型：have / has 加過去分詞。用來說經驗、從過去持續到現在的事、剛完成的事。',
    '經驗：I have been to Japan. 持續：I have lived here for five years.',
    '有明確的過去時間（yesterday、last year）時用過去簡單式，不用完成式。',
    'for 加一段時間，since 加起點。',
  ], examples: [['I have learned English for three months.', '我學英文三個月了。'], ['Have you ever been to Canada?', '你去過加拿大嗎？'], ['She has already finished.', '她已經完成了。']],
    quiz: [
      { q: 'I ___ never ___ sushi.', opts: ['have / eaten', 'did / eat', 'am / eating'], a: 0, why: '說經驗用現在完成式。' },
      { q: 'She has lived here ___ 2020.', opts: ['for', 'since', 'in'], a: 1, why: '2020 是起點，用 since。' },
      { q: 'I ___ him yesterday.', opts: ['have seen', 'saw', 'see'], a: 1, why: '有明確過去時間 yesterday，用過去簡單式。' },
      { q: '___ you ever been to Europe?', opts: ['Did', 'Have', 'Are'], a: 1, why: 'ever 加 been，用 Have。' },
    ] },
];
