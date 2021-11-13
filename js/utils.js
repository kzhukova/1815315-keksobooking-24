// Источник: https://learn.javascript.ru/task/random-int-min-max
const getRandomInteger = (min, max) => {
  if (max > min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  throw new Error('Invalid argument: value min cannot be less than zero, value max must be greater than value min.');
};

// Источник: https://habr.com/ru/post/312880/
const getRandomFloat = (min, max, decimalPlaces) => {
  if (max > min && min >= 0) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
  }
  throw new Error('Invalid argument: value min cannot be less than zero, value max must be greater than value min.');
};

const getRandomArrayElement = (elements) => {
  const result = elements[getRandomInteger(0, elements.length - 1)];
  return result;
};

const getRandomSubarray = (elements) => {
  const arrLen = getRandomInteger(1, elements.length);
  const usedIndexes = [];
  const results = [];
  if (arrLen === elements.length) {
    return elements;
  }
  while (results.length !== arrLen) {
    const index = getRandomInteger(0, elements.length - 1);
    if (usedIndexes.includes(index)) {
      continue;
    }
    results.push(elements[index]);
    usedIndexes.push(index);
  }
  return results;
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomSubarray, debounce};

