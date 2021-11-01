const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const ROOM_GUEST_MAPPER = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const offerTitleInput = document.querySelector('#title');
const address = document.querySelector('#address');
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');
const typeInput = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
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

// Проверка соответствия количества комнат количеству гостей.
const checkRoomsCapacity = () => {
  const selectedRooms = roomNumber.value;
  const selectedGuests = guestNumber.value;
  if (!ROOM_GUEST_MAPPER[selectedRooms].includes(selectedGuests)) {
    guestNumber.setCustomValidity(`${selectedRooms}комн. - для ${ROOM_GUEST_MAPPER[selectedRooms].join(' или ')} гостей.`);
  } else {
    guestNumber.setCustomValidity('');
  }
};

roomNumber.addEventListener('change', checkRoomsCapacity);
guestNumber.addEventListener('change', checkRoomsCapacity);

//Проверка формы перед отправкой.
form.addEventListener('submit', (evt) => {
  checkRoomsCapacity();
  if (!offerTitleInput.validity.valid) {
    offerTitleInput.insertAdjacentHTML('afterend', '<p class="error-message">Заполните правильно поле "Заголовок объявления".</p>');
  }
  if (!address.validity.valid) {
    address.insertAdjacentHTML('afterend', '<p class="error-message">Выберите на карте адрес.</p>');
  }
  if (!typeInput.validity.valid) {
    typeInput.insertAdjacentHTML('afterend', '<p class="error-message">Заполните поле "Тип жилья".</p>');
  }
  if (!priceInput.validity.valid) {
    priceInput.insertAdjacentHTML('afterend', '<p class="error-message">Заполните правильно поле "Цена за ночь".</p>');
  }
  if (!timeIn.validity.valid) {
    timeIn.insertAdjacentHTML('afterend', '<p class="error-message">Заполните поле "Время заезда и выезда".</p>');
  }
  if (!form.validity.valid) {
    evt.preventDefault();
  }
});
