const timerClass: HTMLDivElement = document.querySelector('#timer') as HTMLDivElement;
const savedClass: HTMLDivElement = document.querySelector('.saved-times') as HTMLDivElement;
const startbtn: HTMLButtonElement = document.querySelector('#start') as HTMLButtonElement;
const stopbtn: HTMLButtonElement = document.querySelector('#stop') as HTMLButtonElement;
const savebtn: HTMLButtonElement = document.querySelector('#save') as HTMLButtonElement;
const resetbtn: HTMLButtonElement = document.querySelector('#reset') as HTMLButtonElement;
type time = string;
type times = time[];
let hours: number = 0, minutes: number = 0, seconds: number = 0;
let timer: any = null;
let informer: boolean = false;
let saved: times = [];

localStorage.getItem('saved') ? saved = JSON.parse(localStorage.getItem('saved') as string) : null;

startbtn.addEventListener('click', () => startTimer());
stopbtn.addEventListener('click', () => stopTimer());
savebtn.addEventListener('click', () => saveTime());
resetbtn.addEventListener('click', () => resetTimer());

convertTime();
deleteTime();

function startTimer(): void {
  if (informer) {
    return;
  }

  timerFunction();

  timer = setInterval(timerFunction, 1000);
}

function stopTimer(): void {
  timerClass.innerHTML === '00:00:00' ? null : startbtn.innerHTML = 'Resume';
  clearInterval(timer);
  informer = false;
}

function resetTimer(): void {
  hours = 0;
  minutes = 0;
  seconds = 0;
  startbtn.innerHTML === 'Resume' ? startbtn.innerHTML = 'Start' : null;
  timerClass.innerHTML = '00:00:00';
  clearInterval(timer);
  informer = false;
}

function timerFunction(): void {
  seconds++;

  startbtn.innerHTML === 'Resume' ? startbtn.innerHTML = 'Start' : null;

  if (/*hours === 24 && minutes === 60 && seconds === 60*/true) {
    timerClass.innerHTML = `
        ${timerClass.innerHTML}
        <div class="error"> <span class="warning-icon">!</span>You have reached your time limit!<div>
      `;
    timer = null;
    clearInterval(timer);
    informer = true;
    return;
  }
  else if (minutes === 60 && seconds === 60) {
    minutes = 0;
    seconds = 0;
    hours++;
  }
  else if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  informer = true;
  timerClass.innerHTML = `${hours <= 9 ? `0${hours}` : hours}:${minutes <= 9 ? `0${minutes}` : minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`;
}

function saveTime(): void {
  if (timerClass.innerHTML === '00:00:00') {
    return;
  }

  saved.unshift(timerClass.innerHTML);

  if (saved.length > 10) {
    saved.pop();
  }

  localStorage.setItem('saved', JSON.stringify(saved));
  convertTime();
  deleteTime();
}

function convertTime(): void {
  savedClass.innerHTML = '';

  for (let i = 0; i < saved.length && i < 3; i++) {
    savedClass.innerHTML += `
     <div class="saved-time save${i}">
        <p>${saved[i]}</p>
        <button class="btn${i}">Delete</button>
      </div>
    `;
  }
}

function deleteTime(): void {
  for (let i = 0; i < saved.length && i < 3; i++) {
    const btn = savedClass.querySelector(`.btn${i}`) as HTMLButtonElement;
    const savedTimeDiv = savedClass.querySelector(`.save${i}`) as HTMLDivElement;

    btn.addEventListener('click', () => {
      // הוספת אנימציה של fade-out
      savedTimeDiv.classList.add('fade-out');

      // מחכים לאנימציה לפני שמסירים את האלמנט
      setTimeout(() => {
        saved.splice(i, 1);
        localStorage.setItem('saved', JSON.stringify(saved));
        convertTime();
        deleteTime();
      }, 500); // זמן שממתינים עד שהאנימציה תושלם (מילישניות)
    });
  }
}
