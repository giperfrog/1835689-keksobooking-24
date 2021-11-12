import './map.js';
import {getData} from './api.js';
import {createMap, createMarker, markerGroup} from './map.js';
import {makePageInactive, makeFiltersActive} from './form.js';
import {debounce} from './util.js';

const SIMILAR_OFFER_COUNT = 10;
const RERENDER_DELAY = 500;

const selectedType = document.querySelector('#housing-type');
const selectedPrice = document.querySelector('#housing-price');
const selectedRooms = document.querySelector('#housing-rooms');
const selectedGuests = document.querySelector('#housing-guests');
const featuresContainer = document.querySelector('#housing-features');
const featuresInputs = featuresContainer.querySelectorAll('.map__checkbox');
const wifiInput = featuresContainer.querySelector('#filter-wifi');
const dishwasherInput = featuresContainer.querySelector('#filter-dishwasher');
const parkingInput = featuresContainer.querySelector('#filter-parking');
const washerInput = featuresContainer.querySelector('#filter-washer');
const elevatorInput = featuresContainer.querySelector('#filter-elevator');
const conditionerInput = featuresContainer.querySelector('#filter-conditioner');

document.addEventListener('DOMContentLoaded', () => {
  makePageInactive();
  createMap();

  getData((offers) => {
    (offers.slice(0, SIMILAR_OFFER_COUNT)).forEach((offer) => {
      createMarker(offer);
    });

    makeFiltersActive();

    const onFiltersChange = () => {
      let filteredOffers = offers;

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
      filteredOffers = filteredOffers.filter((offer) => {
        if (offer.offer.features) {
          return selectedFeatures.every((feature) => offer.offer.features.includes(feature));
        }
        return false;
      });

      filteredOffers.slice(0, SIMILAR_OFFER_COUNT).forEach((offer) => {
        createMarker(offer);
      });
    };

    selectedType.addEventListener('change', debounce(() => onFiltersChange(), RERENDER_DELAY));
    selectedPrice.addEventListener('change', debounce(() => onFiltersChange(), RERENDER_DELAY));
    selectedRooms.addEventListener('change', debounce(() => onFiltersChange(), RERENDER_DELAY));
    selectedGuests.addEventListener('change', debounce(() => onFiltersChange(), RERENDER_DELAY));
    wifiInput.addEventListener('click', debounce(() => onFiltersChange(), RERENDER_DELAY));
    dishwasherInput.addEventListener('click', debounce(() => onFiltersChange(), RERENDER_DELAY));
    parkingInput.addEventListener('click', debounce(() => onFiltersChange(), RERENDER_DELAY));
    washerInput.addEventListener('click', debounce(() => onFiltersChange(), RERENDER_DELAY));
    elevatorInput.addEventListener('click', debounce(() => onFiltersChange(), RERENDER_DELAY));
    conditionerInput.addEventListener('click', debounce(() => onFiltersChange(), RERENDER_DELAY));
  });
});
