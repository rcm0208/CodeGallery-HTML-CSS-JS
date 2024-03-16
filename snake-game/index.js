const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i');
const modal = document.getElementById('modal');
const btn = document.getElementById('modal-btn');

let gameOver = false; // ゲームオーバー判定用フラグ
let foodX, foodY; // エサの位置
// ヘビの初期位置
let snakeX = 5,
  snakeY = 5;
// ヘビの移動速度（方向
let velocityX = 0,
  velocityY = 0;
let snakeBody = []; // ヘビの体の座標を格納する配列
let setIntervalId;
let score = 0; // 現在のスコア

// ローカルストレージから最高スコアを取得
let highScore = localStorage.getItem('high-score') || 0;
highScoreElement.innerText = `最高スコア： ${highScore}`;

// エサの位置を1から30の間でランダムに更新する関数
const updateFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

// ゲームオーバー時の処理を行う関数
const handleGameOver = () => {
  clearInterval(setIntervalId); // ゲームの進行を停止
  modal.style.display = 'block'; // モーダルを表示
};

// モーダルのボタンがクリックされたときの動作
btn.onclick = function () {
  modal.style.display = 'none'; // モーダルを非表示
  location.reload(); // ページをリロード（ゲームリセット）
};

// キークリックに基づいて速度値を変更
const changeDirection = (e) => {
  if (e.key === 'ArrowUp' && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === 'ArrowDown' && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === 'ArrowLeft' && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === 'ArrowRight' && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

// 各キークリックで方向を変更
controls.forEach((button) =>
  button.addEventListener('click', () => changeDirection({ key: button.dataset.key }))
);

const initGame = () => {
  if (gameOver) return handleGameOver();
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // ヘビがエサを食べたとき
  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodY, foodX]); // ヘビの体配列にエサを追加
    score++;
    highScore = score >= highScore ? score : highScore; // スコア > ハイスコア の場合、ハイスコア = スコア

    localStorage.setItem('high-score', highScore);
    scoreElement.innerText = `スコア： ${score}`;
    highScoreElement.innerText = `最高スコア： ${highScore}`;
  }

  // ヘビの頭を更新
  snakeX += velocityX;
  snakeY += velocityY;

  // ヘビの体の要素の値を一つ前にシフト
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  // ヘビの体が壁から出ていないかチェック
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return (gameOver = true);
  }

  // ヘビの体の各部分に対してdivを追加
  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    // ヘビの頭が体に当たったかどうかをチェック
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
    }
  }
  playBoard.innerHTML = html;
};

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener('keyup', changeDirection);
