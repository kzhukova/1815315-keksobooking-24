import {createRandomAdverts} from './mock.js';
import {renderMap} from './popup.js';
import {disablePage, enablePage} from './toggle-activation.js';
import {validateForm} from './form.js';

const similarAdverts = createRandomAdverts();
renderMap(similarAdverts[0]);
disablePage();
enablePage();
validateForm();
