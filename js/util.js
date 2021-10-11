/* eslint-disable no-unused-vars */
const getRandomInt = (min, max) => { // Возвращает случайное целое число из переданного диапазона включительно, взято с MDN Web Docs.
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomFloat = (min, max, decimal) => { // Возвращает случайное число с плавающей точкой из переданного диапазона включительно.
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Number((Math.random() * (upper - lower) + lower).toFixed(decimal));
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)]; // Возвращает случайный элемент из массива.

const shuffledArray = (array) => { // Возвращает перемешанный массив.
  for (let i = array.length - 1; i > 0; i--) {
    const  j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const getRandomArray = (array) => array.slice(0, getRandomInt(1, array.length - 1)); // Возвращает случайную длину массива.

export {getRandomInt, getRandomFloat, getRandomArrayElement, shuffledArray, getRandomArray};
