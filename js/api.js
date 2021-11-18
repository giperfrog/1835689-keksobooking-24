import {showErrorOnLoad, onSendData, resetPage} from './util.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showErrorOnLoad('Ошибка загрузки данных.');
    });
};

const sendData = (body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'post',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSendData('success');
        resetPage();
      } else {
        onSendData('error');
      }
    })
    .catch(() => {
      onSendData('error');
    });
};

export {getData, sendData};
