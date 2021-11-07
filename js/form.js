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

const CAPACITY_ELLEMENT = document.querySelector('#capacity');
const ROOM_NUMBER_ELLEMENT = document.querySelector('#room_number');
const TYPE_ELLEMENT = document.querySelector('#type');
const PRICE_ELLEMENT = document.querySelector('#price');
const TIMEOUT_ELLEMENT = document.querySelector('#timeout');
const TIMEIN_ELLEMENT = document.querySelector('#timein');

const capacityValidator = () => {
  const selectedCapacity = CAPACITY_ELLEMENT.value;
  const selectedRoomNumber = ROOM_NUMBER_ELLEMENT.value;
  const allowedCapacityList = ROOMS_TO_CAPACITY[selectedRoomNumber];
  if (allowedCapacityList.includes(selectedCapacity)) {
    CAPACITY_ELLEMENT.setCustomValidity('');
  } else {
    CAPACITY_ELLEMENT.setCustomValidity('Количество гостей недопустимо для выбранного количества комнат');
  }
};

const minPriceValidator = () => {
  const selectedType = TYPE_ELLEMENT.value;
  const minPrice = TYPE_TO_MIN_VALUE[selectedType];
  PRICE_ELLEMENT.setAttribute('placeholder', minPrice);
  PRICE_ELLEMENT.setAttribute('min', minPrice);
};

const syncTimeInOut = () => {
  TIMEOUT_ELLEMENT.value = TIMEIN_ELLEMENT.value;
};

const updateTimeInOut = (evt) => {
  if (evt.target.matches('select[id="timein"]')) {
    TIMEOUT_ELLEMENT.value = evt.target.value;
  }
  if (evt.target.matches('select[id="timeout"]')) {
    TIMEIN_ELLEMENT.value = evt.target.value;
  }
};

const addListenersToForm = () => {
  CAPACITY_ELLEMENT.addEventListener('change', capacityValidator);
  document.addEventListener('DOMContentLoaded', capacityValidator);
  TYPE_ELLEMENT.addEventListener('change', minPriceValidator);
  document.addEventListener('DOMContentLoaded', minPriceValidator);
  TIMEOUT_ELLEMENT.addEventListener('change', updateTimeInOut);
  TIMEIN_ELLEMENT.addEventListener('change', updateTimeInOut);
  document.addEventListener('DOMContentLoaded', syncTimeInOut);
};

export {addListenersToForm};
