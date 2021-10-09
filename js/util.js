import {AVATAR_IDS, TITLES, TYPES, CHECKIN_VARIANTS, CHECKOUT_VARIANTS, FEATURES_LIST, DESCRIPTIONS, PHOTOS} from './data.js';

// Источник: https://learn.javascript.ru/task/random-int-min-max
const getRandomInteger = (min, max) => {
  if (max > min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  throw new Error('Invalid argument: value min cannot be less than zero, value max must be greater than value min.');
};

// Источник: https://habr.com/ru/post/312880/
const getRandomFloat = (min, max, decimalPlaces) => {
  if (max > min && min >= 0) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
  }
  throw new Error('Invalid argument: value min cannot be less than zero, value max must be greater than value min.');
};

const getRandomArrayElement = (elements) => {
  elements[getRandomInteger(0, elements.length - 1)];
};

const getRandomAvatarURL = () => {
  const randomAvatarIndex = (AVATAR_IDS.length === 1) ? 0 : getRandomInteger(0, AVATAR_IDS.length - 1);
  const result = `img/avatars/user${AVATAR_IDS[randomAvatarIndex]}.png`;
  AVATAR_IDS.splice(randomAvatarIndex, 1);
  return result;
};

const getRandomLocation = () => {
  const result = {lat: getRandomFloat (35.65000, 35.70000, 5), lng: getRandomFloat (139.70000, 139.80000, 5)};
  return result;
};

const getRandomSubarray = (elements) => {
  const arrLen = getRandomInteger(1, elements.length);
  const usedIndexes = [];
  const results = [];
  if (arrLen === elements.length) {
    return elements;
  }
  while (results.length !== arrLen) {
    const index = getRandomInteger(0, elements.length - 1);
    if (usedIndexes.includes(index)) {
      continue;
    }
    results.push(elements[index]);
    usedIndexes.push(index);
  }
  return results;
};

const createAdvert = () => {
  const location = getRandomLocation();
  const author = {avatar: getRandomAvatarURL()};
  const offer = {
    title: getRandomArrayElement(TITLES),
    address: `${location.lat}, ${location.lng}`,
    price: getRandomInteger (1, 100000000000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInteger (1, 100),
    guests: getRandomInteger (1, 10000),
    checkin: getRandomArrayElement(CHECKIN_VARIANTS),
    checkout: getRandomArrayElement(CHECKOUT_VARIANTS),
    features: getRandomSubarray(FEATURES_LIST),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomSubarray(PHOTOS),
  };
  return  {
    author: author,
    offer: offer,
    location: location,
  };
};

export {createAdvert};
