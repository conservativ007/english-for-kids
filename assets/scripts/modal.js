import { getStatistic } from "./getStatistic.js";

// init values
let selectValue = document.querySelector(".text-box").value;
let order = "↑";
let localStorStatistics = JSON.parse(localStorage.getItem('englishStatistics'));

init();
function init() {
  localStorStatistics = JSON.parse(localStorage.getItem('englishStatistics'));
  customSort(selectValue, order);
  getStatistic(localStorStatistics);
}

document.querySelector(".modal-header__choice button")
  .addEventListener("click", () => {
    getOrder();
  });

// get the values for sort
function getOrder() {
  selectValue = document.querySelector(".text-box").value;
  document.querySelectorAll(".modal-header__choice p")
    .forEach(i => {
      if (i.classList[1] === "show") order = i.innerHTML;
    })

  init();
}


function customSort(selectValue, order) {
  // name
  if (selectValue === "a-z" && order === "↑") {
    localStorStatistics.sort((a, b) => {
      if (a.en > b.en) return 1;
      if (a.en < b.en) return -1;
      return 0;
    });
  }

  if (selectValue === "a-z" && order === "↓") {
    localStorStatistics.sort((a, b) => {
      if (a.en > b.en) return -1;
      if (a.en < b.en) return 1;
      return 0;
    });
  }

  // loocked answer
  if (selectValue === "looked-answer" && order === "↓") {
    localStorStatistics.sort((a, b) => {
      if (a.lookedAnswer > b.lookedAnswer) return 1;
      if (a.lookedAnswer < b.lookedAnswer) return -1;
      return 0;
    });
  }

  if (selectValue === "looked-answer" && order === "↑") {
    localStorStatistics.sort((a, b) => {
      if (a.lookedAnswer > b.lookedAnswer) return -1;
      if (a.lookedAnswer < b.lookedAnswer) return 1;
      return 0;
    });
  }

  // loocked guessed
  if (selectValue === "guessed" && order === "↓") {
    localStorStatistics.sort((a, b) => {
      if (a.guessed > b.guessed) return 1;
      if (a.guessed < b.guessed) return -1;
      return 0;
    });
  }

  if (selectValue === "guessed" && order === "↑") {
    localStorStatistics.sort((a, b) => {
      if (a.guessed > b.guessed) return -1;
      if (a.guessed < b.guessed) return 1;
      return 0;
    });
  }

  // didn't guessed
  if (selectValue === "did-not-guessed" && order === "↓") {
    console.log(1)
    localStorStatistics.sort((a, b) => {
      if (a.didNotGuess > b.didNotGuess) return 1;
      if (a.didNotGuess < b.didNotGuess) return -1;
      return 0;
    });
  }

  if (selectValue === "did-not-guessed" && order === "↑") {
    localStorStatistics.sort((a, b) => {
      if (a.didNotGuess > b.didNotGuess) return -1;
      if (a.didNotGuess < b.didNotGuess) return 1;
      return 0;
    });
  }
}
