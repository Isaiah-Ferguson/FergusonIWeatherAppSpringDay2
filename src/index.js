import { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage } from "./localStorage.js";
let weatherCall = ""
let cityInfo = ""
let weatherData;

let cityInput = document.getElementById("cityInput");
let favoriteBtn = document.getElementById("favoriteBtn");
let cityHeader = document.getElementById("cityHeader");
let bigTemp = document.getElementById("bigTemp");
let currentCondition = document.getElementById("currentCondition");
let stateHeader = document.getElementById("stateHeader");
let highTemp = document.getElementById("highTemp");
let lowTemp = document.getElementById("lowTemp");


//http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={API key}
// API Key c1383ee0cc29ba1dbd0bc30979382dd6
// Converstion from standard to Imperial (Feireignhieght ) &units=imperial
// Example APi Call http://api.openweathermap.org/geo/1.0/direct?q=Stockton&appid=c1383ee0cc29ba1dbd0bc30979382dd6&units=imperial
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//Geolocator http://api.openweathermap.org/geo/1.0/direct?q=Stockton&appid=c1383ee0cc29ba1dbd0bc30979382dd6&units=imperial
// Todays weatcher Api https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

async function WeatherApiCall(url){
    const promise = await fetch(url);
    const data = await promise.json();
    console.log(data);
    weatherData = data;
    cityHeader.textContent = weatherData.city.name + ",";
    bigTemp.textContent = Math.floor(weatherData.list[0].main.temp) + "°F";
    currentCondition.textContent = weatherData.list[0].weather[0].main;
    
}

async function StateFinderCall(url){
    const promise = await fetch(url);
    const data = await promise.json();
    console.log(data);
    weatherData = data;
    stateHeader.textContent = weatherData[0].state;
    console.log(stateHeader.textContent);
}

async function TodaysWeatherApiCall(url){
    const promise = await fetch(url);
    const data = await promise.json();
    console.log(data);
    weatherData = data;
    highTemp.textContent = "high: " + Math.floor(weatherData.main.temp_max) + "°F";
    lowTemp.textContent = "Low: " + Math.floor(weatherData.main.temp_min) + "°F";
}


function WeatherApiInput(city){
    cityInfo = cityInput.value;
    weatherCall = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInfo + "&appid=c1383ee0cc29ba1dbd0bc30979382dd6&units=imperial"
    WeatherApiCall(weatherCall)
}

function StateFinder(city){
    cityInfo = cityInput.value;
    weatherCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInfo + "&appid=c1383ee0cc29ba1dbd0bc30979382dd6"
    StateFinderCall(weatherCall)
}

function TodaysWeatherApiInput(city){
    cityInfo = cityInput.value;
    weatherCall = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInfo + "&appid=c1383ee0cc29ba1dbd0bc30979382dd6&units=imperial"
    TodaysWeatherApiCall(weatherCall)
}




cityInput.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        WeatherApiInput(cityInput);
        StateFinder(cityInput);
        TodaysWeatherApiInput(cityInput);
    }
});
