import './map.js';
import {getData} from './api.js';
import {createMap, createMarker, markerGroup, compareOffers} from './map.js';
import {makePageInactive, makeFiltersActive} from './form.js';
import {debounce} from './util.js';

const SIMILAR_OFFER_COUNT = 10;
const RERENDER_DELAY = 500;

const filterType = document.querySelector('#housing-type');
const filterPrice = document.querySelector('#housing-price');
const filterRooms = document.querySelector('#housing-rooms');
const filterGuests = document.querySelector('#housing-guests');
const filterFeatures = document.querySelector('#housing-features');

document.addEventListener('DOMContentLoaded', () => {
  makePageInactive();
  createMap();

  getData((offers) => {
    (offers.slice(0, SIMILAR_OFFER_COUNT)).forEach((offer) => {
      createMarker(offer);
    });
  });

  makeFiltersActive();

  const createMarkerGroup = () => {
    markerGroup.clearLayers();

    getData((offers) => {
      offers
        .slice()
        .sort(compareOffers)
        .slice(0, SIMILAR_OFFER_COUNT)
        .forEach((offer) => {
          createMarker(offer);
        });
    });
  };

  filterType.addEventListener('change', debounce(() => createMarkerGroup(), RERENDER_DELAY));
  filterPrice.addEventListener('change', debounce(() => createMarkerGroup(), RERENDER_DELAY));
  filterRooms.addEventListener('change', debounce(() => createMarkerGroup(), RERENDER_DELAY));
  filterGuests.addEventListener('change', debounce(() => createMarkerGroup(), RERENDER_DELAY));
  filterFeatures.addEventListener('change', debounce(() => createMarkerGroup(), RERENDER_DELAY));
});
