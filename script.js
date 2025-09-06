// IMPORTANT: Replace 'YOUR_API_KEY' with the key you got from OpenWeatherMap
const apiKey = '106e8e726a6ba5415924dce15ac38c92';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

const cityNameEl = document.getElementById('cityName');
const weatherIconEl = document.getElementById('weatherIcon');
const customVisualEl = document.getElementById('customVisual'); // NEW
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const feelsLikeEl = document.getElementById('feelsLike'); // NEW
const pressureEl = document.getElementById('pressure'); // NEW

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

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('City not found. Please try again.');
        }

        const data = await response.json();
        displayWeather(data);
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.classList.add('hidden');
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const iconCode = weather[0].icon;
    const weatherDescription = weather[0].description.toLowerCase(); // Get description in lowercase

    cityNameEl.textContent = name;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    temperatureEl.textContent = `Temperature: ${Math.round(main.temp)}°C`;
    descriptionEl.textContent = `Description: ${weatherDescription}`; // Display actual description
    humidityEl.textContent = `Humidity: ${main.humidity}%`;
    windEl.textContent = `Wind Speed: ${wind.speed} m/s`;
    feelsLikeEl.textContent = `Feels like: ${Math.round(main.feels_like)}°C`; // NEW
    pressureEl.textContent = `Pressure: ${main.pressure} hPa`; // NEW

    // Call the new function to set the custom visual
    customVisualEl.textContent = getCustomVisual(weatherDescription, main.temp);
}

// NEW FUNCTION: Determine custom visual based on weather description and temperature
function getCustomVisual(description, temperature) {
    if (description.includes('rain') || description.includes('drizzle')) {
        return '🌧️'; // Raining cloud
    } else if (description.includes('snow') || description.includes('sleet')) {
        return '❄️'; // Snowflake
    } else if (description.includes('clear sky')) {
        if (temperature > 25) { // If it's hot and clear
            return '😎'; // Sunglasses
        } else {
            return '☀️'; // Sun
        }
    } else if (description.includes('cloud')) {
        if (description.includes('overcast')) {
            return '☁️'; // Cloud
        } else {
            return '⛅'; // Sun behind cloud
        }
    } else if (description.includes('fog') || description.includes('mist') || description.includes('haze')) {
        return '🌫️'; // Fog
    } else if (description.includes('thunderstorm')) {
        return '⛈️'; // Thunderstorm
    } else if (description.includes('wind')) {
        return '🌬️'; // Wind face
    }
    // Default or fallback emoji
    return '🌍';
}