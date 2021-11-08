import {resetPage} from './form.js';

const isEscapeKey = (evt) => evt.key === 'Escape';

//Если загрузка прошла успешно.
const onSuccessForm = () => {
  const template = document.querySelector('#success')
    .content
    .querySelector('.success');
  const element = template.cloneNode(true);
  document.body.append(element);
  element.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      element.remove();
    }
  });
  resetPage();
};

const showErrorMessage = () => {//Сообщение об ошибке.
  const template = document.querySelector('#error')
    .content
    .querySelector('.error');
  const element = template.cloneNode(true);
  document.body.append(element);
  const button = document.querySelector('.error__button');
  button.addEventListener('click', () => {
    element.remove();
  });
  element.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      element.remove();
    }
  });
};
export {onSuccessForm, showErrorMessage};
