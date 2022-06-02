

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// notificationElement.innerHTML=`<p>iji</p>`;
// console.log(notificationElement);
const weather = {};

weather.temperature = {
    unit: "C"
}

const Kelvin = 273;

const key = "82005d27a116c2880c8f0fcb866998a0";
let key2 = "1d0855b97a596ab96ef39ec256a74f59";

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else {
    notification.style.disply = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support geo-location</p>";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    //  notificationElement.style.disply="hidden";
    notificationElement.innerHTML = `<p>denied</p>`
    console.log("denied");
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key2}`
    console.log(api);

    fetch(api).then(function (response) {
        let data = response.json();
        return data;
    }).then(function (data) {
        weather.temperature.value = Math.floor(data.main.temp - Kelvin);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    }).then(function () {
        displyWeather();
    });

}

function displyWeather() {
    console.log(weather);
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}<span>&deg${weather.temperature.unit}</span>`;
    descElement.innerHTML = `${weather.description}`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}


function convertToF(temperature) {
    return ((temperature * 9 / 5) + 32);
}

tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit === "C") {
        let fdeg = convertToF(weather.temperature.value);
        fdeg = Math.floor(fdeg);
        weather.temperature.unit = "F";
        tempElement.innerHTML = `${fdeg}<span>&deg${weather.temperature.unit}</span>`
    }

    else {
        weather.temperature.unit = "C";
        tempElement.innerHTML = `${weather.temperature.value}<span>&deg${weather.temperature.unit}</span>`;

    }

})

