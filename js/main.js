import {createRandomAdverts} from './mock.js';
import {renderMap} from './popup.js';
import {disablePage, activatePage} from './toggle_activation.js';

const similarAdverts = createRandomAdverts();
renderMap(similarAdverts[0]);
activatePage();
disablePage();
