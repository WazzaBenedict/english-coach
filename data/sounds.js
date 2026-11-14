// 發音指南與辨音（最小對比）資料
const SOUNDS = [
  { sym: '/s/', name: 's', ex: ['see', 'bus', 'sister'], how: '舌尖靠近上排牙齒後方，牙齒輕輕合起，讓氣流從舌頭中間細細地流出，像漏氣聲。喉嚨不震動。', hint: '這個音的能量幾乎都在高頻，很可能聽不到。把手背放在嘴前，能感覺到一道細而冷的氣流就對了。複數和第三人稱的 s 聽不到時，用文法判斷。' },
  { sym: '/ʃ/', name: 'sh', ex: ['she', 'fish', 'shop'], how: '嘴唇往前嘟成圓形，舌頭比 /s/ 往後縮一點，像叫人安靜的「噓」。喉嚨不震動。', hint: '和 /s/ 的差別用看的最清楚：/ʃ/ 嘴唇會嘟起來，/s/ 嘴角是平的。' },
  { sym: '/f/', name: 'f', ex: ['fine', 'coffee', 'life'], how: '上排牙齒輕輕碰下嘴唇，把氣從中間吹出去。喉嚨不震動。', hint: '讀唇時很容易看到：上齒咬下唇。' },
  { sym: '/v/', name: 'v', ex: ['very', 'seven', 'have'], how: '嘴型和 /f/ 一樣，但喉嚨要震動，下唇會有麻麻的感覺。', hint: '手放在喉嚨上，有震動是 /v/，沒有是 /f/。' },
  { sym: '/θ/', name: 'th（無聲）', ex: ['think', 'three', 'bath'], how: '舌尖伸到上下牙齒之間，輕輕咬住，把氣從舌頭上方吹出。喉嚨不震動。', hint: '中文沒有這個音。照鏡子確認看得到舌尖。聽起來像 /s/ 或 /f/ 時，靠看嘴型分辨。' },
  { sym: '/ð/', name: 'th（有聲）', ex: ['this', 'mother', 'the'], how: '嘴型和 /θ/ 一樣，舌尖在牙齒之間，但喉嚨震動。', hint: '常出現在 the、this、that、they 這些最常用的字，值得優先練。' },
  { sym: '/tʃ/', name: 'ch', ex: ['cheap', 'watch', 'chair'], how: '舌尖先頂住上牙齦擋住氣，再突然放開，同時嘴唇嘟起，像短促的「去」。', hint: '和 /ʃ/ 的差別：/tʃ/ 開頭有一個爆破，手背會感覺到一股突然的氣。' },
  { sym: '/t/ /d/', name: 't 和 d', ex: ['ten', 'den', 'time', 'dime'], how: '舌尖頂住上牙齦再彈開。/t/ 不震動且送氣強，/d/ 喉嚨震動且送氣弱。', hint: '拿一張衛生紙放在嘴前：說 /t/ 紙會飄，說 /d/ 幾乎不動。' },
  { sym: '/k/ /ɡ/', name: 'k 和 g', ex: ['cold', 'gold', 'back', 'bag'], how: '舌根頂住上顎後方再放開。/k/ 不震動且送氣，/ɡ/ 喉嚨震動。', hint: '字尾的 /k/ 很輕。back 的母音短，bag 的母音會拉長，用母音長度分辨。' },
  { sym: '/l/ /r/', name: 'l 和 r', ex: ['light', 'right', 'glass', 'grass'], how: '/l/ 舌尖頂住上牙齦。/r/ 舌尖往後捲但不碰到任何地方，嘴唇微微嘟起。', hint: '這兩個音在中低頻，相對容易聽到。看嘴型：/r/ 嘴唇會變圓。' },
  { sym: '/iː/ /ɪ/', name: '長 ee 和短 i', ex: ['sheep', 'ship', 'seat', 'sit'], how: '/iː/ 嘴角往兩邊拉開像微笑，聲音拉長。/ɪ/ 嘴巴放鬆，聲音短，介於「一」和「ㄝ」之間。', hint: '母音在低頻，是你聽得最清楚的部分。多依靠母音的長短來分辨單字。' },
  { sym: '/æ/ /e/', name: 'a 和 e', ex: ['bad', 'bed', 'man', 'men'], how: '/æ/ 嘴巴張大，嘴角往兩邊拉，下巴往下掉。/e/ 嘴巴只張一半。', hint: '看下巴掉下來多少就知道了。' },
];

