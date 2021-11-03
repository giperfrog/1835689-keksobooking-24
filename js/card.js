import {offers} from './data.js';

const OFFERS_NAMES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const listElements = document.querySelector('#map-canvas');
const offersTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const offersListFragment = document.createDocumentFragment();

offers.forEach((offer) => {
  const offerElement = offersTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = OFFERS_NAMES[offer.offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;

  const features = offer.offer.features;
  const container = offerElement.querySelector('.popup__features');
  const featureList = container.querySelectorAll('.popup__feature');
  featureList.forEach((featureListItem) => {
    const isNecessary = features.some(
      (feature) => featureListItem.classList.contains(`popup__feature--${feature}`),
    );

    if (!isNecessary) {
      featureListItem.remove();
    }
  });

  offerElement.querySelector('.popup__description').textContent = offer.offer.description;

  const photos = offer.offer.photos;
  photos.forEach((photoItem) => {
    offerElement.querySelector('img.popup__photo').src = photoItem;
  });

  offerElement.querySelector('img.popup__avatar').src = offer.author.avatar;

  listElements.appendChild(offerElement);
  offersListFragment.appendChild(offerElement);
});

listElements.appendChild(offersListFragment.children[0]);
