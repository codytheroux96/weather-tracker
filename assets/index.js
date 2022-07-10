const apiKey = "878d6534085046fb87b959055bed3731";
let searchHistory = [];
let previousSearch = "";

let getWeather = (cityName) => {
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
  fetch(apiUrl)
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

};

let displayWeather = () => {

};

let saveSearchHistory = () => {

};

let renderSearchHistory = () => {

};

