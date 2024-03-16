const colorOne = document.getElementById('color-a'); // 一つ目の色の入力フィールド
const colorTwo = document.getElementById('color-b'); // 二つ目の色の入力フィールド
let currentDirection = 'to bottom'; // 初期のグラデーションの方向
const outputCode = document.getElementById('code'); // グラデーションコードを表示するテキストエリア

// ランダムな色を生成する関数
function getRandomColor() {
  // ランダムな16進6桁の色コードを生成
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
}

// グラデーションのCSSコードを生成して表示する関数
function generateCode() {
  // CSSのlinear-gradientプロパティを生成
  const gradient = `linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
  // CSSコードを出力エリアに表示
  outputCode.value = `background-image: ${gradient}`;
  // ページの背景を更新
  document.body.style.backgroundImage = gradient;
}

// 背景を更新する関数
function updateGradient() {
  generateCode();
}

// ボタンがクリックされた時の方向を設定し、背景を更新する関数
function setDirection(value, _this) {
  // 全てのボタンから'active'クラスを削除
  [...document.querySelectorAll('.buttons button')].forEach((button) =>
    button.classList.remove('active')
  );
  // クリックされたボタンに'active'クラスを追加
  _this.classList.add('active');
  // グラデーションの方向を更新
  currentDirection = value;
  // 背景を更新
  updateGradient();
}

// ランダムな色を選択して背景を更新する関数
function randomizeColors() {
  // 色の値をランダム生成されたものに更新
  colorOne.value = getRandomColor();
  colorTwo.value = getRandomColor();
  updateGradient();
}

// トースト通知を表示する関数
function showToastNotification() {
  // トースト通知要素を取得
  const toast = document.getElementById('toast');
  // トースト通知を表示
  toast.className = 'show';
  // 3秒後にトースト通知を非表示にする
  setTimeout(() => (toast.className = ''), 3000);
}

// コピー機能の関数
function copyText() {
  // CSSコードを選択
  outputCode.select();
  // 選択したテキストをクリップボードにコピー
  document.execCommand('copy');
  // コピー成功のトースト通知を表示
  showToastNotification();
}

// ページが読み込まれた時に実行される関数
window.onload = function () {
  // 色が変更されたときに、updateGradient関数を呼び出す
  colorOne.addEventListener('input', updateGradient);
  colorTwo.addEventListener('input', updateGradient);
  // 初期ロード時に背景を更新
  updateGradient();
};
