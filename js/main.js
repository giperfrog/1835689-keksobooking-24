/* eslint-disable no-console */
import './map.js';
import './form-valid.js';
import {getData} from './api.js';
import {createMarker} from './map.js';

const SIMILAR_OFFER_COUNT = 10;

getData((offers) => {
  (offers.slice(0, SIMILAR_OFFER_COUNT)).forEach((offer) => {createMarker(offer);});
});
