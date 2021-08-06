//Updating date/time
let now = new Date();
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = day[now.getDay()];
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hour = now.getHours();
let amPM = "am";
if (hour >= 12) {
  amPM = "pm";
}
if (hour > 12) {
  hour = hour - 12;
}
let time = document.querySelector("h2#display-time");
time.innerHTML = `${today}, ${hour}:${minutes}${amPM}`;

function getPosition(position) {
  let latitude = Math.round(position.coords.latitude);
  console.log(latitude);
  let longitude = Math.round(position.coords.longitude);
  console.log(longitude);

  function displayLocation(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-name");
    cityInput = `Lat: ${latitude}, Long: ${longitude}`;
    let cityName = document.querySelector("#city");
    cityName.innerHTML = cityInput;
    function showWeather(response) {
      let temp = Math.round(response.data.main.temp);
      let currentTemp = document.querySelector("#temperature");
      currentTemp.innerHTML = temp;
      let condition = response.data.weather[0].main;
      let weatherConditions = document.querySelector("#weather-condition");
      weatherConditions.innerHTML = condition;
      let humidity = response.data.main.humidity;
      let currentHumidity = document.querySelector("#humidity");
      currentHumidity.innerHTML = `${humidity}%`;
      let wind = response.data.wind.speed;
      let currentWind = document.querySelector("#wind");
      currentWind.innerHTML = `${wind} mph`;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=13f7811c53b3b447d5639701816e615d`;
    axios.get(url).then(showWeather);
  }
  let clickButton = document.querySelector("#curent-city-button");
  clickButton.addEventListener("click", displayLocation);
}
navigator.geolocation.getCurrentPosition(getPosition);

//Add search, display city and weather
function displayCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-name");
  cityInput = cityInput.value;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = cityInput;
  function showWeather(response) {
    let temp = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#temperature");
    currentTemp.innerHTML = temp;
    let condition = response.data.weather[0].main;
    let weatherConditions = document.querySelector("#weather-condition");
    weatherConditions.innerHTML = condition;
    let humidity = response.data.main.humidity;
    let currentHumidity = document.querySelector("#humidity");
    currentHumidity.innerHTML = `${humidity}%`;
    let wind = response.data.wind.speed;
    let currentWind = document.querySelector("#wind");
    currentWind.innerHTML = `${wind} mph`;
  }

  let urlCoordinates = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=13f7811c53b3b447d5639701816e615d`;
  axios.get(urlCoordinates).then(showWeather);
}
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", displayCity);

//use "current" button to get weather in current location

//switch from °F to °C and back again
//function changeToCelsius(event) {
//let temperature = document.querySelector("#temperature");
//if ((temperature = "66")) {
// let temperatureChange = document.querySelector("#temperature");
//temperatureChange.innerHTML = "19";
//}
//}

//function changeToFarenheit(event) {
//let temperature = document.querySelector("#temperature");
//if ((temperature = "19")) {
//let temperatureChange = document.querySelector("#temperature");
//temperatureChange.innerHTML = "66";
//}
// }

//let degreesFarenheit = document.querySelector("#degrees-farenheit");
//let degreesCelsius = document.querySelector("#degrees-celsius");
//degreesFarenheit.addEventListener("click", changeToFarenheit);
//degreesCelsius.addEventListener("click", changeToCelsius);
