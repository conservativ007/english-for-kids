import { getRandomKeysArray } from "./functions.js";

export const startGame = {
  startGame: false,
  setStartGame(value) {
    this.startGame = value;
  },
  getStartGame() {
    return this.startGame;
  }
}

export const path = {
  path: 'categories',
  setPath(value) {
    this.path = value;
  },
  getPath() {
    return this.path;
  }
}

export const countForClock = {
  count: 22,
  countDecrease() {
    this.count -= 1;
  },
  getCount() {
    return this.count;
  },
  setDefaultClock() {
    this.count = 22;
  }
}

export const countForUserQuestions = {
  count: 0,
  increaseCount() {
    this.count += 1;
  },
  getCount() {
    return this.count;
  },
  setCountToDefault() {
    this.count = 0;
  }
}

export const setDifficultyGame = {
  difficulty: "normal",
  setDifficulty(value) {
    this.difficulty = value;
  },
  getDifficulty() {
    return this.difficulty;
  },
  setDifficultyToDefault() {
    this.difficulty = "normal"
  }
}

export const word = {
  word: "",
  setWord(value) {
    this.word = value;
  },
  getWord() {
    return this.word;
  }
}

export const arrayOfCards = {
  cards: [],
  setCard(card) {
    this.cards.push(card);
  },
  setCards(cards) {
    this.cards = cards;
  },
  getCards() {
    return this.cards;
  },
  clearCards() {
    this.cards = [];
  },
  setRundomCards() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  },
  getSliceOfCardsArray() {
    return this.cards.shift();
  }
}

export const counterShots = {
  shots: 0,
  setShots(bool) {
    this.shots = bool ? this.shots += 1 : this.shots -= 1;
  },
  getShots() {
    return this.shots;
  },
  setDefaultShots() {
    this.shots = 0;
  }
}

export const shots = {
  shots: getRandomKeysArray(8),
  getSliceOfShots() {
    return this.shots.shift();
  },
  getShots() {
    return this.shots;
  },
  setDefaultShots() {
    this.shots = getRandomKeysArray(8);
  }
}

export const printAllValues = {
  getValues() {
    return setInterval(() => printValues, 1000);
  }
}

function printValues() {
  return `
    shots: ${shots.getShots()},
    counterShots: ${counterShots.getShots()},
    arrayOfCards: ${arrayOfCards.getCards()},
    word: ${word.getWord()},
    setDifficultyGame: ${setDifficultyGame.getDifficulty()},
    countForClock: ${countForClock.getCount()},
    path: ${path.getPath()},
    startGame: ${startGame.getStartGame()},
  `
}

