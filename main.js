//DOM slelect elements

const time = document.getElementById('time');
const greting = document.getElementById('greting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');

const showAmPm = true;

//Show Time

function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    //Set AM or PM

    const amPm = hour >=12 ? 'PM' : 'AM';

    //12hr format

    hour = hour % 12 || 12;
    
    // Output time

    time.innerHTML = `${hour}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)} ${showAmPm ? amPm : ''}`;
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
    if (hour < 12) {
        //Morning
       document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
       greting.textContent = 'Good Morning';
    } else if (hour < 18) {
        //Afternoon
        document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
       greting.textContent = 'Good Afternoon';
    } else {
        //evening
      document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
      greting.textContent = 'Good Evening';
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
            localStorage.setItem('name', event.target.innerText);
            name.blur();
        }
    }
    else {
        localStorage.setItem('name', event.target.innerText)
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
            localStorage.setItem('focus', event.target.innerText);
            focus.blur();
        }
    }
    else {
        localStorage.setItem('focus', event.target.innerText)
    }
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
//Run baby run

showTime();
setBgGret();
getName();
getFocus();

