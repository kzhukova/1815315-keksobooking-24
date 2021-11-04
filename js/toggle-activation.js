const disablePage = () => {
  const adFormElement = document.querySelector('.ad-form');
  adFormElement.classList.add('add-form--disabled');
  adFormElement.querySelector('.ad-form-header__input').disabled = true;
  for (const el of adFormElement.querySelectorAll('.ad-form__element')) {
    el.disabled = true;
  }

  const mapFiltersElement = document.querySelector('.map__filters');
  mapFiltersElement.classList.add('add-form--disabled');
  for (const el of mapFiltersElement.querySelectorAll('.map__filter')) {
    el.disabled = true;
  }
  for (const el of mapFiltersElement.querySelectorAll('.map__checkbox')) {
    el.disabled = true;
  }

};

const enablePage = () => {
  const adFormElement = document.querySelector('.ad-form');
  adFormElement.classList.remove('add-form--disabled');
  adFormElement.querySelector('.ad-form-header__input').disabled = false;
  for (const el of adFormElement.querySelectorAll('.ad-form__element')) {
    el.disabled = false;
  }

  const mapFiltersElement = document.querySelector('.map__filters');
  mapFiltersElement.classList.remove('add-form--disabled');
  for (const el of mapFiltersElement.querySelectorAll('.map__filter')) {
    el.disabled = false;
  }
  for (const el of mapFiltersElement.querySelectorAll('.map__checkbox')) {
    el.disabled = false;
  }

};
export {disablePage, enablePage};

