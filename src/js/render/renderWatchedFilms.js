import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getWatchedFilmIds, getQueueFilmIds } from '../myLibrary/localStorage';
import { insertMovieMarkup } from './renderSearchFilms';
import { fetchFilmById } from '../api/movieAPI';
import { ref } from '../references';

fetchAndRenderFilms(getWatchedFilmIds, 'watched');

ref.btnLibraryWatched.addEventListener('click', () => {
  ref.btnLibraryWatched.classList.add('header-library__btn-active');
  ref.btnLibraryQueue.classList.remove('header-library__btn-active');
  fetchAndRenderFilms(getWatchedFilmIds, 'watched');
});
ref.btnLibraryQueue.addEventListener('click', () => {
  ref.btnLibraryQueue.classList.add('header-library__btn-active');
  ref.btnLibraryWatched.classList.remove('header-library__btn-active');
  fetchAndRenderFilms(getQueueFilmIds, 'queued');
});

async function fetchAndRenderFilms(getFilmIdsFunction, type) {
  try {
    const filmIds = await getFilmIdsFunction();

    if (filmIds.length === 0) {
      ref.notImgStile.classList.remove('is-hidden');

      clearGallery();
      Notify.info('No films found in this category.');
      return;
    }

    const films = await Promise.all(
      filmIds.map(id => fetchFilmById(id).then(item => item.data))
    );

    const filmsWithGenreIds = films.map(film => {
      const genre_ids = film.genres.map(genre => genre.id);
      return { ...film, genre_ids };
    });

    ref.notImgStile.classList.add('is-hidden');
    insertMovieMarkup(ref, filmsWithGenreIds);
  } catch (error) {
    console.error(`Failed to fetch and render ${type} films:`, error.message);
    Notify.failure(`Failed to fetch and render ${type} films.`);
  }
}

function clearGallery() {
  ref.libraryGalleryList.innerHTML = '';
}
