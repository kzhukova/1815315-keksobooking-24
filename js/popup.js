const ACCOMMODATION_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

function addOrDisableText(element, data) {
  if (data){
    element.textContent = data;
  } else {
    element.hidden = true;
  }
}

const createPopup = (advert) => {
  const popupElement = document
    .querySelector('#card')
    .content
    .querySelector('.popup')
    .cloneNode(true);

  if (advert.author.avatar) {
    popupElement.querySelector('.popup__avatar').setAttribute('src', advert.author.avatar);
  } else {
    popupElement.querySelector('.popup__avatar').setAttribute('hidden', true);
  }

  addOrDisableText(popupElement.querySelector('.popup__title'),
    advert.offer.title);

  addOrDisableText(popupElement.querySelector('.popup__text--address'),
    advert.offer.address);
  addOrDisableText(popupElement.querySelector('.popup__type'),
    ACCOMMODATION_TYPES[advert.offer.type]);

  addOrDisableText(popupElement.querySelector('.popup__description'),
    advert.offer.description);
  if(advert.offer.price) {
    popupElement.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
  } else {
    popupElement.querySelector('.popup__text--price').hidden = true;
  }
  if(advert.offer.rooms && advert.offer.guests) {
    popupElement.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  } else {
    popupElement.querySelector('.popup__text--capacity').hidden = true;
  }
  if(advert.offer.checkin && advert.offer.checkout) {
    popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  } else {
    popupElement.querySelector('.popup__text--time').hidden = true;
  }

  const featuresList = popupElement
    .querySelector('.popup__features')
    .querySelectorAll('.popup__feature');
  featuresList.forEach((featureListItem) => {
    const isNecessary = advert.offer.features.some(
      (feature) => featureListItem.classList.contains(`popup__feature--${feature}`),
    );
    if (!isNecessary) {
      featureListItem.remove();
    }
  });

  addOrDisableText(popupElement.querySelector('.popup__description'),
    advert.offer.description);

  const popupPhotos = popupElement.querySelector('.popup__photos');
  const photos = advert.offer.photos;
  photos.forEach((photoUrl) => {
    const photoElement = popupPhotos.querySelector('.popup__photo').cloneNode(true);
    if (photoUrl) {
      photoElement.setAttribute('src', photoUrl);
    } else {
      photoElement.hidden = true;
    }
    popupPhotos.appendChild(photoElement);
  });
  const photoElements = popupPhotos.querySelectorAll('.popup__photo');
  popupPhotos.removeChild(photoElements[0]);
  if (advert.author.avatar) {
    popupElement.querySelector('.popup__avatar').setAttribute('src', advert.author.avatar);
  } else {
    popupElement.querySelector('.popup__avatar').hidded = true;
  }

  return popupElement;
};

export {createPopup};
