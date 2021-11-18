import {mainPinMarker, markerGroup, getMainMarkerCoordinate} from './map.js';
import {drawOffers} from './main.js';

const SHOW_TIME = 5000;
const adFormElement = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const addressInput = document.querySelector('#address');
const inputPrice = document.querySelector('#price');
const preview1 = document.querySelector('.ad-form-header__preview');
const photoHousing = document.querySelector('.ad-form__photo');

const isEscapeKey = (evt) => evt.key === 'Escape';

//Для очистки страницы.
const resetPage = () => {
  adFormElement.reset();
  mapFiltersElement.reset();
  markerGroup.clearLayers();
  mainPinMarker.setLatLng({
    lat: 35.69600,
    lng: 139.76830,
  });
  drawOffers();
  inputPrice.placeholder = '1000';
  inputPrice.min = '1000';
  addressInput.value = getMainMarkerCoordinate();
  preview1.querySelector('img').src = 'img/muffin-grey.svg';
  if (photoHousing.querySelector('img')) {
    photoHousing.querySelector('img').remove();
  }
};

//Для очистки по кнопке сброса.
const onResetClick = (evt) => {
  evt.preventDefault();
  resetPage();
};

//Если данные с сервера не получены.
const showErrorOnLoad = (message) => {
  const templateError = document.querySelector('#error')
    .content
    .querySelector('.error');
  const elementShowError = templateError.cloneNode(true);
  elementShowError.querySelector('.error__message').textContent = message;
  document.body.append(elementShowError);
  setTimeout(() => {
    elementShowError.remove();
  }, SHOW_TIME);
};

//Отправка данных на сервер.
const onSendData = (template) => {
  const templateMessage = document.querySelector(`#${template}`)
    .content
    .querySelector(`.${template}`);
  const showElement = templateMessage.cloneNode(true);
  document.body.append(showElement);

  const onKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      showElement.remove();
      document.removeEventListener('keydown', onKeydown);
    }
  };
  document.addEventListener('keydown', onKeydown);

  showElement.addEventListener('click', () => {
    showElement.remove();
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

export {resetPage, showErrorOnLoad, onResetClick, onSendData, debounce};
