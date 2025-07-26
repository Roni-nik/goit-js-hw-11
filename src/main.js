

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery,  showLoader, hideLoader} from './js/render-functions';



const formSerch = document.querySelector(".form")
const input = document.querySelector(`[name="search-text"]`)
const searchButton= document.querySelector("button")


const API_KEY = "51467022-cc438a4dec995b2b9f6e09d1a";

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('is-hidden');
  }
});


formSerch.addEventListener("submit", handleSubmit)

async function handleSubmit(event) {
  event.preventDefault();
  const inputVal = input.value.trim();

  if (!inputVal) {
    iziToast.error({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  try {
      clearGallery();
          showLoader();
    const data = await getImagesByQuery(inputVal);
    
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message: 'Sorry, no images found for your query.',
        position: 'topRight',
      });
      return;
    }

      
      
    createGallery(data.hits);

  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    }
    
  finally {
       hideLoader();
    }
}

