import { countForClock, newCreateAudio } from "../functions.js";

export function getClock() {
  let elemOfGame = document.querySelector(".game-inner__front");
  elemOfGame.innerHTML += createClock();
}

function createClock() {
  return `
    <div class="time">
      <div class="circle" style="--clr:#04fc43;">
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70" id="ss"></circle>
        </svg>
        <div class="seconds"></div>
      </div>
    </div>
  `
}

export function actionClock() {

  newCreateAudio(`assets/sounds/alarm_clock_ticking.mp3`);
  setTimeout(() => document.querySelector(".time").style.opacity = "1", 2000);

  // circle
  let seconds = document.querySelector("#ss");

  // seconds div
  let elemOfSecondsDisplay = document.querySelector(".seconds");
  elemOfSecondsDisplay.innerHTML = countForClock.getCount();

  let circle = document.querySelector(".circle");
  seconds.style.strokeDashoffset = 440 - (440 * countForClock.getCount()) / 60;

  function setSecondToTimer() {
    seconds.style.strokeDashoffset = 440 - (440 * countForClock.getCount()) / 60;
  }

  let timerId = setInterval(() => {
    countForClock.countDecrease();
    setSecondToTimer();
    elemOfSecondsDisplay.innerHTML = countForClock.getCount();

    if (countForClock.getCount() < 10) circle.style = "--clr:red;";
    if (countForClock.getCount() === 0) clearInterval(timerId);
  }, 1000);
}