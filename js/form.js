import { sendNewAdvert } from './api.js';
import { resetMap } from './map.js';
import { addFilterListeners } from './filter.js';

const ROOMS_TO_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const TYPE_TO_MIN_VALUE = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const capacityElement = document.querySelector('#capacity');
const roomNumberElement = document.querySelector('#room_number');
const typeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeoutElement = document.querySelector('#timeout');
const timeinElement = document.querySelector('#timein');
const mapFiltersForm = document.querySelector('.map__filters');
const formElement = document.querySelector('.ad-form');
const formResetButton = document.querySelector('.ad-form__reset');
const bodyElement = document.querySelector('body');
const successMessageElement = document
  .querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageElement = document
  .querySelector('#error')
  .content
  .querySelector('.error');
const avatarPhotoContainer = document.querySelector('.ad-form-header__preview');
const defaultAvatar = avatarPhotoContainer.children[0].cloneNode(true);
const avatarPhotoUploadInput = document.querySelector('#avatar');
const advertPhotoContainer = document.querySelector('.ad-form__photo');
const advertPhotoUploadInput = document.querySelector('#images');

const capacityValidator = () => {
  const selectedCapacity = capacityElement.value;
  const selectedRoomNumber = roomNumberElement.value;
  const allowedCapacityList = ROOMS_TO_CAPACITY[selectedRoomNumber];
  if (allowedCapacityList.includes(selectedCapacity)) {
    capacityElement.setCustomValidity('');
  } else {
    capacityElement.setCustomValidity('Количество гостей недопустимо для выбранного количества комнат');
  }
};

const minPriceValidator = () => {
  const selectedType = typeElement.value;
  const minPrice = TYPE_TO_MIN_VALUE[selectedType];
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
};

const syncTimeInOut = () => {
  timeoutElement.value = timeinElement.value;
};

const updateTimeInOut = (evt) => {
  if (evt.target.matches('select[id="timein"]')) {
    timeoutElement.value = evt.target.value;
  }
  if (evt.target.matches('select[id="timeout"]')) {
    timeinElement.value = evt.target.value;
  }
};

const onFormReset = (evt) => {
  evt.preventDefault();
  mapFiltersForm.reset();
  formElement.reset();
  resetMap();
  if (avatarPhotoContainer.children[0].src !== defaultAvatar.src) {
    avatarPhotoContainer.replaceChild(defaultAvatar, avatarPhotoContainer.children[0]);
  }
  if(advertPhotoContainer.hasChildNodes()) {
    advertPhotoContainer.removeChild(advertPhotoContainer.firstChild);
  }
};

const removeSuccessMessage = (evt) => {
  evt.preventDefault();
  //evt.key === undefined for mouse click case
  if (evt.key === undefined || evt.key === 'Escape' ) {
    document.querySelector('.success').remove();
    document.removeEventListener('click', removeSuccessMessage);
    document.removeEventListener('keydown', removeSuccessMessage);
  }
};

const onFormSubmitSuccess = () => {
  formElement.reset();
  mapFiltersForm.reset();
  resetMap();
  bodyElement.appendChild(successMessageElement);
  document.addEventListener('click', removeSuccessMessage);
  document.addEventListener('keydown', removeSuccessMessage);
  if (avatarPhotoContainer.children[0].src !== defaultAvatar.src) {
    avatarPhotoContainer.replaceChild(defaultAvatar, avatarPhotoContainer.children[0]);
  }
  if(advertPhotoContainer.hasChildNodes()) {
    advertPhotoContainer.removeChild(advertPhotoContainer.firstChild);
  }
};

const removeErrorMessage = (evt) => {
  evt.preventDefault();
  //evt.key === undefined for mouse click case
  if (evt.key === undefined || evt.key === 'Escape' ) {
    document.querySelector('.error').remove();
    document.removeEventListener('click', removeErrorMessage);
    document.removeEventListener('keydown', removeErrorMessage);
  }
};

const onFormSubmitFail =  () => {
  bodyElement.appendChild(errorMessageElement);
  document.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', removeErrorMessage);
};


const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendNewAdvert(
    () => onFormSubmitSuccess(),
    () => onFormSubmitFail(),
    new FormData(evt.target),
  );
};

const onAvatarPhotoLoad = () => {
  const loadedPhoto = avatarPhotoUploadInput.files[0];
  if (loadedPhoto) {
    const imageElement = defaultAvatar.cloneNode(true);
    imageElement.src = URL.createObjectURL(loadedPhoto);
    avatarPhotoContainer.replaceChild(imageElement, avatarPhotoContainer.children[0]);
  }
};

const onAdvertPhotoLoad = () => {
  const loadedPhoto = advertPhotoUploadInput.files[0];
  if (loadedPhoto) {
    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(loadedPhoto);
    imageElement.alt = 'Advert photo';
    imageElement.className = 'ad-form__photo';

    if(advertPhotoContainer.hasChildNodes()) {
      advertPhotoContainer.replaceChild(imageElement, advertPhotoContainer.children[0]);
    } else {
      advertPhotoContainer.appendChild(imageElement);
    }
  }
};

const onPageLoad = () => {
  capacityValidator();
  minPriceValidator();
  syncTimeInOut();
};

const addListenersToForm = () => {
  document.addEventListener('DOMContentLoaded', onPageLoad);
  capacityElement.addEventListener('change', capacityValidator);
  roomNumberElement.addEventListener('change', capacityValidator);
  typeElement.addEventListener('change', minPriceValidator);
  timeoutElement.addEventListener('change', updateTimeInOut);
  timeinElement.addEventListener('change', updateTimeInOut);
  formElement.addEventListener('submit', onFormSubmit);
  formResetButton.addEventListener('click', onFormReset);
  avatarPhotoUploadInput.addEventListener('change', onAvatarPhotoLoad);
  advertPhotoUploadInput.addEventListener('change', onAdvertPhotoLoad);
  addFilterListeners();

};

export {addListenersToForm};
