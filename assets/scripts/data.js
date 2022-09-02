let obj = {
  'categories': [
    'space', 'natural', 'animals', 'home',
    'colors', 'food', 'cities', 'emotions',
  ],

  'animals': [
    'fox', 'chick', 'crab', 'elk', 'owl', 'pig', 'whale', 'tiger'
  ],

  'animalsRu': [
    'лиса', 'цыплёнок', 'краб', 'лось', 'сова', 'свинья', 'кит', 'тигр'
  ],

  'food': [
    'apple', 'cake', 'coffee', 'hamburger', 'hot-dog', 'ice-cream', 'pizza', 'soda'
  ],

  'foodRu': [
    'яблоко', 'пироженное', 'коффе', 'гамбургер', 'хот-дог', 'мороженное', 'пицца', 'газировка'
  ],

  'natural': [
    'beach', 'flowers', 'rainbow', 'snowflake', 'sun', 'tree', 'volcano', 'water'
  ],

  'naturalRu': [
    'пляж', 'цветы', 'радуга', 'снег', 'солнце', 'дерево', 'вулкан', 'вода'
  ],

  'space': [
    'astronaut', 'comet', 'planet', 'shuttle', 'space-station', 'rocket', 'telescope', 'ufo'
  ],

  'spaceRu': [
    'астронавт', 'комента', 'планета', 'шатл', 'космическая-станция', 'ракета', 'телескоп', 'нло'
  ],

  'colors': [
    'black', 'blue', 'green', 'orange', 'pink', 'red', 'violet', 'yellow'
  ],

  'colorsRu': [
    'чёрный', 'синий', 'зелёный', 'оранжевый', 'розовый', 'красный', 'фиолетовый', 'жёлтый'
  ],

  'cities': [
    'banking', 'building', 'bus', 'park', 'road', 'taxi', 'traffic-light', 'tram'
  ],

  'citiesRu': [
    'банк', 'здание', 'автобус', 'парк', 'дорога', 'такси', 'светофор', 'трамвай'
  ],

  'home': [
    'armchair', 'basin', 'bath', 'door', 'mirror', 'toilet', 'watching-tv', 'window'
  ],

  'homeRu': [
    'кресло', 'умывальник', 'ванна', 'дверь', 'зеркало', 'туалет', 'телевизор', 'окно'
  ],

  'emotions': [
    'angry', 'confusion', 'cry', 'friendship', 'happy', 'love', 'thinking', 'tired'
  ],

  'emotionsRu': [
    'злость', 'спутанность', 'плакать', 'дружба', 'счастье', 'любовь', 'мышление', 'усталость'
  ],
};

let statistics = {
  fox: {
    en: 'fox',
    ru: 'лиса',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  chick: {
    en: 'chick',
    ru: 'цыплёнок',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  crab: {
    en: 'crab',
    ru: 'краб',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  elk: {
    en: 'elk',
    ru: 'лось',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  owl: {
    en: 'owl',
    ru: 'сова',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  pig: {
    en: 'pig',
    ru: 'свинья',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  whale: {
    en: 'whale',
    ru: 'кит',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  tiger: {
    en: 'tiger',
    ru: 'тигр',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },


  astronaut: {
    en: 'astronaut',
    ru: 'астронавт',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  comet: {
    en: 'comet',
    ru: 'комета',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  planet: {
    en: 'planet',
    ru: 'планета',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  shuttle: {
    en: 'shuttle',
    ru: 'шатл',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  'space-station': {
    en: 'space-station',
    ru: 'космическая-станция',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  rocket: {
    en: 'rocket',
    ru: 'ракета',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  telescope: {
    en: 'telescope',
    ru: 'телескоп',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  ufo: {
    en: 'ufo',
    ru: 'нло',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },

  beach: {
    en: 'beach',
    ru: 'пляж',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  flowers: {
    en: 'flowers',
    ru: 'цветы',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  rainbow: {
    en: 'rainbow',
    ru: 'радуга',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  snowflake: {
    en: 'snowflake',
    ru: 'снег',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  'sun': {
    en: 'sun',
    ru: 'солнце',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  tree: {
    en: 'tree',
    ru: 'дерево',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  volcano: {
    en: 'volcano',
    ru: 'вулкан',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  water: {
    en: 'water',
    ru: 'вода',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },

  armchair: {
    en: 'armchair',
    ru: 'кресло',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  basin: {
    en: 'basin',
    ru: 'умывальник',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  bath: {
    en: 'bath',
    ru: 'ванна',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  door: {
    en: 'door',
    ru: 'дверь',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  mirror: {
    en: 'mirror',
    ru: 'зеркало',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  toilet: {
    en: 'toilet',
    ru: 'туалет',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  'watching-tv': {
    en: 'watching-tv',
    ru: 'телевизор',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  window: {
    en: 'window',
    ru: 'окно',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },


  black: {
    en: 'black',
    ru: 'чёрный',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  blue: {
    en: 'blue',
    ru: 'синий',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  green: {
    en: 'green',
    ru: 'зелёный',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  orange: {
    en: 'orange',
    ru: 'оранжевый',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  pink: {
    en: 'pink',
    ru: 'розовый',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  red: {
    en: 'red',
    ru: 'красный',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  violet: {
    en: 'violet',
    ru: 'фиолетовый',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  yellow: {
    en: 'жёлтый',
    ru: 'окно',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },

  apple: {
    en: 'apple',
    ru: 'яблоко',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  cake: {
    en: 'cake',
    ru: 'пироженное',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  coffee: {
    en: 'coffee',
    ru: 'кофе',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  hamburger: {
    en: 'hamburger',
    ru: 'гамбургер',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  'hot-dog': {
    en: 'hot-dog',
    ru: 'хот-дог',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  'ice-cream': {
    en: 'ice-cream',
    ru: 'мороженное',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  pizza: {
    en: 'pizza',
    ru: 'пицца',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  soda: {
    en: 'soda',
    ru: 'газировка',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },


  banking: {
    en: 'banking',
    ru: 'банк',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  building: {
    en: 'building',
    ru: 'здание',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  bus: {
    en: 'bus',
    ru: 'автобус',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  park: {
    en: 'park',
    ru: 'парк',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  road: {
    en: 'road',
    ru: 'дорога',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  taxi: {
    en: 'taxi',
    ru: 'такси',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  'traffic-light': {
    en: 'traffic-light',
    ru: 'светофор',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  tram: {
    en: 'tram',
    ru: 'трамвай',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },


  angry: {
    en: 'angry',
    ru: 'злость',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  confusion: {
    en: 'confusion',
    ru: 'спутанность',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  cry: {
    en: 'cry',
    ru: 'плакать',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  friendship: {
    en: 'friendship',
    ru: 'дружба',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  happy: {
    en: 'happy',
    ru: 'счастье',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  love: {
    en: 'love',
    ru: 'любовь',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  thinking: {
    en: 'thinking',
    ru: 'мышление',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
  tired: {
    en: 'tired',
    ru: 'усталость',
    lookedAnswer: 0,
    guessed: 0,
    didNotGuess: 0,
  },
};
