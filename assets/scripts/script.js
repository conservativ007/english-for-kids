export let path = 'categories';

let word = '';
let arrCategory = [];
let shots = getRandomKeysArray(8);
let counterShots = -1;


init();
export function init() {
  createCards(obj[path]);
  showDescriptionCategory();
  setCurrentCategoryInTheOverlay();
  removeActiveClassToAllMenuElements();
  addActiveClassToMenuElem();
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
  let isChecked = document.querySelector('.train-control').checked;

  if (isChecked && path != 'categories') {
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


function showDescriptionCategory() {
  let descriptionCategory = document.querySelector('.description-category__category');
  descriptionCategory.innerHTML = `${path != 'categories' ? path : ""}`;
  if (path !== "categories") {
    descriptionCategory.classList.add("category-active");
  } else {
    descriptionCategory.classList.remove("category-active");
  }
}

// set in overlay by click on the card
setCurrentCategoryInTheOverlay();
function setCurrentCategoryInTheOverlay() {
  let cards = document.querySelector(".content-carts").children;
  [...cards].forEach(i => i.addEventListener("click", getNameOfCategory));

  function getNameOfCategory(e) {
    let nameOfCategory = e.currentTarget.querySelector(".card__description-en").innerHTML;
    nameOfCategory = nameOfCategory.trim();

    removeActiveClassToAllMenuElements();
    document.querySelectorAll(".menu__item").forEach(i => i.innerHTML === nameOfCategory ? i.classList.add("active") : null);
  }
}

// go back to main page by click on the description-category__main
document.addEventListener("click", (e) => {
  if (e.target.className !== "description-category__main") return;
  path = "categories";
  init();
  console.log(42)
})

// отрисовка нужного контента
document.addEventListener('click', (e) => {
  let elem = e.target.closest('.card');

  if (elem == null) return;
  if (elem.dataset.action) {

    path = elem.dataset.action;
    window.location.href = `#${path}`;

    if (path) {
      createCards(obj[path]);
    }

    // описание категории
    showDescriptionCategory();
  }
});

function removeActiveClassToAllMenuElements() {
  let linksNav = document.querySelectorAll(".menu__item");
  linksNav.forEach(i => i.classList.remove("active"));
}

function addActiveClassToMenuElem() {
  document.querySelector(`[data-category="${path}"]`).classList.add("active");
}

// переход по навигационным ссылкам
document.addEventListener('click', (e) => {
  if (e.target.dataset.category) {
    path = e.target.dataset.category;
    init();
    // removeActiveClassToAllMenuElements();
    // addActiveClassToMenuElem();
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
    // console.log(className)

    if (className !== 'card__img-img') {
      flipCard(cardElem, 180, 0);
    }
  });
}

// нажатие на флажок (checkbox) старта игры
document.addEventListener('click', (e) => {
  if (e.target.dataset.on) {
    document.querySelector('.start-game').classList.toggle('hidden');

    let cardDescription = document.querySelectorAll('.card-description');
    cardDescription.forEach(i => i.classList.toggle('hidden'));
  }
});


// start game button
document.addEventListener('click', (e) => {

  if (e.target.className == 'start-game__buttons-start' || e.target.className == 'start-game__start') {

    // if we on the main page with categories
    if (path == 'categories') {
      let message = document.querySelector('.user-message');
      message.classList.remove('hide');

      setTimeout(() => toggleClass(), 2000);

      function toggleClass() {
        message.classList.add('hide');
      }

    } else {

      let elem = document.querySelector('.start-game');
      elem.classList.add('start');
      elem.dataset.start = 'start';

      // get array with cards
      getArrCards();

      // modify the button
      buttonStartModify(true);

      // let's show the scale with future stars :)
      document.querySelector('.scale-marks').classList.remove('hidden');
    }
  }
});


function buttonStartModify(bool) {
  let elem = document.querySelector('.start-game');

  if (bool) {
    elem.firstElementChild.style.display = "none";
    elem.style.width = "40px";
    elem.style.height = "40px";
    elem.style.border = "none";
    elem.lastElementChild.style.display = "block";

  } else {

    elem.firstElementChild.style.display = "block";
    elem.style.width = "100px";
    elem.style.height = "40px";
    elem.style.border = "1px solid silver";
    elem.lastElementChild.style.display = "none";
  }
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
function checkArrayWords() {
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

function sayWord(bool) {
  if (bool) {
    speechEnglish(word);
  } else {
    word = getChunckArray(arrCategory);
    speechEnglish(word);
  }
}


document.addEventListener('click', (e) => {
  let elem = e.target.className;

  // проверка что кликаем по карте
  if (elem == 'card__img-img' || elem == 'front') {

    let checkBox = document.querySelector('.train-control').checked;
    let buttonstartGame = document.querySelector('.start-game');
    let boolButtonstartGame = buttonstartGame.classList.contains('start');

    // что флажёк включён и у кнопки есть класс (start)
    if (checkBox && boolButtonstartGame) {

      // получаем текст карточки по которой нажали
      let cardElemText = e.target.closest('.front').lastElementChild.firstElementChild.innerHTML;

      // блоки в которых находятся img (2 стороны)
      let cardFrontImg = e.target.closest('.front').firstElementChild;
      let cardBackImg = e.target.closest('.card').lastElementChild.firstElementChild.firstElementChild;

      let card = e.target.closest('.card');

      if (cardElemText == word) {

        setTimeout(() => sayWord(), 1000);
        shotImage(cardFrontImg, cardBackImg);
        transform3D(card, true);
        shotAudio(true);
        getCounterShots(true);
        scaleMarks(true);

        // счётчик попаданий
        getHitCounter(word);

        checkArrayWords();
      }

      else {
        shotAudio(false);
        transform3D(card, false);
        getCounterShots(false);
        scaleMarks(false);

        // счётчик промахов
        getNotHitCounter(word);
      }
    }
  }
});

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

let count = 0;
// повторное нажатие на кнопку в режиме игры
document.addEventListener('click', (e) => {
  if (e.target.dataset.start || e.target.dataset.repeat) {
    count++
    if (count <= 1) return;

    sayWord(true);
  }

});

// трансформация карточек при игре
function transform3D(card, bool) {
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

// наложение картинки на карточку
function shotImage(front, back) {
  let chunckShots = shots.shift();

  let newImg = document.createElement('img');
  newImg.style.width = '200px';
  newImg.style.height = '200px';
  newImg.style.position = 'absolute';
  newImg.style.zIndex = 1;
  newImg.src = `assets/images/shots/${chunckShots + 1}.png`;

  front.append(newImg);
  back.src = `assets/images/shots/${chunckShots + 1}.png`;
}

// звук)
function shotAudio(bool) {
  let randSound, shotSound;

  randSound = bool ? randomInteger(1, 2) : randomInteger(3, 4);

  shotSound = document.querySelector(`#sound${randSound}`);
  shotSound.play();
}

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

// щётчик выстрелов
function getCounterShots(bool) {
  bool ? counterShots++ : counterShots--;
}

// записаить статистику при первичном заходе на страницу
setStatistick();
function setStatistick() {
  if (!localStorage.getItem('englishStatistics')) {
    localStorage.setItem('englishStatistics', JSON.stringify(statistics));
  }
}

// проверка длинны слова
function checkLength(elem) {
  if (elem.length > 11) {
    return elem.slice(0, 3) + ' - ' + elem.slice(-2);
  }
  return elem;
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

// счётчик попаданий
function getHitCounter(elem) {
  let contentOfShotHit = elem.trim();
  let statisticsTwo = JSON.parse(localStorage.getItem('englishStatistics'));

  statisticsTwo.forEach(card => {
    if (card.en === contentOfShotHit) card.guessed += 1;
  });
  localStorage.setItem('englishStatistics', JSON.stringify(statisticsTwo));
}

// счётчик промахов
function getNotHitCounter(elem) {
  let contentOfShotMiss = elem.trim();

  let statisticsTwo = JSON.parse(localStorage.getItem('englishStatistics'));

  statisticsTwo.forEach(card => {
    if (card.en === contentOfShotMiss) card.didNotGuess += 1;
  });
  localStorage.setItem('englishStatistics', JSON.stringify(statisticsTwo));
}

// сброс статистики
document.addEventListener('click', (e) => {
  if (e.target.className != 'reset-statistic') return;
  localStorage.setItem('englishStatistics', JSON.stringify(statistics));
});


function reloadPage(modal, smile) {
  document.querySelector('.train-control').checked = false;

  document.querySelector('.start-game').classList.toggle('hidden');
  document.querySelector('.start-game').classList.toggle('start');

  path = 'categories';
  word = '';
  arrCategory = [];
  shots = getRandomKeysArray(8);
  counterShots = -1;

  modal.style.display = "none";
  smile.classList.add('hidden');

  document.querySelector('.scale-marks').classList.add('hidden');
  document.querySelector('.scale-marks').innerHTML = '';

  document.querySelectorAll('.menu__item').forEach(i => i.classList.remove("active"));
  document.querySelector('.menu__item').classList.add("active");

  buttonStartModify(false);
  init();
}

function getRandomKeysArray(num) {
  let elems = [...Array(num).keys()]
    .sort(() => Math.random() - 0.5);

  return elems;
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
