const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31000801-179358ed9db1a9fc0904af43d';

export function getImagesByQuery(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: query,
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
