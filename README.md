# MeteoScope

MeteoScope is a user-friendly weather forecasting web application that provides real-time weather updates, detailed forecasts, and environmental conditions for any location worldwide. With an intuitive UI and accurate weather data, MeteoScope makes it easy to stay informed about the weather around you.

## Features
- *Real-Time Weather Updates:* Get the latest weather conditions based on your location.
- *Search Functionality:* Look up weather details for any city worldwide.
- *5-Day Forecast:* See upcoming weather trends and plan accordingly.
- *Temperature Unit Toggle:* Switch between Celsius and Fahrenheit with a simple click.
- *Weather Details:* Includes temperature, humidity, wind speed, visibility, pressure, and precipitation.
- *Interactive UI:* Clean and responsive design for an optimal user experience.
- *Geolocation Support:* Automatically fetch weather data based on your current position.
- *Error Handling:* Informative messages for geolocation and API request failures.

## Technologies Used
- *Frontend:* HTML, CSS (Flexbox & Grid), JavaScript
- *Styling:* Google Fonts, Font Awesome Icons
- *API:* [WeatherAPI](https://www.weatherapi.com/) for real-time weather data
- *Libraries:* Axios (for API calls)

## How It Works
1. *Current Location Weather:*
   - Click on "Current Location" to fetch weather details based on your GPS position.
   - Uses the browser's Geolocation API.
   - Fetches data from WeatherAPI and updates the UI dynamically.
2. *Search by City Name:*
   - Enter a location in the search bar and click "Search."
   - Fetches and displays weather details for the specified city.
3. *Toggle Temperature Unit:*
   - Click the "°C/°F" button to switch between Celsius and Fahrenheit.
4. *5-Day Forecast:*
   - Displays upcoming weather conditions with icons and temperatures.
   
## API Integration
- *Base URL:* http://api.weatherapi.com/v1
- *Endpoints Used:*
  - /forecast.json?key={API_KEY}&q={location}&days=5&aqi=yes
- *API Key:* Configured inside script.js (Replace with your own API key if needed).

## Installation & Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/nishantbaldey/MeteoScope.git
   ```
2. Navigate to the project folder:
   ```bash
   cd MeteoScope
   ```
3. Open `index.html` in a browser to use the application.