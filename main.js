//DOM slelect elements

const time = document.getElementById('time');
const greting = document.getElementById('greting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const date = document.getElementById('date');
const btn = document.body.querySelector('.btn');

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const button = document.getElementById('btn');

const showAmPm = true;

const dayWeek = ['Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const monthNumber = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const baseUrl = "./images/all/";
const images = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', 
                '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg'];

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const windSpeed = document.body.querySelector('.wind-speed');

const resetButton = document.getElementById('reset');
//Show Time

function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let dayNumber = today.getDay();
    let day = today.getDate();
    let month = today.getMonth();

    //Set AM or PM

    //const amPm = hour >=12 ? 'PM' : 'AM';

    //12hr format

    //hour = hour % 12 || 12;
    
    // Output time

    time.innerHTML = `${hour}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)}`;
    date.innerHTML = `${dayWeek[dayNumber]}<span>, <span>${day} ${monthNumber[month]}`;
    setTimeout(showTime, 1000);
    
}

//Add zero
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set background and Greeting

function setBgGret() {
    let today = new Date();
    let hour = today.getHours();
    let bgUrl = baseUrl + images[hour];
    document.body.style.backgroundImage = `url(${bgUrl})`;

    if (6 <= hour && hour < 12) {
        //Morning
       greting.textContent = 'Good Morning, ';
    } else if (12 <= hour && hour < 18) {
        //Afternoon
       greting.textContent = 'Good Afternoon, ';
    } else if (18 <= hour && hour < 24) {
        //evening
      greting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
    } else {
        greting.textContent = 'Good Night, ';
        document.body.style.color = 'white';
    }   
}

//getName
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

//setName
function setName(event) {
    if (event.type === "keypress") {
        //Make sure "Enter" is pressed
        if(event.which == 13 || event.keyCode == 13) {
            event.target.innerText === '' ? 
                getName() :
                localStorage.setItem('name', event.target.innerText);
            name.blur();
        }
    }
    else {
        event.target.innerText === '' ? 
            getName() :
            localStorage.setItem('name', event.target.innerText);
    }
}

//getFocus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

//setFocus
function setFocus(event) {
    if (event.type === "keypress") {
        //Make sure "Enter" is pressed
        if(event.which == 13 || event.keyCode == 13) {
            event.target.innerText === '' ? 
                getFocus() :
                localStorage.setItem('focus', event.target.innerText);
            focus.blur();
        }
    }
    else {
        event.target.innerText === '' ? 
            getFocus() :
            localStorage.setItem('focus', event.target.innerText)
    }   
}

function clickName(event) {
    event.target.innerText = ''; 
}


function reloadImagewithClosure() {
    let today = new Date();
    let hour = today.getHours();
    return () => {
    hour = hour + 1;
    if (hour > 23) hour = hour - 24;
    let bgUrl = baseUrl + images[hour];
    document.body.style.backgroundImage = `url(${bgUrl})`;
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
    }
}

const reloadImage = reloadImagewithClosure();

//Run 
showTime();
setBgGret();
getName();
getFocus();

name.addEventListener('click', clickName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clickName);
btn.addEventListener('click', reloadImage);

async function getQuote() {  
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const res = await fetch(url);
    const data = await res.json(); 
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);
button.addEventListener('click', getQuote);

let iconClass;
async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    iconClass = `owf-${data.weather[0].id}`;
    weatherIcon.classList.add(iconClass);
    temperature.textContent = `${data.main.temp}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed}m/sec`;
}

function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = '[Enter You City For Wheather Forecast]';
    } else {
        city.textContent = localStorage.getItem('city');
        getWeather();
    }
}

function setCity(event) {
    if (event.type === "keypress") {
        //Make sure "Enter" is pressed
        if(event.which == 13 || event.keyCode == 13) {
            if (event.target.innerText === '' ) {getCity()}
                else {
                    localStorage.setItem('city', event.target.innerText);
                    getWeather();
                }
            city.blur();
        }
    }
    else {
        if (event.target.innerText === '') {getCity()}
            else {
                localStorage.setItem('city', event.target.innerText);
                getWeather();
            }
    }
}

function clickCity(event) {
    event.target.innerText = ''; 
}

document.addEventListener('DOMContentLoaded', getCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', clickCity);

resetButton.addEventListener('click', () => {
    localStorage.removeItem('name');
    localStorage.removeItem('focus');
    localStorage.removeItem('city');
    getName();
    getFocus();
    getCity();
    temperature.textContent = '';
    humidity.textContent = '';
    windSpeed.textContent = '';
    weatherIcon.classList.remove(iconClass);
})