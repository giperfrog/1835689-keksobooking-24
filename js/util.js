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
      element.remove();
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

  const button = document.querySelector('.error__button');
  button.addEventListener('click', () => {
    element.remove();
  });

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

export {onSuccessForm, showErrorMessage};
