function getRandomInt(min, max) { //Возвращает случайное целое число из переданного диапазона включительно, взято с MDN Web Docs.
  if (max <= min) {
    return 'Ошибка! Верхний диапазон должен быть больше нижнего!'; //Проверка верхнего предела.
  }

  if (min < 0 || max < 0) {
    return 'Проверьте диапазон!'; //Проверка на положительный диапазон.
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(0, 100);

function getRandomFloat(min, max, decimal) { //Возвращает случайное число с плавающей точкой из переданного диапазона включительно.
  if (max <= min) {
    return 'Ошибка! Верхний диапазон должен быть больше нижнего!';
  }

  if (min < 0 || max < 0) {
    return 'Проверьте диапазон!';
  }

  min = min.toFixed(decimal);
  max = max.toFixed(decimal);
  return Math.random() * (max - min + 1) + min;
}

getRandomFloat(0, 100.333, 2);
