import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchTrendedFilms, fetchFilmGenres } from '../api/movieAPI';
import { ref } from '../references';

export { fetchAndRenderPopularFilm };

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
let cachedGenres = null;

fetchAndRenderPopularFilm(1);

async function fetchAndRenderPopularFilm(page) {
  try {
    if (!cachedGenres) {
      cachedGenres = await fetchFilmGenres();
    }

    const {
      data: { results: films },
    } = await fetchTrendedFilms(page);
    const markup = generateFilmsMarkup(films, cachedGenres);
    ref.galleryList.innerHTML = markup;
  } catch (error) {
    console.error('Failed to fetch and render popular films:', error.message);
    Notify.failure('Failed to fetch and render popular films.');
  }
}

function generateFilmsMarkup(films, genres) {
  return films.map(film => createFilmCard(film, genres)).join('');
}

function createFilmCard(
  { id, poster_path, title, vote_average, release_date, genre_ids },
  genres
) {
  const movieGenres = compareGenresId(genres, genre_ids);

  return `
    <li class="photo__card" data-modal-open id="${id}">
      <img src="${BASE_IMAGE_URL}${poster_path}" alt="${title}" loading="lazy" class="movie__image" width="500" height="750"/>
      <span class="movie__rating">${vote_average.toFixed(1)}</span>
      <div class="movie__info">
        <p class="film__title">${title}</p>
        <div class="movie__details">
          <p class="movie__genre">${movieGenres}</p>
          <p class="movie__year">| ${release_date.slice(0, 4)}</p>
        </div>
      </div>
    </li>`;
}

function compareGenresId(allGenres, filmGenre) {
  const arrayOfGenres = allGenres.data.genres
    .filter(el => filmGenre.includes(el.id))
    .map(el => el.name);

  if (arrayOfGenres.length > 3) {
    return `${arrayOfGenres.slice(0, 2).join(', ')}, Other`;
  }

  return arrayOfGenres.join(', ');
}
