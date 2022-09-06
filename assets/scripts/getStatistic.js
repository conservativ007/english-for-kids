let modalBody = document.querySelector(".modal-body");

let modal = document.querySelector(".modal");
let body = document.querySelector("body");

document.querySelector(".statistics").addEventListener("click", () => {
  modal.style.display = "block";
  body.style.overflow = "hidden";

  // order = document.querySelector(".arrow-sort show");
});

document.querySelector(".close").addEventListener("click", () => {
  modal.style.display = "none";
  body.style.overflow = "auto";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

export function getStatistic(elems) {
  modalBody.innerHTML = "";
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
    modalBody.append(item);
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