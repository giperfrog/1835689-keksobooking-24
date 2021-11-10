import {resetPage} from './form.js';

const isEscapeKey = (evt) => evt.key === 'Escape';

//Если загрузка прошла успешно.
const onSuccessForm = () => {
  const template = document.querySelector('#success')
    .content
    .querySelector('.success');
  const element = template.cloneNode(true);
  document.body.append(element);

  const onKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      element.classList.add('hidden');
      document.removeEventListener('keydown', onKeydown);
    }
  };
  element.addEventListener('keydown', onKeydown);

  element.addEventListener('click', () => {
    element.remove();
  });

  resetPage();
};

//Если загрузка прошла с ошибкой.
const showErrorMessage = () => {
  const template = document.querySelector('#error')
    .content
    .querySelector('.error');
  const element = template.cloneNode(true);
  document.body.append(element);

  const onKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      element.remove();
      document.removeEventListener('keydown', onKeydown);
    }
  };
  element.addEventListener('keydown', onKeydown);

  element.addEventListener('click', () => {
    element.remove();
  });
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {onSuccessForm, showErrorMessage, debounce};
