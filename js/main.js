const getRandomInt = (min, max) => { //Возвращает случайное целое число из переданного диапазона включительно, взято с MDN Web Docs.
  if (max <= min) {
    throw 'Ошибка! Верхний диапазон должен быть больше нижнего!'; //Проверка верхнего предела.
  }

  if (min < 0 || max < 0) {
    throw 'Диапазон должен быть положительным!'; //Проверка на положительный диапазон.
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt(0, 100);

const getRandomFloat = (min, max, decimal) => { //Возвращает случайное число с плавающей точкой из переданного диапазона включительно.
  if (max <= min) {
    throw 'Ошибка! Верхний диапазон должен быть больше нижнего!';
  }

  if (min < 0 || max < 0 || decimal < 0) {
    throw 'Диапазон должен быть положительным!';
  }

  return Number((Math.random() * (max - min) + min).toFixed(decimal));
};

getRandomFloat(0, 100.333, 2);
