import { statistics } from "./data.js";
import { reloadPage, startGameOne } from "./reloadPage.js";
import { prepareForGameTwo } from "./shooter/shoter.js";
import { countForClock, setDifficultyGame, arrayOfCards, counterShots } from "./values.js";

export function getRandomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function getAllTheQuestionsWords() {
  let arrOfFalseQuestions = statistics.map(i => i.en);
  let shuffleArrOfFalseQuestions = shuffle(arrOfFalseQuestions);
  return shuffleArrOfFalseQuestions;
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setImgPosition(num) {
  if (num === 0) {
    return {
      "top": 0,
      "left": "56%"
    }
  }
  if (num === 1) {
    return {
      "top": "34%",
      "left": "11%"
    }
  }
  if (num === 2) {
    return {
      "top": "70%",
      "left": "43%"
    }
  }
  if (num === 3) {
    return {
      "top": "40%",
      "left": "70%"
    }
  }
}

let audioObj = null;
export function newCreateAudio(src = "", bool = false) {

  if (src !== "") {
    audioObj = new Audio(src);
    audioObj.play();
  }

  if (bool === true) audioObj.pause();
}

export function stopSoundOfClock() {
  let timerID = setInterval(() => {
    if (countForClock.getCount() === 0) {
      console.log("show message after game after stopSoundOf Clock ");
      showMessageAfterGame(false, "You lose");
      newCreateAudio("", true);
      clearInterval(timerID);
      startGameOne();
    }
  }, 500);
}

export function createImage(num) {
  let wrapper = document.querySelector(".wrapper");
  let image = document.createElement("img");
  image.src = `assets/images/shots/${num + 1}.png`;
  image.alt = "shoot";
  image.className = "shoter-img";
  image.style.top = setImgPosition(num).top;
  image.style.left = setImgPosition(num).left;

  wrapper.prepend(image);
}

export function showMessageAfterGame(bool, message) {
  let elemOfInnerFront = document.querySelector(".game-inner__front");
  let elemOfUserMessageAfterGame = document.querySelector(".game-inner__back p");

  if (elemOfInnerFront && elemOfUserMessageAfterGame) {
    elemOfUserMessageAfterGame.innerHTML = message;
    elemOfInnerFront.classList.add("flip");
  }

  if (bool === true) {
    document.querySelector(".game-inner__back").style.backgroundColor = "#00b894";
  }
}

export function getRandomKeysArray(num) {
  let elems = [...Array(num).keys()]
    .sort(() => Math.random() - 0.5);

  return elems;
}

// clearPage();
export function clearPage() {
  let elems = document.querySelectorAll('.card');
  elems.forEach(i => i.classList.add('hidden'));
}

export function speechEnglish(text) {
  let synth = window.speechSynthesis;
  let message = new SpeechSynthesisUtterance();
  message.lang = 'en-US';
  message.text = text;
  synth.speak(message);
}

export function checkArrayWords() {
  if (arrayOfCards.getCards().length !== 0) return;

  switch (setDifficultyGame.getDifficulty()) {
    case "normal": getNormalEndGame();
      break;
    case "hard": prepareForGameTwo();
      break;
  }
}

function getNormalEndGame() {
  let modal = document.querySelector('.win-message');
  let message = document.querySelector('.win-message__text');
  let smileHappy = document.querySelector('.smile-happy');
  let smileCry = document.querySelector('.smile-cry');

  modal.style.display = "block";

  if (counterShots.getShots() === 8) {
    message.firstElementChild.innerHTML = 'Вы выйграли';
    message.lastElementChild.innerHTML = '';
    smileHappy.classList.remove('hidden');
    newCreateAudio("./assets/sounds/end-game-win.mp3");
    setTimeout(() => reloadPage(modal, smileHappy), 15000);
  } else {
    message.firstElementChild.innerHTML = 'Вы проиграли';
    message.lastElementChild.innerHTML = `ошибок: ${8 - counterShots.getShots()}`;
    smileCry.classList.remove('hidden');
    newCreateAudio("./assets/sounds/end-game-loosers.mp3");
    setTimeout(() => reloadPage(modal, smileCry), 5000);
  }
  clearPage();
}

export const getWidthOfElem = () => document.querySelector(".wrapper").getBoundingClientRect().width;



