import {onSuccessForm, showErrorMessage} from './util';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((offers) => {
      onSuccess(offers);
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
        onSuccessForm();
      } else {
        showErrorMessage();
      }
    })
    .catch(() => {
      showErrorMessage();
    });
};

export {getData, sendData};
