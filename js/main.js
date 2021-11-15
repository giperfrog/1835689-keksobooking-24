import {getData} from './api.js';
import {createMap, createMarker, markerGroup} from './map.js';
import {makePageInactive, makeFiltersActive} from './form.js';
import {debounce} from './util.js';
import './avatar.js';

let initialOffers;

const OFFERS_SHOW = 10;
const RERENDER_DELAY = 500;

const selectedType = document.querySelector('#housing-type');
const selectedPrice = document.querySelector('#housing-price');
const selectedRooms = document.querySelector('#housing-rooms');
const selectedGuests = document.querySelector('#housing-guests');
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
    let filteredOffers = initialOffers;

    markerGroup.clearLayers();

    if (selectedType.value !== 'any') {
      filteredOffers = filteredOffers.filter((offer) => (offer.offer.type === selectedType.value));
    }
    if (selectedPrice.value !== 'any') {
      filteredOffers = filteredOffers.filter( (offer) => {
        switch (selectedPrice.value) {
          case 'low':
            return offer.offer.price < 10000;
          case 'middle':
            return (offer.offer.price >= 10000 && offer.offer.price < 50000);
          case 'high':
            return offer.offer.price >= 50000;
        }
      });
    }
    if (selectedRooms.value !== 'any') {
      filteredOffers = filteredOffers.filter((offer) => (offer.offer.rooms === +selectedRooms.value));
    }
    if (selectedGuests.value !== 'any') {
      filteredOffers = filteredOffers.filter((offer) => (offer.offer.guests === +selectedGuests.value));
    }

    const selectedFeatures = [...featuresInputs].filter((input) => input.checked);
    if (selectedFeatures.length) {
      filteredOffers = filteredOffers.filter((offer) => {
        if (offer.offer.features) {
          return selectedFeatures.every((feature) => offer.offer.features.includes(feature.value));
        }
        return false;
      });
    }

    filteredOffers.slice(0, OFFERS_SHOW).forEach((offer) => {
      createMarker(offer);
    });
  };

  selectedType.addEventListener('change', debounce(() => onFiltersChange(), RERENDER_DELAY));
  selectedPrice.addEventListener('change', debounce(() => onFiltersChange(), RERENDER_DELAY));
  selectedRooms.addEventListener('change', debounce(() => onFiltersChange(), RERENDER_DELAY));
  selectedGuests.addEventListener('change', debounce(() => onFiltersChange(), RERENDER_DELAY));
  featuresContainer.addEventListener('click', debounce(() => onFiltersChange(), RERENDER_DELAY));
});

export {drawOffers};
