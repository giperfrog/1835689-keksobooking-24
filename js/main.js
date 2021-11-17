/* eslint-disable no-console */
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

const checkOfferType = (offer) => selectedType.value === offer.offer.type || selectedType.value === 'any';
const checkOfferPrice = (offer) => {
  switch (selectedPrice.value) {
    case 'low':
      return offer.offer.price < 10000;
    case 'middle':
      return (offer.offer.price >= 10000 && offer.offer.price < 50000);
    case 'high':
      return offer.offer.price >= 50000;
    case 'any':
      return true;
  }
};
const checkOfferRooms = (offer) => +selectedRooms.value === offer.offer.rooms || selectedRooms.value === 'any';
const checkOfferGuests = (offer) => +selectedGuests.value === offer.offer.guests || selectedGuests.value === 'any';
const checkFeaturesFilters = (offer) => {
  const selectedFeatures = [...featuresInputs].filter((input) => input.checked);
  if (selectedFeatures.length) {
    if (offer.offer.features) {
      return selectedFeatures.every((feature) => offer.offer.features.includes(feature.value));
    }
    return true;
  }
};

const filters = [
  checkOfferType,
  checkOfferPrice,
  checkOfferRooms,
  checkOfferGuests,
  checkFeaturesFilters,
];

document.addEventListener('DOMContentLoaded', () => {
  makePageInactive();
  createMap();
  getData((offers) => {
    initialOffers = offers;
    drawOffers();
    makeFiltersActive();
  });

  const onFiltersChange = () => {
    const filteredOffers = [];
    markerGroup.clearLayers();

    for (let i = 0; i < initialOffers.length && filteredOffers.length < 10; i++) {
      const offer = initialOffers[i];
      if (filters.every((applyFilter) => applyFilter(offer))) {
        filteredOffers.push(offer);
      }
    }

    filteredOffers.forEach((offer) => createMarker(offer));
  };

  selectedType.addEventListener('change', debounce(onFiltersChange, RERENDER_DELAY));
  selectedPrice.addEventListener('change', debounce(onFiltersChange, RERENDER_DELAY));
  selectedRooms.addEventListener('change', debounce(onFiltersChange, RERENDER_DELAY));
  selectedGuests.addEventListener('change', debounce(onFiltersChange, RERENDER_DELAY));
  featuresContainer.addEventListener('click', debounce(onFiltersChange, RERENDER_DELAY));
});

export {drawOffers};

