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

let displayWeather = (data) => {
    $("#main-city-name").text(data.name);
    $("#main-city-temp").text("Temperature: " + data.main.temp + " degrees Farenheit");
    $("#main-city-humidity").text("Humidity: " + data.main.humidity + "%");
    $("#main-city-wind").text("Wind Speed: " + data.wind.speed + "mph");

    fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=` + data.coord.lat + `&lon=`+ data.coord.lon + `&appid=` + apiKey)
        .then(function(response) {
            response.json().then(function(data) {
                $("#main-city-uv").text("UV Index: " + data.value);
            })
        }
    )

    previousCitySearched = data.name;
    saveSearchHistory(previousCitySearched);
};


let saveSearchHistory = (cityName) => {
    if(!searchHistory.includes(cityName)){
        searchHistory.push(cityName);
        $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + cityName + "'>" + cityName + "</a>")
    } 

    localStorage.setItem("previousWeatherHistory", JSON.stringify(previousCitySearched));
    localStorage.setItem("lastCitySearched", JSON.stringify(previousCitySearched));

    loadSearchHistory();

};

let renderSearchHistory = () => {
    let loadSearchHistory = () => {
        searchHistory = JSON.parse(localStorage.getItem("previousWeatherHistory"));
        lastCitySearched = JSON.parse(localStorage.getItem("lastCitySearched"));

        if (!searchHistory) {
            searchHistory = []
        }
    
        if (!lastCitySearched) {
            lastCitySearched = ""
        }
    
        $("#search-history").empty();
        for(i = 0; i < searchHistory.length; i++) {
         $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
        }
    };
    
    loadSearchHistory();
    
    if (lastCitySearched != ""){
        getCityWeather(lastCitySearched);
    }
};


submitSearch.addEventListener("click", submitHandler);

// $("#search-history").on("click", function(event){
//     let previousCity = $(event.target).closest("a").attr("id");
//     getCityWeather(previousCity);
// });
