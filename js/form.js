import {onTitleChange, onTypePriceChange, onTimeInChange, onTimeOutChange, onRoomsCapacityChange, checkTypePriceMapping, checkRoomsCapacityMapping} from './form-valid.js';
import {sendData} from './api.js';
import {onResetClick} from './util.js';

const adFormElement = document.querySelector('.ad-form');
const adFormInteractiveElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElement = document.querySelector('.map__filters');
const mapFiltersInteractiveElements = [...mapFiltersElement.querySelectorAll('select'), ...mapFiltersElement.querySelectorAll('fieldset')];
const inputTitle = document.querySelector('#title');
const inputType = document.querySelector('#type');
const inputTimeIn = document.querySelector('#timein');
const inputTimeOut = document.querySelector('#timeout');
const inputRoomNumber = document.querySelector('#room_number');
const inputGuestNumber = document.querySelector('#capacity');
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
  checkTypePriceMapping();
  checkRoomsCapacityMapping();
  if (form.checkValidity()) {
    sendData(
      new FormData(evt.target),
    );
  }
};

//Активация формы для заполнения данных.
const makeFormActive = () => {
  adFormElement.classList.remove('ad-form--disabled');
  adFormInteractiveElements.forEach((element) => {
    element.disabled = false;
  });
  inputTitle.addEventListener('input', onTitleChange);
  inputType.addEventListener('change', onTypePriceChange);
  inputTimeIn.addEventListener('change', onTimeInChange);
  inputTimeOut.addEventListener('change', onTimeOutChange);
  inputRoomNumber.addEventListener('change', onRoomsCapacityChange);
  inputGuestNumber.addEventListener('change', onRoomsCapacityChange);
  form.addEventListener('submit', onFormSubmit);
  button.addEventListener('click', onResetClick);
};

//Активация фильтров.
const makeFiltersActive = () => {
  mapFiltersElement.classList.remove('map__filters--disabled');
  mapFiltersInteractiveElements.forEach((element) => {
    element.disabled = false;
  });
};

export {makePageInactive, makeFormActive, makeFiltersActive};
