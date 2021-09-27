// Источник: https://habr.com/ru/post/312880/
function getRandomInteger (min, max) {
  if (max > min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  console.log ('Указан неправильный диапазон');
  return -1;
}
getRandomInteger (1, 3);

function getRandomFP (min, max, demicalPlaces) {
  if (max > min && min >= 0) {
    return (Math.random() * (max - min) + min).toFixed(demicalPlaces);
  }
  console.log ('Указан неправильный диапазон');
  return -1;
}
getRandomFP (1, 2, 2);
