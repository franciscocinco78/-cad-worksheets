const kitchen_lights = document.getElementById('kitchen-lights');
const kitchen_lights_icon = document.getElementById('kitchen-lights-icon');
const living_ceiling_lights = document.getElementById('living-ceiling-lights'); 
const living_ceiling_lights_icon = document.getElementById('living-ceiling-lights-icon');
const living_ambient_lights = document.getElementById('ambient-ceiling-lights');
const living_ambient_lights_icon = document.getElementById('ambient-ceiling-lights-icon');
const living_music = document.getElementById('living-music');
const living_music_icon = document.getElementById('living-music-icon');
const temperature_kitchen = document.getElementById('temperature-kitchen');
const temperature_kitchen_value = document.getElementById('temperature-value-kitchen');
const temperature_living= document.getElementById('temperature-living');
const temperature_living_value = document.getElementById('temperature-value-living');
const dateElement = document.getElementById('date');
const clockvalue = document.getElementById('time');

// Add an event listener to the toggle switch
kitchen_lights.addEventListener('change', () => {
  // Toggle the switch on or off
  if (kitchen_lights.checked) {
    kitchen_lights_icon.style.color = 'yellow';
  } else {
    kitchen_lights_icon.style.color = 'black';
  }
});

living_ceiling_lights.addEventListener('change', () => {
  // Toggle the switch on or off
  if (living_ceiling_lights.checked) {
    living_ceiling_lights_icon.style.color = 'yellow';
  } else {
    living_ceiling_lights_icon.style.color = 'black';
  }
});

living_ambient_lights.addEventListener('change', () => {
  // Toggle the switch on or off
  if (living_ambient_lights.checked) {
    living_ambient_lights_icon.style.color = 'yellow';
  } else {
    living_ambient_lights_icon.style.color = 'black';
  }
})

living_music.addEventListener('change', () => {
  // Toggle the switch on or off
  if (living_music.checked) {
    living_music_icon.classList.remove('fa-music');
    living_music_icon.classList.add('fa-volume-xmark');

    living_music_icon.style.color = 'red';
  } else {
    living_music_icon.classList.remove('fa-volume-xmark');
    living_music_icon.classList.add('fa-music');
    living_music_icon.style.color = 'blue';
  }
})


setInterval(function() {
  const randomTemperature = Math.floor(Math.random() * 21) + 10; 
  temperature_kitchen_value.textContent = `${randomTemperature}`;
}, 5000);

setInterval(function() {
  const randomTemperature = Math.floor(Math.random() * 21) + 10; 
  temperature_living_value.textContent = `${randomTemperature}`;
}, 5000);


window.onload = function() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();
  const formattedDate = `${year}/${month}/${day}`;
  dateElement.textContent = formattedDate;
};

setInterval(function() {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  clockvalue.textContent = formattedTime;
}, 1000);