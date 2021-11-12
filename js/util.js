import {mainPinMarker, markerGroup} from './map.js';
import {drawOffers} from './main.js';

const mapFiltersElement = document.querySelector('.map__filters');
const addressInput = document.querySelector('#address');
const title = document.querySelector('#title');
const type = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');

const isEscapeKey = (evt) => evt.key === 'Escape';

//Очистка страницы после загрузки.
const onPageReset = () => {
  title.value = '';
  type.value = '';
  timeIn.value = '';
  timeOut.value = '';
  roomNumber.value = '';
  guestNumber.value = '';
  addressInput.value = 'Координаты: 35.69600, 139.76830';
  mapFiltersElement.reset();
  markerGroup.clearLayers();
  mainPinMarker.setLatLng({
    lat: 35.69600,
    lng: 139.76830,
  });
  drawOffers();
};

//Если загрузка прошла успешно.
const onSuccessForm = () => {
  const template = document.querySelector('#success')
    .content
    .querySelector('.success');
  const element = template.cloneNode(true);
  document.body.append(element);

  const onKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      element.classList.add('hidden');
      document.removeEventListener('keydown', onKeydown);
    }
  };
  document.addEventListener('keydown', onKeydown);

  element.addEventListener('click', () => {
    element.remove();
  });

  onPageReset();
};

//Если загрузка прошла с ошибкой.
const showErrorMessage = () => {
  const template = document.querySelector('#error')
    .content
    .querySelector('.error');
  const element = template.cloneNode(true);
  document.body.append(element);

  const onKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      element.classList.add('hidden');
      document.removeEventListener('keydown', onKeydown);
    }
  };
  document.addEventListener('keydown', onKeydown);

  element.addEventListener('click', () => {
    element.remove();
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
