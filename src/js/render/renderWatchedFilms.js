import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getWatchedFilmIds, getQueueFilmIds } from '../myLibrary/localStorage';
import { insertMovieMarkup } from './renderSearchFilms';
import { fetchFilmById } from '../api/movieAPI';
import { ref } from '../references';

ref.btnLibraryWatched.addEventListener('click', () =>
  fetchAndRenderFilms(getWatchedFilmIds, 'watched')
);
ref.btnLibraryQueue.addEventListener('click', () =>
  fetchAndRenderFilms(getQueueFilmIds, 'queued')
);

async function fetchAndRenderFilms(getFilmIdsFunction, type) {
  try {
    const filmIds = await getFilmIdsFunction();

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
