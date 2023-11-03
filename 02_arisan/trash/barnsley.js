const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
ctx.fillStyle = 'green';

let x = 0, y = 0;
let iterations = 0;
const maxIterations = 100000; // 描画する点の数
let intervalId; // setIntervalのIDを保存する

function plot(x, y) {
  const canvasX = Math.floor(width / 2 + x * width / 10);
  const canvasY = Math.floor(height - y * height / 10);
  ctx.fillRect(canvasX, canvasY, 1, 1);
}

function drawBarnsley() {
  if (iterations < maxIterations) {
    iterations++;
    const r = Math.random();

    // 確率に基づいて変換を選択
    if (r < 0.01) {
      [x, y] = [0, 0.16 * y];
    } else if (r < 0.86) {
      [x, y] = [0.85 * x + 0.04 * y, -0.04 * x + 0.85 * y + 1.6];
    } else if (r < 0.93) {
      [x, y] = [0.20 * x - 0.26 * y, 0.23 * x + 0.22 * y + 1.6];
    } else {
      [x, y] = [-0.15 * x + 0.28 * y, 0.26 * x + 0.24 * y + 0.44];
    }

    plot(x, y);
  } else {
    clearInterval(intervalId); // 最大繰り返し数に達したら、setIntervalをクリア
  }
}

document.getElementById('drawButton').onclick = function() {
  ctx.clearRect(0, 0, width, height); // 以前のフラクタル画像をクリア
  iterations = 0; // 繰り返し回数をリセット
  x = 0; // xの位置をリセット
  y = 0; // yの位置をリセット
  if (intervalId) {
    clearInterval(intervalId); // 前の描画がまだ実行中の場合はクリア
  }
  intervalId = setInterval(drawBarnsley, 0); // フラクタルの描画を開始
};
