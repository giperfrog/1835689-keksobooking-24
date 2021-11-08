const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const roomGuestMapper = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const typePriceMapper = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const title = document.querySelector('#title');
const address = document.querySelector('#address');
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');
const type = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const price = document.querySelector('#price');

//Подсказка на короткое и длинное значение.
const onTitleChange = () => {
  const titleLength = title.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
};

//Соответствие минимальной цены типу жилья.
const onTypePriceChange = () => {
  const selectType = type.value;
  if (typePriceMapper[selectType]) {
    price.placeholder = typePriceMapper[selectType];
    price.min = typePriceMapper[selectType];
  }
};

//Синхронизация время заезда и время выезда.
const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};
const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

// Проверка соответствия количества комнат количеству гостей.
const onRoomsCapacityChange = () => {
  const selectedRooms = roomNumber.value;
  const selectedGuests = guestNumber.value;
  if (!roomGuestMapper[selectedRooms].includes(selectedGuests)) {
    guestNumber.setCustomValidity(`${selectedRooms}комн. - для ${roomGuestMapper[selectedRooms].join(' или ')} гостей.`);
  } else {
    guestNumber.setCustomValidity('');
  }
};

//Проверка формы перед отправкой.
const showError = () => {
  if (address.validity.valueMissing) {
    address.insertAdjacentHTML('afterend', '<p class="error-message">Выберите на карте адрес.</p>');
  }
  if (type.validity.valueMissing) {
    type.insertAdjacentHTML('afterend', '<p class="error-message">Заполните поле "Тип жилья".</p>');
  }
  if (timeIn.validity.valueMissing) {
    timeIn.insertAdjacentElement('afterend', '<p class="error-message">Заполните поле "Время заезда и выезда".</p>');
  }
};

export {onTitleChange, onTypePriceChange, onTimeInChange, onTimeOutChange, onRoomsCapacityChange, showError};
