import './map.js';
import {getData} from './api.js';
import {createMarker} from './map.js';
import {setUserFormSubmit} from './form-valid.js';
import {resetPage} from './form.js';

const SIMILAR_OFFER_COUNT = 10;

getData((offers) => {
  (offers.slice(0, SIMILAR_OFFER_COUNT)).forEach((offer) => {
    createMarker(offer);
  });
});

setUserFormSubmit(resetPage);
