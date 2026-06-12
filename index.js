//importing the API KEY from config.js so we can push the file in github
import config from './config.js';


let input_Place;

const API_KEY= config.API_KEY;

//taking input from user by clicking the search button and taking input from user by pressing enter button
document.getElementById("placeSearchButton").addEventListener("click",SearchButtonPress); //by clicking search button
document.getElementById("inputPlace").addEventListener("keydown",SearchButtonPress);  //by pressing enter key

async function SearchButtonPress(event){
   if(event.type === "click" || event.key === "Enter"){
        const input_Place = document.getElementById("inputPlace").value.trim();
        
        if (!input_Place) {
            alert("Please enter a place name first!");
            return;
        }

        //document.getElementById("WeatherInfoTextbox").hidden = true;

        console.log(`Searching weather for: ${input_Place}`);
        
        const weatherData = await getPlaceWeather(input_Place);
        
        if (weatherData) {
            console.log("Successfully got data:", weatherData);
            ShowWeatherInfo(weatherData);
        }
    }
}



//here fetching the weather api service to get the info about weather
async function getPlaceWeather(place){
    const URL =  `https://api.weatherapi.com/v1/current.json?key=${config.API_KEY}&q=${place}&aqi=yes`;
    try{
        const response = await fetch(URL);

        if(response.status == "400"){ 
            alert("No matching location found. Please enter a valid place or Zipcode.");
              document.getElementById("WeatherInfoTextbox").hidden = true;
        }
        else if(!response.ok){
            throw new Error(`City not found or API error: ${response.status}`);
        }
        else{
            console.log("Response Catched!!!");
        }

        const DATA = await response.json();
        console.log(DATA);

        return DATA;
    }
    catch(error){
        console.error("Error in fetching weather data:", error);
    }
}

//function to show the weather data to the website
function ShowWeatherInfo(WeatherInfo){
    //making the block visible
    document.getElementById("WeatherInfoTextbox").hidden = false;


    let PlaceName = WeatherInfo.location["name"];
    let Region = WeatherInfo.location["region"];
    let Country = WeatherInfo.location["country"];

    let TempInC = WeatherInfo.current["temp_c"];
    let TempInF = WeatherInfo.current["temp_f"];
    let WeatherCondition = WeatherInfo.current.condition["text"];
    let Humidity = WeatherInfo.current["humidity"];
    let Wind = WeatherInfo.current["wind_kph"];



    document.getElementById("PlaceName").innerHTML = `Place Name -: ${PlaceName}, ${Region}, ${Country}<br>`;
    document.getElementById("displayTempC").innerHTML = `Temperature in Celsius -: ${TempInC}\u00B0C<br>`;
    document.getElementById("displayTempF").innerHTML = `Temperature in Fahrenheit -: ${TempInF}\u00B0F<br>`;
    document.getElementById("displayCondition").innerHTML = `Weather Condition -: ${WeatherCondition}<br>`;
    document.getElementById("displayHumidity").innerHTML = `Humidity -: ${Humidity}%<br>`;
    document.getElementById("displayWind").innerHTML = `Wind (in KmPH)-: ${Wind}Km/H<br>`;

    //Showing in the console
    console.log(PlaceName);
    console.log(TempInC);
    console.log(TempInF);
    console.log(WeatherCondition);
    console.log(Humidity);
    console.log(Wind);
}