// 辨音題。hint 說明如何不靠高頻也能分辨。
const PAIRS = [
  { a: 'sip', ia: '/sɪp/', b: 'ship', ib: '/ʃɪp/', hint: '/s/ 嘴角平，/ʃ/ 嘴唇嘟圓。' },
  { a: 'see', ia: '/siː/', b: 'she', ib: '/ʃiː/', hint: '/s/ 嘴角平，/ʃ/ 嘴唇嘟圓。' },
  { a: 'sink', ia: '/sɪŋk/', b: 'think', ib: '/θɪŋk/', hint: '/θ/ 看得到舌尖在牙齒之間。' },
  { a: 'fin', ia: '/fɪn/', b: 'thin', ib: '/θɪn/', hint: '/f/ 上齒咬下唇，/θ/ 舌尖在齒間。' },
  { a: 'three', ia: '/θriː/', b: 'free', ib: '/friː/', hint: '/θ/ 舌尖在齒間，/f/ 上齒咬下唇。' },
  { a: 'fan', ia: '/fæn/', b: 'van', ib: '/væn/', hint: '/v/ 喉嚨震動，聲音比較低沉。' },
  { a: 'sue', ia: '/suː/', b: 'zoo', ib: '/zuː/', hint: '/z/ 喉嚨震動，有嗡嗡聲。' },
  { a: 'ship', ia: '/ʃɪp/', b: 'chip', ib: '/tʃɪp/', hint: '/tʃ/ 開頭有短促的爆破。' },
  { a: 'tin', ia: '/tɪn/', b: 'thin', ib: '/θɪn/', hint: '/t/ 是突然的爆破，/θ/ 是持續的氣流。' },
  { a: 'pat', ia: '/pæt/', b: 'bat', ib: '/bæt/', hint: '/p/ 送氣強，/b/ 喉嚨震動。' },
  { a: 'cap', ia: '/kæp/', b: 'cab', ib: '/kæb/', hint: 'cab 的母音比較長。' },
  { a: 'rice', ia: '/raɪs/', b: 'rise', ib: '/raɪz/', hint: 'rise 的母音比較長，字尾有震動。' },
  { a: 'back', ia: '/bæk/', b: 'bag', ib: '/bæɡ/', hint: 'bag 的母音比較長。' },
  { a: 'ship', ia: '/ʃɪp/', b: 'sheep', ib: '/ʃiːp/', hint: 'sheep 的母音長，嘴角拉開。' },
  { a: 'sit', ia: '/sɪt/', b: 'seat', ib: '/siːt/', hint: 'seat 的母音長，嘴角拉開。' },
  { a: 'bed', ia: '/bed/', b: 'bad', ib: '/bæd/', hint: 'bad 的嘴巴張得更大。' },
  { a: 'light', ia: '/laɪt/', b: 'right', ib: '/raɪt/', hint: '/r/ 嘴唇變圓，舌頭不碰上顎。' },
  { a: 'walk', ia: '/wɔːk/', b: 'work', ib: '/wɜːrk/', hint: 'work 有捲舌的 r 音。', gb: { ib: '/wɜːk/', hint: '英式發音不捲舌。walk 嘴唇嘟圓，work 嘴巴放鬆、嘴角平。' } },
  { a: 'fifteen', ia: '/ˌfɪfˈtiːn/', b: 'fifty', ib: '/ˈfɪfti/', hint: 'fifteen 重音在後面而且拉長，fifty 重音在前面。不確定就問：one five or five zero?' },
  { a: 'can', ia: '/kən/', b: 'can\'t', ib: '/kænt/', hint: 'can\'t 的母音又重又清楚，can 通常很輕。不確定就問：You can, or you cannot?' , gb: { ib: '/kɑːnt/', hint: '英式的 can\'t 母音是拉長的「啊」，嘴巴張大，和 can 差很多，比美式好分辨。' } },
];
