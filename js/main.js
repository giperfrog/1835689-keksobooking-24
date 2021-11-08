import './map.js';
import {getData} from './api.js';
import {createMap, createMarker} from './map.js';
import {makePageInactive} from './form.js';

const SIMILAR_OFFER_COUNT = 10;

document.addEventListener('DOMContentLoaded', () => {
  makePageInactive();
  createMap();

  getData((offers) => {
    (offers.slice(0, SIMILAR_OFFER_COUNT)).forEach((offer) => {
      createMarker(offer);
    });
  });
});
