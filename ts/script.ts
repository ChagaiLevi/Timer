let hours: number = 0, minutes: number = 0, seconds: number = 0;
const timerClass: HTMLDivElement = document.querySelector('#timer') as HTMLDivElement;

const timer: number = setInterval(() => {
  seconds++;

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
    clearInterval(timer);
    return;
  }


  timerClass.innerHTML = `${hours <= 9 ? `0${hours}` : hours}:${minutes <= 9 ? `0${minutes}` : minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`;
}, 1000);