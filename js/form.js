const ROOMS_TO_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
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

const validateForm = () => {
  document.addEventListener('DOMContentLoaded', capacityValidator);
  document.querySelector('#capacity').addEventListener('change', capacityValidator);
};

export {validateForm};
