import { Notify } from 'notiflix';

import { ref } from './references';
import { insertMovieMarkup } from './render/renderSearchFilms';
import { fetchAndRenderPopularFilm } from './render/renderTrendingFilms';
import { fetchSearchedFilms } from './api/movieAPI';

export { renderSearchFilms };

let searchQuery = '';
ref.form.addEventListener('submit', onCLickSubmit);

function onCLickSubmit(e) {
  e.preventDefault();
  searchQuery = ref.input.value.trim();
  if (searchQuery === '') {
    Notify.warning('Searching starts after providing data to search!');
    return;
  }
  if (searchQuery.length > 0) {
    ref.input.value = '';
    renderSearchFilms();
  } else {
    fetchAndRenderPopularFilm();
  }
}

async function renderSearchFilms(page) {
  try {
    const promis = await fetchSearchedFilms(searchQuery, page);

    const data = promis.data.results;

    if (data.length === 0) {
      return Notify.warning(
        'Search result not successful. Enter the correct movie name!'
      );
    }
    clearGallery();
    insertMovieMarkup(ref, data);
    return promis;
  } catch (error) {
    console.log(error);
  }
}

function clearGallery() {
  ref.galleryList.innerHTML = '';
}
