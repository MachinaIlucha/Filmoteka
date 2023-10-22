import { fetchFilmById, fetchFilmTrailer } from './api/movieAPI';
import { ref } from './references';
import sprite from '../images/sprite.svg';

ref.galleryList.addEventListener('click', openModal);
ref.closeModalBtn.addEventListener('click', closeModal);
ref.movieModal.addEventListener('keydown', closeModal);
ref.movieModal.addEventListener('click', closeModalbyClick);

async function openModal(item) {
  if (item.target.nodeName !== 'IMG') {
    return;
  }

  ref.movieModal.classList.toggle('is-hidden');
  document.body.style.overflow = 'hidden';

  document.addEventListener('keydown', closeModal);

  const li = item.target.closest('.photo__card');
  const id = li.getAttribute('id');
  const response = await fetchFilmById(id).then(r => {
    return r.data;
  });
  renderBackdrop(response);
  ref.modalWrap.insertAdjacentHTML('afterBegin', renderMarkupModal(response));

  const btnTreil = document.querySelector('.modal-btn-trailer');
  const wrapIMG = document.querySelector('.modal-img-wrap');
  btnTreil.addEventListener('click', onClickWatch);

  async function onClickWatch() {
    const li = item.target.closest('.photo__card');
    const id = li.getAttribute('id');
    const response = await fetchFilmTrailer(id).then(r => {
      return r.data;
    });
    const officialTrail = response.results.length - 1;
    wrapIMG.remove();
    btnTreil.style.display = 'none';
    ref.modalWrap.insertAdjacentHTML(
      'afterBegin',
      renderTrail(response.results[officialTrail])
    );
  }
}

function closeModal(e) {
  if (!(e.key === 'Escape' || e.type === 'click')) {
    return;
  }

  const { movieModal, modalWrap, libraryWatchedBtn, libraryQueueBtn } = ref;
  const backdrop = document.querySelector('.backdrop-info');

  movieModal.classList.toggle('is-hidden');
  modalWrap.innerHTML = '';
  document.body.style.overflow = '';
  backdrop.style.backgroundImage = '';
  document.removeEventListener('keydown', closeModal);
}

function closeModalbyClick(e) {
  if (e.target !== e.currentTarget) {
    return;
  }

  closeTheModal();
}

function closeTheModal() {
  const { movieModal, modalWrap } = ref;
  const backdrop = document.querySelector('.backdrop-info');

  movieModal.classList.toggle('is-hidden');
  modalWrap.innerHTML = '';
  document.body.style.overflow = '';
  backdrop.style.backgroundImage = '';
  document.removeEventListener('keydown', closeModal);
}

function renderBackdrop(film) {
  const backdrop = document.querySelector('.backdrop-info');
  Object.assign(backdrop.style, {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${film.backdrop_path})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });
}

function renderMarkupModal({
  poster_path,
  title,
  vote_average,
  vote_count,
  popularity,
  original_title,
  genres,
  overview,
  id,
}) {
  return `<div class="modal-img-wrap">
          <div class="modal-wrap-img-btn"><img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" class="modal-image" width="500" height="750"/>
            <button type="button" class="modal-btn-trailer"><svg class="btn-trailer-icon"><use href="${sprite}#icon-play"></use></svg>
          </button></div>
      </div>
      <div class="modal-info">
        <h2 class="modal-info-name">${title}</h2>
                <ul class="modal-info-list">
          <li class="modal-info-item">
            <p class="modal-info-name-value">Vote / Votes</p>
            <p class="modal-info-value"><span class="modal-info-value-vote">${vote_average.toFixed(
              1
            )}</span>/<span
                class="modal-info-value-votes"
                >${vote_count}</span
              ></p>
          </li>
          <li class="modal-info-item">
            <p class="modal-info-name-value">Popularity</p>
            <p class="modal-info-value">${popularity}</p>
          </li>
          <li class="modal-info-item">
            <p class="modal-info-name-value">Original Title</p>
            <p class="modal-info-value">${original_title}</p>
          </li>
          <li class="modal-info-item">
            <p class="modal-info-name-value">Genre</p>
            <p class="modal-info-value">${genres
              .map(item => item.name)
              .join(', ')}</p>
          </li>
        </ul>
        <p class="modal-info-pre-about">About</p>
        <p class="modal-info-about">
          ${overview}
        </p>
        <div class="btn-modal-wrap">
		  <div class="modal-btn-wrap">
          <button type="button" class="modal-btn" data-watched="${id}">
            Add to watched
          </button>
			 <button type="button" class="modal-btn modal-btn-rem" data-watched-rem="${id}">
		 Remove from watched
          </button>
			 </div>
			 <div class="modal-btn-wrap">
          <button type="button" class="modal-btn" data-queue="${id}">
            Add to queue
          </button>
			 <button type="button" class="modal-btn modal-btn-rem" data-queue-rem="${id}">
		 Remove from queue
          </button>
			 </div>
        </div>
      </div>`;
}

function renderTrail({ key }) {
  return `<iframe
  width="375"
    height="478"
    src="https://www.youtube.com/embed/${key}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    waitUntil()
    class='modal-image'
  ></iframe>`;
}
