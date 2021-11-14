import {getData} from './api.js';
import {createMap, createMarker, markerGroup} from './map.js';
import {makePageInactive, makeFiltersActive} from './form.js';
import {debounce} from './util.js';
import './avatar.js';

let initialOffers;

const OFFERS_SHOW = 10;
const RERENDER_DELAY = 500;

const optionType = document.querySelector('#housing-type');
const optionPrice = document.querySelector('#housing-price');
const optionRooms = document.querySelector('#housing-rooms');
const optionGuests = document.querySelector('#housing-guests');
const featuresContainer = document.querySelector('#housing-features');
const featuresInputs = featuresContainer.querySelectorAll('.map__checkbox');

const drawOffers = (offers = initialOffers) => {
  offers.slice(0, OFFERS_SHOW).forEach((offer) => {
    createMarker(offer);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  makePageInactive();
  createMap();
  getData((offers) => {
    initialOffers = offers;
    drawOffers();
  });
  makeFiltersActive();
  const onFiltersChange = () => {
    let filterOffers = initialOffers;

    markerGroup.clearLayers();

    if (optionType.value !== 'any') {
      filterOffers = filterOffers.filter((offer) => (offer.offer.type === optionType.value));
    }
    if (optionPrice.value !== 'any') {
      filterOffers = filterOffers.filter( (offer) => {
        switch (optionPrice.value) {
          case 'low':
            return offer.offer.price < 10000;
          case 'middle':
            return (offer.offer.price >= 10000 && offer.offer.price < 50000);
          case 'high':
            return offer.offer.price >= 50000;
        }
      });
    }
    if (optionRooms.value !== 'any') {
      filterOffers = filterOffers.filter((offer) => (offer.offer.rooms === +optionRooms.value));
    }
    if (optionGuests.value !== 'any') {
      filterOffers = filterOffers.filter((offer) => (offer.offer.guests === +optionGuests.value));
    }

    const selectedFeatures = [...featuresInputs].filter((input) => input.checked);
    if (selectedFeatures.length) {
      filterOffers = filterOffers.filter((offer) => {
        if (offer.offer.features) {
          return selectedFeatures.every((feature) => offer.offer.features.includes(feature.value));
        }
        return false;
      });
    }

    filterOffers.slice(0, OFFERS_SHOW).forEach((offer) => {
      createMarker(offer);
    });
  };

  optionType.addEventListener('change', debounce(() => onFiltersChange(), RERENDER_DELAY));
  optionPrice.addEventListener('change', debounce(() => onFiltersChange(), RERENDER_DELAY));
  optionRooms.addEventListener('change', debounce(() => onFiltersChange(), RERENDER_DELAY));
  optionGuests.addEventListener('change', debounce(() => onFiltersChange(), RERENDER_DELAY));
  featuresContainer.addEventListener('click', debounce(() => onFiltersChange(), RERENDER_DELAY));
});

export {drawOffers};
