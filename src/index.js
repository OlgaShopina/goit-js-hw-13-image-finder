
import markupFetch from "./templates/photo.hbs";
import apiFetch from "./js/apiService";
import './sass/styles.css';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
searchForm: document.querySelector('#search-form'),
gallery: document.querySelector('.gallery'),
searchBtn: document.getElementById('.search-btn'),
loadBtn: document.querySelector('.load-btn'),
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', loadMoreBtn);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
    const input = form.elements.query;

    if (input.value.trim() === '') {
     //   clearGallery();
        return error ({    
            text: 'Please, type what do you want',
            styling: 'brighttheme',
            });            
    }        
    
  clearGallery();

  apiFetch.resetPage();
  apiFetch.searchQuerry = input.value;

  apiFetch.fetchArr().then(hits => {
    const markup = buildTemplate(hits);
    inserGallery(markup);
  });
    input.value = '';
    
    refs.loadBtn.style.display = 'block';
}

function loadMoreBtn() { 
       apiFetch.fetchArr().then(hits => {
    const markup = buildTemplate(hits);
      inserGallery(markup);
           scrollImg()

       if (hits < apiFetch.page) {
           refs.loadBtn.style.display = 'none';
           return error ({    
            text: 'Sorry, no more images to show',
            styling: 'brighttheme',
            });       
  }     
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

function scrollImg() {
refs.loadBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}






