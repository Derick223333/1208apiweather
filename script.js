const apiKey = '576a63ff0ce5460bab350212241410';
const getWeatherButton = document.getElementById('getWeather');

getWeatherButton.addEventListener('click', () => {
    const location = document.getElementById('location').value;
    fetchWeather(location);
});

function fetchWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&lang=ko`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            document.getElementById('weatherResult').innerText = '날씨 정보를 가져오는 데 실패했습니다.';
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    if (data.error) {
        document.getElementById('weatherResult').innerText = '해당 도시의 날씨 정보를 찾을 수 없습니다.';
        return;
    }

    const weatherInfo = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>온도: ${data.current.temp_c}°C</p>
        <p>상태: ${data.current.condition.text}</p>
        <p>습도: ${data.current.humidity}%</p>
        <p>바람: ${data.current.wind_kph} km/h</p>
    `;
    document.getElementById('weatherResult').innerHTML = weatherInfo;
}
