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
  priceElement.setAttribute('placeholder', minPrice);
  priceElement.setAttribute('min', minPrice);
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

const addListenersToForm = () => {
  capacityElement.addEventListener('change', capacityValidator);
  document.addEventListener('DOMContentLoaded', capacityValidator);
  typeElement.addEventListener('change', minPriceValidator);
  document.addEventListener('DOMContentLoaded', minPriceValidator);
  timeoutElement.addEventListener('change', updateTimeInOut);
  timeinElement.addEventListener('change', updateTimeInOut);
  document.addEventListener('DOMContentLoaded', syncTimeInOut);
};

export {addListenersToForm};
