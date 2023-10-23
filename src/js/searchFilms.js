import { Notify } from 'notiflix';

import { ref } from './references';
import { insertMovieMarkup } from './render/renderSearchFilms';
import { fetchAndRenderPopularFilm } from './render/renderTrendingFilms';
import { fetchSearchedFilms } from './api/movieAPI';
import { switchToSearchMode, updateTotalItems } from './pagination/pagination';

export { renderSearchFilms };

let searchQuery = '';
ref.form.addEventListener('submit', onCLickSubmit);

function onCLickSubmit(e) {
  e.preventDefault();
  searchQuery = ref.input.value.trim();
  if (searchQuery === '') {
    Notify.warning(
      'Search result not successful. Enter the correct movie name!'
    );
    return;
  }
  if (searchQuery.length > 0) {
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

    // pagination
    updateTotalItems(promis.data.total_results, page);
    switchToSearchMode();
    return promis;
  } catch (error) {
    console.log(error);
  }
}

function clearGallery() {
  ref.galleryList.innerHTML = '';
}
