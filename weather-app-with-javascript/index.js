const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const searchBoxInput = document.querySelector('.search-box input');

search.addEventListener('click', () => {
  const APIKey = '36adb5dd761993e23c34c5e3574cf9cc';
  const city = document.querySelector('.search-box input').value;
  if (city === '') {
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKey}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/sun-warm-sunny-sunshine.png';
          break;
        case 'Rain':
          image.src = 'images/cloud-rainy-heavy-overcast.png';
          break;
        case 'Snow':
          image.src = 'images/cloudy-snowy-sleet-weather.png';
          break;
        case 'Clouds':
          image.src = 'images/sun-cloudy-sky-weather.png';
          break;
        case 'Haze':
          image.src = 'images/fog-cloud-foggy-weather.png';
          break;
        case 'Thunderstorm':
          image.src = 'images/cloudy-thunder-rain-day.png';
          break;
        case 'Drizzle':
          image.src = 'images/cloud-rain-drop-overcast.png';
          break;
        case 'Mist':
          image.src = 'images/cloud-sleet-rain-weather.png';
          break;
        case 'Smoke':
          image.src = 'images/fog-cloud-foggy-weather.png';
          break;
        default:
          image.src = '';
      }

      temperature.innerHTML = `${parseInt(json.main.temp - 273.15)}<span>℃</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed}Km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';
    });
});

searchBoxInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    search.click();
  }
});
