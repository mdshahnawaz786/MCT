const searchInput = document.getElementById('search_input')
const searchButton = document.getElementById('search_button')
const temperatureCondition = document.getElementById('temp_condition')
const weatherImage = document.getElementById('weather_image')
const temperatureBlock = document.getElementById('temperature');
const windSpeedBlock = document.getElementById('wind_speed');
const humidityBlock = document.getElementById('humidity');
const cloudinessBlock = document.getElementById('cloudiness')
const cityName = document.getElementById('city_name')
const pressureBlock = document.getElementById('pressure')
const visibilityBlock = document.getElementById('visibility')
const countryName = document.getElementById('country')
dateTime = document.getElementById('d_t')

 


init()

function init(){
  addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
      fetchWeather()
    }
  })
  searchButton.addEventListener('click',fetchWeather)
}

async function fetchWeather() {
  const location = searchInput.value;
  const streamResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=af256f4c8b148de4ae4acf38f2413c5e`);
  const textBody = await streamResponse.text();
  const jsonData = JSON.parse(textBody);

    const weatherDescription = jsonData.weather[0].description
    const weatherIcon = jsonData.weather[0].icon
    const temperature = jsonData.main.temp - 273.15
    const humidity = jsonData.main.humidity
    const windSpeed = jsonData.wind.speed
    const cloudiness = jsonData.clouds.all
    const pressure = jsonData.main.pressure
    const visibility = jsonData.visibility / 1000
    const country = jsonData.sys.country
    const name = jsonData.name
    temperatureCondition.innerText = weatherDescription
    weatherImage.setAttribute('src', `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
    temperatureBlock.innerHTML = `${temperature.toFixed(2)}&deg;C`
    cityName.innerText = `${name},`
    windSpeedBlock.innerText = `${windSpeed} km`
    humidityBlock.innerText = `${humidity} %`
    cloudinessBlock.innerText = `${cloudiness} %`
    pressureBlock.innerText = `${pressure} pha`
    visibilityBlock.innerText = `${visibility.toFixed(1)} km`
    countryName.innerText = country
    dateTime.innerText = new Date().toUTCString().slice(5, 16);
}