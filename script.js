let isRunning = false;
let isBreak = false;
let workDuration = 25 * 60;
let breakDuration = 25 * 60;
let interval;
const resetButton = document.getElementById('reset');

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start');

startButton.addEventListener('click', () => {
  if (!isRunning) {
    startWorkTimer();
    startButton.textContent = '정지';
  } else {
    stopTimer();
    startButton.textContent = '시작';
  }
});

const statusElement = document.getElementById('status');

function startWorkTimer() {
  isRunning = true;
  isBreak = false;
  statusElement.textContent = '작업 시간'; // 상태를 '작업 시간'으로 업데이트
  interval = setInterval(() => {
    const minutes = Math.floor(workDuration / 60);
    const seconds = workDuration % 60;

    updateTimerDisplay(minutes, seconds);

    if (workDuration > 0) {
      workDuration--;
    } else {
      stopTimer();
      startBreakTimer();
    }
  }, 1000);
}

function startBreakTimer() {
  isRunning = true;
  isBreak = true;
  statusElement.textContent = '쉬는 시간'; // 상태를 '쉬는 시간'으로 업데이트
  interval = setInterval(() => {
    const minutes = Math.floor(breakDuration / 60);
    const seconds = breakDuration % 60;

    updateTimerDisplay(minutes, seconds);

    if (breakDuration > 0) {
      breakDuration--;
    } else {
      stopTimer();
      alert('휴식 시간이 끝났습니다!');
      workDuration = 1 * 60; // 작업 시간을 재설정
      statusElement.textContent = '작업 시간'; // 상태를 다시 '작업 시간'으로 업데이트
      startButton.textContent = '시작';
    }
  }, 1000);
}

function stopTimer() {
  isRunning = false;
  clearInterval(interval);
}

function updateTimerDisplay(minutes, seconds) {
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
}

resetButton.addEventListener('click', () => {
  stopTimer();
  duration = 25 * 60; // 25분으로 다시 설정
  resetUpdateTimerDisplay(duration);
  startButton.textContent = '시작';
});

function resetUpdateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = remainingSeconds.toString().padStart(2, '0');
  statusElement.textContent = '작업 시간';
}
