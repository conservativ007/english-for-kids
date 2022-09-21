addEventToStatistic();
export function addEventToStatistic() {

  let modal = document.querySelector(".modal");
  let body = document.querySelector("body");

  document.querySelector(".statistics").addEventListener("click", () => {
    modal.style.display = "block";
    body.style.overflow = "hidden";
  });

  document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
    body.style.overflow = "auto";
  });
}

export function getStatistic(elems) {
  document.querySelector(".modal-body").innerHTML = "";
  elems.forEach(elem => {

    let item = document.createElement("div");
    item.classList.add("item-container");

    let name = document.createElement("p");
    name.classList.add("name");
    name.innerHTML = "en: " + elem.en;

    let nameTranslate = document.createElement("p");
    nameTranslate.classList.add("name-translate");
    nameTranslate.innerHTML = "ru: " + elem.ru;

    let lookedAnswer = document.createElement("p");
    lookedAnswer.innerHTML = "кол-во просмотров: " + elem.lookedAnswer;

    let guessedCorrectly = document.createElement("p");
    guessedCorrectly.innerHTML = "угадал в режиме игра: " + elem.guessed;
    let didNotGuessedCorrectly = document.createElement("p");
    didNotGuessedCorrectly.innerHTML = "не угадал в режиме игра: " + elem.didNotGuess;

    item.append(name);
    item.append(nameTranslate);
    item.append(lookedAnswer);
    item.append(guessedCorrectly);
    item.append(didNotGuessedCorrectly);
    document.querySelector(".modal-body").append(item);
  });
}

// change arrow sort
document.addEventListener("click", e => {
  if (e.target.classList[0] !== "arrow-sort") return;

  let elementsOfArrows = document.querySelectorAll(".arrow-sort");
  [...elementsOfArrows].forEach(item => {
    if (item.classList[1] === "show") {
      item.classList.remove("show");
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
      item.classList.add("show");
    }
  })
});

// записаить статистику при первичном заходе на страницу
setStatistick();
function setStatistick() {
  if (!localStorage.getItem('englishStatistics')) {
    localStorage.setItem('englishStatistics', JSON.stringify(statistics));
  }
}

// счётчик, сколько пользователь переврнул карточку и посмотрел перевод)
document.addEventListener('click', (e) => {
  if (e.target.dataset.reverse) {
    let parentElem = e.target.closest('.card');
    let contentOfChildElem = parentElem.querySelector('.card__description-en').innerHTML;
    contentOfChildElem = contentOfChildElem.trim();

    let statisticsTwo = JSON.parse(localStorage.getItem('englishStatistics'));

    statisticsTwo.forEach(card => {
      if (card.en === contentOfChildElem) card.lookedAnswer += 1;
    });
    localStorage.setItem('englishStatistics', JSON.stringify(statisticsTwo));
  }
});

// сброс статистики
document.addEventListener('click', (e) => {
  if (e.target.className != 'reset-statistic') return;
  localStorage.setItem('englishStatistics', JSON.stringify(statistics));
});