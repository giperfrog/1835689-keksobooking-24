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

const inputTitle = document.querySelector('#title');
const inputType = document.querySelector('#type');
const inputRoomNumber = document.querySelector('#room_number');
const inputGuestNumber = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const price = document.querySelector('#price');

//Подсказка на короткое и длинное значение.
const onTitleChange = () => {
  const titleLength = inputTitle.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    inputTitle.setCustomValidity('');
  }
  inputTitle.reportValidity();
};

//Соответствие минимальной цены типу жилья.
const onTypePriceChange = () => {
  const optionType = inputType.value;
  if (typePriceMapper[optionType]) {
    price.placeholder = typePriceMapper[optionType];
    price.min = typePriceMapper[optionType];
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
  const optionRooms = inputRoomNumber.value;
  const optionGuests = inputGuestNumber.value;
  if (!roomGuestMapper[optionRooms].includes(optionGuests)) {
    inputGuestNumber.setCustomValidity(`${optionRooms}комн. - для ${roomGuestMapper[optionRooms].join(' или ')} гостей.`);
  } else {
    inputGuestNumber.setCustomValidity('');
  }
};

export {onTitleChange, onTypePriceChange, onTimeInChange, onTimeOutChange, onRoomsCapacityChange};
