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
}

function makeCurrentWeather(currentWeather) {
    const currentConditions = document.getElementById("currentConditions");
    const currentFeelsLike = document.getElementById("currentFeelsLike");
    const currentTemp = document.getElementById("currentTemp");

    currentConditions.textContent = currentWeather.conditions;
    currentFeelsLike.textContent = `Feels like: ${currentWeather.feelslike}`;
    currentTemp.textContent = `Temp: ${currentWeather.temp}`;
}

function makeHourCard(hour) {
    const card = document.createElement("div");

    //create elements
    const time = document.createElement("p");
    const condition = document.createElement("p");
    const temp = document.createElement("p");
    const feelsLike = document.createElement("p");
    const precipProb = document.createElement("p");

    //updates elements
    condition.textContent = `${hour.conditions}`;
    temp.textContent = `Temp: ${hour.temp}`;
    feelsLike.textContent = `Feels like: ${hour.feelslike}`;
    precipProb.textContent = `Rain chance: ${hour.precipprob}`;

    //convert from 24 hours time to 12 hour time
    let datetime = hour.datetime.substring(0, 2);
    let finalTimeString = "AM";
    datetime = parseInt(datetime);
    if (datetime >= 12) {
        finalTimeString = "PM";
        datetime -= 12;
    }
    //updates it to not say '0 pm'
    if (datetime == 0) {
        datetime = 12;
    }
    finalTimeString = `${datetime} ${finalTimeString}`;
    time.textContent = finalTimeString;

    //adds elements to card
    card.appendChild(time);
    card.appendChild(condition);
    card.appendChild(temp);
    card.appendChild(feelsLike);
    card.appendChild(precipProb);

    const hours = document.getElementById("hourly");
    hours.appendChild(card);
}

function makeDayCard(day) {
    const card = document.createElement("div");

    //create elements
    const date = document.createElement("p");
    const condition = document.createElement("p");
    const feelslike = document.createElement("p");
    const temp = document.createElement("p");
    const tempMin = document.createElement("p");
    const tempMax = document.createElement("p");
    const precipProb = document.createElement("p");

    //add text
    date.textContent = day.datetime;
    condition.textContent = day.conditions;
    feelslike.textContent = day.feelslike;
    temp.textContent = day.temp;
    tempMin.textContent = day.tempmin;
    tempMax.textContent = day.tempmax;
    precipProb.textContent = day.precipprob;

    //add elements to card
    card.appendChild(date);
    card.appendChild(condition);
    card.appendChild(feelslike);
    card.appendChild(temp);
    card.appendChild(tempMin);
    card.appendChild(tempMax);
    card.appendChild(precipProb);

    const days = document.getElementById("daily");
    days.appendChild(card);
}


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
})