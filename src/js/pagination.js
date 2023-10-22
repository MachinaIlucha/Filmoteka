import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import { ref } from './references';
import { fetchAndRenderPopularFilm } from './render/renderTrendingFilms';

const options = {
  totalItems: 200,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
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

const pagination = new Pagination(ref.paginationContainer, options);

pagination.on('afterMove', onPaginationMove);

function onPaginationMove({ page }) {
  ref.galleryList.innerHTML = '';
  fetchAndRenderPopularFilm(page);

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
