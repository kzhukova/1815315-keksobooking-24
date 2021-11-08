
import { addListenersToForm } from './form.js';
import {renderMap} from './map.js';
import {createRandomAdverts} from './mock.js';

addListenersToForm();
const adverts = createRandomAdverts();
renderMap(adverts);
