
const API_KEY = "3d9f6f191791de4615f1fea91223e589"; 

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        showError("Please enter a city name!");
        return;
    }
    
    await fetchWeather(city);
}

async function getWeatherByCity(city) {
    document.getElementById('cityInput').value = city;
    await fetchWeather(city);
}

async function fetchWeather(city) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    weatherInfo.classList.add('show');
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("City not found!");
        }
        
        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    weatherInfo.innerHTML = `
        <div class="weather-icon">
            <img src="${iconUrl}" alt="${data.weather[0].description}">
        </div>
        <div class="temperature">${Math.round(data.main.temp)}°C</div>
        <div class="city-name">${data.name}, ${data.sys.country}</div>
        <div class="condition">${data.weather[0].description}</div>
        
        <div class="details">
            <div class="detail-item">
                <i class="fas fa-tint"></i>
                <div>Humidity</div>
                <span>${data.main.humidity}%</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-wind"></i>
                <div>Wind Speed</div>
                <span>${Math.round(data.wind.speed)} km/h</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-thermometer-half"></i>
                <div>Feels Like</div>
                <span>${Math.round(data.main.feels_like)}°C</span>
            </div>
        </div>
    `;
    
    weatherInfo.classList.add('show');
}

function showError(message) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-circle"></i> ${message}</div>`;
    weatherInfo.classList.add('show');
    
    setTimeout(() => {
        if (weatherInfo.innerHTML.includes('error')) {
            weatherInfo.classList.remove('show');
        }
    }, 3000);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
}