// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
    from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = config;

const app = initializeApp(firebaseConfig);
const db = getDatabase(app); //RealtimeDBに接続
const dbRef = ref(db, 'list');
    
$('#send').on('click', async function() {
    const vocab = $('#vocab').val();

    console.log(vocab, 'content of vocab');
    
    let info; //API返答格納用
    // APIにPOSTリクエストを送信
    try {
        const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + vocab
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        info = await response.json();
        // 単語が存在しない場合はサクセスだがエラーなしなので、その場合は登録させない処理
        console.log('Success:', info);
    } catch (error) {
        console.error('Error:', error);
        return;
    }

    //APIからの返答
    const spelling = info[0].word;
    const phoneticsText = info[0].phonetics[0]?.text || 'Not available';
    let allDefinitions = [];
    info[0].meanings.forEach(meaning => {
        meaning.definitions.forEach(def => {
        allDefinitions.push({
            definition: def.definition,
            example: def.example || 'Not available',
            synonyms: def.synonyms || 'Not available',
            antonyms: def.antonyms || 'Not available'
        });
        });
    });

    // Firebaseデータベースにデータを登録
    const msg = {
        vocab: spelling,
        phonetic: phoneticsText,
        def: allDefinitions,
    };
    console.log('msg', msg)
    
    const newPostRef = push(dbRef);
    await set(newPostRef, msg);
    
});

onChildAdded(dbRef, function (data) {
    const msg = data.val();
    const key = data.key;
    
    let html = `
    <div class="card ${key}">
    <p>${msg.vocab}</p>
    <p>${msg.phonetic}</p>
    <p>${msg.def[0].definition}</p>
    <p>${msg.def[1].definition}</p>
   
    </div>  `

    // <p>${msg.def[0].synonyms}</p>
    // <p>${msg.def[0].antonyms}</p>
    // <p>${msg.def[0].example}</p> 

    console.log('html',html)
    // 画面に表示する
    $('#output').append(html)
});

$('#delete-all').on('click', function() {
    set(dbRef, null); //全て削除
    $('#output').empty(); // HTML全てクリア
});
