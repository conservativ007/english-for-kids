import { newCreateAudio } from "./functions.js";
import { changeStartGameButton } from "./navbar.js";
import { checkArrayWords } from "./script.js";
import { startGame, setDifficultyGame, word, arrayOfCards, counterShots, shots } from "./values.js";
import { sayWord } from "./startGame.js";


// this check user answer
document.addEventListener('click', (e) => {
  if (e.target.closest('.card') === null) return;
  changeStartGameButton(false);
  if (startGame.getStartGame() === false) return;

  // получаем текст карточки по которой нажали
  let cardElemText = e.target.closest('.front');
  cardElemText = cardElemText.querySelector(".card__description-en").innerHTML;

  // блоки в которых находятся img (2 стороны)
  let cardFrontImg = e.target.closest('.front').firstElementChild;
  let cardBackImg = e.target.closest('.card').lastElementChild.firstElementChild.firstElementChild;

  let card = e.target.closest('.card');

  if (cardElemText.trim() === word.getWord()) {

    moveToCorrectAnswer(true, cardFrontImg, cardBackImg, card);
  } else {
    moveToCorrectAnswer(false, cardFrontImg, cardBackImg, card);
  }
});

function moveToCorrectAnswer(bool, cardFrontImg, cardBackImg, card) {
  if (bool === true) {
    if (arrayOfCards.getCards().length !== 0) setTimeout(() => sayWord(), 1000);
    shotImage(cardFrontImg, cardBackImg, card);
    // hit shot counter 
    setHitCounter(true, word.getWord());
  } else {
    setHitCounter(false, word.getWord());
  }

  shotAudio(bool);
  transform3D(card, bool);
  counterShots.setShots(bool);
  scaleMarks(bool);
  checkArrayWords();
}

// наложение картинки на карточку
function shotImage(front, back, card) {
  if (setDifficultyGame.getDifficulty() === "hard") {
    shotImageHardmode(front, back)
  }

  if (setDifficultyGame.getDifficulty() === "normal") {
    card.classList.add("the-right-answer");
  }
}

function shotImageHardmode(front, back) {
  let chunckShots = shots.getSliceOfShots();

  let newImg = document.createElement('img');
  newImg.style.width = '200px';
  newImg.style.height = '200px';
  newImg.style.position = 'absolute';
  newImg.style.zIndex = 1;
  newImg.src = `assets/images/shots/${chunckShots + 1}.png`;

  front.append(newImg);
  // back.src = `assets/images/shots/${chunckShots + 1}.png`;
}

// трансформация карточек при игре
function transform3D(card, bool) {
  if (setDifficultyGame.getDifficulty() === "normal") return;

  if (bool) {
    let rand1 = randomInteger(30, 100);
    let rand2 = randomInteger(270, 330);
    let rand = randomInteger(0, 1);

    rand == 0 ?
      card.style.transform = `rotate3d(1, .5, 1, ${rand1}deg)` :
      card.style.transform = `rotate3d(1, .5, 1, ${rand2}deg)`;

  } else {
    card.style.transform = `rotate3d(0, 1, 0, 30deg)`;
    setTimeout(() => card.style.transform = `rotate3d(0, 1, 0, -20deg)`, 100);
    setTimeout(() => card.style.transform = `rotate3d(0, 1, 0, 0deg)`, 300);
  }
}

// звук)
function shotAudio(bool) {
  let randSound = null;

  switch (setDifficultyGame.getDifficulty()) {
    case "normal": randSound = bool ? "normal_success" : "normal_error";
      break;
    case "hard": randSound = bool ? randomInteger(1, 2) : randomInteger(3, 4);
      break;

    default: randSound = "normal_success";
  }

  newCreateAudio(`./assets/sounds/${randSound}.mp3`);
}

// щётчик выстрелов
function getCounterShots(bool) {
  setConterShots(bool);
}

// отрисовка звёздочек (которые заполняют шкалу)
function scaleMarks(bool) {
  let elem = document.querySelector('.scale-marks');

  let img = document.createElement('img');
  img.src = `assets/images/icons/${bool ? 'star-true' : 'star-false'}.png`;
  img.classList.add('star');
  img.style.width = "30px";

  elem.append(img);

  addScaleMarks(elem);
}

function addScaleMarks() {
  let elems = document.querySelectorAll('.star');
  if (elems.length > 10) {
    let child = document.querySelector('.star');
    child.parentNode.removeChild(child);
  }
}

function setHitCounter(bool, elem) {

  let contentOfShotHit = elem.trim();
  let contentOfShotMiss = elem.trim();
  let statisticsTwo = JSON.parse(localStorage.getItem('englishStatistics'));

  if (bool === true) {
    statisticsTwo.forEach(card => {
      if (card.en === contentOfShotHit) card.guessed += 1;
    });
  }

  if (bool === false) {
    console.log(bool, contentOfShotMiss)
    statisticsTwo.forEach(card => {
      if (card.en === contentOfShotMiss) card.didNotGuess += 1;
    });
  }
  localStorage.setItem('englishStatistics', JSON.stringify(statisticsTwo));
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}