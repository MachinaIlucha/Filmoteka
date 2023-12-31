const API_KEY = '10a5582c8c6515cf1028344bb9325654';
const BASE_URL = 'https://api.themoviedb.org/3';
const TREND_URL = `${BASE_URL}/trending/movie/week`;
const SEARCH_URL = `${BASE_URL}/search/movie`;
const ID_URL = `${BASE_URL}/movie/`;
const GENRE_URL = `${BASE_URL}/genre/movie/list`;
const UPCOMING = `${BASE_URL}/movie/upcoming`;
const DISCOVER = `${BASE_URL}/discover/movie`;
const LOCALSTORAGE_WATCHED = 'watched';
const LOCALSTORAGE_QUEUE = 'queue';

export {
  API_KEY,
  BASE_URL,
  TREND_URL,
  SEARCH_URL,
  ID_URL,
  GENRE_URL,
  LOCALSTORAGE_WATCHED,
  LOCALSTORAGE_QUEUE,
  UPCOMING,
  DISCOVER,
};
