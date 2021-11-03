import {makePageActive} from './form.js';
import {offers} from './data.js';

const map = L.map('map-canvas')
  .on('load', () => {
    makePageActive();
  })
  .setView([35.68955, 139.75000], 10);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const OFFERS_NAMES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const selectedAddressContainer = document.querySelector('#address');

//Добавляем главный маркер и функцию показа адреса по главному маркеру.
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.69600,
    lng: 139.76830,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

selectedAddressContainer.value = 'Координаты: 35.69600, 139.76830';

mainPinMarker.on('moveend', (evt) => {
  const SelectedAddress = evt.target.getLatLng();
  const lat = Math.round(SelectedAddress.lat * Math.pow(10, 5)) / Math.pow(10, 5);
  const lng = Math.round(SelectedAddress.lng * Math.pow(10, 5)) / Math.pow(10, 5);
  selectedAddressContainer.value = `Координаты: ${lat}, ${lng}`;
});

//Добавляем показ объявлений на карте.
const createPopup = (offer) => {
  const offersTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const offerElement = offersTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = `Координаты: ${offer.offer.address}`;
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

  return offerElement;
};

const createMarker = (offer) => {
  const {lat, lng} = offer.location;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createPopup(offer));

  return marker;
};

offers.forEach((offer) => createMarker(offer));
