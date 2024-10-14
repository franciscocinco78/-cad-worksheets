var app = (function () {
    'use strict';
    // Your code goes here!
    alert('Hello World!');

    const dateElement = $('#bedroom-datetime');

    const Ktchn = $('#kitchen-lights');
    Ktchn.on('click', function () {
        const icon = $('#kitchen-light-icon');
        if (Ktchn.is(':checked')) {
            icon.css('color', 'orange');
        } else {
            icon.css('color', 'black');
        }
    });

    const btnLvRoom1 = $('#living-room-ceiling-lights');
    btnLvRoom1.on('click', function () {
        const icon = $('#living-room-ceiling-lights-icon');
        if (btnLvRoom1.is(':checked')) {
            icon.css('color', 'orange');
        } else {
            icon.css('color', 'black');
        }
    });

    const btnLvRoom2 = $('#living-room-ambient-lights-btn');
    btnLvRoom2.on('click', function () {
        const icon = $('#living-room-ambient-lights-icon');
        if (btnLvRoom2.is(':checked')) {
            icon.css('color', 'orange');
        } else {
            icon.css('color', 'black');
        }
    });

    const btnLvRoom3 = $('#living-room-ambient-music-btn');
    btnLvRoom3.on('click', function () {
        const icon = $('#living-room-ambient-music-icon');
        if (btnLvRoom3.is(':checked')) {
            icon.removeClass('fa-volume-xmark').addClass('fa-music').css('color', 'blue');
        } else {
            icon.removeClass('fa-music').addClass('fa-volume-xmark').css('color', 'red');
        }
    });

    setInterval(function () {
        const kitchenTemp = $('#kitchen-temperature');
        const randomTemp = (Math.random() * 20 + 10).toFixed(1); // Generates a random temperature between 10 and 30
        kitchenTemp.text(`${randomTemp}°C`);
    }, 5000);

    setInterval(function () {
        const livingRoomTemp = $('#living-room-temperature');
        const randomTemp = (Math.random() * 20 + 10).toFixed(1); // Generates a random temperature between 10 and 30
        livingRoomTemp.text(`${randomTemp}°C`);
    }, 5000);

    $(window).on('load', function () {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const formattedDate = `${year}/${month}/${day}`;
        dateElement.text(formattedDate);
    });

    function updateBedroomTime() {
        const hours = $('#bedroom-time');
        console.log(hours);
        const d = new Date();
        const hour = d.getHours();
        const minute = d.getMinutes();
        const second = d.getSeconds();
        const formattedDate = `${hour}:${minute}:${second}`;
        
        hours.text(formattedDate);
    }
    
    // Run immediately when the page loads
    updateBedroomTime();

    // Update every second
    setInterval(updateBedroomTime, 1000);

})();
