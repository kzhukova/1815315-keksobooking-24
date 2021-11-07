import {disablePage, enablePage} from './toggle-activation.js';
import {createRandomAdverts} from './mock.js';
import {createPopup} from './popup.js';

const TOKIO_CENTER = {lat: 35.65856, lng: 139.85209};

const updateAddress = (evt) => {
  const newAddress = evt.target.getLatLng();
  const addrStr = `lat: ${newAddress.lat.toFixed(5)}, lng: ${newAddress.lng.toFixed(5)}`;
  document.querySelector('#address').value = addrStr;
};

const setInitialAddress = () => {
  const addrStr = `lat: ${TOKIO_CENTER.lat.toFixed(5)}, lng: ${TOKIO_CENTER.lng.toFixed(5)}`;
  document.querySelector('#address').value = addrStr;
};


const drawPins = (map) => {
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
  mainPinMarker.on('moveend', updateAddress);

  const similarPinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  createRandomAdverts().forEach((advert) => {
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

const renderMap = () => {
  const map = drawMap();
  drawPins(map);
  setInitialAddress();
};

export {renderMap};
