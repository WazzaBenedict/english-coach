// 單字庫。格式：單字|詞性|音標|中文|例句|例句中文
// 要加單字時，照同樣格式在對應等級加一行即可。
const WORD_DATA = {
  A1: `
name|n.|/neɪm/|名字|My name is Wazza.|我的名字是 Wazza。
people|n.|/ˈpiːpəl/|人們|Many people live here.|很多人住在這裡。
friend|n.|/frend/|朋友|She is my best friend.|她是我最好的朋友。
family|n.|/ˈfæməli/|家人、家庭|I love my family.|我愛我的家人。
work|v./n.|/wɜːrk/|工作|I work in an office.|我在辦公室工作。
job|n.|/dʒɑːb/|工作、職業|What is your job?|你的工作是什麼？
live|v.|/lɪv/|居住|I live in Taiwan.|我住在台灣。
want|v.|/wɑːnt/|想要|I want a cup of coffee.|我想要一杯咖啡。
need|v.|/niːd/|需要|I need your help.|我需要你的幫忙。
like|v.|/laɪk/|喜歡|I like this song.|我喜歡這首歌。
know|v.|/noʊ/|知道|I don't know the answer.|我不知道答案。
think|v.|/θɪŋk/|想、認為|I think it is good.|我覺得這很好。
understand|v.|/ˌʌndərˈstænd/|了解、聽懂|I don't understand.|我不懂。
speak|v.|/spiːk/|說（語言）|Can you speak slowly?|你可以說慢一點嗎？
say|v.|/seɪ/|說|Please say that again.|請再說一次。
tell|v.|/tel/|告訴|Tell me about your day.|跟我說說你的一天。
ask|v.|/æsk/|問|Can I ask a question?|我可以問個問題嗎？
listen|v.|/ˈlɪsən/|聽|Listen to me, please.|請聽我說。
hear|v.|/hɪr/|聽見|I can't hear you well.|我聽不太清楚你說的。
write|v.|/raɪt/|寫|Could you write it down?|你可以寫下來嗎？
read|v.|/riːd/|讀|I read a book every week.|我每週讀一本書。
learn|v.|/lɜːrn/|學習|I am learning English.|我正在學英文。
help|v./n.|/help/|幫助|Can you help me?|你可以幫我嗎？
go|v.|/ɡoʊ/|去|I go to work by bus.|我搭公車去上班。
come|v.|/kʌm/|來|Please come in.|請進。
eat|v.|/iːt/|吃|What do you want to eat?|你想吃什麼？
drink|v./n.|/drɪŋk/|喝；飲料|Would you like a drink?|你想喝點什麼嗎？
buy|v.|/baɪ/|買|I want to buy this shirt.|我想買這件襯衫。
pay|v.|/peɪ/|付錢|Can I pay by card?|我可以刷卡嗎？
give|v.|/ɡɪv/|給|Please give me the menu.|請給我菜單。
take|v.|/teɪk/|拿、搭乘|Take the number 5 bus.|搭 5 號公車。
make|v.|/meɪk/|製作|I make breakfast every day.|我每天做早餐。
look|v.|/lʊk/|看|Look at this picture.|看這張照片。
see|v.|/siː/|看見|See you tomorrow.|明天見。
wait|v.|/weɪt/|等待|Please wait a moment.|請稍等一下。
meet|v.|/miːt/|見面、認識|Nice to meet you.|很高興認識你。
start|v.|/stɑːrt/|開始|The class starts at nine.|課九點開始。
finish|v.|/ˈfɪnɪʃ/|完成|I finish work at six.|我六點下班。
open|v./adj.|/ˈoʊpən/|打開；營業中|The shop is open now.|這家店現在有開。
close|v.|/kloʊz/|關上|Please close the door.|請關門。
today|n./adv.|/təˈdeɪ/|今天|Today is Monday.|今天是星期一。
tomorrow|n./adv.|/təˈmɑːroʊ/|明天|I will call you tomorrow.|我明天打給你。
yesterday|n./adv.|/ˈjestərdeɪ/|昨天|I was busy yesterday.|我昨天很忙。
week|n.|/wiːk/|星期、週|I study five days a week.|我一週讀五天。
time|n.|/taɪm/|時間|What time is it?|現在幾點？
morning|n.|/ˈmɔːrnɪŋ/|早上|Good morning!|早安！
night|n.|/naɪt/|晚上|Good night.|晚安。
food|n.|/fuːd/|食物|The food is delicious.|這食物很好吃。
water|n.|/ˈwɔːtər/|水|Can I have some water?|可以給我一些水嗎？
money|n.|/ˈmʌni/|錢|I don't have much money.|我沒有很多錢。
price|n.|/praɪs/|價格|What is the price?|價格是多少？
place|n.|/pleɪs/|地方|This is a nice place.|這是個好地方。
home|n.|/hoʊm/|家|I am going home.|我要回家了。
room|n.|/ruːm/|房間|My room is small.|我的房間很小。
street|n.|/striːt/|街道|Go down this street.|沿著這條街走。
station|n.|/ˈsteɪʃən/|車站|Where is the station?|車站在哪裡？
phone|n.|/foʊn/|電話、手機|This is my phone number.|這是我的電話號碼。
question|n.|/ˈkwestʃən/|問題|I have a question.|我有一個問題。
problem|n.|/ˈprɑːbləm/|問題、麻煩|No problem.|沒問題。
thing|n.|/θɪŋ/|東西、事情|I have many things to do.|我有很多事要做。
good|adj.|/ɡʊd/|好的|That is a good idea.|那是個好主意。
bad|adj.|/bæd/|壞的|The weather is bad today.|今天天氣不好。
big|adj.|/bɪɡ/|大的|It is a big city.|這是個大城市。
small|adj.|/smɔːl/|小的|Do you have a small size?|你們有小號的嗎？
new|adj.|/nuː/|新的|I have a new job.|我有新工作。
old|adj.|/oʊld/|老的、舊的|How old are you?|你幾歲？
happy|adj.|/ˈhæpi/|開心的|I am happy to see you.|很高興見到你。
tired|adj.|/ˈtaɪərd/|累的|I am very tired.|我非常累。
busy|adj.|/ˈbɪzi/|忙碌的|Are you busy now?|你現在忙嗎？
easy|adj.|/ˈiːzi/|容易的|This question is easy.|這題很簡單。
difficult|adj.|/ˈdɪfɪkəlt/|困難的|English is not difficult.|英文不難。
slow|adj.|/sloʊ/|慢的|Please speak slow and clear.|請說得慢而清楚。
fast|adj./adv.|/fæst/|快的|You speak too fast.|你說得太快了。
hot|adj.|/hɑːt/|熱的|It is hot today.|今天很熱。
cold|adj.|/koʊld/|冷的|The water is cold.|水很冷。
cheap|adj.|/tʃiːp/|便宜的|This one is cheap.|這個很便宜。
expensive|adj.|/ɪkˈspensɪv/|貴的|It is too expensive.|太貴了。
right|adj./n.|/raɪt/|對的；右邊|Turn right at the corner.|在轉角右轉。
left|adj./n.|/left/|左邊|It is on your left.|在你的左手邊。
again|adv.|/əˈɡen/|再一次|Could you say it again?|你可以再說一次嗎？
`,
  A2: `
agree|v.|/əˈɡriː/|同意|I agree with you.|我同意你的看法。
arrive|v.|/əˈraɪv/|抵達|We arrived at the airport early.|我們很早就到機場了。
believe|v.|/bɪˈliːv/|相信|I believe you can do it.|我相信你做得到。
borrow|v.|/ˈbɑːroʊ/|借入|Can I borrow your pen?|我可以借你的筆嗎？
change|v./n.|/tʃeɪndʒ/|改變；零錢|I need to change my plan.|我需要改變計畫。
choose|v.|/tʃuːz/|選擇|Please choose one.|請選一個。
decide|v.|/dɪˈsaɪd/|決定|I decided to study abroad.|我決定出國念書。
describe|v.|/dɪˈskraɪb/|描述|Can you describe your city?|你能描述你的城市嗎？
enjoy|v.|/ɪnˈdʒɔɪ/|享受、喜歡|I enjoy cooking.|我喜歡做菜。
explain|v.|/ɪkˈspleɪn/|解釋|Could you explain this word?|你可以解釋這個字嗎？
forget|v.|/fərˈɡet/|忘記|I forgot my password.|我忘了我的密碼。
remember|v.|/rɪˈmembər/|記得|I remember your name.|我記得你的名字。
hope|v./n.|/hoʊp/|希望|I hope to see you soon.|希望很快再見到你。
improve|v.|/ɪmˈpruːv/|改善、進步|I want to improve my English.|我想讓英文進步。
invite|v.|/ɪnˈvaɪt/|邀請|She invited me to dinner.|她邀請我吃晚餐。
practice|v./n.|/ˈpræktɪs/|練習|I practice speaking every day.|我每天練習口說。
prefer|v.|/prɪˈfɜːr/|比較喜歡|I prefer tea to coffee.|比起咖啡我更喜歡茶。
repeat|v.|/rɪˈpiːt/|重複|Could you repeat that, please?|可以請你重複一次嗎？
spend|v.|/spend/|花費（時間、錢）|I spend an hour on English.|我花一小時學英文。
travel|v./n.|/ˈtrævəl/|旅行|I love to travel.|我熱愛旅行。
try|v.|/traɪ/|嘗試|Let me try again.|讓我再試一次。
visit|v.|/ˈvɪzɪt/|拜訪、參觀|I will visit Japan next year.|我明年會去日本。
worry|v.|/ˈwɜːri/|擔心|Don't worry about it.|別擔心。
appointment|n.|/əˈpɔɪntmənt/|預約|I have a doctor's appointment.|我有預約看醫生。
advice|n.|/ədˈvaɪs/|建議|Can you give me some advice?|你可以給我一些建議嗎？
experience|n.|/ɪkˈspɪriəns/|經驗|It was a great experience.|那是很棒的經驗。
hobby|n.|/ˈhɑːbi/|嗜好|My hobby is photography.|我的嗜好是攝影。
language|n.|/ˈlæŋɡwɪdʒ/|語言|English is a useful language.|英文是有用的語言。
weather|n.|/ˈweðər/|天氣|How is the weather today?|今天天氣如何？
ticket|n.|/ˈtɪkɪt/|票|I need two tickets.|我需要兩張票。
luggage|n.|/ˈlʌɡɪdʒ/|行李|Where can I get my luggage?|我在哪裡領行李？
receipt|n.|/rɪˈsiːt/|收據|Can I have a receipt?|可以給我收據嗎？
direction|n.|/dəˈrekʃən/|方向|Can you give me directions?|你可以告訴我怎麼走嗎？
neighbor|n.|/ˈneɪbər/|鄰居|My neighbor is very kind.|我的鄰居人很好。
meeting|n.|/ˈmiːtɪŋ/|會議|I have a meeting at ten.|我十點有會議。
mistake|n.|/mɪˈsteɪk/|錯誤|I made a mistake.|我犯了一個錯。
reason|n.|/ˈriːzən/|理由|What is the reason?|理由是什麼？
health|n.|/helθ/|健康|Sleep is good for your health.|睡眠對健康有益。
medicine|n.|/ˈmedɪsən/|藥|Take this medicine twice a day.|這個藥一天吃兩次。
headache|n.|/ˈhedeɪk/|頭痛|I have a headache.|我頭痛。
available|adj.|/əˈveɪləbəl/|可用的、有空的|Is this seat available?|這個位子有人坐嗎？
comfortable|adj.|/ˈkʌmftərbəl/|舒服的|This chair is comfortable.|這張椅子很舒服。
convenient|adj.|/kənˈviːniənt/|方便的|The subway is convenient.|地鐵很方便。
crowded|adj.|/ˈkraʊdɪd/|擁擠的|The train is crowded.|火車很擠。
different|adj.|/ˈdɪfrənt/|不同的|We have different ideas.|我們有不同的想法。
important|adj.|/ɪmˈpɔːrtənt/|重要的|This is very important.|這非常重要。
interesting|adj.|/ˈɪntrəstɪŋ/|有趣的|That sounds interesting.|聽起來很有趣。
popular|adj.|/ˈpɑːpjələr/|受歡迎的|This restaurant is popular.|這家餐廳很受歡迎。
possible|adj.|/ˈpɑːsəbəl/|可能的|Is it possible to change it?|有可能更改嗎？
quiet|adj.|/ˈkwaɪət/|安靜的|Can we go somewhere quiet?|我們可以去安靜一點的地方嗎？
noisy|adj.|/ˈnɔɪzi/|吵雜的|It is too noisy here.|這裡太吵了。
clear|adj.|/klɪr/|清楚的|Your voice is very clear.|你的聲音很清楚。
sure|adj.|/ʃʊr/|確定的|Are you sure?|你確定嗎？
usually|adv.|/ˈjuːʒuəli/|通常|I usually get up at seven.|我通常七點起床。
sometimes|adv.|/ˈsʌmtaɪmz/|有時候|Sometimes I walk to work.|我有時候走路上班。
already|adv.|/ɔːlˈredi/|已經|I have already eaten.|我已經吃過了。
together|adv.|/təˈɡeðər/|一起|Let's have lunch together.|我們一起吃午餐吧。
maybe|adv.|/ˈmeɪbi/|也許|Maybe we can meet next week.|也許我們下週可以見面。
instead|adv.|/ɪnˈsted/|作為替代|Can I have tea instead?|我可以改要茶嗎？
because|conj.|/bɪˈkɔːz/|因為|I am late because of the rain.|我因為下雨遲到了。
`,
  B1: `
achieve|v.|/əˈtʃiːv/|達成|She achieved her goal.|她達成了她的目標。
affect|v.|/əˈfekt/|影響|Noise affects my hearing.|噪音影響我的聽力。
avoid|v.|/əˈvɔɪd/|避免|I try to avoid noisy places.|我盡量避開吵雜的地方。
compare|v.|/kəmˈper/|比較|Let's compare the two plans.|我們來比較這兩個計畫。
consider|v.|/kənˈsɪdər/|考慮|I am considering a new job.|我正在考慮換工作。
depend|v.|/dɪˈpend/|取決於、依賴|It depends on the weather.|這要看天氣而定。
develop|v.|/dɪˈveləp/|發展、培養|Reading develops your vocabulary.|閱讀能培養你的字彙量。
discuss|v.|/dɪˈskʌs/|討論|We need to discuss this problem.|我們需要討論這個問題。
encourage|v.|/ɪnˈkɜːrɪdʒ/|鼓勵|My teacher encourages me to speak.|我的老師鼓勵我開口說。
increase|v./n.|/ɪnˈkriːs/|增加|Prices have increased this year.|今年物價上漲了。
reduce|v.|/rɪˈduːs/|減少|We should reduce waste.|我們應該減少浪費。
manage|v.|/ˈmænɪdʒ/|設法做到、管理|I managed to finish on time.|我設法準時完成了。
mention|v.|/ˈmenʃən/|提到|He mentioned your name.|他提到了你的名字。
provide|v.|/prəˈvaɪd/|提供|The hotel provides free breakfast.|這家飯店提供免費早餐。
realize|v.|/ˈriːəlaɪz/|發覺、了解到|I realized I was wrong.|我發覺我錯了。
recommend|v.|/ˌrekəˈmend/|推薦|Can you recommend a good restaurant?|你可以推薦好餐廳嗎？
require|v.|/rɪˈkwaɪər/|需要、要求|This job requires experience.|這份工作需要經驗。
solve|v.|/sɑːlv/|解決|We solved the problem together.|我們一起解決了問題。
suggest|v.|/səɡˈdʒest/|建議|I suggest taking a taxi.|我建議搭計程車。
support|v./n.|/səˈpɔːrt/|支持|My family supports my decision.|我的家人支持我的決定。
advantage|n.|/ədˈvæntɪdʒ/|優點|One advantage is the low cost.|一個優點是成本低。
disadvantage|n.|/ˌdɪsədˈvæntɪdʒ/|缺點|The main disadvantage is the noise.|主要的缺點是噪音。
attitude|n.|/ˈætɪtuːd/|態度|He has a positive attitude.|他的態度很正面。
behavior|n.|/bɪˈheɪvjər/|行為|Children learn behavior from parents.|孩子從父母身上學習行為。
challenge|n.|/ˈtʃælɪndʒ/|挑戰|Learning a language is a challenge.|學語言是一項挑戰。
community|n.|/kəˈmjuːnəti/|社區、社群|I live in a friendly community.|我住在一個友善的社區。
culture|n.|/ˈkʌltʃər/|文化|I am interested in other cultures.|我對其他文化有興趣。
education|n.|/ˌedʒuˈkeɪʃən/|教育|Education changes lives.|教育改變人生。
environment|n.|/ɪnˈvaɪrənmənt/|環境|We must protect the environment.|我們必須保護環境。
government|n.|/ˈɡʌvərnmənt/|政府|The government made a new law.|政府制定了新法律。
knowledge|n.|/ˈnɑːlɪdʒ/|知識|Reading gives you knowledge.|閱讀帶給你知識。
opinion|n.|/əˈpɪnjən/|意見|In my opinion, it is a good idea.|依我看，這是好主意。
opportunity|n.|/ˌɑːpərˈtuːnəti/|機會|This is a great opportunity.|這是很好的機會。
relationship|n.|/rɪˈleɪʃənʃɪp/|關係|They have a close relationship.|他們關係很親近。
situation|n.|/ˌsɪtʃuˈeɪʃən/|情況|The situation is getting better.|情況正在好轉。
society|n.|/səˈsaɪəti/|社會|Technology changes society.|科技改變社會。
technology|n.|/tekˈnɑːlədʒi/|科技|Technology makes life easier.|科技讓生活更便利。
common|adj.|/ˈkɑːmən/|常見的|This is a common mistake.|這是常見的錯誤。
necessary|adj.|/ˈnesəseri/|必要的|It is necessary to practice daily.|每天練習是必要的。
similar|adj.|/ˈsɪmələr/|相似的|Our ideas are similar.|我們的想法很相似。
`,
  IELTS: `
analyze|v.|/ˈænəlaɪz/|分析|We need to analyze the data.|我們需要分析資料。
argue|v.|/ˈɑːrɡjuː/|主張、爭論|Some people argue that cities are too crowded.|有些人主張城市太擁擠。
benefit|n./v.|/ˈbenɪfɪt/|好處；受益|Exercise has many benefits.|運動有很多好處。
consequence|n.|/ˈkɑːnsəkwens/|後果|Pollution has serious consequences.|污染有嚴重的後果。
contribute|v.|/kənˈtrɪbjuːt/|促成、貢獻|Cars contribute to air pollution.|汽車是空氣污染的成因之一。
decline|v./n.|/dɪˈklaɪn/|下降|Sales declined sharply last year.|去年銷售額急遽下降。
demonstrate|v.|/ˈdemənstreɪt/|顯示、證明|The chart demonstrates a clear trend.|圖表顯示出明確的趨勢。
significant|adj.|/sɪɡˈnɪfɪkənt/|顯著的、重大的|There was a significant increase.|有顯著的增加。
evidence|n.|/ˈevɪdəns/|證據|There is strong evidence for this view.|這個觀點有強力的證據。
factor|n.|/ˈfæktər/|因素|Cost is an important factor.|成本是重要因素。
impact|n.|/ˈɪmpækt/|影響、衝擊|Social media has a huge impact on young people.|社群媒體對年輕人影響巨大。
issue|n.|/ˈɪʃuː/|議題、問題|Housing is a major issue in big cities.|住房是大城市的重大議題。
maintain|v.|/meɪnˈteɪn/|維持|It is hard to maintain a healthy lifestyle.|維持健康的生活方式很難。
majority|n.|/məˈdʒɔːrəti/|大多數|The majority of students agree.|大多數學生同意。
policy|n.|/ˈpɑːləsi/|政策|The new policy will reduce traffic.|新政策將減少交通流量。
proportion|n.|/prəˈpɔːrʃən/|比例|A large proportion of people work from home.|很大比例的人在家工作。
resource|n.|/ˈriːsɔːrs/|資源|Water is a limited resource.|水是有限的資源。
trend|n.|/trend/|趨勢|The graph shows an upward trend.|圖表顯示上升的趨勢。
whereas|conj.|/ˌwerˈæz/|然而、相較之下|Some prefer cities, whereas others prefer the countryside.|有些人偏好城市，而另一些人偏好鄉村。
furthermore|adv.|/ˈfɜːrðərmɔːr/|此外|Furthermore, it saves time.|此外，它還節省時間。
nevertheless|adv.|/ˌnevərðəˈles/|儘管如此|Nevertheless, the plan has some risks.|儘管如此，這計畫仍有風險。
therefore|adv.|/ˈðerfɔːr/|因此|Therefore, I agree with this view.|因此，我同意這個觀點。
approximately|adv.|/əˈprɑːksɪmətli/|大約|Approximately half of the people agreed.|大約一半的人同意。
essential|adj.|/ɪˈsenʃəl/|不可或缺的|Sleep is essential for learning.|睡眠對學習不可或缺。
sustainable|adj.|/səˈsteɪnəbəl/|永續的|We need sustainable energy.|我們需要永續能源。
controversial|adj.|/ˌkɑːntrəˈvɜːrʃəl/|有爭議的|It is a controversial topic.|這是有爭議的話題。
fluctuate|v.|/ˈflʌktʃueɪt/|波動|Prices fluctuated during the year.|價格在這一年中波動。
urban|adj.|/ˈɜːrbən/|都市的|Urban areas are growing quickly.|都市地區快速成長。
perspective|n.|/pərˈspektɪv/|觀點、角度|Try to see it from another perspective.|試著從另一個角度看。
phenomenon|n.|/fəˈnɑːmɪnɑːn/|現象|This is a global phenomenon.|這是全球性的現象。
`,
};

const LEVELS = [
  ['A1', '基礎'], ['A2', '初級'], ['B1', '中級'], ['IELTS', '學術'], ['MY', '自訂'],
];
