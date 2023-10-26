import { ensureGenresAreCached, generateFilmsMarkup } from '../utils/utils';

export async function insertMovieMarkup(ref, data) {
  const cachedGenres = await ensureGenresAreCached();
  const markup = generateFilmsMarkup(data, cachedGenres);
  ref.galleryList.innerHTML = markup;
}
