const selectedType = document.querySelector('#housing-type');
const selectedPrice = document.querySelector('#housing-price');
const selectedRooms = document.querySelector('#housing-rooms');
const selectedGuests = document.querySelector('#housing-guests');
const featuresContainer = document.querySelector('#housing-features');
const featuresInputs = featuresContainer.querySelectorAll('.map__checkbox');

const checkOfferType = (offer) => selectedType.value === offer.offer.type || selectedType.value === 'any';

const checkOfferPrice = (offer) => {
  switch (selectedPrice.value) {
    case 'low':
      return offer.offer.price < 10000;
    case 'middle':
      return (offer.offer.price >= 10000 && offer.offer.price < 50000);
    case 'high':
      return offer.offer.price >= 50000;
    case 'any':
      return true;
  }
};

const checkOfferRooms = (offer) => +selectedRooms.value === offer.offer.rooms || selectedRooms.value === 'any';

const checkOfferGuests = (offer) => +selectedGuests.value === offer.offer.guests || selectedGuests.value === 'any';

const checkFeaturesFilters = (offer) => {
  const selectedFeatures = [...featuresInputs].filter((input) => input.checked);
  if (selectedFeatures.length) {
    if (offer.offer.features) {
      return selectedFeatures.every((feature) => offer.offer.features.includes(feature.value));
    } return false;
  } return true;
};

const filters = [
  checkOfferType,
  checkOfferPrice,
  checkOfferRooms,
  checkOfferGuests,
  checkFeaturesFilters,
];

export {filters};
