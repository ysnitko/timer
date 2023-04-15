let intervalId;
let time = 0;
let milliseconds = 0;
const startTime = document.querySelector('.btn-start');
const stopTime = document.querySelector('.btn-stop');
const resetTime = document.querySelector('.btn-reset');
const btnContainer = document.querySelector('.btn-block');
const addTimer = document.querySelector('.timer');
const setTime = document.querySelector('.set-time');
const addTime = document.querySelector('.add-time');

function start() {
  if (intervalId) {
    return;
  }
  intervalId = setInterval(() => {
    if (milliseconds === 0 && time === 0) {
      clearInterval(intervalId);
      return;
    }
    if (milliseconds === 0) {
      time--;
      milliseconds = 1000;
    }
    milliseconds -= 50;
    timer();
  }, 50);
}

function timer() {
  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((time / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  const mili = milliseconds.toString().padStart(2, '0').slice(0, 2);
  addTimer.textContent = `${hours}:${minutes}:${seconds}.${mili}`;
}

function stop() {
  clearInterval(intervalId);
  intervalId = 0;
}

function reset() {
  clearInterval(intervalId);
  time = 0;
  milliseconds = 0;
  addTimer.textContent = '00:00:00.00';
  intervalId = 0;
}

function onClickBtn(event) {
  let target = event.target;
  if (target.tagName !== 'BUTTON') {
    return;
  }

  if (target === startTime) {
    start();
  }

  if (target === stopTime) {
    stop();
  }

  if (target === resetTime) {
    reset();
  }
}

function setTimeValue(event) {
  let target = event.target;
  if (target.tagName !== 'LI') {
    return;
  }
  let timeValue = +target.dataset.time;
  let setMinutes = (timeValue / 60).toString().padStart(2, '0');
  reset();
  time = timeValue;
  addTimer.textContent = `00:${setMinutes}:00.00`;
}

function addTimeValue(event) {
  let target = event.target;
  if (target.tagName !== 'LI') {
    return;
  }
  let timeValue = +target.dataset.time;
  stop();
  time += timeValue;
  timer();
}

setTime.addEventListener('click', setTimeValue);
addTime.addEventListener('click', addTimeValue);
btnContainer.addEventListener('click', onClickBtn);
