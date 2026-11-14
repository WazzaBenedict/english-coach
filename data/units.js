// 單元課程。每個單元對應一個會話場景，分 3 堂一般課加 1 堂整合課。
// cando：學完能做到的事；gist：第一堂的大意題；frames：替換練習；read：整合課的短文；grammar：整合課的文法
const UNITS = [
  { d: 'd1', grammar: 'g1', cando: '我可以打招呼，並說出自己的名字、來自哪裡、做什麼工作。',
    gist: { q: '這兩個人是什麼關係？', opts: ['第一次見面', '老朋友', '店員和客人'], a: 0 },
    frames: [
      { en: 'My name is ___.', zh: '我的名字是＿。', opts: [['Alex', 'Alex'], ['Emma', 'Emma'], ['David', 'David']] },
      { en: 'I\'m from ___.', zh: '我來自＿。', opts: [['Taiwan', '台灣'], ['England', '英格蘭'], ['Japan', '日本']] },
      { en: 'I work in ___.', zh: '我在＿工作。', opts: [['an office', '辦公室'], ['a hospital', '醫院'], ['a shop', '商店']] },
    ],
    read: { title: 'My new friend', text: [
      ['This is my new friend, Sarah.', '這是我的新朋友 Sarah。'],
      ['She is from England.', '她來自英格蘭。'],
      ['She works in a school.', '她在學校工作。'],
      ['She is a teacher.', '她是老師。'],
      ['I am from Taiwan, and I work in an office.', '我來自台灣，我在辦公室工作。'],
      ['We are learning together.', '我們一起學習。'],
    ], qs: [{ q: 'Sarah 來自英格蘭。', a: true }, { q: 'Sarah 在辦公室工作。', a: false }] } },

  { d: 'd2', grammar: 'g6', cando: '聽不清楚時，我可以請對方說慢一點、再說一次，或寫下來。',
    gist: { q: 'B 想請對方做什麼？', opts: ['幫忙買東西', '配合他的聽力狀況', '一起吃飯'], a: 1 },
    frames: [
      { en: 'Could you ___, please?', zh: '可以請你＿嗎？', opts: [['speak slowly', '說慢一點'], ['say it again', '再說一次'], ['write it down', '寫下來'], ['spell that', '拼出來']] },
      { en: 'Sorry, I didn\'t catch ___.', zh: '抱歉，我沒聽清楚＿。', opts: [['that', '那句話'], ['your name', '你的名字'], ['the number', '那個數字']] },
      { en: 'Did you say ___?', zh: '你是說＿嗎？', opts: [['fifteen or fifty', '十五還是五十'], ['Tuesday or Thursday', '星期二還是星期四'], ['left or right', '左邊還是右邊']] },
    ],
    read: { title: 'Talking with people', text: [
      ['I am hard of hearing.', '我有聽力障礙。'],
      ['Sometimes I can\'t hear people well.', '有時候我聽不清楚別人說話。'],
      ['So I ask them to speak slowly.', '所以我請他們說慢一點。'],
      ['I look at their faces when they talk.', '他們說話時我看著他們的臉。'],
      ['If I still don\'t understand, I ask them to write it down.', '如果我還是不懂，我請他們寫下來。'],
      ['Most people are happy to help.', '大多數人都很樂意幫忙。'],
    ], qs: [{ q: '他請別人說快一點。', a: false }, { q: '聽不懂時他會請對方寫下來。', a: true }] } },

  { d: 'd3', grammar: 'g2', cando: '我可以聊自己的興趣和平常做的事。',
    gist: { q: '他們在聊什麼？', opts: ['工作上的問題', '興趣和空閒時間', '明天的天氣'], a: 1 },
    frames: [
      { en: 'I like ___.', zh: '我喜歡＿。', opts: [['watching films', '看電影'], ['taking photos', '拍照'], ['cooking', '做菜'], ['reading', '閱讀']] },
      { en: 'I go ___ twice a week.', zh: '我一週＿兩次。', opts: [['swimming', '游泳'], ['running', '跑步'], ['shopping', '購物']] },
      { en: 'I want to ___.', zh: '我想要＿。', opts: [['talk with people from other countries', '和其他國家的人聊天'], ['travel', '旅行'], ['learn English', '學英文']] },
    ],
    read: { title: 'My free time', text: [
      ['I work from Monday to Friday.', '我星期一到星期五工作。'],
      ['In the evening, I study English for an hour.', '晚上我讀一小時英文。'],
      ['At the weekend, I go swimming.', '週末我去游泳。'],
      ['I also like watching films with subtitles.', '我也喜歡看有字幕的電影。'],
      ['My friend likes football, but I don\'t.', '我朋友喜歡足球，但我不喜歡。'],
    ], qs: [{ q: '他每天晚上讀一小時英文。', a: true }, { q: '他喜歡足球。', a: false }] } },

  { d: 'd4', grammar: 'g3', cando: '我可以在餐廳點餐、回答店員的問題並結帳。',
    gist: { q: '這段對話發生在哪裡？', opts: ['餐廳', '車站', '飯店'], a: 0 },
    frames: [
      { en: 'I\'d like ___, please.', zh: '我想要＿，麻煩你。', opts: [['the chicken sandwich', '雞肉三明治'], ['a cup of tea', '一杯茶'], ['fish and chips', '炸魚薯條'], ['the bill', '帳單']] },
      { en: 'Can I pay by ___?', zh: '我可以用＿付款嗎？', opts: [['card', '卡'], ['cash', '現金'], ['phone', '手機']] },
      { en: 'Just ___, please.', zh: '＿就好，謝謝。', opts: [['water', '水'], ['a coffee', '一杯咖啡'], ['a small one', '小的']] },
    ],
    read: { title: 'Lunch at a café', text: [
      ['Today I am having lunch at a small café.', '今天我在一家小咖啡館吃午餐。'],
      ['I am eating a chicken sandwich and a salad.', '我正在吃雞肉三明治和沙拉。'],
      ['My friend is drinking tea.', '我朋友正在喝茶。'],
      ['The food is cheap and delicious.', '食物便宜又好吃。'],
      ['Lunch costs twelve pounds.', '午餐要十二英鎊。'],
      ['I pay by card.', '我刷卡付錢。'],
    ], qs: [{ q: '他正在吃雞肉三明治。', a: true }, { q: '他付現金。', a: false }] } },

  { d: 'd5', grammar: 'g8', cando: '我可以問路，並重複確認對方說的方向。',
    gist: { q: 'B 想去哪裡？', opts: ['銀行', '火車站', '咖啡店'], a: 1 },
    frames: [
      { en: 'Excuse me, how do I get to ___?', zh: '不好意思，請問＿怎麼走？', opts: [['the train station', '火車站'], ['the bank', '銀行'], ['the hospital', '醫院'], ['this hotel', '這家飯店']] },
      { en: 'It\'s ___ the bank.', zh: '它在銀行＿。', opts: [['next to', '旁邊'], ['opposite', '對面'], ['behind', '後面']] },
      { en: 'Turn ___ at the corner.', zh: '在轉角＿。', opts: [['left', '左轉'], ['right', '右轉']] },
    ],
    read: { title: 'Finding the station', text: [
      ['I want to go to the train station.', '我想去火車站。'],
      ['I ask a woman in the street.', '我問街上的一位女士。'],
      ['She says it is next to the bank.', '她說它在銀行旁邊。'],
      ['I repeat the directions to check.', '我重複一次方向來確認。'],
      ['Then she shows me on the map.', '然後她在地圖上指給我看。'],
      ['It is only a five minute walk.', '走路只要五分鐘。'],
    ], qs: [{ q: '火車站在銀行旁邊。', a: true }, { q: '走路要十五分鐘。', a: false }] } },

  { d: 'd6', grammar: 'g9', cando: '我可以買衣服：說尺寸、試穿、問價錢並確認數字。',
    gist: { q: 'B 想買什麼？', opts: ['一雙鞋', '一件夾克', '一本書'], a: 1 },
    frames: [
      { en: 'I\'m looking for ___.', zh: '我在找＿。', opts: [['a jacket', '一件夾克'], ['a shirt', '一件襯衫'], ['some shoes', '鞋子'], ['a gift', '禮物']] },
      { en: 'Do you have a ___ one?', zh: '你們有＿的嗎？', opts: [['larger', '大一點'], ['smaller', '小一點'], ['cheaper', '便宜一點'], ['blue', '藍色']] },
      { en: 'How much is ___?', zh: '＿多少錢？', opts: [['it', '這個'], ['this one', '這一個'], ['the jacket', '這件夾克']] },
    ],
    read: { title: 'A new jacket', text: [
      ['I need a new jacket for winter.', '我需要一件冬天穿的新夾克。'],
      ['The first one is too small.', '第一件太小。'],
      ['The second one is larger and more comfortable.', '第二件比較大也比較舒服。'],
      ['It is fifty pounds, not fifteen.', '它是五十英鎊，不是十五。'],
      ['I ask the assistant to show me the price.', '我請店員把價錢給我看。'],
      ['I take the second one.', '我買了第二件。'],
    ], qs: [{ q: '第一件夾克太大。', a: false }, { q: '夾克的價錢是五十英鎊。', a: true }] } },

  { d: 'd7', grammar: 'g5', cando: '我可以和朋友約時間地點，並請對方把地址傳給我。',
    gist: { q: '他們約好做什麼？', opts: ['一起吃午餐', '一起看電影', '一起上課'], a: 0 },
    frames: [
      { en: 'Are you free ___?', zh: '你＿有空嗎？', opts: [['this Saturday', '這個星期六'], ['tomorrow evening', '明天晚上'], ['next week', '下星期']] },
      { en: 'How about ___?', zh: '＿如何？', opts: [['twelve thirty', '十二點半'], ['six o\'clock', '六點'], ['Sunday morning', '星期天早上']] },
      { en: 'Let\'s meet at ___.', zh: '我們在＿見吧。', opts: [['the coffee shop', '咖啡店'], ['the station', '車站'], ['my office', '我的辦公室']] },
    ],
    read: { title: 'Plans for Saturday', text: [
      ['On Saturday I am going to meet my friend.', '星期六我要和朋友見面。'],
      ['We are going to have lunch at twelve thirty.', '我們要在十二點半吃午餐。'],
      ['The restaurant is near the station.', '餐廳在車站附近。'],
      ['She will send me the address.', '她會把地址傳給我。'],
      ['After lunch, we will go for a walk.', '午餐後我們會去散步。'],
    ], qs: [{ q: '他們要在十二點半吃午餐。', a: true }, { q: '餐廳離車站很遠。', a: false }] } },

  { d: 'd8', grammar: 'g4', cando: '我可以聊天氣，並說出上個週末做了什麼。',
    gist: { q: 'B 上個週末做了什麼？', opts: ['待在家', '去爬山', '去上班'], a: 1 },
    frames: [
      { en: 'I went ___ with my friends.', zh: '我和朋友去＿。', opts: [['hiking', '爬山'], ['shopping', '購物'], ['swimming', '游泳']] },
      { en: 'It was ___.', zh: '那＿。', opts: [['good', '很好'], ['fun', '很好玩'], ['tiring', '很累'], ['amazing', '很棒']] },
      { en: 'It was ___ all last week.', zh: '上星期整週都＿。', opts: [['raining', '在下雨'], ['hot', '很熱'], ['cold', '很冷']] },
    ],
    read: { title: 'Last weekend', text: [
      ['Last weekend the weather was beautiful.', '上個週末天氣很好。'],
      ['I went hiking with two friends.', '我和兩個朋友去爬山。'],
      ['We walked for three hours.', '我們走了三個小時。'],
      ['We ate lunch at the top of the mountain.', '我們在山頂吃午餐。'],
      ['I was tired, but I was happy.', '我很累，但是很開心。'],
    ], qs: [{ q: '上個週末下雨。', a: false }, { q: '他們走了三個小時。', a: true }] } },

  { d: 'd9', grammar: 'g7', cando: '我可以回答入境審查的基本問題。',
    gist: { q: '這段對話發生在哪裡？', opts: ['飯店櫃台', '機場入境', '餐廳'], a: 1 },
    frames: [
      { en: 'I\'m here ___.', zh: '我來這裡＿。', opts: [['on holiday', '度假'], ['on business', '出差'], ['to visit a friend', '拜訪朋友'], ['to study', '念書']] },
      { en: 'For ___.', zh: '停留＿。', opts: [['one week', '一個星期'], ['ten days', '十天'], ['two months', '兩個月']] },
      { en: 'I\'m staying at ___.', zh: '我住在＿。', opts: [['a hotel', '飯店'], ['my friend\'s house', '朋友家'], ['a hostel', '青年旅館']] },
    ],
    read: { title: 'At the airport', text: [
      ['The officer asks me four questions.', '官員問了我四個問題。'],
      ['Why are you here?', '你為什麼來這裡？'],
      ['How long will you stay?', '你會停留多久？'],
      ['Where will you stay?', '你會住在哪裡？'],
      ['I answer slowly and show him the hotel address.', '我慢慢回答，並把飯店地址給他看。'],
      ['He smiles and says, enjoy your stay.', '他微笑著說，祝你旅途愉快。'],
    ], qs: [{ q: '他把飯店地址給官員看。', a: true }, { q: '官員很生氣。', a: false }] } },

  { d: 'd10', grammar: null, cando: '我可以辦理飯店入住，並詢問早餐和 Wi-Fi。',
    gist: { q: 'B 正在做什麼？', opts: ['辦理入住', '退房', '訂機票'], a: 0 },
    frames: [
      { en: 'I have a reservation under the name ___.', zh: '我有訂房，名字是＿。', opts: [['Alex', 'Alex'], ['Chen', '陳'], ['Lin', '林']] },
      { en: 'Is ___ included?', zh: '有包含＿嗎？', opts: [['breakfast', '早餐'], ['Wi-Fi', 'Wi-Fi'], ['parking', '停車']] },
      { en: 'Could you write down ___?', zh: '可以幫我寫下＿嗎？', opts: [['the room number', '房號'], ['the password', '密碼'], ['the time', '時間']] },
    ],
    read: { title: 'My hotel', text: [
      ['My hotel is in the city centre.', '我的飯店在市中心。'],
      ['My room is on the fifth floor.', '我的房間在五樓。'],
      ['It is small, but it is clean and quiet.', '它很小，但是乾淨又安靜。'],
      ['Breakfast is from seven to ten.', '早餐是七點到十點。'],
      ['The Wi-Fi password is on a card.', 'Wi-Fi 密碼寫在一張卡片上。'],
    ], qs: [{ q: '房間在五樓。', a: true }, { q: '房間很吵。', a: false }] } },

  { d: 'd11', grammar: 'g10', cando: '我可以向醫生說明症狀，並確認吃藥的方式。',
    gist: { q: 'B 怎麼了？', opts: ['腳受傷', '喉嚨痛和頭痛', '牙痛'], a: 1 },
    frames: [
      { en: 'I have ___.', zh: '我＿。', opts: [['a headache', '頭痛'], ['a sore throat', '喉嚨痛'], ['a fever', '發燒'], ['a cough', '咳嗽']] },
      { en: 'For about ___.', zh: '大約＿了。', opts: [['three days', '三天'], ['a week', '一個星期'], ['two hours', '兩個小時']] },
      { en: 'I feel very ___.', zh: '我覺得很＿。', opts: [['tired', '累'], ['cold', '冷'], ['sick', '不舒服']] },
    ],
    read: { title: 'Seeing the doctor', text: [
      ['I have been ill for three days.', '我已經生病三天了。'],
      ['I have a sore throat and a headache.', '我喉嚨痛，還有頭痛。'],
      ['The doctor gives me some medicine.', '醫生給我一些藥。'],
      ['I take it three times a day after meals.', '我一天吃三次，飯後吃。'],
      ['The doctor has written everything down for me.', '醫生已經幫我把所有事情寫下來。'],
    ], qs: [{ q: '他已經生病一個星期。', a: false }, { q: '藥是飯後吃。', a: true }] } },

  { d: 'd12', grammar: null, cando: '我可以說出自己的意見，並給一個理由和一個例子。',
    gist: { q: 'B 覺得住在哪裡比較好？', opts: ['城市', '鄉下', '都一樣'], a: 0 },
    frames: [
      { en: 'In my opinion, ___ is better.', zh: '依我看，＿比較好。', opts: [['living in a city', '住在城市'], ['working from home', '在家工作'], ['learning with a friend', '和朋友一起學']] },
      { en: 'Because ___.', zh: '因為＿。', opts: [['there are more jobs', '工作機會比較多'], ['it is convenient', '很方便'], ['it saves time', '省時間']] },
      { en: 'However, ___.', zh: '不過，＿。', opts: [['I think the advantages are greater', '我認為優點比較多'], ['it is expensive', '它很貴'], ['some people disagree', '有些人不同意']] },
    ],
    read: { title: 'City or countryside?', text: [
      ['Some people like living in the countryside.', '有些人喜歡住在鄉下。'],
      ['It is quiet and the air is clean.', '那裡很安靜，空氣也乾淨。'],
      ['However, I prefer the city.', '不過，我比較喜歡城市。'],
      ['There are more jobs, and public transport is convenient.', '工作機會比較多，大眾運輸也方便。'],
      ['For example, I can see a doctor easily.', '例如，我可以很容易看到醫生。'],
    ], qs: [{ q: '作者比較喜歡鄉下。', a: false }, { q: '作者覺得城市的大眾運輸方便。', a: true }] } },
];
