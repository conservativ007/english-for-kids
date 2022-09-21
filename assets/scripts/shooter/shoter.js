import { getContent } from "./getContent.js";
import { getCardsToShooter } from "./getCardsToShooter.js";
import { showQuestionToUser } from "./showQuestionToUser.js";
import { createImage, getRandomInteger, newCreateAudio, stopSoundOfClock } from "../functions.js";
import { getClock, actionClock } from "./getClock.js";

let arrOfClassnames = ["one", "two", "three", "four"];

export function prepareForGameTwo() {
  document.querySelector(".perspective").classList.add("animate");
  setTimeout(() => newCreateAudio("assets/sounds/you-are-not-prepared.mp3"), 500);
  setTimeout(() => getImagesForPage(0, 3), 3000);
}

function getImagesForPage(from, to) {

  let current = from;

  function go() {
    document.querySelector(".perspective").classList.add(arrOfClassnames[current]);

    createImage(current);
    newCreateAudio(`assets/sounds/${getRandomInteger(1, 2)}.mp3`);
    // createAudio("shot", current);

    if (current == to) {
      clearInterval(timerId);
      document.querySelector(".perspective").classList.add("go-rotate-x");

      setTimeout(() => initGameTwo(), 2000);
    }
    current++;
  }
  // go();
  let timerId = setInterval(go, 1000);
}

function startGameTwo() {
  document.querySelector(".perspective").style.display = "none"
  document.body.style.backgroundColor = "black";
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



