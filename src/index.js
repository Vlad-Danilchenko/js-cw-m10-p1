'use strict';
import 'material-icons/iconfont/material-icons.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './js/createMarkup';
import { getWeatherByCoords, getWeatherByQuery } from './js/weatherAPI';

const weatherWrapperRef = document.querySelector('.weather__wrapper');
const formRef = document.querySelector('.js-search-form');

navigator.geolocation?.getCurrentPosition(({ coords }) => {
  const { latitude, longitude } = coords;
  getWeatherByCoords(latitude, longitude).then(onSuccess).catch(onError);
});

const handleSubmit = event => {
  event.preventDefault();
  const { user_country } = event.currentTarget.elements;
  // console.log(event.currentTarget.elements);
  // console.log(user_country);

  const city = user_country.value.trim().toLowerCase();
  if (!city) {
    Notify.failure('We need city name!');
    return;
  }
  // console.log(city);
  getWeatherByQuery(city).then(onSuccess).catch(onError);
  event.currentTarget.reset();
};

function onSuccess(data) {
  const markup = createMarkup(data);
  weatherWrapperRef.innerHTML = markup;
}
function onError(error) {
  console.log(error.message);
  weatherWrapperRef.innerHTML = '';
}

formRef.addEventListener('submit', handleSubmit);
