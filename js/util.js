import {mainPinMarker, markerGroup, coordinates} from './map.js';
import {drawOffers} from './main.js';

const adFormElement = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const addressInput = document.querySelector('#address');
const price = document.querySelector('#price');

const isEscapeKey = (evt) => evt.key === 'Escape';

//Очистка страницы после загрузки.
const onPageReset = () => {
  adFormElement.reset();
  mapFiltersElement.reset();
  markerGroup.clearLayers();
  mainPinMarker.setLatLng({
    lat: 35.69600,
    lng: 139.76830,
  });
  drawOffers();
  price.placeholder = '5000';
  addressInput.value = `${coordinates[0].toFixed(5)}, ${coordinates[1].toFixed(5)}`;
};

//Если загрузка прошла успешно.
const onSuccessForm = () => {
  const templateSuccess = document.querySelector('#success')
    .content
    .querySelector('.success');
  const elementShowSuccess = templateSuccess.cloneNode(true);
  document.body.append(elementShowSuccess);

  const onKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      elementShowSuccess.remove();
      document.removeEventListener('keydown', onKeydown);
    }
  };
  document.addEventListener('keydown', onKeydown);

  elementShowSuccess.addEventListener('click', () => {
    elementShowSuccess.remove();
  });

  onPageReset();
};

//Если загрузка прошла с ошибкой.
const showErrorMessage = () => {
  const templateError = document.querySelector('#error')
    .content
    .querySelector('.error');
  const elementShowError = templateError.cloneNode(true);
  document.body.append(elementShowError);

  const onKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      elementShowError.remove();
      document.removeEventListener('keydown', onKeydown);
    }
  };
  document.addEventListener('keydown', onKeydown);

  elementShowError.addEventListener('click', () => {
    elementShowError.remove();
  });
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {onPageReset, onSuccessForm, showErrorMessage, debounce};
