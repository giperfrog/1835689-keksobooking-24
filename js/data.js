import {getRandomInt, getRandomFloat, getRandomArrayElement, shuffledArray, getRandomArray} from './util.js';

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
      lat,
      lng,
    },
  };
};

const similarOffers = Array.from({length: SIMILAR_OFFER_COUNT}, (_, index) => createTotalOffer(index));

export {similarOffers};
