import { setDifficulty } from "./chooseDifficulty.js";
import { statistics } from "./data.js";
import { addEventToDropdownMenuInTheMain, addEventToDropdownMenuInTheStatistic } from "./dropdownInStatistics.js";
import { addEventToStatistic } from "./getStatistic.js";
import { addEventToOrderButtonInTheStatistic } from "./modal.js";
import { addEventsToNavbar } from "./header/navbar.js";
import { reloadPage } from "./script.js";
import { prepareForGameTwo } from "./shooter/shoter.js";
import { sayWord } from "./startGame.js";
import { path, countForClock, countForUserQuestions, startGame } from "./values.js";

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

export function startGameOne() {
  setTimeout(() => {
    let perspective = document.querySelector(".perspective");

    perspective.style.display = "block";
    perspective.className = "perspective";
    document.body.style.backgroundColor = "#ff6b6b";

    addEventsToNavbar();
    path.setPath("categories");
    clearPageOfImages();
    document.querySelector(".repeat-button").addEventListener("click", () => sayWord(true));
    document.querySelector("body").removeChild(document.querySelector(".game"));
    setDifficulty();
    countForClock.setDefaultClock();
    countForUserQuestions.setCountToDefault();
    startGame.setStartGame(false);
    reloadPage();
    addEventToStatistic();
    addEventToDropdownMenuInTheStatistic();
    addEventToDropdownMenuInTheMain();
    addEventToOrderButtonInTheStatistic();
  }, 2000);

  function clearPageOfImages() {
    for (let i = 0; i < 4; i++) {
      let img = document.querySelector(".wrapper .shoter-img");
      if (img !== null) document.querySelector(".wrapper").removeChild(img);
    }
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

export function pronunciation(e) {
  let parent = e.parentNode;
  let description = parent.querySelector(".card__description-en").innerHTML.trim();
  speechEnglish(description);
}

export function speechEnglish(text) {
  let synth = window.speechSynthesis;
  let message = new SpeechSynthesisUtterance();
  message.lang = 'en-US';
  message.text = text;
  synth.speak(message);
}

export const getWidthOfElem = () => document.querySelector(".wrapper").getBoundingClientRect().width;



