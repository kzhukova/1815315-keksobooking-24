import {disablePage, enablePage} from './toggle-activation.js';
import {createPopup} from './popup.js';

const TOKIO_CENTER = {lat: 35.65856, lng: 139.85209};
const addressElement = document.querySelector('#address');

const setAddress = (lat, lng) => {
  const address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  addressElement.value = address;
};

const updateAddress = (evt) => {
  const newAddress = evt.target.getLatLng();
  setAddress(newAddress.lat, newAddress.lng);
};

const drawPins = (map, adverts) => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const mainPinMarker = L.marker(
    TOKIO_CENTER,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);
  mainPinMarker.on('move', updateAddress);

  const similarPinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  adverts.forEach((advert) => {
    const similarPinMarker = L.marker(
      advert.location,
      {icon: similarPinIcon},
    );
    similarPinMarker
      .addTo(map)
      .bindPopup(createPopup(advert));
  });
};

const drawMap = () => {
  disablePage();
  const layer =  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  );
  const map = L.map('map-canvas');
  map.on('load', enablePage);
  layer.addTo(map);
  map.setView(TOKIO_CENTER, 10);
  return map;
};

const renderMap = (adverts) => {
  const map = drawMap();
  drawPins(map, adverts);
  setAddress(TOKIO_CENTER.lat, TOKIO_CENTER.lng);
};

export {renderMap};
