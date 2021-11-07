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

const capacityValidator = () => {
  const capacityElement = document.querySelector('#capacity');
  const selectedCapacity = capacityElement.value;
  const selectedRoomNumber = document.querySelector('#room_number').value;
  const allowedCapacityList = ROOMS_TO_CAPACITY[selectedRoomNumber];
  if (allowedCapacityList.includes(selectedCapacity)) {
    capacityElement.setCustomValidity('');
  } else {
    capacityElement.setCustomValidity('Количество гостей недопустимо для выбранного количества комнат');
  }
};


const minPriceValidator = () => {
  const selectedType = document.querySelector('#type').value;
  const minPrice = TYPE_TO_MIN_VALUE[selectedType];
  const priceElement = document.querySelector('#price');
  priceElement.setAttribute('placeholder', minPrice);
  priceElement.setAttribute('min', minPrice);
};

const syncTimeInOut = () => {
  document.querySelector('#timeout').value = document.querySelector('#timein').value;
};

const updateTimeInOut = (evt) => {
  if (evt.target.matches('select[id="timein"]')) {
    document.querySelector('#timeout').value = evt.target.value;
  }
  if (evt.target.matches('select[id="timeout"]')) {
    document.querySelector('#timein').value = evt.target.value;
  }
};

const addListenersToForm = () => {
  document.addEventListener('DOMContentLoaded', capacityValidator);
  document.addEventListener('DOMContentLoaded', minPriceValidator);
  document.addEventListener('DOMContentLoaded', syncTimeInOut);
  document.querySelector('#capacity').addEventListener('change', capacityValidator);
  document.querySelector('#type').addEventListener('change', minPriceValidator);
  document.querySelector('#timeout').addEventListener('change', updateTimeInOut);
  document.querySelector('#timein').addEventListener('change', updateTimeInOut);

};

export {addListenersToForm};
