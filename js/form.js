import {mainPinMarker} from './map.js';

const adFormElement = document.querySelector('.ad-form');
const adFormInteractiveElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElement = document.querySelector('.map__filters');
const mapFiltersInteractiveElements = [...mapFiltersElement.querySelectorAll('select'), ...mapFiltersElement.querySelectorAll('fieldset')];
const selectedAddressContainer = document.querySelector('#address');

//Неактивное состояние страницы.
const makePageInactive = () => {
  adFormElement.classList.add('ad-form--disabled');
  adFormInteractiveElements.forEach((element) => {
    element.disabled = true;
  });

  mapFiltersElement.classList.add('map__filters--disabled');
  mapFiltersInteractiveElements.forEach((element) => {
    element.disabled = true;
  });
};

//Активное состояние страницы.
const makePageActive = () => {
  adFormElement.classList.remove('ad-form--disabled');
  adFormInteractiveElements.forEach((element) => {
    element.disabled = false;
  });

  mapFiltersElement.classList.remove('map__filters--disabled');
  mapFiltersInteractiveElements.forEach((element) => {
    element.disabled = false;
  });
};

//Очистка страницы после загрузки.
const resetPage = () => {
  adFormElement.reset();
  mapFiltersElement.reset();
  mainPinMarker.setLatLng({
    lat: 35.69600,
    lng: 139.76830,
  });
  selectedAddressContainer.value = 'Координаты: 35.69600, 139.76830';
};

export {makePageActive, makePageInactive, resetPage};
