import axios from 'axios';

import {
  API_KEY,
  TREND_URL,
  SEARCH_URL,
  ID_URL,
  PAGE,
  GENRE_URL,
  UPCOMING,
  DISCOVER,
} from './apiVars';

function createUrlWithParams(baseURL, params = {}) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  });
  return `${baseURL}?${searchParams.toString()}`;
}

export async function fetchTrendedFilms(page = 1) {
  const url = createUrlWithParams(TREND_URL, { page });
  return axios.get(url);
}

export async function fetchFilmGenres() {
  const url = createUrlWithParams(GENRE_URL);
  return axios.get(url);
}

export async function fetchFilmById(id) {
  const url = createUrlWithParams(`${ID_URL}${id}`);
  return axios.get(url);
}

export async function fetchFilmTrailer(id) {
  const url = createUrlWithParams(`${ID_URL}/${id}/videos`);
  return axios.get(url);
}

export async function fetchSearchedFilms(content, page = 1) {
  const url = createUrlWithParams(SEARCH_URL, { query: content, page });
  return axios.get(url);
}
