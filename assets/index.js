const apiKey = "878d6534085046fb87b959055bed3731";
let searchHistory = [];
let previousSearch = "";
let cityName = $("#city-input");
let submitSearch = document.querySelector("#search-button");

let getWeather = (cityName) => {
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=` + cityName + `&appid=` + apiKey + `&units=imperial`;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + cityName.val() + `&appid=` + apiKey + `&units=imperial`)
      .then(function(response) {
          if (response.ok) {
              response.json().then(function(data) {
                  displayWeather(data);
              });
          } else {
              alert("Error!");
          }
      })  
      .catch(function(error) {
          alert("Cannot connect to OpenWeather");
      })
};


let submitHandler = () => {
    //event.preventDefault();
    if (cityName) {
        getWeather(cityName);
        $("#city-input").val("");
    } else {
        alert("Enter a city name");
    }

};

let displayWeather = (response) => {
    $("#main-city-name").text(response.name);
    $("#main-city-temp").text(" " + response.temp.toFixed(1) + " degrees Farenheit");
    $("#main-city-humidity").text(" " + response.humidity + "%");
    $("#main-city-wind").text(" " + response.wind.speed.toFixed(1) + "mph");
};

let saveSearchHistory = () => {

};

let renderSearchHistory = () => {

};


submitSearch.addEventListener("click", submitHandler);
