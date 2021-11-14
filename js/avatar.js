/* eslint-disable no-console */
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const inputAvatar = document.querySelector('#avatar');
const preview1 = document.querySelector('.ad-form-header__preview.img');

inputAvatar.addEventListener('change', () => {
  const file = inputAvatar.files[0];
  const fileName = file.name.toLowerCase();
  const photos = FILE_TYPES.some((item) => fileName.endsWith(item));

  if(photos) {
    preview1.src = URL.createObjectURL(file);
  }
});
