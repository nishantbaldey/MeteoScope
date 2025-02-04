const weatherApiKey = '41d5fb56cbb54ce6812164847250302';
const weatherUrl = 'http://api.weatherapi.com/v1';

let isCelsius = true;

// Function to get current location
function getCurrentLocation() {
    const currentButton = document.querySelector('.current');
    if (currentButton) {
        currentButton.textContent = 'Getting Location...';
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherAndForecast(position.coords.latitude, position.coords.longitude);
                if (currentButton) {
                    currentButton.textContent = 'Current Location';
                }
            },
            (error) => {
                handleGeolocationError(error);
                if (currentButton) {
                    currentButton.textContent = 'Current Location';
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        alert('Geolocation is not supported by your browser');
        if (currentButton) {
            currentButton.textContent = 'Current Location';
        }
    }
}

// Function to handle geolocation errors
function handleGeolocationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Location access denied. Please enable location services to use this feature.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information unavailable. Please try again later.");
            break;
        case error.TIMEOUT:
            alert("Location request timed out. Please try again.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred. Please try again.");
            break;
    }
}

// Function to fetch both current weather and forecast
async function fetchWeatherAndForecast(lat, lon) {
    try {
        const response = await axios.get(`${weatherUrl}/forecast.json`, {
            params: {
                key: weatherApiKey,
                q: `${lat},${lon}`,
                days: 5,
                aqi: 'yes'
            }
        });
        
        updateWeather(response.data);
        updateForecast(response.data.forecast.forecastday);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again later.');
    }
}

// Function to fetch weather by location name
async function fetchWeatherByLocation(location) {
    try {
        const response = await axios.get(`${weatherUrl}/forecast.json`, {
            params: {
                key: weatherApiKey,
                q: location,
                days: 5,
                aqi: 'yes'
            }
        });
        
        updateWeather(response.data);
        updateForecast(response.data.forecast.forecastday);
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch weather data. Please check the location name and try again.');
    }
}

// Function to update current weather
function updateWeather(data) {
    try {
        const elements = {
            city: document.querySelector('.city'),
            temp: document.querySelector('.temp'),
            humidity: document.querySelector('.humidity'),
            wind: document.querySelector('.wind'),
            weatherIcon: document.querySelector('.weather-icon img'),
            pressure: document.querySelector('.pressure'),
            visibility: document.querySelector('.visibility'),
            feels: document.querySelector('.feels-like'),
            condition: document.querySelector('.condition'),
            date: document.querySelector('.date'),
            location: document.querySelector('.location'),
            prep: document.querySelector('.prep')
        };

        // Update the elements that exist
        if (elements.city) {
            elements.city.textContent = `${data.location.name}, ${data.location.country}`;
        }
        if (elements.temp) {
            elements.temp.textContent = isCelsius ? 
                `${Math.round(data.current.temp_c)}°C` : 
                `${Math.round(data.current.temp_f)}°F`;
        }
        if (elements.humidity) {
            elements.humidity.textContent = `${data.current.humidity}`;
        }
        if (elements.wind) {
            elements.wind.textContent = `${data.current.wind_kph}`;
        }
        if (elements.prep) {
            elements.prep.textContent = `${data.current.precip_mm}`;
        }
        if (elements.pressure) {
            elements.pressure.textContent = `${data.current.pressure_mb}`;
        }
        if (elements.visibility) {
            elements.visibility.textContent = `${data.current.vis_km}`;
        }
        if (elements.feels) {
            elements.feels.textContent = isCelsius ? 
                `${Math.round(data.current.feelslike_c)}°C` : 
                `${Math.round(data.current.feelslike_f)}°F`;
        }
        if (elements.condition) {
            elements.condition.textContent = data.current.condition.text;
        }
        if (elements.weatherIcon) {
            elements.weatherIcon.src = `https:${data.current.condition.icon}`;
            elements.weatherIcon.alt = data.current.condition.text;
        }
        if (elements.date) {
            const currentDate = new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            elements.date.textContent = currentDate;
        }
        if (elements.location) {
            elements.location.textContent = `${data.location.name}, ${data.location.country}`;
        }

    } catch (error) {
        console.error('Error updating weather display:', error);
    }
}

// Function to update forecast
function updateForecast(forecastData) {
    const forecastItems = document.querySelectorAll('.forecast-item');
    
    forecastItems.forEach((item, index) => {
        if (index < forecastData.length) {
            const day = forecastData[index];
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = isCelsius ? 
                `${Math.round(day.day.avgtemp_c)}°C` : 
                `${Math.round(day.day.avgtemp_f)}°F`;

            const icon = item.querySelector('.forecast-icon');
            const tempElement = item.querySelector('.forecast-temp');
            const dayElement = item.querySelector('.forecast-day');
            const conditionElement = item.querySelector('.forecast-condition');

            icon.src = `https:${day.day.condition.icon}`;
            icon.alt = day.day.condition.text;
            tempElement.textContent = temp;
            dayElement.textContent = dayName;
            conditionElement.textContent = day.day.condition.text;
        }
    });
}

// Function to initialize the weather app
function initializeWeatherApp() {
    const tempElement = document.querySelector('.temp');
    if (tempElement) {
        tempElement.textContent = 'Loading...';
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherAndForecast(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.log('Geolocation error:', error.message);
                fetchWeatherByLocation('Delhi');
                if (error.code === error.PERMISSION_DENIED) {
                    alert("Location access denied. Showing weather for Delhi instead.");
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        console.log('Geolocation not supported');
        fetchWeatherByLocation('Delhi');
        alert('Geolocation is not supported by your browser. Showing weather for Delhi instead.');
    }
}

// Set up event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with current location
    initializeWeatherApp();
    
    // Set up current location button
    const currentLocationBtn = document.querySelector('.current');
    if (currentLocationBtn) {
        currentLocationBtn.addEventListener('click', getCurrentLocation);
    }

    // Set up search functionality
    const searchButton = document.querySelector('.searching');
    const searchInput = document.querySelector('.search-input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const location = searchInput.value.trim();
            if (location) {
                fetchWeatherByLocation(location);
            } else {
                alert('Please enter a location.');
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const location = searchInput.value.trim();
                if (location) {
                    fetchWeatherByLocation(location);
                } else {
                    alert('Please enter a location.');
                }
            }
        });
    }

    // Set up temperature unit toggle
    const toggleUnitButton = document.querySelector('.toggle-unit');
    
    if (toggleUnitButton) {
        toggleUnitButton.addEventListener('click', () => {
            isCelsius = !isCelsius;
            console.log("Temperature unit toggled. isCelsius:", isCelsius);

            const cityElement = document.querySelector('.city');
            console.log("cityElement:", cityElement);
            if (cityElement) {
                console.log("cityElement.textContent:", cityElement.textContent);
            }

            if (cityElement && cityElement.textContent) {
                const location = cityElement.textContent.split(',')[0];
                console.log("Fetching weather for location:", location);
                fetchWeatherByLocation(location).then(() => {
                    console.log("Weather data updated");
                }).catch(error => {
                    console.error('Error fetching weather:', error);
                });
            }
        });
    }
});
