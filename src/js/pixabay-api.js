import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31000801-179358ed9db1a9fc0904af43d';

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      q: query,
      page: page,
      per_page: 15,
    },
  });

  return response.data;
}
