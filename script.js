let isRunning = false;
let duration = 25 * 60;
let interval;

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start');

startButton.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
    startButton.textContent = '정지';
  } else {
    stopTimer();
    startButton.textContent = '시작';
  }
});

function startTimer() {
  isRunning = true;
  interval = setInterval(() => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    if (duration > 0) {
      duration--;
    } else {
      stopTimer();
      alert('시간이 끝났습니다!');
    }
  }, 1000);
}

function stopTimer() {
  isRunning = false;
  clearInterval(interval);
}

const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', () => {
  stopTimer();
  duration = 25 * 60; // 25분으로 다시 설정
  updateTimerDisplay(duration);
  startButton.textContent = '시작';
});

function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = remainingSeconds.toString().padStart(2, '0');
}
