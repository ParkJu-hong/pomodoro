let isRunning = false;
let isBreak = false;
let isWorking = true;
let workDuration = 25 * 60;
let breakDuration = 10 * 60;
let interval;
let _interval;
const resetButton = document.getElementById('reset');

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start');

startButton.addEventListener('click', () => {
  if (isWorking && !isRunning) {
    // 작업시간이 진행 중일때 정지하는 코드
    startWorkTimer();
    startButton.textContent = '정지';
  } else if(isWorking && isRunning && !isBreak){
    // 작업시간이 정지 중일때 시작하는 코드
    stopTimer();
    startButton.textContent = '시작';
  } else if (isBreak && isRunning && !isWorking){
    // 쉬는 시간이 진행 중일때 정지하는 코드
    breakStopTimer();
    startButton.textContent = '쉬는 시간 시작';
  } else if (isBreak && !isRunning && !isWorking){
    // 쉬는 시간이 정지 중일때 진행하는 코드
    startBreakTimer();
    startButton.textContent = '쉬는 시간 정지';
  }
});

const statusElement = document.getElementById('status');

function startWorkTimer() {
  isRunning = true;
  isBreak = false;
  isWorking = true;
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
  isWorking = false;
  statusElement.textContent = '쉬는 시간'; // 상태를 '쉬는 시간'으로 업데이트
  // if (isBreak === false) return;
  _interval = setInterval(() => {
      const minutes = Math.floor(breakDuration / 60);
      const seconds = breakDuration % 60;

      updateTimerDisplay(minutes, seconds);

      if (breakDuration > 0) {
        breakDuration--;
      } else {
        breakStopTimer();
        alert('휴식 시간이 끝났습니다!');
        isBreak = false;
        isWorking = true;
        isRunning = false;
        let tempMinutes = 25;
        workDuration = 25 * 60;
        breakDuration = 10 * 60;
        statusElement.textContent = '작업 시간'; // 상태를 다시 '작업 시간'으로 업데이트
        startButton.textContent = '시작';
        minutesElement.textContent = tempMinutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
      }
    }, 1000);
}

function stopTimer() {
  isRunning = false;
  clearInterval(interval);
}

function breakStopTimer() {
  isRunning = false;
  clearInterval(_interval);
}

function updateTimerDisplay(minutes, seconds) {
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
}

resetButton.addEventListener('click', () => {
  stopTimer(); // 작업 타이머 중지
  breakStopTimer(); // 휴식 타이머 중지

  // 작업 시간과 휴식 시간을 초기화
  workDuration = 25 * 60; // 25분으로 다시 설정
  breakDuration = 10 * 60; // 10분으로 다시 설정

  // 타이머 디스플레이 업데이트
  resetUpdateTimerDisplay(workDuration);
  
  // 버튼과 상태 텍스트 업데이트
  startButton.textContent = '시작';
  statusElement.textContent = '작업 시간';

  // 상태 플래그 업데이트
  isRunning = false;
  isBreak = false;
  isWorking = true;
});

function resetUpdateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = remainingSeconds.toString().padStart(2, '0');
  statusElement.textContent = '작업 시간';
}
