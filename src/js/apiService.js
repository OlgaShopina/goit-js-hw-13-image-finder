const BASE_URL = 'https://pixabay.com/api/';
const KEY = '23011751-b79152737ee34b5e8bfa3d34d';

export default {
  page: 1,
  query: '',

  async fetchArr(query) {
    const res = await fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${KEY}`);
    const parseRes = await res.json();
    this.incrementPage();
    return parseRes.hits;
  },

  get searchQuerry() {
    return this.query;
  },

  set searchQuerry(newQuery) {
    this.query = newQuery;
  },

  incrementPage() {
    this.page += 1;
  },
  
  resetPage() {
    this.page = 1;
  },
};