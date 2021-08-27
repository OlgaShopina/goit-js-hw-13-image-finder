
import markupFetch from "./templates/photo.hbs";
import apiFetch from "./js/apiService";
import './sass/styles.css';

const refs = {
searchForm: document.querySelector('#search-form'),
gallery: document.querySelector('.gallery'),
searchBtn: document.getElementById('.search-btn'),
loadBtn: document.querySelector('.load-btn')
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', loadMoreBtn);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const input = form.elements.query;
    
  clearGallery();

  apiFetch.resetPage();
  apiFetch.searchQuerry = input.value;

  apiFetch.fetchArr().then(hits => {
    const markup = buildTemplate(hits);
    inserGallery(markup);
  });
  input.value = '';
}

function loadMoreBtn() {
  apiFetch.fetchArr().then(hits => {
    const markup = buildTemplate(hits);
      inserGallery(markup);
      scrollImg()
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function buildTemplate(items) {
  return markupFetch(items);
}

function inserGallery(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}

function scrollImg(){    
refs.loadBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}






