import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = input.value.trim();
  page = 1;
    if (!query) {
    iziToast.warning({ title: 'Warning', message: 'Please enter a search term.' });
    return;
  }

  clearGallery();
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({ title: 'Error', message: 'Sorry, there are no images matching your search query. Please try again!', position: 'topRight' });
      return;
    }

    createGallery(data.hits);
    if (data.hits.length < totalHits) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later.', position: 'topRight' });
    console.error(error);
  } finally {
    hideLoader();
    }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    const totalLoaded = page * 15;
    if (totalLoaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }

    scrollPage();
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to load more images.' });
    console.error(error);
  } finally {
    hideLoader();
  }
});

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}