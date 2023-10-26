import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchTrendedFilms } from '../api/movieAPI';
import { ref } from '../references';
import {
  switchToDefaultMode,
  updateTotalItems,
} from '../pagination/pagination';
import { ensureGenresAreCached, generateFilmsMarkup } from '../utils/utils';

export { fetchAndRenderPopularFilm };

fetchAndRenderPopularFilm(1);

async function fetchAndRenderPopularFilm(page) {
  try {
    const cachedGenres = await ensureGenresAreCached();

    const {
      data: { results: films, total_results: total_results },
    } = await fetchTrendedFilms(page);
    const markup = generateFilmsMarkup(films, cachedGenres);
    ref.galleryList.innerHTML = markup;

    // pagination
    updateTotalItems(total_results, page);
    switchToDefaultMode();
  } catch (error) {
    console.error('Failed to fetch and render popular films:', error.message);
    Notify.failure('Failed to fetch and render popular films.');
  }
}
