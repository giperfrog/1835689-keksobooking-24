/* eslint-disable no-undef */
import {AVATARS, TITLES, TYPES, CHECKINS, CHECKOUTS, DESCRIPTIONS, FEATURES, PHOTOS, LATITUDE_RANGE, LONGITUDE_RANGE, LOCATION_FLOAT_LENGTH} from './data.js';
import {getRandomInt, getRandomFloat, getRandomArrayElement, shuffledArray, getRandomArray} from './util.js';

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

// eslint-disable-next-line no-console
console.log(similarOffers);
