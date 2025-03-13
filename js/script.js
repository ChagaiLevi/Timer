"use strict";
const timerClass = document.querySelector('#timer');
const savedClass = document.querySelector('.saved-times');
const startbtn = document.querySelector('#start');
const stopbtn = document.querySelector('#stop');
const savebtn = document.querySelector('#save');
const resetbtn = document.querySelector('#reset');
let hours = 0, minutes = 0, seconds = 0;
let timer = null;
let informer = false;
let saved = [];
localStorage.getItem('todoList') ? saved = JSON.parse(localStorage.getItem('todoList')) : null;
startbtn.addEventListener('click', () => startTimer());
stopbtn.addEventListener('click', () => stopTimer());
savebtn.addEventListener('click', () => saveTime());
resetbtn.addEventListener('click', () => resetTimer());
convertTime();
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
function saveTime() {
    saved.unshift(timerClass.innerHTML);
    if (saved.length > 10) {
        saved.pop();
    }
    convertTime();
    localStorage.setItem('saved', JSON.stringify(saved));
}
function convertTime() {
    if (saved.length === 0) {
        return;
    }
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
