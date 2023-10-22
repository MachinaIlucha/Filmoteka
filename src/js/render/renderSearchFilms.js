import allGeners from '../json/genres.json';

export function insertMovieMarkup(ref, data) {
  const markup = data.map(item => createMovieItemMarkup(item)).join('');
  ref.galleryList.insertAdjacentHTML('beforeend', markup);
}

function createMovieItemMarkup(item) {
  const defaultPicture =
    'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg';
  const { title, poster_path, release_date, genre_ids, id } = item;
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : defaultPicture;

  const normalizeDate = new Date(release_date).getFullYear();
  const filmGenre = getGenreNames(allGeners, genre_ids);

  return `
    <li class="photo__card" data-modal-open id="${id}">
      <img src="${imageUrl}" alt="${title}" loading="lazy" class="movie__image" width="500" height="750"/>
      <span class="movie__rating">${item.vote_average.toFixed(2)}</span> 
      <div class="movie__info">
        <p class="film__title">${title}</p>
        <div class="movie__details">
          <p class="movie__genre">${filmGenre}</p>
          <p class="movie__year">| ${normalizeDate}</p>
        </div>
      </div>
    </li>`;
}

function getGenreNames(allGenres, idGenres) {
  const genreNames = allGenres
    .filter(genre => idGenres.includes(genre.id))
    .map(genre => genre.name);

  if (genreNames.length > 3) {
    return `${genreNames.slice(0, 2).join(', ')} Other`;
  }
  return genreNames.join(', ');
}
