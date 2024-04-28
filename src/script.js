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

function changeBackground() {
  let now = new Date();
  let hours = now.getHours();

  if (hours >= 5 && hours <= 8) {
    document.write(
      '<body style="background: radial-gradient(circle at 10% 20%,rgb(226, 240, 254) 0%,rgb(255, 247, 228) 90%)">'
    ); //rise
  }
  if (hours >= 9 && hours <= 12) {
    document.write(
      '<body style=" background: linear-gradient(44.8deg,rgba(255, 136, 102, 0.67) -53.1%,rgba(255, 221, 136, 0.28) 49%)">'
    ); //yellow
  }
  if (hours >= 13 && hours <= 15) {
    document.write(
      '<body style="background: radial-gradient(circle at 10% 20%,rgb(255, 252, 214) 0%,rgba(255, 102, 102, 0.44) 90%)">'
    ); //pink
  }
  if (hours >= 16 && hours <= 19) {
    document.write(
      '<body style="background: linear-gradient(68.1deg,rgb(248, 205, 205) -0.3%,rgb(149, 170, 211) 100.7%)">'
    ); //set
  }
  if (hours >= 20 && hours <= 22) {
    document.write(
      '<body style="background: linear-gradient(to top, #09203f 0%, #537895 100%)">'
    ); //blue
  } else {
    document.write(
      '<body style="background: radial-gradient(circle at 1.8% 4.8%, rgb(17, 23, 58) 0%, rgb(58, 85, 148) 90%)">'
    ); //dark
  }
}

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
             <div class="forecast-date">
                <h5 class="day">${formatDay(forecastDay.dt)}</h5>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="150";
                />
                <p class="forecast-temp">
                  <span class="high">${Math.round(
                    forecastDay.main.temp_max
                  )}°</span> / <span class="low">${Math.round(
          forecastDay.main.temp_min
        )}°</span>
                </p>
            </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinatesLat, coordinatedLon) {
  let apiKey = "bb983f865f669b3e5ce1bacdbd335789";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  //let apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${coordinatesLat}&lon=${coordinatedLon}&limit=5&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.name;
  let apiKey = "bb983f865f669b3e5ce1bacdbd335789";
  let cityLat = response.lat;
  let cityLon = response.lon;
  let cityInfo =
    "https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial";

  fahrenTemp = cityInfo.main.temp;

  document.querySelector("#current-temp").innerHTML = `${Math.round(
    fahrenTemp
  )} `;
  document.querySelector(
    "#condition"
  ).innerHTML = `${cityInfo.data.weather[0].main}`;

  document.querySelector("#wind").innerHTML = `Wind | ${Math.round(
    cityInfo.data.wind.speed
  )} mi/h `;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity | ${cityInfo.data.main.humidity}%`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", cityInfo.data.weather[0].description);

  getForecast(cityLat, cityLon);
}

function findCity(city) {
  let apiKey = "bb983f865f669b3e5ce1bacdbd335789";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function searchingCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-input").value;

  findCity(newCity);
}

function findLocation(position) {
  let apiKey = "bb983f865f669b3e5ce1bacdbd335789";
  //  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  let apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.lat}&lon=${position.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather);
}
function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", searchingCity);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchingCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findCurrentLocation);

let updateTime = document.querySelector("#time-button");
updateTime.addEventListener("click", changeTime);

let iconElement = document.querySelector("#icon");

findCity("Columbus");
changeBackground();
