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

  const FEATURES = offer.offer.features;
  const CONTAINER = offerElement.querySelector('.popup__features');
  const featureList = CONTAINER.querySelectorAll('.popup__feature');
  featureList.forEach((featureListItem) => {
    const isNecessary = FEATURES.some(
      (FEATURE) => featureListItem.classList.contains(`popup__feature--${  FEATURE}`),
    );

    if (!isNecessary) {
      featureListItem.remove();
    }
  });

  offerElement.querySelector('.popup__description').textContent = offer.offer.description;

  const PHOTOS = offer.offer.photos;
  PHOTOS.forEach((photoItem) => {
    offerElement.querySelector('img', '.popup__photos').src = photoItem;
  });

  offerElement.querySelector('img', '.popup__avatar').src = offer.author.avatar;

  similarListElement.appendChild(offerElement);
});
