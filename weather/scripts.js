async function getWeatherData() {
    const location = document.getElementById("location").value;

    // the api key is stored in the github repo because it is the free tier of an api,
    // and does not have a server on which to store the key instead.
    //
    // the fact that this not something to be done for an actual app is understood.
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?
unitGroup=us
&include=hours,current
&key=YD8RBSXR64NVLSLFQRXFHDM4Y
&contentType=json`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            makeCurrentWeather(response.currentConditions);

            const hours = response.days[0].hours;
            for (let i = 0; i < hours.length; i++) {
                makeHourCard(hours[i]);
            }

            const days = response.days;
            for (let i = 0; i < days.length; i++) {
                makeDayCard(days[i]);
            }
        });
};

function makeCurrentWeather(currentWeather) {
    const card = document.getElementById("currentCard");
    card.setAttribute("class", "currentCard");
    
    const currentConditions = document.getElementById("currentConditions");
    const currentTemp = document.getElementById("currentTemp");

    currentConditions.textContent = `It is currently: ${currentWeather.conditions}`;
    currentTemp.textContent = `It is: ${currentWeather.temp}°F, but feels like: ${currentWeather.feelslike}°F`;

    
};

function makeHourCard(hour) {
    const card = document.createElement("div");
    card.setAttribute("class", "hourCard");

    //create elements
    const time = document.createElement("h3");
    const condition = document.createElement("p");
    const temp = document.createElement("p");
    const feelsLike = document.createElement("p");
    const precipProb = document.createElement("p");

    //updates elements
    condition.textContent = `${hour.conditions}`;
    temp.textContent = `Is: ${hour.temp}°F`;
    feelsLike.textContent = `Feels like: ${hour.feelslike}°F`;
    precipProb.textContent = `Rain chance: ${hour.precipprob}`;

    //convert from 24 hours time to 12 hour time
    function formateTime(datetime) {
        let hour = datetime.substring(0, 2);
        let finalTimeString = "AM";
        hour = parseInt(hour);
        if (hour >= 12) {
            finalTimeString = "PM";
            hour -= 12;
        }
        //updates it to not say '0 pm'
        if (hour == 0) {
            hour = 12;
        }
        finalTimeString = `${hour} ${finalTimeString}`;
        return finalTimeString;
    };
    time.textContent = formateTime(hour.datetime);

    //adds elements to card
    const body = document.createElement("div");
    body.setAttribute("class", "body");

    const leftCol = document.createElement("div");
    leftCol.setAttribute("class", "leftCol");
    const rightCol = document.createElement("div");
    rightCol.setAttribute("class", "rightCol");

    leftCol.appendChild(condition);
    leftCol.appendChild(precipProb);

    rightCol.appendChild(feelsLike);
    rightCol.appendChild(temp);

    body.appendChild(leftCol);
    body.appendChild(rightCol);

    card.appendChild(time);
    card.appendChild(body);

    const hours = document.getElementById("hourly");
    hours.appendChild(card);
};

function makeDayCard(day) {
    const card = document.createElement("div");
    card.setAttribute("class", "dayCard");

    //create elements
    const date = document.createElement("h3");
    const condition = document.createElement("p");
    const temp = document.createElement("p");
    const tempRange = document.createElement("p");
    const precipProb = document.createElement("p");

    //add text
    condition.textContent = `Today is: ${day.conditions}`;
    temp.textContent = `It is: ${day.temp}°F, but feels like: ${day.feelslike}°F`;
    tempRange.textContent = `The temperature minimum is: ${day.tempmin}, and the max is ${day.tempmax}`;
    precipProb.textContent = `The chance of rain is ${day.precipprob}`;

    function formateDate(datetime) {
        let dayValue = datetime.substring(8, 10);
        let monthValue = datetime.substring(5, 7);
        if (dayValue[0] == 0) {
            dayValue = dayValue.substring(1, 2);
        }
        if (monthValue[0] == 0) {
            monthValue = monthValue.substring(1, 2);
        }
        return (`${monthValue}/${dayValue}`)
    };
    date.textContent = formateDate(day.datetime);

    //add elements to card
    const body = document.createElement("div");
    body.setAttribute("class", "body");

    const leftCol = document.createElement("div");
    leftCol.setAttribute("class", "leftCol");
    const rightCol = document.createElement("div");
    rightCol.setAttribute("class", "rightCol");

    leftCol.appendChild(condition);
    leftCol.appendChild(precipProb);

    rightCol.appendChild(temp);
    rightCol.appendChild(tempRange);

    body.appendChild(leftCol);
    body.appendChild(rightCol);

    card.appendChild(date);
    card.appendChild(body);

    const days = document.getElementById("daily");
    days.appendChild(card);
};


const locationButton = document.getElementById("locationButton");
locationButton.addEventListener("click", () => {
    //clear old cards
    const hours = document.getElementById("hourly");
    while (hours.hasChildNodes()) {
        hours.removeChild(hours.lastChild);
    }

    const days = document.getElementById("daily");
    while (days.hasChildNodes()) {
        days.removeChild(days.lastChild);
    }

    getWeatherData();
    showHeaders();
})


function showHeaders() {
    const headers = document.querySelectorAll("h2");
    for(let i=0; i<headers.length; i++){
        const header = headers[i];
        header.setAttribute("class", "");
    }
}