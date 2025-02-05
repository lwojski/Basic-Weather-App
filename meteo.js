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

async function fetchWeather(ville) {
    const apiKey = await fetchAPIKey()
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&lang=fr&appid=${apiKey}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        document.querySelector('.temperature').textContent = `${data.main.temp.toFixed(0)}°C`
        document.getElementById('city').textContent = ville;
        document.getElementById('description').textContent = data.weather[0].description
        document.getElementById('feels_like').textContent = `${data.main.feels_like.toFixed(0)}°C`
        document.getElementById('humidity').textContent = `${data.main.humidity}%`
    
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