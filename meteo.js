async function fetchConfig() {
    const response = await fetch('conf.json')
    const config = await response.json()
    return config.ville
}

async function fetchAPIKey() {
    const response = await fetch('secretconfig.json')
    const config = await response.json()
    return config.apiKey
}

function updateBackground(temp) {
    const widget = document.querySelector('.widget');
    
    if (temp < 10) {
        widget.style.background = 'linear-gradient(to right,rgb(171, 205, 245),rgb(120, 164, 245))';
    } else if (temp < 20) {
        widget.style.background = 'linear-gradient(to right,rgb(70, 192, 233),rgb(10, 108, 236))';
    } else {
        widget.style.background = 'linear-gradient(to right,rgb(240, 182, 131),rgb(250, 201, 55))';
    }
}

async function fetchWeather(ville) {
    const apiKey = await fetchAPIKey()
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&lang=fr&appid=${apiKey}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.querySelector('.temperature').textContent = `${data.main.temp.toFixed(0)}°C`
        document.getElementById('city').textContent = ville;
        document.getElementById('description').textContent = data.weather[0].description
        document.getElementById('feels_like').textContent = `${data.main.feels_like.toFixed(0)}°C`
        document.getElementById('humidity').textContent = `${data.main.humidity}%`

        updateBackground(data.main.temp)
    
    } catch (error) {
        console.error('Erreur lors de la récupération des données météo', error)
    }
}

async function updateWeather() {
    const ville = await fetchConfig()
    fetchWeather(ville)
}

updateWeather()
setInterval(updateWeather, 3600000)