import { getContent } from "./getContentForGame.js";

let body = document.body;
let perspectivePage = document.querySelector(".perspective");
let wrapper = document.querySelector(".wrapper");
let arrOfClassnames = ["one", "two", "three", "four"];

document.querySelector(".main button").addEventListener("click", () => {

  perspectivePage.classList.add("animate");
  createAudio("you-are-not-prepared");

  setTimeout(() => printNumbers(0, 3), 3000);
});

function printNumbers(from, to) {

  let current = from;

  function go() {
    perspectivePage.classList.add(arrOfClassnames[current]);

    createImage(current);
    createAudio("", current);

    if (current == to) {
      clearInterval(timerId);
      perspectivePage.classList.add("go-rotate-x");

      setTimeout(() => initGameTwo(), 2000);
    }
    current++;
  }
  // go();
  let timerId = setInterval(go, 1000);
}

function createImage(num) {
  let image = document.createElement("img");
  image.src = `assets/images/shots/${num + 1}.png`;
  image.alt = "shoot";
  image.className = "shoter-img";
  image.style.top = setImgPosition(num).top;
  image.style.left = setImgPosition(num).left;

  wrapper.prepend(image);
}

function createAudio(phrase = "", num) {

  let elemOfAudio = document.createElement("audio");

  if (phrase === "you-are-not-prepared") {
    elemOfAudio.src = `assets/sounds/you-are-not-prepared.mp3`;
  } else {
    elemOfAudio.src = `assets/sounds/${num % 2 === 0 ? 1 : 2}.mp3`;
  }

  elemOfAudio.play();
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

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function initGameTwo() {
  console.log(getContent)
  startGameTwo();
  getContent();
}

function startGameTwo() {
  perspectivePage.style.display = "none"
  body.style.backgroundColor = "black";
}

