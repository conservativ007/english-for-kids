import { statistics } from "./data.js";
import { addEventsToNavbar, setNavbarToDefaultCategory } from "./navbar.js";
import { init, reloadPage, setPath } from "./script.js";

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

// export function createAudio(phrase, num, stopPlayingAudio = false) {

//   let elemOfAudio = document.createElement("AUDIO");

//   if (phrase === "you-are-not-prepared") {
//     elemOfAudio.src = `assets/sounds/you-are-not-prepared.mp3`;
//   }
//   else if (phrase === "shot") {
//     elemOfAudio.src = `assets/sounds/${num % 2 === 0 ? 1 : 2}.mp3`;
//   }
//   else if (phrase === "clock_ticking") {
//     elemOfAudio.src = `assets/sounds/alarm_clock_ticking.mp3`;

//   }
//   elemOfAudio.play();
// }

export function stopSoundOfClock() {
  let timerID = setInterval(() => {
    if (countForClock.getCount() === 0) {
      showMessageAfterGame(false, "You lose");
      newCreateAudio("", true);
      clearInterval(timerID);
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

  if (bool === true) {
    elemOfUserMessageAfterGame.innerHTML = message;
    elemOfInnerFront.classList.add("flip");
  } else {
    elemOfUserMessageAfterGame.innerHTML = message;
    elemOfInnerFront.classList.add("flip");
  }
}

export const countForClock = {
  count: 22,
  countDecrease() {
    this.count -= 1;
  },
  getCount() {
    return this.count;
  }
}

export const isGameStat = {
  startGame: false,
  letsStartGame() {
    this.startGame = true;
  },
  letsStopGame() {
    this.startGame = false;
  },
  getStartGameCondition() {
    return this.startGame;
  }
}

export const setDifficultyGame = {
  difficulty: "normal",
  setDifficulty(value) {
    this.difficulty = value;
  },
  getDifficulty() {
    return this.difficulty;
  }
}

export function startGameOne() {
  setTimeout(() => {
    let perspective = document.querySelector(".perspective");
    document.querySelector(".game").style.display = "none";

    perspective.style.display = "block";
    perspective.className = "perspective";
    document.body.style.backgroundColor = "#ff6b6b";

    addEventsToNavbar();
    setPath("categories");
    clearPageOfImages();

    reloadPage();
  }, 2000);

  function clearPageOfImages() {
    for (let i = 0; i < 4; i++) {
      let img = document.querySelector(".wrapper img");
      document.querySelector(".wrapper").removeChild(img);
    }
  }
}

