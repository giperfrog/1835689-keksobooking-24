const AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

const TITLE = [
  'Kolibri apartments',
  'Botanika Hostel',
  'Капсульный Хостел Capslock',
  'Apartment house Argo',
  'Winter Palace',
  'Capital Hotel',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const DESCRIPTION = [
  'рядом с метро',
  'большая двухспальная кровать',
  'только односпальные кровати',
  'очень уютное помещение',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_OFFER_COUNT = 10;

const getRandomInt = (min, max) => { // Возвращает случайное целое число из переданного диапазона включительно, взято с MDN Web Docs.
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomFloat = (min, max, decimal) => { // Возвращает случайное число с плавающей точкой из переданного диапазона включительно.
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Number((Math.random() * (upper - lower) + lower).toFixed(decimal));
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)]; // Возвращает случайный элемент из массива.

const getArrayRandom = (features) => { // Возвращает новый массив случайной длины из случайных значений, не повторяются.
  const lengthOfArray = getRandomInt(1, features.length);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomInt(0, features.length - 1);
    const el = features[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }

  return array;
};

const createTotalOffer = () => ({
  return: {
    author: AVATAR.forEach(),
    offer: function () {
      return {
        title: getRandomArrayElement(TITLE),
        address: 'location.lat, location.lug',
        price: getRandomInt(0, 50000),
        type: getRandomArrayElement(TYPE),
        rooms: getRandomInt(1, 10),
        guests: getRandomInt(1, 10),
        checkin: getRandomArrayElement(CHECKIN),
        checkout: getRandomArrayElement(CHECKOUT),
        features: getArrayRandom(FEATURES),
        description: getRandomArrayElement(DESCRIPTION),
        photos: getArrayRandom(PHOTOS),
      };
    },
    location: function () {
      return {
        lat: getRandomFloat(35.65000, 35.70000, 5),
        lug: getRandomFloat(139.7000, 139.8000, 5),
      };
    },
  },
});

const similarOffer = Array.from({length: SIMILAR_OFFER_COUNT}, createTotalOffer);

similarOffer();
