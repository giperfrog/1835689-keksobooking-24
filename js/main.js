/* eslint-disable no-const-assign */
/* eslint-disable id-length */
const AVATARS = [
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

const TITLES = [
  'Kolibri apartments',
  'Botanika Hostel',
  'Капсульный Хостел Capslock',
  'Apartment house Argo',
  'Winter Palace',
  'Capital Hotel',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];

const DESCRIPTIONS = [
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

const LATITUDE_RANGE = [35.65000, 35.70000];
const LONGITUDE_RANGE = [139.7000, 139.8000];
const LOCATION_FLOAT_LENGTH = 5;
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

const shuffledArray = (array) => { // Возвращает перемешанный массив.
  for (let i = array.length - 1; i > 0; i--) {
    const  j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const getRandomArray = (array) => array.slice(0, getRandomInt(1, array.length - 1)); // Возвращает случайную длину массива.

const createTotalOffer = (index) => {
  const lat = getRandomFloat(LATITUDE_RANGE[0], LATITUDE_RANGE[1], LOCATION_FLOAT_LENGTH);
  const lng = getRandomFloat(LONGITUDE_RANGE[0], LONGITUDE_RANGE[1], LOCATION_FLOAT_LENGTH);

  return {
    author: {
      avatar: AVATARS[index],
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomInt(0, 50000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 10),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getRandomArray(shuffledArray(FEATURES)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(shuffledArray(PHOTOS)),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
};

const similarOffers = Array.from({length: SIMILAR_OFFER_COUNT}, (_, index) => createTotalOffer(index));

// eslint-disable-next-line no-console
console.log(similarOffers);
