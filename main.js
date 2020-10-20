//DOM slelect elements

const time = document.getElementById('time');
const greting = document.getElementById('greting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const date = document.getElementById('date');

const showAmPm = true;

const dayWeek = ['Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const monthNumber = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
    
    if (6 < hour && hour < 12) {
        //Morning
       document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
       greting.textContent = 'Good Morning';
    } else if (12 < hour && hour < 18) {
        //Afternoon
        document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
       greting.textContent = 'Good Afternoon';
    } else if (12 < hour && hour < 24) {
        //evening
      document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
      greting.textContent = 'Good Evening';
        document.body.style.color = 'white';
    } else {
        document.body.style.backgroundImage = "url('https://cf.bstatic.com/images/hotel/max1024x768/140/140829170.jpg')";
        greting.textContent = 'Good Night';
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


name.addEventListener('click', clickName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clickName);
//Run baby run

showTime();
setBgGret();
getName();
getFocus();

