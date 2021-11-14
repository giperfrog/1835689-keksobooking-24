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
const inputPrice = document.querySelector('#price');

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
const checkTypePriceMapping = () => {
  const selectedType = inputType.value;
  if (typePriceMapper[selectedType]) {
    inputPrice.placeholder = typePriceMapper[selectedType];
    inputPrice.min = typePriceMapper[selectedType];
  }
};

//Функция проверки цены при вводе.
const onTypePriceChange = (evt) => {
  evt.preventDefault();
  checkTypePriceMapping();
};

//Синхронизация время заезда и время выезда.
const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};
const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

//Соответствие количества комнат количеству гостей.
const checkRoomsCapacityMapping = () => {
  const selectedRooms = inputRoomNumber.value;
  const selectedGuests = inputGuestNumber.value;
  if (!roomGuestMapper[selectedRooms].includes(selectedGuests)) {
    inputGuestNumber.setCustomValidity(`${selectedRooms}комн. - для ${roomGuestMapper[selectedRooms].join(' или ')} гостей.`);
  } else {
    inputGuestNumber.setCustomValidity('');
  }
};

//Функция проверки количества гостей при вводе.
const onRoomsCapacityChange = (evt) => {
  evt.preventDefault();
  checkRoomsCapacityMapping();
};

export {onTitleChange, onTypePriceChange, onTimeInChange, onTimeOutChange, onRoomsCapacityChange, checkTypePriceMapping, checkRoomsCapacityMapping};
