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

const offerTitleInput = document.querySelector('#title');
const address = document.querySelector('#address');
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');
const typeInput = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const priceInput = document.querySelector('#price');
const form = document.querySelector('.ad-form');

//Подсказка на короткое и длинное значение.
offerTitleInput.addEventListener('input', () => {
  const titleLength = offerTitleInput.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    offerTitleInput.setCustomValidity('');
  }
  offerTitleInput.reportValidity();
});

//Соответствие минимальной цены типу жилья.
const checkAccomoddationPrice = () => {
  const selectType = typeInput.value;
  if (typePriceMapper[selectType]) {
    priceInput.placeholder = typePriceMapper[selectType];
    priceInput.min = typePriceMapper[selectType];
  }
};
typeInput.addEventListener('change', checkAccomoddationPrice);

//Синхронизация время заезда и время выезда.
const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};
const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);

// Проверка соответствия количества комнат количеству гостей.
const checkRoomsCapacity = () => {
  const selectedRooms = roomNumber.value;
  const selectedGuests = guestNumber.value;
  if (!roomGuestMapper[selectedRooms].includes(selectedGuests)) {
    guestNumber.setCustomValidity(`${selectedRooms}комн. - для ${roomGuestMapper[selectedRooms].join(' или ')} гостей.`);
  } else {
    guestNumber.setCustomValidity('');
  }
};

roomNumber.addEventListener('change', checkRoomsCapacity);
guestNumber.addEventListener('change', checkRoomsCapacity);

//Проверка формы перед отправкой.
const showError = () => {
  if (address.validity.valueMissing) {
    address.insertAdjacentHTML('afterend', '<p class="error-message">Выберите на карте адрес.</p>');
  }
  if (typeInput.validity.valueMissing) {
    typeInput.insertAdjacentHTML('afterend', '<p class="error-message">Заполните поле "Тип жилья".</p>');
  }
  if (timeIn.validity.valueMissing) {
    timeIn.insertAdjacentElement('afterend', '<p class="error-message">Заполните поле "Время заезда и выезда".</p>');
  }
};

form.addEventListener('submit', (evt) => {
  checkAccomoddationPrice();
  checkRoomsCapacity();
  if (!form.validity.valid) {
    showError();
    evt.preventDefault();
  }
});
