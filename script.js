// IMPORTANT: Replace 'YOUR_API_KEY' with the key you got from OpenWeatherMap
const apiKey = '106e8e726a6ba5415924dce15ac38c92';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

// ... we will add more element selectors here later

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            // If the city is not found or another error occurs
            throw new Error('City not found. Please try again.');
        }

        const data = await response.json();
        displayWeather(data); // We will create this function next
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.classList.add('hidden');
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

// ... after the other selectors
const cityNameEl = document.getElementById('cityName');
const weatherIconEl = document.getElementById('weatherIcon');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

function displayWeather(data) {
    // The API returns data in a specific structure.
    // We access it like this:
    const { name, main, weather, wind } = data;
    const iconCode = weather[0].icon;

    cityNameEl.textContent = name;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    temperatureEl.textContent = `Temperature: ${Math.round(main.temp)}°C`;
    descriptionEl.textContent = `Description: ${weather[0].description}`;
    humidityEl.textContent = `Humidity: ${main.humidity}%`;
    windEl.textContent = `Wind Speed: ${wind.speed} m/s`;
}