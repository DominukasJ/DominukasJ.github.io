let steps = 0;
let stepInterval;
let batteryInterval;
let simulatedBatteryLevel = 1;
let batteryDepleting = false;

function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('time').textContent = time;
}


function showTime() {
    hideAllContent();
    document.getElementById('time').classList.add('active');
}


function showMessage(text) {
    hideAllContent();
    document.getElementById('message').textContent = text;
    document.getElementById('message').classList.add('active');
}


function startStepCounter() {
    hideAllContent();
    if (stepInterval) clearInterval(stepInterval); 
    stepInterval = setInterval(() => {
        steps += Math.floor(Math.random() * 10) + 1; 
        document.getElementById('message').textContent = `Steps: ${steps}`;
    }, 2000);
    showMessage(`Steps: ${steps}`);
}


function showWeather() {
    hideAllContent();
    const weatherText = document.getElementById('weatherText');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`Precise location: Latitude ${latitude}, Longitude ${longitude}`);
                fetchWeather(latitude, longitude, weatherText);
            },
            (error) => {
                console.warn('Geolocation failed, falling back to IP-based location.');
                fetchWeatherByIP(weatherText);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    } else {
        console.warn('Geolocation not supported, using IP-based fallback.');
        fetchWeatherByIP(weatherText);
    }

    weatherText.classList.add('active');
}


async function fetchWeatherByIP(weatherText) {
    const apiKey = '94ad5fa01e0d4bb6848132738241612';
    const ipGeolocationAPI = 'https://ipapi.co/json/';

    try {
        const locationResponse = await fetch(ipGeolocationAPI);
        if (!locationResponse.ok) throw new Error('Failed to fetch IP location');
        const locationData = await locationResponse.json();

        const { latitude, longitude, city } = locationData;
        console.log(`IP-based location: ${city} (Lat: ${latitude}, Lon: ${longitude})`);

        const weatherResponse = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
        );
        if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');
        const weatherData = await weatherResponse.json();

        const weather = `${weatherData.current.condition.text}, ${weatherData.current.temp_c}°C`;
        weatherText.textContent = `Weather: ${weather}`;
    } catch (error) {
        weatherText.textContent = 'Error fetching weather data.';
        console.error(error);
    }
}


async function fetchWeather(lat, lon, weatherText) {
    const apiKey = '94ad5fa01e0d4bb6848132738241612';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        const weather = `${data.current.condition.text}, ${data.current.temp_c}°C`;
        weatherText.textContent = `Weather: ${weather}`;
    } catch (error) {
        weatherText.textContent = 'Error fetching weather data.';
        console.error(error);
    }
}


async function showBatteryStatus() {
    hideAllContent(true);
    const batteryText = document.getElementById('batteryStatus');

    batteryText.textContent = `Battery: ${Math.round(simulatedBatteryLevel * 100)}%`;
    batteryText.classList.add('active');

    if (!batteryDepleting) {
        batteryDepleting = true;
        startBatteryDepletion();
    }
}


function startBatteryDepletion() {
    const batteryText = document.getElementById('batteryStatus');

    if (batteryInterval) {
        clearInterval(batteryInterval);
    }

    batteryInterval = setInterval(() => {
        simulatedBatteryLevel -= 0.01;
        if (simulatedBatteryLevel < 0) simulatedBatteryLevel = 0;

        localStorage.setItem('batteryLevel', simulatedBatteryLevel);

        batteryText.textContent = `Battery: ${Math.round(simulatedBatteryLevel * 100)}%`;
    }, 1000);
}


function showHeartRate() {
    hideAllContent();
    const heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    const heartRateText = document.getElementById('heartRate');
    heartRateText.textContent = `Heart Rate: ${heartRate} bpm`;
    heartRateText.classList.add('active');
}


function showNotification(message) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000);
}


function showStepHistory() {
    hideAllContent();
    const historyText = document.getElementById('stepHistory');
    historyText.textContent = `Step History: ${steps}`;
    historyText.classList.add('active');
}


function hideAllContent(keepBattery = false) {
    const elementsToHide = ['weatherText', 'batteryStatus', 'heartRate', 'stepHistory', 'message', 'notification', 'time'];
    elementsToHide.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.classList.remove('active');
    });

    if (!keepBattery && batteryInterval) {
        clearInterval(batteryInterval);
        batteryDepleting = false;
    }
}


updateTime();
setInterval(updateTime, 1000);
