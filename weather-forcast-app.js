

// function to map and showcase information layout elements
function ShowForecastInfo(ForecastInfo) {
    const targetBox = document.getElementById("forecast-Days-box");
    targetBox.hidden = false;
    
    // reset animation classes cleanly to let it replay
    targetBox.classList.remove("forecast-card-entry");
    void targetBox.offsetWidth; 
    targetBox.classList.add("forecast-card-entry");

    let pName = ForecastInfo.location["name"];
    let pRegion = ForecastInfo.location["region"];
    let pCountry = ForecastInfo.location["country"];

    document.getElementById("forecastPlaceName").innerHTML = `Forecast for: ${pName}, ${pRegion}, ${pCountry}`;

    const daysArray = ForecastInfo.forecast.forecastday;

    // loop over structural days arrays elements to assign text mapping arrays properties
    for (let i = 0; i < 3; i++) {
        if (daysArray[i]) {
            let dayData = daysArray[i];
            let date = dayData.date;
            let condition = dayData.day.condition["text"];
            let iconUrl = dayData.day.condition["icon"];
            let maxTempC = dayData.day["maxtemp_c"];
            let minTempC = dayData.day["mintemp_c"];
            let maxTempF = dayData.day["maxtemp_f"];
            let minTempF = dayData.day["mintemp_f"];
            let humidity = dayData.day["avghumidity"];
            let wind = dayData.day["maxwind_kph"];

            let dayNum = i + 1;

            //for 4 space &emsp;
            //for 2 space &ensp;
            //for 1 space &nbsp;
            
            document.getElementById(`day${dayNum}Date`).innerHTML = `${date}`;
            document.getElementById(`day${dayNum}Condition`).innerHTML = `<span>Condition -: ${condition}</span> <img class="forecast-weatherIcon" src="https:${iconUrl}" alt="Weather Icon">`;
            document.getElementById(`day${dayNum}Temp`).innerHTML = `Temp -: Max ${maxTempC}\u00B0C (${maxTempF}\u00B0F) <br> &emsp;&emsp;&emsp;&nbsp; Min ${minTempC}\u00B0C (${minTempF}\u00B0F)`;
            document.getElementById(`day${dayNum}Humidity`).innerHTML = `Humidity -: ${humidity}%`;
            document.getElementById(`day${dayNum}Wind`).innerHTML = `Max Wind -: ${wind} Km/H`;
        }
    }
}

function backbuttonclick(){
    const targetBox = document.getElementById("forecast-Days-box");
    
    // applying exit animation class before page transitions
    if (targetBox && !targetBox.hidden) {
        targetBox.classList.remove("forecast-card-entry");
        targetBox.classList.add("forecast-card-exit");
    }

    setTimeout(function() {
            window.history.back();
        }, 400);
}
document.getElementById("backHomeButton").addEventListener("click",backbuttonclick);
