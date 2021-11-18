import {getData} from './api.js';
import {createMap, createMarker, markerGroup} from './map.js';
import {makePageInactive, makeFiltersActive} from './form.js';
import {filters} from './filters.js';
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
