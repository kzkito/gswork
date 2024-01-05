
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

$(document).ready(function() {
    let dbRef;

    $('#send').on('click', async function() {
        const vocab = $('#vocab').val();
        console.log(vocab, 'content of vocab');

        let data;
        try {
            const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + vocab;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
            return;
        }

        const spelling = data[0].word;
        const phoneticsText = data[0].phonetics[0]?.text || 'Not available';

        let allDefinitions = [];
        data[0].meanings.forEach(meaning => {
            meaning.definitions.forEach(def => {
                allDefinitions.push({
                    definition: def.definition,
                    example: def.example || 'Not available',
                    synonyms: def.synonyms || [],
                    antonyms: def.antonyms || []
                });
            });
        });

        dbRef = ref(db, 'words/' + vocab);

        const msg = {
            vocab: spelling,
            phonetic: phoneticsText,
            def: allDefinitions
        };

        const newPostRef = push(dbRef);
        await set(newPostRef, msg);

        onChildAdded(dbRef, function (data) {
            const msg = data.val();
            const key = data.key;

            let html = `
                <div class=${key}>
                    <p>${msg.vocab}</p>
                </div>`;

            $('#output').append(html);
        });
    });
});