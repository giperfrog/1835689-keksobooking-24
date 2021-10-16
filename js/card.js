import {similarOffers} from './data.js';

const offerType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const similarListElement = document.querySelector('#map-canvas');
const similarOffersTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

similarOffers.forEach((offer) => {
  const offerElement = similarOffersTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = offerType[offer.offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  const featureDatas = offer.offer.features;
  const featureList = offerElement.querySelectorAll('.popup__feature');
  offerElement.querySelector('.popup__features').textContent = featureList.forEach((featureItem) => {
    const isNecessary = featureDatas.some(
      (featureData) => featureItem.classList.contains(`popup__feature--${featureData}`));
    if (!isNecessary) {
      featureItem.remove();
    }
  });
  offerElement.querySelector('.popup__description').textContent = offer.offer.description;
  const PHOTOS = offer.offer.photos;
  offerElement.querySelector('img', '.popup__photos').src = PHOTOS.forEach((photo) => photo);
  offerElement.querySelector('img', '.popup__avatar').src = offer.author.avatar;

  similarListElement.appendChild(offerElement);
});
