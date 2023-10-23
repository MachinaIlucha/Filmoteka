import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import { ref } from '../references';
import { fetchAndRenderPopularFilm } from '../render/renderTrendingFilms';
import { renderSearchFilms } from '../searchFilms';

let pagination;
let isSearchMode = false;

initializePagination(200);

function initializePagination(totalItems, page = 1) {
  const options = createOptions(totalItems, page);

  if (pagination) {
    pagination.destroy?.();
  }

  pagination = new Pagination(ref.paginationContainer, options);
  pagination.on('afterMove', onPaginationMove);
}

export function updateTotalItems(newTotal, page = 1) {
  initializePagination(newTotal, page);
}

export function switchToSearchMode() {
  isSearchMode = true;
}

export function switchToDefaultMode() {
  isSearchMode = false;
}

function onPaginationMove({ page }) {
  ref.galleryList.innerHTML = '';

  if (isSearchMode) {
    renderSearchFilms(page);
  } else {
    fetchAndRenderPopularFilm(page);
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function createOptions(totalItems, page) {
  return {
    totalItems: totalItems > 1000 ? 1000 : totalItems,
    itemsPerPage: 20,
    visiblePages: 5,
    page: page,
    centerAlign: true,
    firstItemClassName: 'pagination-first-button',
    lastItemClassName: 'pagination-last-button',
    template: {
      page: '<a href="#" class="pagination-page-button">{{page}}</a>',
      currentPage: '<a class="pagination-active-button">{{page}}</a>',
      moveButton:
        '<a href="#" class="pagination-next-button">' +
        '<span class="pag-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="pagination-disabled-button">' +
        '<span class="pag-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="pagination-more-button">' +
        '<span class="pag-ico-more"> </span>' +
        '</a>',
    },
  };
}
