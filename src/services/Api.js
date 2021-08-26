import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '21941214-a78e4db07bb432cdcb3475a2b';

const findImage = (currentPage, searchQuery) => {
  return axios
    .get(
      `?q=${searchQuery}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${currentPage}&per_page=12`,
    )
    .then(response => response.data.hits);
};

const api = { findImage };

export default api;
