//various counters
let rounds = 0;
let playerWins = 0;
let computerWins = 0;
let draws = 0;

let handsCountPlayer = { //associative array
    "グー": 4,
    "チョキ": 4,
    "パー": 4
};

let handsCountComputer = { //associative array
    "グー": 4,
    "チョキ": 4,
    "パー": 4
};

function play(playerHand) { //Ran on clicking the buttons

    if (handsCountPlayer[playerHand] > 0) { //Get hands count from the associative array
        let computerHand = getRandomHand(); 

        handsCountPlayer[playerHand]--;
        handsCountComputer[computerHand]--;
        rounds++;

        let result = judge(playerHand, computerHand);
        updateHandImages(playerHand, computerHand);
        // document.getElementById('resultMessage').innerText = "カイジ: " + playerHand + ", 船井: " + computerHand + " -> " + result;
        updateScore(result);
        updateHandsCountDisplay();

        if (rounds === 12) {
            showFinalResult();
        }
    } else {
        // document.getElementById('message').innerText = playerHand + " の回数が残っていません。";
    }
}

function getRandomHand() { //The most difficult part, get random hand from available hands
    let availableHands = Object.keys(handsCountComputer).filter(hand => handsCountComputer[hand] > 0); 
                        //Get all of the keys              <=>   func(hand) return hCC[hand] > 0
    // if (availableHands.length === 0) return null;
    return availableHands[Math.floor(Math.random() * availableHands.length)];
}

function judge(playerHand, computerHand) {
    if (playerHand === computerHand) return "引き分け";

    if (
        (playerHand === "グー" && computerHand === "チョキ") ||
        (playerHand === "チョキ" && computerHand === "パー") ||
        (playerHand === "パー" && computerHand === "グー")
    ) {
        return "勝ち";
    } else {
        // document.getElementById("zawazawaleft").show();
        return "負け";
    }
}

function updateScore(result) {
    if (result === "勝ち") {
        playerWins++;
    } else if (result === "負け") {
        computerWins++;
    } else {
        draws++;
    }

    document.getElementById('kaijiscore').innerText = "カイジ " + playerWins + " 勝";
    document.getElementById('funaiscore').innerText = "船井 " + computerWins + " 勝";
}

function updateHandsCountDisplay() {
    document.getElementById('handsCountPlayerMessageKaijiGu').innerText = "残り枚数 " + handsCountPlayer["グー"];
    document.getElementById('handsCountPlayerMessageKaijiChoki').innerText = "残り枚数 " + handsCountPlayer["チョキ"];
    document.getElementById('handsCountPlayerMessageKaijiPa').innerText = "残り枚数 " + handsCountPlayer["パー"];

    document.getElementById('handsCountComputerMessageFunaiGu').innerText = "残り枚数 " + handsCountComputer["グー"];
    document.getElementById('handsCountComputerMessageFunaiChoki').innerText = "残り枚数 " + handsCountComputer["チョキ"];
    document.getElementById('handsCountComputerMessageFunaiPa').innerText = "残り枚数 " + handsCountComputer["パー"];
}

function showFinalResult() {
    if (playerWins > computerWins) {
        document.getElementById('finalResultLeft').innerText = "カイジ、勝利っ...!";
        document.getElementById('finalResultRight').innerText = "悪魔的勝利...っ!!!\n掴んだ...僥倖!!!!!";
    } else if (playerWins < computerWins) {
        document.getElementById('finalResultLeft').innerText = "負けっ!\n敗北っ!!\n大敗っ!!!";
        document.getElementById('finalResultRight').innerText = "とどのつまり...\n圧倒的大敗っ...!!!";
    } else {
        document.getElementById('finalResultLeft').innerText = "引き分けっ...!";
        document.getElementById('finalResultRight').innerText = "勝負、つかず...!"
    }
}

function updateHandImages(playerHand, computerHand) {
    const handImagePaths = {
        "グー": "./img/gu.jpg",
        "チョキ": "./img/choki.jpg",
        "パー": "./img/pa.jpg"
    };

    const playerHandImageElem = document.getElementById('kaijihand');
    const computerHandImageElem = document.getElementById('funaihand');

    playerHandImageElem.src = handImagePaths[playerHand];
    computerHandImageElem.src = handImagePaths[computerHand];
}