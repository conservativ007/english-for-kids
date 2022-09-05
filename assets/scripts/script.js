export let path = 'categories';


let word = '';
let arrCategory = [];
let shots = getRandomKeysArray(8);
let counterShots = -1;


init();
export function init() {
  createCards(obj[path]);
  showDescriptionCategory();
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
  document.querySelector('.description-category').innerHTML = `${path != 'categories' ? path : ''}`;
}


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


let linksNav = document.querySelectorAll(".menu__item");
function removeClassToAllMenuElements() {
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
    removeClassToAllMenuElements();
    addActiveClassToMenuElem();
  }
});


// переворот карточки
document.addEventListener('click', (e) => {
  if (e.target.dataset.reverse) {
    let cardElem = e.target.closest('.card');
    flipCard(cardElem, 360, 180);

    reverseCoup(cardElem);
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

    if (className == 'content-carts') {
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


// кнопка старта игры
document.addEventListener('click', (e) => {

  if (e.target.className == 'start-game' || e.target.className == 'start-description') {

    // если мы находимся на главной странице с категориями
    if (path == 'categories') {
      let message = document.querySelector('.header-content__message');
      message.classList.remove('hidden');

      setTimeout(() => toggleClass(), 2000);

      function toggleClass() {
        message.classList.add('hidden');
      }

    } else {

      let elem = document.querySelector('.start-game');
      elem.classList.add('start');
      elem.dataset.start = 'start';

      // получим массив с карточками
      getArrCards();

      // модифицируем кнопку
      buttonStartModify(true);

      // покажем шкалу с будущими звёздочками :)
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

// переворот кнопки старт
document.addEventListener('mousemove', (e) => {
  if (e.target.className == 'repeat-button') {
    let elem = document.querySelector(`.${e.target.className}`);
    elem.style.transform = 'rotate(-90deg)';

    reverseRepeat(elem);
  }
});

// обратный переворот
function reverseRepeat(elem) {
  document.addEventListener('mousemove', (e) => {
    if (e.target.className != 'repeat-button') {
      elem.style.transform = 'rotate(90deg)';
    }
  });
}

function getChunckArray(arr) {
  return arr.length > 0 ? arr.shift() : '';
}


function getArrCards() {
  let cards = document.querySelectorAll('.card');

  // получим массив слов из выбранной категории
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

// показать статистику
document.addEventListener('click', (e) => {
  if (e.target.className != 'statistics') return;
  getStatistickTwo();
  document.querySelector('.modal').classList.add('open');
});

// закрыть статистику
document.addEventListener('click', (e) => {
  if (e.target.className != 'close') return;
  document.querySelector('.modal').classList.remove('open');
});


// записаить статистику при первичном заходе на страницу
setStatistick();
function setStatistick() {
  if (!localStorage.getItem('englishStatistics')) {
    localStorage.setItem('englishStatistics', JSON.stringify(statistics));
  }
}

// отображение статитики
getStatistickTwo();
function getStatistickTwo() {
  let localStorStatistics = JSON.parse(localStorage.getItem('englishStatistics'));

  let contentDescription = document.querySelector('.content__description');
  let contentWord = document.querySelector('.content__word');

  let elems = Object.entries(localStorStatistics);

  contentDescription.innerHTML = `
    ${getContentDescription()}
  `;

  contentWord.innerHTML = `
    ${elems.map(getCard).join('')}
  `;

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

function getContentDescription() {
  return `
    <div class="description-statistic" style="left: 5px;">
      <div class="statistic__en" style="left: 5px;">слово</div>
      <div class="statistic__ru" style="left: 65px;">перевод</div>
      <div class="statistic__translate" style="left: 75px;">посмотрели перевод</div>
      <div class="statistic__guessed" style="left: 85px;">угадали</div>
      <div class="statistic__not-guessed" style="left: 105px;">не угадали</div>
      <div class="statistic__not-guessed" style="left: 105px;">%</div>
    </div>
  `;
}

function getCard(elem, index) {
  return `
  <div class="word">
    <div class="word__en" style="top: ${(index + 1 % 10) * 15}px; left: 5px;">
      ${checkLength(elem[1].en)}
    </div>
    <div class="word__ru" style="top: ${(index + 1 % 10) * 15}px; left: 70px;">
      ${checkLength(elem[1].ru)}
    </div>
    <div class="word__lookedAnswer" style="top: ${(index + 1 % 10) * 15}px; left: 155px;">
      ${elem[1].lookedAnswer}
    </div>
    <div class="word__guessed" style="top: ${(index + 1 % 10) * 15}px; left: 215px;">
      ${elem[1].guessed}
    </div>
    <div class="word__didNotGuess" style="top: ${(index + 1 % 10) * 15}px; left: 275px;">
      ${elem[1].didNotGuess}
    </div>
    <div class="word__gain" style="top: ${(index + 1 % 10) * 15}px; left: 295px;">
      ${getPercentageGuessing(elem[1].guessed, elem[1].didNotGuess)}
    </div>

  </div>
  `;
}


// счётчик, сколько пользователь переврнул карточку и посмотрел перевод)
document.addEventListener('click', (e) => {
  if (e.target.dataset.reverse) {
    let parentElem = e.target.closest('.card');
    let childElem = parentElem.querySelector('.card__description-en').innerHTML;
    childElem = childElem.trim();

    let statisticsTwo = JSON.parse(localStorage.getItem('englishStatistics'));
    statisticsTwo[childElem].lookedAnswer += 1;
    localStorage.setItem('englishStatistics', JSON.stringify(statisticsTwo));
  }
});

// счётчик попаданий
function getHitCounter(elem) {
  let nameItem = elem.trim();

  let statisticsTwo = JSON.parse(localStorage.getItem('englishStatistics'));
  statisticsTwo[nameItem].guessed += 1;
  localStorage.setItem('englishStatistics', JSON.stringify(statisticsTwo));
}

// счётчик промахов
function getNotHitCounter(elem) {
  let nameItem = elem.trim();

  let statisticsTwo = JSON.parse(localStorage.getItem('englishStatistics'));
  statisticsTwo[nameItem].didNotGuess += 1;
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

  buttonStartModify('', false);
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
