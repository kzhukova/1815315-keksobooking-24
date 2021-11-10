import { sendNewAdvert } from './api.js';
import { resetMap } from './map.js';
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

// Пока не реализовывала механизм фильтрации поэтому
// требование "фильтрация (состояние фильтров и отфильтрованные метки) сбрасывается;"
// не выполняется
const onFormReset = (evt) => {
  evt.preventDefault();
  formElement.reset();
  resetMap();
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
  resetMap();
  bodyElement.appendChild(successMessageElement);
  document.addEventListener('click', removeSuccessMessage);
  document.addEventListener('keydown', removeSuccessMessage);
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

const addListenersToForm = () => {
  capacityElement.addEventListener('change', capacityValidator);
  roomNumberElement.addEventListener('change', capacityValidator);
  document.addEventListener('DOMContentLoaded', capacityValidator);
  typeElement.addEventListener('change', minPriceValidator);
  document.addEventListener('DOMContentLoaded', minPriceValidator);
  timeoutElement.addEventListener('change', updateTimeInOut);
  timeinElement.addEventListener('change', updateTimeInOut);
  document.addEventListener('DOMContentLoaded', syncTimeInOut);
  formElement.addEventListener('submit', onFormSubmit);
  formResetButton.addEventListener('click', onFormReset);
};

export {addListenersToForm};
