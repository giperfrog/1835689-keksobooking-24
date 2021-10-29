const makePageInactive = () => {
  const adFormElement = document.querySelector('.ad-form');
  adFormElement.classList.add('ad-form--disabled');
  const adFormInteractiveElements = adFormElement.querySelectorAll('fieldset');
  adFormInteractiveElements.forEach((element) => {
    element.disabled = true;
  });

  const mapFiltersElement = document.querySelector('.map__filters');
  mapFiltersElement.classList.add('map__filters--disabled');
  const mapFiltersInteractiveElements = [...mapFiltersElement.querySelectorAll('select'), ...mapFiltersElement.querySelectorAll('fieldset')];
  mapFiltersInteractiveElements.forEach((element) => {
    element.disabled = true;
  });
};

const makePageActive = () => {
  const adFormElement = document.querySelector('.ad-form');
  adFormElement.classList.remove('ad-form--disabled');
  const adFormInteractiveElements = adFormElement.querySelectorAll('fieldset');
  adFormInteractiveElements.forEach((element) => {
    element.disabled = false;
  });

  const mapFiltersElement = document.querySelector('.map__filters');
  mapFiltersElement.classList.remove('map__filters--disabled');
  const mapFiltersInteractiveElements = [...mapFiltersElement.querySelectorAll('select'), ...mapFiltersElement.querySelectorAll('fieldset')];
  mapFiltersInteractiveElements.forEach((element) => {
    element.disabled = false;
  });
};

makePageInactive();
makePageActive();

//Подсказка на короткое и длинное значение.
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const offerTitleInput = document.querySelector('#title');
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
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');
const roomNumberCollection = roomNumber.options;
const guestNumberCollection = guestNumber.options;

guestNumber.addEventListener('change', () => {
  if (roomNumberCollection[0] === guestNumberCollection[2]) {
    guestNumber.setCustomValidity('');
  } else {
    guestNumber.setCustomValidity(`Можно выбрать только "${guestNumberCollection[2].label}".`);
  }
  guestNumber.reportValidity();
});

