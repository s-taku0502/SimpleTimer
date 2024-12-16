// タイマーの状態を管理するための変数
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer;
let isRunning = false;

// DOM要素の取得
const timerElement = document.querySelector('.timer');
const start = document.getElementById("Start");
const stop = document.getElementById("Stop"); 
const reset = document.getElementById("Reset");

// ボタンの初期状態を設定
const updateButtonStates = (startState, stopState, resetState) => {
    start.disabled = startState;
    stop.disabled = stopState;
    reset.disabled = resetState;
};

// タイマー表示を更新する関数
const updateTimerDisplay = () => {
    timerElement.textContent = [hours, minutes, seconds]
        .map(num => String(num).padStart(2, '0'))
        .join(':');
};

// 初期状態の設定
updateButtonStates(false, true, true);

// スタートボタンのイベントリスナー
start.addEventListener('click', () => {
    if (isRunning) return;
    
    isRunning = true;
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
        updateTimerDisplay();
    }, 1000);
    
    updateButtonStates(true, false, false);
});

// ストップボタンのイベントリスナー
stop.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    updateButtonStates(false, true, false);
});

// リセットボタンのイベントリスナー
reset.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    seconds = minutes = hours = 0;
    updateTimerDisplay();
    updateButtonStates(false, true, true);
});