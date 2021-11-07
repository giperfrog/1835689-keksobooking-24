const isEscapeKey = (evt) => evt.key === 'Escape';

const showSuccessMessage = () => {//Сообщение при успешной загрузке.
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
export {showSuccessMessage, showErrorMessage};
