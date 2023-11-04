const canvas = document.getElementById('walkCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

let x = width / 2; // Set the beginning at the center on the canvas
let y = height / 2; 
const stepSize = 20; // Size of one step

ctx.fillStyle = 'black';

// Plot a dot
function plotDot(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI); // Draw a circle with radius 2
    ctx.fill();
}

// ランダムウォークを描画する関数
function arisanWalk() {
    const direction = Math.floor(Math.random() * 8);

    // 選択された方向に基づいてxとyの値を更新
    switch (direction) {
        case 0:
            y -= stepSize; // Top
            break;
        case 1:
            y += stepSize; // Bottom
            break;
        case 2:
            x -= stepSize; // Left
            break;
        case 3:
            x += stepSize; // Right
            break;
        case 4:
            x += stepSize/Math.sqrt(stepSize);
            y -= stepSize/Math.sqrt(stepSize);// Top-right
            break;
        case 5:
            x += stepSize/Math.sqrt(stepSize); 
            y += stepSize/Math.sqrt(stepSize);// Bottom-right
            break;
        case 6:
            x -= stepSize/Math.sqrt(stepSize); 
            y += stepSize/Math.sqrt(stepSize);// Bottom-left
            break;
        case 7:
            x -= stepSize/Math.sqrt(stepSize); 
            y -= stepSize/Math.sqrt(stepSize);// Top-left
            break;  
    }

    // 新しい位置に点をプロット
    plotDot(x, y);

    // 次の描画を予約
    requestAnimationFrame(arisanWalk);
}

// ボタンがクリックされたら、ランダムウォークを開始
document.getElementById('startButton').onclick = function() {
    ctx.clearRect(0, 0, width, height); // キャンバスをクリア
    x = width / 2; // xの位置をリセット
    y = height / 2; // yの位置をリセット
    arisanWalk(); // ありさんウォークを開始
};
