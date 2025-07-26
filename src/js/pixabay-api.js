

import axios from 'axios';

const API_KEY = '51467022-cc438a4dec995b2b9f6e09d1a';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      }
    });
    return response.data; 
  } catch (error) {
    console.error( error);
  }
}

