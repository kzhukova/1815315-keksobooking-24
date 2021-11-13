import { drawSimilarPins, deleteSimilarPins } from './map.js';
import { debounce } from './utils.js';

const DEBOUNCE_INTERVAL = 500;

const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const filterElements = [housingTypeElement, housingPriceElement, housingRoomsElement, housingGuestsElement];
const housingFeaturesElements = document.querySelectorAll('input[name="features"]');

const compliesWithHosingType = (advert) => {
  const advertType = advert.offer.type;
  if (!advertType) {return false;}
  if (housingTypeElement.value === 'any') {
    return true;
  }
  return housingTypeElement.value === advertType;
};

const compliesWithHosingPrice = (advert) => {
  const advertPrice = advert.offer.price;
  if (!advertPrice) { return false;}
  if (housingPriceElement.value === 'any') {
    return true;
  }
  switch (housingPriceElement.value) {
    case 'low':
      return advertPrice < 10000;
    case 'middle':
      return 10000 <= advertPrice < 50000;
    case 'high':
      return advertPrice > 50000;
  }
};

const compliesWithHousingRooms = (advert) => {
  const advertRooms = advert.offer.rooms;
  if (!advertRooms) { return false;}
  if (housingRoomsElement.value === 'any') {
    return true;
  }
  return parseInt(housingRoomsElement.value, 10) === advertRooms;
};

const compliesWithHousingGuests = (advert) => {
  const advertGuests = advert.offer.guests;
  if (!advertGuests) {return advertGuests;}
  if (housingGuestsElement.value === 'any') {
    return true;
  }
  return parseInt(housingGuestsElement.value, 10) === advertGuests;
};

const compliesWithHousingFeatures = (advert) => {
  const advertFeatures = advert.offer.features;
  if (!advertFeatures) { return false;}
  const checkedFeatureNames = Array.from(housingFeaturesElements)
    .filter((feature) => feature.checked === true)
    .map((feature) => feature.value);
  if (checkedFeatureNames.length === 0) {
    return true;
  }
  return checkedFeatureNames.every((feature) => advertFeatures.includes(feature));
};

const compliesWithFilter = (advert) => {
  if (!compliesWithHosingType(advert)) {
    return false;
  }
  if (!compliesWithHosingPrice(advert)) {
    return false;
  }
  if (!compliesWithHousingRooms(advert)) {
    return false;
  }
  if (!compliesWithHousingGuests(advert)) {
    return false;
  }
  if (!compliesWithHousingFeatures(advert)) {
    return false;
  }
  return true;
};

const onFilterChange = () => {
  deleteSimilarPins();
  drawSimilarPins();
};

const addFilterListeners = () => {
  filterElements.forEach((el) => {
    el.addEventListener('change', debounce(onFilterChange, DEBOUNCE_INTERVAL));
  });
  housingFeaturesElements.forEach((el) => {
    el.addEventListener('change', debounce(onFilterChange, DEBOUNCE_INTERVAL));
  });
};


export {compliesWithFilter, addFilterListeners};


