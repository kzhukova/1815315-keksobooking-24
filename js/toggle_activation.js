const disablePage = () => {
  const adFormElement = document.querySelector('.ad-form');
  adFormElement.classList.add('add-form--disabled');
  for (const el of adFormElement.getElementsByTagName('fieldset')) {
    el.disabled = true;
  }

  const mapFiltersElement = document.querySelector('.map__filters');
  mapFiltersElement.classList.add('add-form--disabled');
  for (const el of mapFiltersElement.getElementsByTagName('select')) {
    el.disabled = true;
  }
  for (const el of mapFiltersElement.getElementsByTagName('fieldset')) {
    el.disabled = true;
  }

};

const activatePage = () => {
  const adFormElement = document.querySelector('.ad-form');
  adFormElement.classList.remove('add-form--disabled');
  for (const el of adFormElement.getElementsByTagName('fieldset')) {
    el.disabled = false;
  }

  const mapFiltersElement = document.querySelector('.map__filters');
  mapFiltersElement.classList.remove('add-form--disabled');
  for (const el of mapFiltersElement.getElementsByTagName('select')) {
    el.disabled = false;
  }
  for (const el of mapFiltersElement.getElementsByTagName('fieldset')) {
    el.disabled = false;
  }

};
export {disablePage, activatePage};

