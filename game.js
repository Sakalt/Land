let coins = 1000;
let workers = 0;
let merchants = 0;
let customers = 0;
let experience = 0;
let level = 1;
const ingredients = {
    rice: 0,
    grass: 0,
    sakura: 0,
    cowMilk: 0,
    strawberry: 0,
    banana: 0
};
const processedItems = {
    dango: 0,
    uirou: 0,
    strawberryMilk: 0,
    bananaMilk: 0
};
const processingTimes = {
    dango: 5000, // 5秒
    uirou: 10000, // 10秒
    strawberryMilk: 15000, // 15秒
    bananaMilk: 15000 // 15秒
};
const itemValues = {
    dango: 10,
    uirou: 20,
    strawberryMilk: 30,
    bananaMilk: 30
};
let workerCost = 500;
let fruitBarPurchased = false;

function startGame() {
    document.getElementById('game').style.display = 'block';
    updateUI();
}

function buyWorker() {
    if (coins >= workerCost) {
        workers++;
        coins -= workerCost;
        workerCost = Math.round(workerCost * 1.1); // 次のめんだこさんの価格をアップ
        updateUI();
    } else {
        alert('コインが不足しています。');
    }
}

function buyItem() {
    document.getElementById('shop').style.display = 'block';
}

function buyItemFromShop(item) {
    const prices = {
        rice: 10,
        grass: 5,
        sakura: 30,
        cow: 100,
        strawberry: 20,
        banana: 25
    };
    if (coins >= prices[item]) {
        coins -= prices[item];
        ingredients[item]++;
        updateUI();
    } else {
        alert('コインが不足しています。');
    }
}

function buyFruitBar() {
    const price = 2000;
    if (coins >= price) {
        coins -= price;
        fruitBarPurchased = true;
        document.getElementById('fruitBarMenu').style.display = 'block';
        updateUI();
    } else {
        alert('コインが不足しています。');
    }
}

function processItem() {
    const item = prompt('加工するアイテムを選んでください:\n1: だんご\n2: ういろう\n3: イチゴおれ\n4: バナナミルク');
    if (!item) return;

    switch (item) {
        case '1':
            if (ingredients.rice > 0 && ingredients.grass > 0 && workers > 0) {
                setTimeout(() => {
                    processedItems.dango++;
                    ingredients.rice--;
                    ingredients.grass--;
                    experience += itemValues.dango;
                    levelUp();
                    saveGame();
                    updateUI();
                }, processingTimes.dango);
            } else {
                alert('素材が不足しているか、めんだこさんが必要です。');
            }
            break;
        case '2':
            if (ingredients.rice > 0 && ingredients.sakura > 0 && level >= 4 && workers > 0) {
                setTimeout(() => {
                    processedItems.uirou++;
                    ingredients.rice--;
                    ingredients.sakura--;
                    experience += itemValues.uirou;
                    levelUp();
                    saveGame();
                    updateUI();
                }, processingTimes.uirou);
            } else {
                alert('素材が不足しているか、レベルが足りないか、めんだこさんが必要です。');
            }
            break;
        case '3':
            if (ingredients.strawberry > 0 && ingredients.cowMilk > 0 && level >= 6 && workers > 0) {
                setTimeout(() => {
                    processedItems.strawberryMilk++;
                    ingredients.strawberry--;
                    ingredients.cowMilk--;
                    experience += itemValues.strawberryMilk;
                    levelUp();
                    saveGame();
                    updateUI();
                }, processingTimes.strawberryMilk);
            } else {
                alert('素材が不足しているか、レベルが足りないか、めんだこさんが必要です。');
            }
            break;
        case '4':
            if (ingredients.banana > 0 && ingredients.cowMilk > 0 && level >= 6 && workers > 0) {
                setTimeout(() => {
                    processedItems.bananaMilk++;
                    ingredients.banana--;
                    ingredients.cowMilk--;
                    experience += itemValues.bananaMilk;
                    levelUp();
                    saveGame();
                    updateUI();
                }, processingTimes.bananaMilk);
            } else {
                alert('素材が不足しているか、レベルが足りないか、めんだこさんが必要です。');
            }
            break;
        default:
            alert('無効な選択です。');
    }
}

