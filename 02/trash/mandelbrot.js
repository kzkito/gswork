document.getElementById('drawButton').onclick = drawMandelbrot;

const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');

const maxIter = 1000; // 最大の繰り返し回数
const zoom = 200; // ズームレベル
const panX = 2; // X方向のパン
const panY = 1.5; // Y方向のパン

function drawMandelbrot() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 以前のフラクタル画像をクリア
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      let realComponentOfResult = (x - canvas.width / 2.0) / zoom - panX;
      let imaginaryComponentOfResult = (y - canvas.height / 2.0) / zoom - panY;
      
      let iterations = 0;
      let realComponentOfZ = 0;
      let imaginaryComponentOfZ = 0;
      
      while (
        iterations < maxIter &&
        realComponentOfZ * realComponentOfZ + imaginaryComponentOfZ * imaginaryComponentOfZ < 4
      ) {
        const tempRealComponent = realComponentOfZ * realComponentOfZ - imaginaryComponentOfZ * imaginaryComponentOfZ + realComponentOfResult;
        imaginaryComponentOfZ = 2 * realComponentOfZ * imaginaryComponentOfZ + imaginaryComponentOfResult;
        realComponentOfZ = tempRealComponent;
        iterations++;
      }
      
      // 色の計算
      const color = iterations === maxIter ? 0 : (iterations / maxIter) * 360;

      // ピクセルに色を設定
      ctx.fillStyle = `hsl(${color}, 100%, 50%)`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}
