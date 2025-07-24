

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery,  showLoader, hideLoader} from './js/render-functions';



const formSerch = document.querySelector(".form")
const input = document.querySelector(`[name="search-text"]`)
const searchButton= document.querySelector("button")


const API_KEY = "51467022-cc438a4dec995b2b9f6e09d1a";

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
    hideLoader();
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
}

// const searchButton= 

// У файлі main.js напиши всю логіку роботи додатка.
//  Виклики нотифікацій iziToast, усі перевірки на довжину 
//  масиву в отриманій відповіді робимо саме в цьому файлі.
//  Імпортуй в нього функції із файлів pixabay - api.js та render - functions.js 
//  та викликай їх у відповідний момент.

