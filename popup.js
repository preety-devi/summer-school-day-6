document.querySelector('#getWeatherBtn').addEventListener('click', () => { 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeather, showError);
  } else {
    document.querySelector('#weatherResult').innerHTML = "Geolocation is not supported.";
  }
});

function fetchWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = 'f406023ed459149da897763c5617ad2b'; // replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const city = data.name;
      const condition = data.weather[0].description;
      document.querySelector('#weatherResult').innerHTML = 
        `<strong>${city}</strong><br>Temperature: ${temp}°C<br>Condition: ${condition}`;
    })
    .catch(() => {
      document.querySelector('#weatherResult').innerHTML = "Failed to fetch weather data.";
    });
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      document.querySelector('#weatherResult').innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.querySelector('#weatherResult').innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      document.querySelector('#weatherResult').innerHTML = "The request to get user location timed out.";
      break;
    default:
      document.querySelector('#weatherResult').innerHTML = "An unknown error occurred.";
      break;
  }
}
