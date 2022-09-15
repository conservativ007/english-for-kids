import { setActiveClassToNavbar, setNavbarToDefaultCategory } from "./navbar.js";
import { obj, statistics } from "./data.js";

export let path = 'categories';
export let startGame = false;
export let word = '';
export let shots = getRandomKeysArray(8);
export let counterShots = -1;

let arrCategory = [];

let difficulty = "normal";

export function setPath(name) {
  path = name;
}


init();
export function init() {
  createCards(obj[path]);
}

export function setConterShots(bool) {
  bool === true ? counterShots += 1 : counterShots -= 1;
}


function checkpath(item) {
  return path == 'categories' ?
    `data-action=${item}` : `data-item=${path}`;
}


function addButtonAndSpicker() {
  return `
    <div data-reverse="reverse" class="button-reverse"></div>
    <img onclick="pronunciation(this)" src="assets/images/icons/speaker.png" data-speaker="speaker" class="img-speaker">
  `;
}

function addDescription() {
  return path == 'categories' ?
    'card__categories-description' : 'card-description';
}

function addHiddenToCheckbox() {
  if (startGame === true && path != 'categories') {
    return 'hidden';
  } else {
    return '';
  }
}


function addCards(item, index) {
  return `
     <div ${checkpath(item)} class="card">
      <div class="front">
        <div dataset.card="card" class="card__img">
          <img class="card__img-img" src="assets/images/${path}/${item}.png">
        </div>
        <div class="${addDescription()} ${addHiddenToCheckbox()}">
          <div class="card__description-en">
            ${item}
          </div>
          ${path != 'categories' ? addButtonAndSpicker() : ''}
        </div>
      </div>

      <div class="back">
        <div data.card="card" class="card__img">
          <img class="card__img-img" src="assets/images/${path}/${item}.png">
        </div>
        <div class="card__description-ru">
          ${path != 'categories' ? obj[path + 'Ru'][index] : ''}
        </div>
      </div>
     </div>
  `;
}

function createCards(arr) {
  let contentCards = document.querySelector('.content-carts');
  contentCards.innerHTML = `${arr.map(addCards).join('')}`;
}

// отрисовка нужного контента
document.addEventListener('click', (e) => {
  let elem = e.target.closest('.card');

  if (elem == null) return;
  if (elem.dataset.action) {

    path = elem.dataset.action;

    if (path) {
      init();
      setActiveClassToNavbar(path);
    }
  }
});

// переход по навигационным ссылкам
document.addEventListener('click', (e) => {
  if (e.target.dataset.category) {
    path = e.target.dataset.category;
    init();
    setCurrentCategoryInTheOverlay();
  }
});


// turn the card
document.addEventListener('click', (e) => {
  if (e.target.dataset.reverse) {
    let cardElem = e.target.closest('.card');

    const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);

    if (isMobile === true) {
      console.log("mobile")
      flipCard(cardElem, 360, 180);
      setTimeout(() => flipCard(cardElem, 180, 0), 2000);
    } else {
      console.log("desktop")
      flipCard(cardElem, 360, 180);
      reverseCoup(cardElem);
    }
  }
});


function flipCard(elem, a, b) {
  elem.lastElementChild.style.transform = `rotatey(${a}deg)`;
  elem.firstElementChild.style.transform = `rotatey(${b}deg)`;
}

// обратный переворот карточки
function reverseCoup(cardElem) {
  document.addEventListener('mouseover', (e) => {

    let className = e.target.className;
    if (className !== 'card__img-img') {
      flipCard(cardElem, 180, 0);
    }
  });
}


function getChunckArray(arr) {
  return arr.length > 0 ? arr.shift() : '';
}


function getArrCards() {
  let cards = document.querySelectorAll('.card');

  // get an array of words from the selected category
  cards.forEach(i => {
    arrCategory.push(i.querySelector('.card__description-en').innerHTML);
  });

  arrCategory.sort(() => Math.random() - 0.5);

  sayWord();
}

// checkArrayWords();
export function checkArrayWords() {
  if (arrCategory.length != 0) return;

  let modal = document.querySelector('.win-message');
  let message = document.querySelector('.win-message__text');
  let smileHappy = document.querySelector('.smile-happy');
  let smileCry = document.querySelector('.smile-cry');

  modal.style.display = "block";

  if (counterShots == 7) {
    message.firstElementChild.innerHTML = 'Вы выйграли';
    message.lastElementChild.innerHTML = '';
    smileHappy.classList.remove('hidden');
    endGameSound('winner');
    setTimeout(() => reloadPage(modal, smileHappy), 15000);
  } else {
    message.firstElementChild.innerHTML = 'Вы проиграли';
    message.lastElementChild.innerHTML = `ошибок: ${7 - counterShots}`;
    smileCry.classList.remove('hidden');
    endGameSound('loosers');
    setTimeout(() => reloadPage(modal, smileCry), 5000);
  }

  clearPage();
}

// clearPage();
function clearPage() {
  let elems = document.querySelectorAll('.card');
  elems.forEach(i => i.classList.add('hidden'));
}

export function sayWord(bool) {
  if (bool) {
    speechEnglish(word);
  } else {
    word = getChunckArray(arrCategory);
    speechEnglish(word);
  }
}

// start game
document.addEventListener("click", e => {
  if (e.target.className !== "main-controls__start-button") return;
  startGame = true;

  let mainControls = document.querySelector(".main-controls");
  let mainShowprogress = document.querySelector(".main-showprogress");

  mainControls.style.display = "none";
  mainShowprogress.style.display = "flex";

  getArrCards();
  init();
});

let count = 0;
// повторное нажатие на кнопку в режиме игры
document.addEventListener('click', (e) => {
  if (e.target.dataset.start || e.target.dataset.repeat) {
    count++
    if (count <= 1) return;
    sayWord(true);
  }
});

// звук в конце игры
function endGameSound(act) {

  let endGameSound = '';

  if (act == 'winner') {
    endGameSound = document.querySelector('#sound5');
  } else if (act == 'loosers') {
    endGameSound = document.querySelector('#sound6');
  }

  endGameSound.play();
}

// записаить статистику при первичном заходе на страницу
setStatistick();
function setStatistick() {
  if (!localStorage.getItem('englishStatistics')) {
    localStorage.setItem('englishStatistics', JSON.stringify(statistics));
  }
}

// высчитать процент правильных ответов
function getPercentageGuessing(a, b) {
  let res = (a / (a + b)) * 100;

  if (isNaN(res)) {
    return 0;
  }

  return res.toFixed(0);
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


function reloadPage(modal, smile) {
  document.querySelector(".main-controls__start-button").disabled = true;
  document.querySelector(".main-controls").style.display = "flex";
  document.querySelector(".main-showprogress").style.display = "none";
  document.querySelector('.scale-marks').innerHTML = '';

  startGame = false;
  path = 'categories';
  word = '';
  arrCategory = [];
  shots = getRandomKeysArray(8);
  counterShots = -1;

  modal.style.display = "none";
  smile.classList.add('hidden');

  setNavbarToDefaultCategory();
  init();
}

function getRandomKeysArray(num) {
  let elems = [...Array(num).keys()]
    .sort(() => Math.random() - 0.5);

  return elems;
}
