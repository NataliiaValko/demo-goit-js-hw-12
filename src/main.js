import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api';
import { createGalleryMarkup } from './js/render-functions';

import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
let preloader = document.querySelector('.preloader');

function handleSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));

  if (data.message === '') {
    return;
  }

  preloader.classList.add('show');
  galleryEl.innerHTML = '';

  getImagesByQuery(data.message)
    .then(({ hits }) => {
      if (hits.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      galleryEl.innerHTML = createGalleryMarkup(hits);

      lightbox.refresh();
    })
    .catch(err => {
      iziToast.error({
        message: 'Error!!!',
      });
    })
    .finally(() => {
      preloader.classList.remove('show');
    });
}

formEl.addEventListener('submit', handleSubmit);
