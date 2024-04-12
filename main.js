const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getWeather(searchbox.value);
    getForecast(searchbox.value);
  }
}

function getWeather(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => {
      return response.json();
    }).then(weather => {
      displayWeather(weather);
    });1
}

function getForecast(query) {
  fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => {
      return response.json();
    }).then(forecast => {
      displayForecast(forecast);
    });
}

function displayWeather(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function displayForecast(forecast) {
  let forecastList = document.querySelector('.forecast');
  forecastList.innerHTML = '';

  for (let i = 0; i < forecast.list.length; i += 8) {
    let forecastItem = forecast.list[i];
    let forecastDate = new Date(forecastItem.dt * 1000);
    let forecastDay = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
    let forecastTemp = Math.round(forecastItem.main.temp);

    let forecastElement = document.createElement('div');
    forecastElement.classList.add('forecast-item');
    forecastElement.innerHTML = `
      <div class="forecast-day">${forecastDay}</div>
      <div class="forecast-temp">Temperaure ${forecastTemp}°c</div>
    `;
    forecastList.appendChild(forecastElement);
  }
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
