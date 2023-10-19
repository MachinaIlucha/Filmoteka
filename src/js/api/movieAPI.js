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

export async function fetchTrendedFilms(page = 1) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    page: page,
  });
  return axios.get(`${TREND_URL}?${searchParams}`);
}
