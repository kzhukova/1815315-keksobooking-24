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
  const RANDOM_INDEX = getRandomInteger(0, elements.length - 1);
  return elements[RANDOM_INDEX];
};

const AVATAR_IDS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

const getRandomAvatarURL = () => {
  const RANDOM_AVATAR_INDEX = (AVATAR_IDS.length === 1) ? 0 : getRandomInteger(0, AVATAR_IDS.length - 1);
  const RESULT = `img/avatars/user${AVATAR_IDS[RANDOM_AVATAR_INDEX]}.png`;
  AVATAR_IDS.splice(RANDOM_AVATAR_INDEX, 1);
  return RESULT;
};

const TITLES = [
  'Дом под старину',
  'С видом на сад',
  'Домик с картинки',
  'Для большой семьи',
  'Дом с самым необычным дизайном',
  'Безупречно даже в деталях',
  'Легендарные стиль и качество',
  'Компактность, практичность и экономия',
  'Карнавал текстур и красок',
  'Комнаты с высокими потолками'];

const getRandomLocation = () => {
  const result = {lat: getRandomFloat (35.65000, 35.70000, 5), lng: getRandomFloat (139.70000, 139.80000, 5)};
  return result;
};

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const CHECKIN_VARIANTS = ['12:00', '13:00', '14:00'];

const CHECKOUT_VARIANTS = ['12:00', '13:00', '14:00'];

const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const getRandomSubarray = (elements) => {
  const ARR_LEN = getRandomInteger(1, elements.length);
  const USED_INDEXES = [];
  const RESULTS = [];
  if (ARR_LEN === elements.length) {
    return elements;
  }
  while (RESULTS.length !== ARR_LEN) {
    const INDEX = getRandomInteger(0, elements.length - 1);
    if (USED_INDEXES.includes(INDEX)) {
      continue;
    }
    RESULTS.push(elements[INDEX]);
    USED_INDEXES.push(INDEX);
  }
  return RESULTS;
};

const DESCRIPTIONS = [
  'самая низкая цена среди подобных',
  'современный дорогостоящий ремонт, не требующий вложений',
  'удобное местоположение',
  'редкая и практичная планировка',
  'в подарок остаются новый итальянский кухонный гарнитур',
  'панорамный вид на город',
  'панорамный вид на озеро',
  'очень уютно',
  'торговый центр в швговой доступности',
  'лучшее предложение'];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const SIMILAR_ADVERT_COUNT = 10;

const createAdvert = () => {
  const LOCATION = getRandomLocation();

  const AUTHOR = {AVATAR: getRandomAvatarURL()};

  const OFFER = {
    title: getRandomArrayElement(TITLES),
    address: `${LOCATION.lat}, ${LOCATION.lng}`,
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
    author: AUTHOR,
    offer: OFFER,
    location: LOCATION,
  };
};

const similarAdverts = Array.from({length: SIMILAR_ADVERT_COUNT}, createAdvert);
