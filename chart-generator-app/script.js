// チャートデータを格納するオブジェクト
let chartData = {
  labels: [], // ラベルの配列
  datasets: [
    {
      label: '値', // データセットのラベル
      data: [], // データの配列
      backgroundColor: [], // 背景色の配列
      borderColor: [], // 枠線色の配列
      borderWidth: 1, // 枠線の幅
    },
  ],
};

// チャートを作成する関数
function createChart(type, height = 400) {
  const canvasContainer = document.getElementById('canvas-container'); // キャンバスコンテナを取得
  canvasContainer.innerHTML = `<canvas id="myChart"></canvas>`; // コンテナ内にキャンバス要素を作成
  canvasContainer.style.height = `${height}px`; // コンテナの高さを設定

  const ctx = document.getElementById('myChart').getContext('2d'); // キャンバスの描画コンテキストを取得
  return new Chart(ctx, {
    // 新しいチャートを作成して返す
    type: type,
    data: chartData,
    option: {
      scales: {
        y: {
          beginAtZero: true, // Y軸はゼロから始まる
        },
      },
      onClick: (event, activeElements) => {
        // クリックイベント
        if (activeElements.length > 0) {
          const { datasetIndex, index } = activeElements[0];
          removeData(datasetIndex, index); // データを削除
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'index',
        intersect: false,
      },
    },
  });
}

let myChart = createChart('bar'); // 初期チャートを作成（デフォルトの高さ=400）

// ランダムな色を生成する関数
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]; // 16進数のランダムな値を追加
  }
  return hexToRgbA(color); // RGBA形式に変換
}

// HEXカラーをRGBAに変換する関数
function hexToRgbA(hex) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0.5)`; // 半透明のRGBAカラーを返す
}

// データを追加する関数
function addData() {
  const labelInput = document.getElementById('labelInput'); // ラベル入力要素を取得
  const dataInput = document.getElementById('dataInput'); // データ入力要素を取得

  if (labelInput.value && dataInput.value) {
    let color = getRandomColor(); // ランダムな色を生成
    chartData.labels.push(labelInput.value); // ラベルを追加
    chartData.datasets.forEach((dataset) => {
      dataset.data.push(dataInput.value); // データを追加
      dataset.backgroundColor.push(color); // 背景色にRGBAカラーを設定
      dataset.borderColor.push(color.replace('0.5', '1')); // 枠線色に不透明なカラーを設定
    });
    myChart.update(); // チャートを更新
    labelInput.value = ''; // 入力フィールドをリセット
    dataInput.value = ''; // 入力フィールドをリセット
  }
}

// チャートの種類を変更する関数
function updateChartType() {
  const selectedType = document.getElementById('chartType').value; // 選択されたチャートタイプを取得
  myChart.destroy(); // 古いチャートを破棄
  myChart = createChart(selectedType); // 新しいチャートを作成
}

// データを削除する関数
function removeData(datasetIndex, index) {
  if (chartData.labels.length > index) {
    chartData.labels.splice(index, 1); // ラベルを削除
    chartData.datasets[datasetIndex].data.splice(index, 1); // データを削除
    myChart.update(); // チャートを更新
  }
}

// データをリセットする関数
function resetData() {
  chartData.labels = []; // ラベルをリセット
  chartData.datasets.forEach((dataset) => {
    dataset.data = []; // データをリセット
    dataset.backgroundColor = []; // 背景色をリセット
    dataset.borderColor = []; // 枠線色をリセット
  });
  myChart.update(); // チャートを更新
}

// チャートをダウンロードする関数
function downloadChart() {
  const canvas = document.getElementById('myChart'); // キャンバス要素を取得
  const dataURL = canvas.toDataURL('image/png'); // PNG画像としてデータURLを作成
  const link = document.createElement('a'); // 新しいリンク要素を作成
  link.download = 'chart.png'; // ダウンロードファイル名を設定
  link.href = dataURL; // リンクのhrefにデータURLを設定
  link.click(); // リンクをクリック（ダウンロード開始）
}
