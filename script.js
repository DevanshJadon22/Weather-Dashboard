// IMPORTANT: Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
const apiKey = '106e8e726a6ba5415924dce15ac38c92';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

const cityNameEl = document.getElementById('cityName');
const weatherIconEl = document.getElementById('weatherIcon');
const customVisualEl = document.getElementById('customVisual');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const feelsLikeEl = document.getElementById('feelsLike');
const pressureEl = document.getElementById('pressure');

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
            document.body.className = ''; // Reset background on error
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
    const weatherDescription = weather[0].description.toLowerCase();

    cityNameEl.textContent = name;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    temperatureEl.textContent = `Temperature: ${Math.round(main.temp)}°C`;
    descriptionEl.textContent = `Description: ${weatherDescription}`;
    humidityEl.textContent = `Humidity: ${main.humidity}%`;
    windEl.textContent = `Wind Speed: ${wind.speed} m/s`;
    feelsLikeEl.textContent = `Feels like: ${Math.round(main.feels_like)}°C`;
    pressureEl.textContent = `Pressure: ${main.pressure} hPa`;

    customVisualEl.textContent = getCustomVisual(weatherDescription, main.temp);
    
    // Update the background based on the weather
    updateBackground(weatherDescription);
}

function getCustomVisual(description, temperature) {
    if (description.includes('rain') || description.includes('drizzle')) return '🌧️';
    if (description.includes('snow') || description.includes('sleet')) return '❄️';
    if (description.includes('clear sky')) return temperature > 25 ? '😎' : '☀️';
    if (description.includes('overcast cloud')) return '☁️';
    if (description.includes('cloud')) return '⛅';
    if (description.includes('fog') || description.includes('mist') || description.includes('haze')) return '🌫️';
    if (description.includes('thunderstorm')) return '⛈️';
    if (description.includes('wind')) return '🌬️';
    return '🌍'; // Default
}

function updateBackground(description) {
    const body = document.body;
    // Reset all weather classes
    body.className = '';

    if (description.includes('rain') || description.includes('drizzle')) {
        body.classList.add('rainy');
    } else if (description.includes('snow') || description.includes('sleet')) {
        body.classList.add('snowy');
    } else if (description.includes('clear sky')) {
        body.classList.add('sunny');
    } else if (description.includes('cloud')) {
        body.classList.add('cloudy');
    } else if (description.includes('thunderstorm')) {
        body.classList.add('stormy');
    } else if (description.includes('fog') || description.includes('mist') || description.includes('haze')) {
        body.classList.add('misty');
    }
}