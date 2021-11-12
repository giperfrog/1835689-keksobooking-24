import {onTitleChange, onTypePriceChange, onTimeInChange, onTimeOutChange, onRoomsCapacityChange} from './form-valid.js';
import {sendData} from './api.js';
import {showErrorMessage} from './util.js';
import {mainPinMarker, markerGroup} from './map.js';

const adFormElement = document.querySelector('.ad-form');
const adFormInteractiveElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElement = document.querySelector('.map__filters');
const mapFiltersInteractiveElements = [...mapFiltersElement.querySelectorAll('select'), ...mapFiltersElement.querySelectorAll('fieldset')];
const addressInput = document.querySelector('#address');
const title = document.querySelector('#title');
const type = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');
const button = document.querySelector('.ad-form__reset');
const form = document.querySelector('.ad-form');

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

//Обработчик отправки формы с данными.
const onFormSubmit = (evt) => {
  evt.preventDefault();
  onTypePriceChange();
  onRoomsCapacityChange();
  if (form.checkValidity()) {
    sendData(
      new FormData(evt.target),
    );
  } else {
    showErrorMessage();
  }
};

//Активация формы для заполнения данных.
const makeFormActive = () => {
  adFormElement.classList.remove('ad-form--disabled');
  adFormInteractiveElements.forEach((element) => {
    element.disabled = false;
  });
  title.addEventListener('input', onTitleChange);
  type.addEventListener('change', onTypePriceChange);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  roomNumber.addEventListener('change', onRoomsCapacityChange);
  guestNumber.addEventListener('change', onRoomsCapacityChange);
  form.addEventListener('submit', onFormSubmit);
  button.addEventListener('click', onPageReset);
};

//Активация фильтров.
const makeFiltersActive = () => {
  mapFiltersElement.classList.remove('map__filters--disabled');
  mapFiltersInteractiveElements.forEach((element) => {
    element.disabled = false;
  });
};

//Очистка страницы после загрузки.
function onPageReset () {
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
}

export {makePageInactive, makeFormActive, makeFiltersActive, onPageReset};
