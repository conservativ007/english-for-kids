import { getContent } from "./getContentForGame.js";
import { getCardsToShooter } from "./getCardsToShooter.js";
import { showQuestionToUser } from "./showQuestionToUser.js";
import { createImage, getRandomInteger, newCreateAudio, stopSoundOfClock } from "../functions.js";
import { getClock, actionClock } from "./getClock.js";

let body = document.body;
let perspectivePage = document.querySelector(".perspective");

let arrOfClassnames = ["one", "two", "three", "four"];

// document.querySelector(".main button").addEventListener("click", () => {

//   perspectivePage.classList.add("animate");
//   newCreateAudio("assets/sounds/you-are-not-prepared.mp3");
//   setTimeout(() => printNumbers(0, 3), 3000);

//   // need to test
//   // initGameTwo();
// });

export function prepareForGameTwo() {
  perspectivePage.classList.add("animate");
  setTimeout(() => newCreateAudio("assets/sounds/you-are-not-prepared.mp3"), 500);
  setTimeout(() => getImagesForPage(0, 3), 3000);
}

function getImagesForPage(from, to) {

  let current = from;

  function go() {
    perspectivePage.classList.add(arrOfClassnames[current]);

    createImage(current);
    newCreateAudio(`assets/sounds/${getRandomInteger(1, 2)}.mp3`);
    // createAudio("shot", current);

    if (current == to) {
      clearInterval(timerId);
      perspectivePage.classList.add("go-rotate-x");

      setTimeout(() => initGameTwo(), 2000);
    }
    current++;
  }
  // go();
  let timerId = setInterval(go, 1000);
}

function startGameTwo() {
  perspectivePage.style.display = "none"
  body.style.backgroundColor = "black";
}



function initGameTwo() {
  // clean board
  startGameTwo();

  // create new board for shooter
  getContent();

  // create clock
  getClock();

  // get a random array of the questions for a user
  let cardsToQuestions = getCardsToShooter();

  // send array to show
  showQuestionToUser(cardsToQuestions);

  // let's show timer
  actionClock();

  // sound timer
  stopSoundOfClock();
}



