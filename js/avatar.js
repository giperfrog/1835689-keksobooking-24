const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const inputAvatar = document.querySelector('#avatar');
const inputPhotoHousing = document.querySelector('#images');
const preview1 = document.querySelector('.ad-form-header__preview');
const photoHousing = document.querySelector('.ad-form__photo');

inputAvatar.addEventListener('change', () => {
  const file = inputAvatar.files[0];
  const fileName = file.name.toLowerCase();
  const photos = FILE_TYPES.some((item) => fileName.endsWith(item));

  if(photos) {
    preview1.querySelector('img').src = URL.createObjectURL(file);
  }
});

inputPhotoHousing.addEventListener('change', () => {
  const file = inputPhotoHousing.files[0];
  const fileName = file.name.toLowerCase();
  const photos = FILE_TYPES.some((item) => fileName.endsWith(item));
  const preview = document.createElement('img');

  if(photos) {
    preview.src = URL.createObjectURL(file);
  }

  photoHousing.appendChild(preview);
});
