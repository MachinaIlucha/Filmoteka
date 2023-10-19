import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchTrendedFilms } from '../api/movieAPI';
import { ref } from '../references';

export { fetchAndRenderPopularFilm };

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

fetchAndRenderPopularFilm(1);

async function fetchAndRenderPopularFilm(page) {
  try {
    const {
      data: { results: films },
    } = await fetchTrendedFilms(page);
    const markup = generateFilmsMarkup(films);
    ref.galleryList.innerHTML = markup;
  } catch (error) {
    console.error('Failed to fetch and render popular films:', error.message);
    Notify.failure('Failed to fetch and render popular films.');
  }
}

function generateFilmsMarkup(films) {
  return films.map(film => createFilmCard(film)).join('');
}

function createFilmCard({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}) {
  return `
    <li class="photo__card" data-modal-open id="${id}">
      <img src="${BASE_IMAGE_URL}${poster_path}" alt="${title}" loading="lazy" class="movie__image" width="500" height="750"/>
      <span class="movie__rating">${vote_average.toFixed(1)}</span>
      <div class="movie__info">
        <p class="film__title">${title}</p>
        <div class="movie__details">
          <p class="movie__year">| ${release_date.slice(0, 4)}</p>
        </div>
      </div>
    </li>`;
}
