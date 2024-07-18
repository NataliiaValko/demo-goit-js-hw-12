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
const loadMoreBtn = document.querySelector('.load-more');
let preloader = document.querySelector('.preloader');

let query = '';
let page = 1;
loadMoreBtn.classList.add('hidden');

async function handleSubmit(event) {
  event.preventDefault();
  query = event.target.elements.message.value.trim();
  event.target.reset();

  if (query === '') {
    return;
  }

  preloader.classList.add('show');
  galleryEl.innerHTML = '';
  page = 1;

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);

    if (hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      loadMoreBtn.classList.add('hidden');
      return;
    }

    galleryEl.innerHTML = createGalleryMarkup(hits);
    lightbox.refresh();
    loadMoreBtn.classList.toggle('hidden', totalHits <= page * 15);
  } catch (err) {
    iziToast.error({
      message: err.message,
    });
  } finally {
    preloader.classList.remove('show');
  }
}

async function handleLoadMore() {
  page += 1;
  preloader.classList.add('show');

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);

    if (hits.length === 0) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreBtn.classList.add('hidden');
      return;
    }

    galleryEl.insertAdjacentHTML('beforeend', createGalleryMarkup(hits));
    lightbox.refresh();

    loadMoreBtn.classList.toggle('hidden', totalHits <= page * 15);
    window.scrollBy({
      top: galleryEl.firstElementChild.getBoundingClientRect().height * 2,
      behavior: 'smooth',
    });
  } catch (err) {
    iziToast.error({
      message: err.message,
    });
  } finally {
    preloader.classList.remove('show');
  }
}

formEl.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);
