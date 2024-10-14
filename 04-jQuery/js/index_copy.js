var app = (function () { 
  const kitchen_lights = $('#kitchen-lights');
  const kitchen_lights_icon = $('#kitchen-lights-icon');
  const living_ceiling_lights = $('#living-ceiling-lights'); 
  const living_ceiling_lights_icon = $('#living-ceiling-lights-icon');
  const living_ambient_lights = $('#ambient-ceiling-lights');
  const living_ambient_lights_icon = $('#ambient-ceiling-lights-icon');
  const living_music = $('#living-music');
  const living_music_icon = $('#living-music-icon');
  const temperature_kitchen = $('#temperature-kitchen');
  const temperature_kitchen_value = $('#temperature-value-kitchen');
  const temperature_living= $('#temperature-living');
  const temperature_living_value = $('#temperature-value-living');
  const dateElement = $('#date');
  const clockvalue = $('#time');
 

  kitchen_lights.change(() => {
    if(kitchen_lights.is(':checked')) {
      kitchen_lights_icon.css('color', 'yellow');
    } else {
      kitchen_lights_icon.css('color', 'black');
    }
  })

  living_ceiling_lights.change(() => {
    if(living_ceiling_lights.is(':checked')) {
      living_ceiling_lights_icon.css('color', 'yellow');
    } else {
      living_ceiling_lights_icon.css('color', 'black');
    }
  })

  living_ambient_lights.change(() => {
    if(living_ambient_lights.is(':checked')) {
      living_ambient_lights_icon.css('color', 'yellow');
    } else {
      living_ambient_lights_icon.css('color', 'black');
    }
  })

  living_music.change(() => {
    if(living_music.is(':checked')){
      living_music_icon.removeClass('fa-music').addClass('fa-volume-xmark').css('color', 'red');
    } else {
      living_music_icon.removeClass('fa-volume-xmark').addClass('fa-music').css('color', 'blue');
    }
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

})();
$(document).ready(function() {
  let lastFetchTime; // Variable to store the last fetch time

  // Function to fetch weather data
  function fetchWeather() {
    const current_temp = $('#current-temp');
    const max_temp = $('#max-temp');
    const min_temp = $('#min-temp');
    const humidity = $('#humidity');
    const sunrise = $('#sunrise');
    const sunset = $('#sunset');
    const lastUpdate = $('#last-update'); // Element to show the last update time

    // Get the value from the city input field
    const city = $('#city-input').val();

    // Check if the input is not empty
    if (city.trim() !== "") {
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=cedf58223ea889a325c281a9a5a62999`,
        dataType: 'json'
      }).done(function(data) {
        console.log(data); // Outputs the weather data to the console

        current_temp.text(data.main.temp + ' °C');
        max_temp.text(data.main.temp_max + ' °C');
        min_temp.text(data.main.temp_min + ' °C');
        humidity.text(data.main.humidity + ' %');

        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);

        // Get hours and minutes
        const sunriseHours = sunriseTime.getHours();
        const sunriseMinutes = sunriseTime.getMinutes();
        const sunsetHours = sunsetTime.getHours();
        const sunsetMinutes = sunsetTime.getMinutes();

        // Format as "10h30m"
        const sunriseFormatted = `${sunriseHours}h${sunriseMinutes.toString().padStart(2, '0')}m`;
        const sunsetFormatted = `${sunsetHours}h${sunsetMinutes.toString().padStart(2, '0')}m`;

        sunrise.text(sunriseFormatted);
        sunset.text(sunsetFormatted);

        // Update the last update time
        lastFetchTime = new Date(); // Store the last fetch time
        updateLastUpdate(lastFetchTime);
      }).fail(function() {
        console.error('Error fetching weather data');
        alert("Could not fetch weather data. Please check the city name.");
      });
    } else {
      alert("Please enter a city name.");
    }
  }

  // Function to update the last update time display
  function updateLastUpdate(fetchTime) {
    const now = new Date();
    const timeDiff = Math.floor((now - fetchTime) / 1000); // Difference in seconds

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

  // Fetch weather data when the button is clicked
  $('#get-weather').click(function() {
    fetchWeather();
  });

  // Automatically fetch weather data on page load
  fetchWeather();

  // Update the last update time every second
  setInterval(function() {
    if (lastFetchTime) { // Only update if lastFetchTime has been set
      updateLastUpdate(lastFetchTime);
    }
  }, 1000); // 1000 milliseconds = 1 second
});


