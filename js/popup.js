const mapCanvasElement = document.querySelector('#map-canvas');

const ACCOMMODATION_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const addOrDisable = (element, text) => {
  if (text.length > 0){
    element.textContent = text;
  } else {
    element.hidden = true;
  }
};

const renderMap = (advert) => {
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const similarListFragment = document.createDocumentFragment();
  const advertElement = cardTemplate.cloneNode(true);
  addOrDisable(advertElement.querySelector('.popup__title'),
    advert.offer.title);
  addOrDisable(advertElement.querySelector('.popup__text--address'),
    advert.offer.address);
  addOrDisable(advertElement.querySelector('.popup__type'),
    ACCOMMODATION_TYPES[advert.offer.type]);
  addOrDisable(advertElement.querySelector('.popup__features'),
    advert.offer.features.toString());
  addOrDisable(advertElement.querySelector('.popup__description'),
    advert.offer.description);
  if(advert.offer.price.length > 0) {
    advertElement.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
  } else {
    advertElement.querySelector('.popup__text--price').hidden = true;
  }
  if(advert.offer.rooms.length > 0 && advert.offer.guests > 0) {
    advertElement.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  } else {
    advertElement.querySelector('.popup__text--capacity').hidded = true;
  }
  if(advert.offer.checkin.length > 0 && advert.offer.checkout > 0) {
    advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  } else {
    advertElement.querySelector('.popup__text--time').hidden = true;
  }
  const popupPhotos = advertElement.querySelector('.popup__photos');
  const photos = advert.offer.photos;
  photos.forEach((photoUrl) => {
    const photoElement = popupPhotos.querySelector('.popup__photo').cloneNode(true);
    if (photoUrl.length > 0) {
      photoElement.setAttribute('src', photoUrl);
    } else {
      photoElement.disable = true;
    }
    popupPhotos.appendChild(photoElement);
  });
  const photoElements = popupPhotos.querySelectorAll('.popup__photo');
  popupPhotos.removeChild(photoElements[0]);
  advertElement.querySelector('.popup__avatar').setAttribute('src', advert.author.avatar);
  similarListFragment.appendChild(advertElement);
  mapCanvasElement.appendChild(similarListFragment);
};

export {renderMap};
