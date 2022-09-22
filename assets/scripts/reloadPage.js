import { addEventsToNavbar, setNavbarToDefaultCategory } from "./header/navbar.js";
import { startGame, path, setDifficultyGame, word, arrayOfCards, counterShots, shots, countForClock, countForUserQuestions } from "./values.js";
import { init } from "./getCards.js";
import { addEventToSetDifficulty } from "./chooseDifficulty.js";
import { addEventToOrderButtonInTheStatistic } from "./modal.js";
import { addEventToStatistic } from "./getStatistic.js";
import { addEventToDropdownMenuInTheMain, addEventToDropdownMenuInTheStatistic } from "./dropdownInStatistics.js";
import { sayWord } from "./startGame.js";

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
}

export function startGameOne() {
  setTimeout(() => {
    let perspective = document.querySelector(".perspective");

    perspective.style.display = "block";
    perspective.className = "perspective";
    document.body.style.backgroundColor = "#ff6b6b";
    document.querySelector("body").removeChild(document.querySelector(".game"));
    document.querySelector(".repeat-button").addEventListener("click", () => sayWord(true));

    path.setPath("categories");
    countForClock.setDefaultClock();
    countForUserQuestions.setCountToDefault();
    startGame.setStartGame(false);

    clearPageOfImages();
    reloadPage();

    addEventToSetDifficulty();
    addEventsToNavbar();
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
