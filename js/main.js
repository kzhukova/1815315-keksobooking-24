import {createRandomAdverts} from './mock.js';
import {renderMap} from './popup.js';

const similarAdverts = createRandomAdverts();
renderMap(similarAdverts[0]);