function levelUp() {
    if (experience >= level * 100) { // レベルごとの経験値
        level++;
        experience = 0;
        // 新しい機能の解放など
        updateUI();
    }
}

function saveGame() {
    localStorage.setItem('gameState', JSON.stringify({
        coins,
        workers,
        merchants,
        customers,
        experience,
        level,
        ingredients,
        processedItems,
        fruitBarPurchased
    }));
}

function loadGame() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const state = JSON.parse(savedState);
        coins = state.coins;
        workers = state.workers;
        merchants = state.merchants;
        customers = state.customers;
        experience = state.experience;
        level = state.level;
        Object.assign(ingredients, state.ingredients);
        Object.assign(processedItems, state.processedItems);
        fruitBarPurchased = state.fruitBarPurchased;
        updateUI();
    }
}

function exportMap() {
    // マップデータをエクスポートするロジック
}

function loadMap() {
    // マップデータを読み込むロジック
}

function updateUI() {
    document.getElementById('coinDisplay').textContent = `コイン: ${coins}`;
    document.getElementById('workerStatus').textContent = `めんだこさん: ${workers} (価格: ${workerCost}コイン)`;
    document.getElementById('merchantStatus').textContent = `商人: ${merchants}`;
    document.getElementById('customerStatus').textContent = `お客さん: ${customers}`;
    document.getElementById('expDisplay').textContent = `経験値: ${experience}`;
    document.getElementById('levelDisplay').textContent = `レベル: ${level}`;
    document.getElementById('ingredientStatus').textContent = `素材: 米(${ingredients.rice}), 草(${ingredients.grass}), 桜(${ingredients.sakura}), 牛乳(${ingredients.cowMilk}), イチゴ(${ingredients.strawberry}), バナナ(${ingredients.banana})`;
    document.getElementById('processedStatus').textContent = `加工品: だんご(${processedItems.dango}), ういろう(${processedItems.uirou}), イチゴおれ(${processedItems.strawberryMilk}), バナナミルク(${processedItems.bananaMilk})`;
    document.getElementById('fruitBarMenu').style.display = fruitBarPurchased ? 'block' : 'none';
}

document.getElementById('ui').querySelector('button').addEventListener('click', startGame);
document.querySelector('button[onclick="buyWorker()"]').addEventListener('click', buyWorker);
document.querySelector('button[onclick="buyItem()"]').addEventListener('click', buyItem);
document.querySelector('button[onclick="buyFruitBar()"]').addEventListener('click', buyFruitBar);
document.querySelector('button[onclick="processItem()"]').addEventListener('click', processItem);
document.querySelector('button[onclick="exportMap()"]').addEventListener('click', exportMap);
document.querySelector('button[onclick="loadMap()"]').addEventListener('click', loadMap);

// ゲーム開始時に保存された状態を読み込む
window.onload = loadGame;
// 既存のゲーム状態の変数と関数の下に追加
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gridSize = 40; // 1ブロックのサイズ

// キャンバスに世界を描画する関数
function drawWorld() {
    // 背景（空）
    ctx.fillStyle = '#87CEEB'; // 空の色
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 地面
    ctx.fillStyle = '#228B22'; // 地面の色
    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = canvas.height / 2; y < canvas.height; y += gridSize) {
            ctx.fillRect(x, y, gridSize, gridSize);
        }
    }

    // グリッド線
    ctx.strokeStyle = '#CCCCCC';
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// ゲーム開始時に世界を描画
function startGame() {
    document.getElementById('game').style.display = 'block';
    drawWorld(); // 世界の描画
    updateUI();
}
