import { obj } from "./data.js";
import { startGame, path } from "./values.js";
import { setActiveClassToNavbar } from "./header/navbar.js";
import { speechEnglish } from "./functions.js";


init();
export function init() {
  console.log(path.getPath())
  createCards(obj[path.getPath()]);
}

function createCards(arr) {
  let contentCards = document.querySelector('.content-carts');
  // console.log(arr)
  contentCards.innerHTML = `${arr.map(addCards).join('')}`;
}

function checkpath(item) {
  return path.getPath() === 'categories' ?
    `data-action=${item}` : `data-item=${path.getPath()}`;
}


function addButtonAndSpicker() {
  return `
    <div data-reverse="reverse" class="button-reverse"></div>
    <img src="assets/images/icons/speaker.png" data-speaker="speaker" class="img-speaker">
  `;
}

function addDescription() {
  return path.getPath() === 'categories' ?
    'card__categories-description' : 'card-description';
}

function addHiddenToCheckbox() {
  if (startGame.getStartGame() === true && path.getPath() !== 'categories') {
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
          <img class="card__img-img" src="assets/images/${path.getPath()}/${item}.png">
        </div>
        <div class="${addDescription()} ${addHiddenToCheckbox()}">
          <div class="card__description-en">
            ${item}
          </div>
          ${path.getPath() != 'categories' ? addButtonAndSpicker() : ''}
        </div>
        <div class="card__the-right-answer">&#10004;</div>
      </div>

      <div class="back">
        <div data.card="card" class="card__img">
          <img class="card__img-img" src="assets/images/${path.getPath()}/${item}.png">
        </div>
        <div class="card__description-ru">
          ${path.getPath() != 'categories' ? obj[path.getPath() + 'Ru'][index] : ''}
        </div>
      </div>
     </div>
  `;
}

// отрисовка нужного контента
document.addEventListener('click', (e) => {
  let elem = e.target.closest('.card');

  if (elem == null) return;
  if (elem.dataset.action) {

    path.setPath(elem.dataset.action);

    if (path.getPath()) {
      init();
      setActiveClassToNavbar(path.getPath());
    }
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

// press the button to repeat the spoken word
document.addEventListener('click', (e) => {

  if (e.target.className === "img-speaker") {
    let card = e.target.closest('.card');
    let text = card.querySelector(".card__description-en").innerHTML;
    text = text.trim();
    speechEnglish(text);
  }
});