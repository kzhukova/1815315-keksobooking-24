import {disablePage, enablePage} from './toggle-activation.js';
import {fetchAdverts} from './api.js';
import {createPopup} from './popup.js';
import { compliesWithFilter } from './filter.js';

const TOKIO_CENTER = {lat: 35.68477, lng: 139.74323};

const addressElement = document.querySelector('#address');

const drawnSimilarPins = [];

const MAIN_PIN_MARKER = L.marker(
  TOKIO_CENTER,
  {
    draggable: true,
    icon: L.icon({
      iconUrl: 'img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    }),
  },
);

const MAP = L.map('map-canvas');

const setAddress = (lat, lng) => {
  const address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  addressElement.value = address;
};

const updateAddress = (evt) => {
  const newAddress = evt.target.getLatLng();
  setAddress(newAddress.lat, newAddress.lng);
};

const drawMainPin = () => {
  MAIN_PIN_MARKER.addTo(MAP);
  MAIN_PIN_MARKER.on('move', updateAddress);
};

const drawSimilarPins = () => {
  const similarPinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  fetchAdverts()
    .then((adverts) => {
      const filteredAdverts = adverts
        .filter((advert) => compliesWithFilter(advert))
        .slice(0, 10);
      filteredAdverts.forEach((advert) => {
        const similarPinMarker = L.marker(
          advert.location,
          {icon: similarPinIcon},
        );
        similarPinMarker
          .addTo(MAP)
          .bindPopup(createPopup(advert));
        drawnSimilarPins.push(similarPinMarker);
      });
    })
    .catch((error) => alert(`Не удалось получить данные от сервера: ${error}`)); //eslint-disable-line
};

const deleteSimilarPins = () => {
  while (drawnSimilarPins.length > 0) {
    MAP.removeLayer(drawnSimilarPins.pop());
  }
};

const drawMap = () => {
  disablePage();
  const layer =  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  );
  MAP.on('load', enablePage);
  layer.addTo(MAP);
  MAP.setView(TOKIO_CENTER, 10);
  return MAP;
};

const renderMap = () => {
  drawMap();
  drawMainPin();
  drawSimilarPins();
  setAddress(TOKIO_CENTER.lat, TOKIO_CENTER.lng);
};

const resetMap = () => {
  MAP.closePopup();
  MAP.setView(TOKIO_CENTER);
  setAddress(TOKIO_CENTER.lat, TOKIO_CENTER.lng);
  const LatLng = new L.LatLng(TOKIO_CENTER.lat, TOKIO_CENTER.lng);
  MAIN_PIN_MARKER.setLatLng(LatLng);
  deleteSimilarPins();
  drawSimilarPins();
};


export {renderMap, resetMap, deleteSimilarPins, drawSimilarPins};
