import { startGame, word, arrayOfCards, path } from "./values.js";
import { obj } from "./data.js";
import { init } from "./getCards.js";
import { speechEnglish } from "./functions.js";

function getArrCards() {
  let cards = obj[path.getPath()];
  cards.forEach(i => arrayOfCards.setCard(i));
  arrayOfCards.setRundomCards();
}

// start game
document.addEventListener("click", e => {
  if (e.target.className !== "main-controls__start-button") return;
  startGame.setStartGame(true);

  document.querySelector(".main-controls").style.display = "none";
  document.querySelector(".main-showprogress").style.display = "flex";

  getArrCards();
  init();
  sayWord();
});

export function sayWord(bool) {
  if (bool) {
    speechEnglish(word.getWord());
  } else {
    word.setWord(arrayOfCards.getSliceOfCardsArray());
    // word.setWord(getChunckArray(arrCategory));
    speechEnglish(word.getWord());
  }
}

document.querySelector(".repeat-button").addEventListener("click", () => sayWord(true));
