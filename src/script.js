let date = document.querySelector("h2");

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
date.innerHTML = ` ${day} `;

let hours = now.getHours();
if (hours <= 9) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes <= 9) {
  minutes = `0${minutes}`;
}
let sec = now.getSeconds();
if (sec <= 9) {
  sec = `0${sec}`;
}

let currentTime = document.querySelector("#updated-time");
currentTime.innerHTML = `${hours}: ${minutes}: ${sec}`;

function changeTime(event) {
  event.preventDefault();
  let newNow = new Date();
  let newHours = newNow.getHours();
  if (newHours <= 9) {
    newHours = `0${newHours}`;
  }
  let newMinutes = newNow.getMinutes();
  if (newMinutes <= 9) {
    newMinutes = `0${newMinutes}`;
  }
  let newSec = newNow.getSeconds();
  if (newSec <= 9) {
    newSec = `0${newSec}`;
  }
  currentTime.innerHTML = `${newHours}: ${newMinutes}: ${newSec}`;
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tues"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col">
             <div class="forecast-date">
                <h5 class="day">${day}</h5>
                <img
                  src="http://openweathermap.org/img/wn/10d@2x.png"
                  alt=""
                  width="150";
                />
                <p class="forecast-temp">
                  <span class="high">58°</span> / <span class="low">43°</span>
                </p>
            </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "fda3688b1db05987dd5d07c237aecfba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  fahrenTemp = response.data.main.temp;

  document.querySelector("#current-temp").innerHTML = `${Math.round(
    fahrenTemp
  )} `;
  document.querySelector(
    "#condition"
  ).innerHTML = `${response.data.weather[0].main}`;

  document.querySelector("#wind").innerHTML = `Wind | ${Math.round(
    response.data.wind.speed
  )} mi/h `;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity | ${response.data.main.humidity}%`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function findCity(city) {
  let apiKey = "fda3688b1db05987dd5d07c237aecfba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function searchingCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-input").value;

  findCity(newCity);
}

function findLocation(position) {
  let apiKey = "fda3688b1db05987dd5d07c237aecfba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}
function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

function changeToFahren(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  fahrenLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temp.innerHTML = Math.round(fahrenTemp);
}

function changeToCel(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenLink.classList.add("active");
  let celTemp = (fahrenTemp - 32) * (5 / 9);
  temp.innerHTML = Math.round(celTemp);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", searchingCity);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchingCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findCurrentLocation);

let fahrenLink = document.querySelector("#fahren-link");
fahrenLink.addEventListener("click", changeToFahren);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCel);

let updateTime = document.querySelector("#time-button");
updateTime.addEventListener("click", changeTime);

let iconElement = document.querySelector("#icon");

let fahrenTemp = null;

findCity("Columbus");
