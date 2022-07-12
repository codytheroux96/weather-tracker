const apiKey = "878d6534085046fb87b959055bed3731";
let searchHistory = [];
let previousSearch = "";
let submitSearch = document.querySelector("#search-button");

let getWeather = (cityName) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=` +
      cityName +
      `&appid=` +
      apiKey +
      `&units=imperial`
  )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
      } else {
        alert("Error!");
      }
    })
    .catch(function (error) {
      alert("Cannot connect to OpenWeather");
    });
};

let submitHandler = () => {
  let cityName = $("#city-input").val();
  if (cityName) {
    getWeather(cityName);
    $("#city-input").val("");
  } else {
    alert("Enter a city name");
  }
};

let displayWeather = (data) => {
  $("#main-city-name").text(data.name);
  $("#main-city-temp").text(
    "Temperature: " + data.main.temp + " degrees Farenheit"
  );
  $("#main-city-humidity").text("Humidity: " + data.main.humidity + "%");
  $("#main-city-wind").text("Wind Speed: " + data.wind.speed + "mph");

  fetch(
    `https://api.openweathermap.org/data/2.5/uvi?lat=` +
      data.coord.lat +
      `&lon=` +
      data.coord.lon +
      `&appid=` +
      apiKey
  ).then(function (response) {
    response.json().then(function (data) {
      $("#uv-box").text( data.value);

      if (data.value <=3) {
        $("#uv-box").css("background-color", "green")
      } else if (data.value <=10 && data.value >3) {
        $("#uv-box").css("background-color", "yellow") 
      } else if (data.value > 10) {
        $("#uv-box").css("background-color", "red")
      }
    });
  });

  previousSearch = data.name;
  saveSearchHistory(data.name);
};

let saveSearchHistory = (cityName) => {
  if (!searchHistory.includes(cityName)) {
    searchHistory.push(cityName);
    $("#search-history").append(
      "<a href='#' class='list-group-item list-group-item-action' id='" +
        cityName +
        "'>" +
        cityName +
        "</a>"
    );
  }

  localStorage.setItem("previousWeatherHistory", JSON.stringify(searchHistory));
  localStorage.setItem("previousSearch", JSON.stringify(previousSearch));

  renderSearchHistory();
};

let renderSearchHistory = () => {
  searchHistory = JSON.parse(localStorage.getItem("previousWeatherHistory"));
  previousSearch = JSON.parse(localStorage.getItem("previousSearch"));

  if (!searchHistory) {
    searchHistory = [];
  }

  if (!previousSearch) {
    previousSearch = "";
  }

  $("#search-history").empty();
  for (i = 0; i < searchHistory.length; i++) {
    $("#search-history").append(
      "<a href='#' class='list-group-item list-group-item-action' id='" +
        searchHistory[i] +
        "'>" +
        searchHistory[i] +
        "</a>"
    );
  }
};

renderSearchHistory();

if (previousSearch != "") {
  getWeather(previousSearch);
}


submitSearch.addEventListener("click", submitHandler);

$("#search-history").on("click", function (event) {
  let lastSearch = $(event.target).closest("a").attr("id");
  getWeather(lastSearch);
});
