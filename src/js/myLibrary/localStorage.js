import { Notify } from 'notiflix/build/notiflix-notify-aio';

const WATCHED_FILM_IDS = 'WATCHED_FILM_IDS';
const QUEUE_FILM_IDS = 'QUEUE_FILM_IDS';

export function saveFilmToWatchedLocalStorage(filmId) {
  saveFilmToLocalStorage(WATCHED_FILM_IDS, filmId);
}

export function saveFilmToQueueLocalStorage(filmId) {
  saveFilmToLocalStorage(QUEUE_FILM_IDS, filmId);
}

export function isFilmInWatchedLocalStorage(filmId) {
  return isFilmInLocalStorage(WATCHED_FILM_IDS, filmId);
}

export function isFilmInQueueLocalStorage(filmId) {
  return isFilmInLocalStorage(QUEUE_FILM_IDS, filmId);
}

export function removeFilmFromWatchedLocalStorage(filmId) {
  removeFilmFromLocalStorage(WATCHED_FILM_IDS, filmId);
}

export function removeFilmFromQueueLocalStorage(filmId) {
  removeFilmFromLocalStorage(QUEUE_FILM_IDS, filmId);
}

export function getWatchedFilmIds() {
  return getFilmIdsFromLocalStorage(WATCHED_FILM_IDS);
}

export function getQueueFilmIds() {
  return getFilmIdsFromLocalStorage(QUEUE_FILM_IDS);
}

function saveFilmToLocalStorage(key, filmId) {
  try {
    let existingIds = JSON.parse(localStorage.getItem(key)) || [];

    // Check if filmId already exists, if not, then add
    if (!existingIds.includes(filmId)) {
      existingIds.push(filmId);
      localStorage.setItem(key, JSON.stringify(existingIds));
    }
  } catch (error) {
    console.error('Error saving film to localStorage:', error);
    Notify.failure('Error saving film to localStorage.');
  }
}

function isFilmInLocalStorage(key, filmId) {
  try {
    const existingIds = JSON.parse(localStorage.getItem(key)) || [];
    return existingIds.includes(filmId);
  } catch (error) {
    console.error('Error checking film in localStorage:', error);
    return false;
  }
}

function removeFilmFromLocalStorage(key, filmId) {
  try {
    let existingIds = JSON.parse(localStorage.getItem(key)) || [];

    // Check if filmId exists, if yes, then remove
    const index = existingIds.indexOf(filmId);
    if (index !== -1) {
      existingIds.splice(index, 1); // Remove the filmId from the array
      localStorage.setItem(key, JSON.stringify(existingIds)); // Update localStorage
    }
  } catch (error) {
    console.error('Error removing film from localStorage:', error);
    Notify.failure('Error removing film from localStorage.');
  }
}

function getFilmIdsFromLocalStorage(key) {
  try {
    const existingIds = JSON.parse(localStorage.getItem(key)) || [];
    return existingIds;
  } catch (error) {
    console.error('Error getting film IDs from localStorage:', error);
    Notify.failure('Error getting film IDs from localStorage.');
    return [];
  }
}
