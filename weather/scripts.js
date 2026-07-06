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
        .then(function(response) {
            console.log(response);
        }
        );
}


const locationButton = document.getElementById("locationButton");
locationButton.addEventListener("click", () => {
    getWeatherData();
})