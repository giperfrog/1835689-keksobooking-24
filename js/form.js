const makeNonActivePage = function (className, blokName) {
  const element = document.querySelector('.className');
  element.classList.add(`${className}--disabled`);
  const elementList = element.children(blokName);
  elementList.setAttribute('disabled', 'disabled');
};

makeNonActivePage('ad-form', 'fieldset');
makeNonActivePage('map__filters', 'select');


const makeActivePage = function (className, blokName) {
  const element = document.querySelector('.className');
  element.classList.remove('--disabled');
  const elementList = element.children(blokName);
  elementList.removeAttribute('disabled', 'disabled');
};

makeActivePage();
