let timing = document.querySelector("h2");

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

let hours = now.getHours();
if (hours <= 9) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes <= 9) {
  minutes = `0${minutes}`;
}
timing.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )} `;
  document.querySelector(
    "#condition"
  ).innerHTML = `| ${response.data.weather[0].main}`;

  document.querySelector("#wind").innerHTML = `Wind | ${Math.round(
    response.data.wind.speed
  )} mi/h `;
  document.querySelector(
    "#precip"
  ).innerHTML = `Humidity | ${response.data.main.humidity}%`;
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
  temp.innerHTML = 66;
}

function changeToCel(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = 17;
}

findCity("Columbus");

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
