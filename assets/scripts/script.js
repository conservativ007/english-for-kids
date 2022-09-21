import { setNavbarToDefaultCategory } from "./navbar.js";
import { clearPage, newCreateAudio } from "./functions.js";
import { prepareForGameTwo } from "./shooter/shoter.js";
import { startGame, path, setDifficultyGame, word, arrayOfCards, counterShots, shots, printAllValues, countForClock } from "./values.js";
import { init } from "./getCards.js";
// import { addEventToRepeatButton } from "./startGame.js";

// checkArrayWords();

// addEventToTestButton();
// export function addEventToTestButton() {
//   document.querySelector(".test")
//     .addEventListener("click", prepareForGameTwo);
// }

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

// высчитать процент правильных ответов
function getPercentageGuessing(a, b) {
  let res = (a / (a + b)) * 100;

  if (isNaN(res)) {
    return 0;
  }
  return res.toFixed(0);
}

export function reloadPage(modal, smile) {
  document.querySelector(".main-controls__start-button").disabled = true;
  document.querySelector(".main-controls").style.display = "flex";
  document.querySelector(".main-showprogress").style.display = "none";
  document.querySelector('.scale-marks').innerHTML = '';

  startGame.setStartGame(false);
  word.setWord("");
  arrayOfCards.clearCards();
  shots.setDefaultShots();
  counterShots.setDefaultShots();

  if (setDifficultyGame.getDifficulty() === "normal") {
    modal.style.display = "none";
    smile.classList.add('hidden');
  }

  path.setPath("categories");
  setDifficultyGame.setDifficultyToDefault();
  init();
  setNavbarToDefaultCategory();
  // addEventToTestButton();
}
