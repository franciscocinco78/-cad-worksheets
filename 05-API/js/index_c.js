

const kitchen_lights = $('#kitchen-lights');
const kitchen_lights_icon = $('#kitchen-lights-icon');
const kitchen_lights_time = $('#kitchen-lights-time');
const living_ceiling_lights = $('#living-ceiling-lights'); 
const living_ceiling_lights_icon = $('#living-ceiling-lights-icon');
const living_ceiling_lights_time = $('#living-ceiling-lights-time');
const living_ambient_lights = $('#living-ambient-lights');
const living_ambient_lights_icon = $('#living-ambient-lights-icon');
const living_ambient_lights_time = $('#living-ambient-lights-time');
const living_music = $('#living-music');
const living_music_icon = $('#living-music-icon');
const living_music_time = $('#living-music-time');
const temperature_kitchen = $('#temperature-kitchen');
const temperature_kitchen_value = $('#temperature-value-kitchen');
const temperature_living= $('#temperature-living');
const temperature_living_value = $('#temperature-value-living');
const dateElement = $('#date');
const clockvalue = $('#time');
function clock() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();
  const formattedDate = `${year}/${month}/${day} ${hour}:${minute}:${second}`;
  return formattedDate
}
$(window).on('load', function() {
  localStorage.getItem('kitchen-lights-time') ? kitchen_lights_time.text(localStorage.getItem('kitchen-lights-time')) : kitchen_lights_time.text(clock());
  localStorage.getItem('living-ceiling-lights-time') ? living_ceiling_lights_time.text(localStorage.getItem('living-ceiling-lights-time')) : living_ceiling_lights_time.text(clock());
  localStorage.getItem('living-music-time') ? living_music_time.text(localStorage.getItem('living-music-time')) : living_music_time.text(clock());
  localStorage.getItem('living-ambient-lights-time') ? living_ambient_lights_time.text(localStorage.getItem('living-ambient-lights-time')) : living_ambient_lights_time.text(clock());
  if (localStorage.getItem('kitchen-lights') == 'true'){
    kitchen_lights_icon.css('color', 'yellow');
    kitchen_lights.prop('checked', true);
  }
  if (localStorage.getItem('living-ceiling-lights') == 'true'){
    living_ceiling_lights_icon.css('color', 'yellow');
    living_ceiling_lights.prop('checked', true);
  }
  if (localStorage.getItem('living-ambient-lights') == 'true'){
    living_ambient_lights_icon.css('color', 'yellow');
    living_ambient_lights.prop('checked', true);
  }
  if (localStorage.getItem('living-music') == 'true'){
    living_music_icon.removeClass('fa-music').addClass('fa-volume-xmark').css('color', 'red');
    living_music.prop('checked', true);
  }
})

kitchen_lights.change(() => {

  if(kitchen_lights.is(':checked')) {
    kitchen_lights_icon.css('color', 'yellow');
  } else {
    kitchen_lights_icon.css('color', 'black');
  }
  formattedDate = clock();
  kitchen_lights_time.text(formattedDate);
  localStorage.setItem('kitchen-lights', kitchen_lights.is(':checked'));
  localStorage.setItem('kitchen-lights-time', formattedDate);
})

living_ceiling_lights.change(() => {
  if(living_ceiling_lights.is(':checked')) {
    living_ceiling_lights_icon.css('color', 'yellow');
  } else {
    living_ceiling_lights_icon.css('color', 'black');
  }
  formattedDate = clock();
  living_ceiling_lights_time.text(formattedDate);
  localStorage.setItem('living-ceiling-lights', living_ambient_lights.is(':checked'));
  localStorage.setItem('living-ceiling-lights-time', formattedDate);
})

living_ambient_lights.change(() => {
  if(living_ambient_lights.is(':checked')) {
    living_ambient_lights_icon.css('color', 'yellow');
  } else {
    living_ambient_lights_icon.css('color', 'black');
  }
  formattedDate = clock();
  living_ambient_lights_time.text(formattedDate);
  localStorage.setItem('living-ambient-lights', living_ambient_lights.is(':checked'));
  localStorage.setItem('living-ambient-lights-time', formattedDate);
})

living_music.change(() => {
  if(living_music.is(':checked')){
    living_music_icon.removeClass('fa-music').addClass('fa-volume-xmark').css('color', 'red');
  } else {
    living_music_icon.removeClass('fa-volume-xmark').addClass('fa-music').css('color', 'blue');
  }
  formattedDate = clock();
  living_music_time.text(formattedDate);
  localStorage.setItem('living-music', living_music.is(':checked'));
  localStorage.setItem('living-music-time', formattedDate);
})

setInterval(function() {
  const randomTemperature = Math.floor(Math.random() * 21) + 10;
  temperature_kitchen_value.text(`${randomTemperature}`);
}, 5000);

setInterval(function() {
  const randomTemperature = Math.floor(Math.random() * 21) + 10;
  temperature_living_value.text(`${randomTemperature}`);
}, 5000);

$(window).on('load', function() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${year}/${month}/${day}`;
  dateElement.text(formattedDate);
})

setInterval(function() {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  clockvalue.text(formattedTime);
}, 1000);


$(document).ready(function() {
  let lastFetchTime;
  function fetchWeather() {
    const current_temp = $('#current-temp');
    const max_temp = $('#max-temp');
    const min_temp = $('#min-temp');
    const humidity = $('#humidity');
    const sunrise = $('#sunrise');
    const sunset = $('#sunset');
    const lastUpdate = $('#last-update');

    const city = $('#city-input').val();
    localStorage.setItem('city', city);

    if (city.trim() !== "") {
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=cedf58223ea889a325c281a9a5a62999`,
        dataType: 'json'
      }).done(function(data) {

        current_temp.text(data.main.temp + ' °C');
        max_temp.text(data.main.temp_max + ' °C');
        min_temp.text(data.main.temp_min + ' °C');
        humidity.text(data.main.humidity + ' %');

        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);

        const sunriseHours = sunriseTime.getHours();
        const sunriseMinutes = sunriseTime.getMinutes();
        const sunsetHours = sunsetTime.getHours();
        const sunsetMinutes = sunsetTime.getMinutes();

        const sunriseFormatted = `${sunriseHours}h${sunriseMinutes.toString().padStart(2, '0')}m`;
        const sunsetFormatted = `${sunsetHours}h${sunsetMinutes.toString().padStart(2, '0')}m`;

        sunrise.text(sunriseFormatted);
        sunset.text(sunsetFormatted);

        lastFetchTime = new Date(); 
        updateLastUpdate(lastFetchTime);
      }).fail(function() {
        console.error('Error fetching weather data');
        alert("Could not fetch weather data. Please check the city name.");
      });
    } else {
      alert("Please enter a city name.");
    }
  }


  function updateLastUpdate(fetchTime) {
    const now = new Date();
    const timeDiff = Math.floor((now - fetchTime) / 1000);

    let timeString;

    if (timeDiff < 60) {
      timeString = `${timeDiff} second${timeDiff > 1 ? 's' : ''} ago`;
    } else if (timeDiff < 3600) {
      const minutes = Math.floor(timeDiff / 60);
      timeString = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      const hours = Math.floor(timeDiff / 3600);
      timeString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    $('#last-update').text(`Last Update: ${timeString}`);
  }


  $('#get-weather').click(function() {
    fetchWeather();
  });


  fetchWeather();


  setInterval(function() {
    if (lastFetchTime) { 
      updateLastUpdate(lastFetchTime);
    }
  }, 1000); 
});


