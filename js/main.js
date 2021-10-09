import {SIMILAR_ADVERT_COUNT} from './data';
import {createAdvert} from './util.js';

const createRandomAdverts = () => {
  Array.from({length: SIMILAR_ADVERT_COUNT}, createAdvert);
};

const similarAdverts = createRandomAdverts();

console.log(similarAdverts); //eslint-disable-line no-console
