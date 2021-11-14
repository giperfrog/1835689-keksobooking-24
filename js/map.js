import {makeFormActive} from './form.js';

const MAIN_PIN_MARKER_COORDINATES = [35.69600, 139.76830];

const typeNameMapper = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const addressInput = document.querySelector('#address');

const map = L.map('map-canvas');

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

const markerGroup = L.layerGroup().addTo(map);

//Функция отрисовки карты.
const createMap = () => {
  map
    .on('load', () => {
      makeFormActive();
    })
    .setView([35.68955, 139.75000], 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  mainPinMarker.addTo(map);

  addressInput.value = `${MAIN_PIN_MARKER_COORDINATES[0].toFixed(5)}, ${MAIN_PIN_MARKER_COORDINATES[1].toFixed(5)}`;

  mainPinMarker.on('moveend', (evt) => {
    const selectedAddress = evt.target.getLatLng();
    const lat = Math.round(selectedAddress.lat * Math.pow(10, 5)) / Math.pow(10, 5);
    const lng = Math.round(selectedAddress.lng * Math.pow(10, 5)) / Math.pow(10, 5);
    addressInput.value = `${lat}, ${lng}`;
  });
};

const offerTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

//Функция отрисовки балуна для карты.
const createPopup = (offer) => {
  const offerElement = offerTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = `${offer.offer.address}`;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = typeNameMapper[offer.offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;

  const features = offer.offer.features;
  const featuresContainer = offerElement.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');
  if (!features) {
    featuresContainer.classList.add('hidden');
  } else {
    featureList.forEach((featureListItem) => {
      const isNecessary = features.some(
        (feature) => featureListItem.classList.contains(`popup__feature--${feature}`),
      );

      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  }

  offerElement.querySelector('.popup__description').textContent = offer.offer.description;

  const photos = offer.offer.photos;
  const photosContainer = offerElement.querySelector('.popup__photos');
  if (!photos) {
    photosContainer.classList.add('hidden');
  } else {
    const photoTemplate = offerElement.querySelector('img.popup__photo');
    photoTemplate.remove();
    photos.forEach((photoItem) => {
      const photo = photoTemplate.cloneNode(false);
      photo.src = photoItem;
      photosContainer.appendChild(photo);
    });
  }

  offerElement.querySelector('img.popup__avatar').src = offer.author.avatar;

  return offerElement;
};

//Функция создания метки с объявлением на карте.
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
    .addTo(markerGroup)
    .bindPopup(createPopup(offer));

  return marker;
};

export {createMap, createMarker, mainPinMarker, markerGroup, MAIN_PIN_MARKER_COORDINATES};
