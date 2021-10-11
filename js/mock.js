import {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomSubarray} from './utils.js';

const AVATAR_IDS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

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

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const CHECKIN_VARIANTS = ['12:00', '13:00', '14:00'];

const CHECKOUT_VARIANTS = ['12:00', '13:00', '14:00'];

const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTIONS = [
  'самая низкая цена среди подобных',
  'современный дорогостоящий ремонт, не требующий вложений',
  'удобное местоположение',
  'редкая и практичная планировка',
  'в подарок остается новый итальянский кухонный гарнитур',
  'панорамный вид на город',
  'панорамный вид на озеро',
  'очень уютно',
  'торговый центр в шаговой доступности',
  'лучшее предложение'];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const SIMILAR_ADVERT_COUNT = 10;

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

const createRandomAdverts = () => {
  Array.from({length: SIMILAR_ADVERT_COUNT}, createAdvert);
};

export {createRandomAdverts};
