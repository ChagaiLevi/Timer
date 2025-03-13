"use strict";
const timerClass = document.querySelector('#timer');
const startbtn = document.querySelector('#start');
const stopbtn = document.querySelector('#stop');
const resetbtn = document.querySelector('#reset');
let hours = 0, minutes = 0, seconds = 0;
let timer = null;
let informer = false;
startbtn.addEventListener('click', () => startTimer());
stopbtn.addEventListener('click', () => stopTimer());
resetbtn.addEventListener('click', () => resetTimer());
function startTimer() {
    if (informer) {
        return;
    }
    timerFunction();
    timer = setInterval(timerFunction, 1000);
}
function stopTimer() {
    startbtn.innerHTML = 'Resume';
    clearInterval(timer);
    informer = false;
}
function resetTimer() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    startbtn.innerHTML === 'Resume' ? startbtn.innerHTML = 'Start' : null;
    timerClass.innerHTML = '00:00:00';
    clearInterval(timer);
    informer = false;
}
function timerFunction() {
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
        informer = true;
        return;
    }
    informer = true;
    timerClass.innerHTML = `${hours <= 9 ? `0${hours}` : hours}:${minutes <= 9 ? `0${minutes}` : minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`;
}
