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

//makePageInactive();

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
