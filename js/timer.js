// タイマーの状態を管理するための変数
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer;
let isRunning = false;
let isCountDown = false;

// DOM要素の取得
const timerElement = document.querySelector('.timer');
const start = document.getElementById("Start");
const stop = document.getElementById("Stop"); 
const reset = document.getElementById("Reset");
const inputHours = document.getElementById("hours");
const inputMinutes = document.getElementById("minutes");
const inputSeconds = document.getElementById("seconds");

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

// 入力値を取得する関数
const getInputValues = () => {
    hours = parseInt(inputHours.value) || 0;
    minutes = parseInt(inputMinutes.value) || 0;
    seconds = parseInt(inputSeconds.value) || 0;
    isCountDown = hours > 0 || minutes > 0 || seconds > 0;
    updateTimerDisplay();
};

// 入力フィールドの値が変更されたときのイベントリスナー
inputHours.addEventListener('change', getInputValues);
inputMinutes.addEventListener('change', getInputValues);
inputSeconds.addEventListener('change', getInputValues);

// 初期状態の設定
updateButtonStates(false, true, true);

// スタートボタンのイベントリスナー
start.addEventListener('click', () => {
    if (isRunning) return;
    
    // タイマー開始時に入力値を取得
    getInputValues();
    
    isRunning = true;
    timer = setInterval(() => {
        if (isCountDown) {
            // カウントダウンモード
            if (seconds > 0) {
                seconds--;
            } else {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    clearInterval(timer);
                    isRunning = false;
                    updateButtonStates(false, true, true);
                    return;
                }
            }
        } else {
            // カウントアップモード
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
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
    hours = minutes = seconds = 0;
    inputHours.value = '';
    inputMinutes.value = '';
    inputSeconds.value = '';
    isCountDown = false;
    updateTimerDisplay();
    updateButtonStates(false, true, true);
});