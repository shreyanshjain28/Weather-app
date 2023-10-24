import apikey from './config.js';

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');

const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click',() =>  {




    const APIkey = `${apikey}`;
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;
        
       

    fetch(`http://api.weatherapi.com/v1/current.json?key=${APIkey}=${city}&aqi=no`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.current.condition.text) {
                case 'Overcast':
                    image.src = "./images/cloudy.png";
                    break;

                 //not accepting Sunny case    
                case 'Sunny':
                    image.src ="./images/sunny.png";
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = './images/cloud.png';
                    break;

                case 'Haze':
                    image.src = './images/mist.png';
                    break;

                default:
                    image.src = './images/sunny.png';
            }

            temperature.innerHTML = `${parseInt(json.current.temp_c)}<span>°C</span>`;
            description.innerHTML = `${json.location.country}`;
            humidity.innerHTML = `${json.current.humidity}%`;
            wind.innerHTML = `${parseInt(json.current.wind_kph)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});
