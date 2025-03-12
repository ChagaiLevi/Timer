const timerClass: HTMLDivElement = document.querySelector('#timer') as HTMLDivElement;
const startbtn: HTMLButtonElement = document.querySelector('#start') as HTMLButtonElement;
const stopbtn: HTMLButtonElement = document.querySelector('#stop') as HTMLButtonElement;
const resetbtn: HTMLButtonElement = document.querySelector('#reset') as HTMLButtonElement;
let hours: number = 0, minutes: number = 0, seconds: number = 0;
let timer: any = null;
let informer: boolean = false;

startbtn.addEventListener('click', () => startTimer());
stopbtn.addEventListener('click', () => stopTimer());
resetbtn.addEventListener('click', () => resetTimer());

function startTimer(): void {
  if (informer) {
    return;
  }

  timer = setInterval(() => {
    seconds++;

    startbtn.innerHTML === 'Resume' ? startbtn.innerHTML = 'Start' : null;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    else if (minutes === 60 && seconds === 60) {
      minutes = 0;
      seconds = 0;
      hours++;
    }
    else if (hours === 24 && minutes === 60 && seconds === 60) {
      timerClass.innerHTML = `
        ${timerClass.innerHTML}
        <div class="error"> <span class="warning-icon">!</span>You have reached your time limit!<div>
      `;
      timer = null;
      clearInterval(timer);
      return;
    }


    timerClass.innerHTML = `${hours <= 9 ? `0${hours}` : hours}:${minutes <= 9 ? `0${minutes}` : minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`;
    informer = true;
  }, 1000);
}

function stopTimer(): void {
  startbtn.innerHTML = 'Resume';
  clearInterval(timer);
  informer = false;
}
function resetTimer(): void {
  hours = 0;
  minutes = 0;
  seconds = 0;
  timerClass.innerHTML = '00:00:00';
  clearInterval(timer);
  informer = false;
}