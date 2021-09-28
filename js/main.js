// Источник: https://learn.javascript.ru/task/random-int-min-max
const getRandomInteger = (min, max) => {
  if (max > min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  throw new Error('Invalid argument: value min cannot be less than zero, value max must be greater than value min.');
};
getRandomInteger (1, 0);

// Источник: https://habr.com/ru/post/312880/
const getRandomFloat = (min, max, decimalPlaces) => {
  if (max > min && min >= 0) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
  }
  throw new Error('Invalid argument: value min cannot be less than zero, value max must be greater than value min.');
};
getRandomFloat (1, 5, 3);
