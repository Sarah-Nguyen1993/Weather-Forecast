//get weather info from local storage
var citiesArray = JSON.parse(localStorage.getItem("cities")) || []

//this helps to hide pre-defined styles of the today div
$("#today").hide();

$("#search-btn").click(function (event) {
    event.preventDefault;
    var city = $("#input-box").val();
    //clear the input box after each search
    $("#input-box").val("")
    todayWeather(city);
    fiveDayWeather(city);
})

$("#input-box").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#search-btn").click();
    }
});

function renderCities() {
    var cityEl = $(".city-search-history");
    cityEl.empty();
    for (i = 0; i < citiesArray.length; i++) {
        cityEl.prepend(
            $("<button>")
                .text(citiesArray[i].charAt(0).toUpperCase() + citiesArray[i].slice(1))
                .addClass("city-btn")
                .attr("data", citiesArray[i])
        );
    }

    // when the city button is clicked, today weather and 5-day forecast are shown
    $(".city-btn").click(function (event) {
        event.preventDefault;
        var city = $(this).attr("data")
        todayWeather(city);
        fiveDayWeather(city);
    })
}


function todayWeather(city) {
    $("#today").show();
    var API_Key = "0d0f0152212d1d78d1fa67d26aa4056b";
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + API_Key;
    var todayWeatherDisplay = $("#today");
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response1) {
        console.log(response1) // for testing
        console.log(queryURL1) // for testing
        var todayTemp = Math.floor(response1.main.temp);
        var todayHumidity = response1.main.humidity;
        var todayWindSpeed = response1.wind.speed;
        var lat = response1.coord.lat;
        var lon = response1.coord.lon;
        uvIndex(lat, lon);

        //display today weather 
        todayWeatherDisplay.empty();
        var imgUrl = "http://openweathermap.org/img/w/" + response1.weather[0].icon + ".png";
        todayWeatherDisplay.append(
            //city name + date + weather icon
            "<h1>" + city.charAt(0).toUpperCase() + city.slice(1)
            + "   " + "(" + moment().format('l') + ")"
            + "<img class ='icon'>",
            //temp
            "<p>" + "Temperature: " + todayTemp + " <sup>o</sup>F",
            //humidity
            "<p>" + "Humidity: " + todayHumidity + " %",
            //wind speed  
            "<p>" + "Wind speed: " + todayWindSpeed + " mph",
            //uv index
            "<p>" + "UV Index: " + "<span class = 'uv'>",
            "<p class ='risk-level'>"
        )
        $(".icon").attr("src", imgUrl)

        //store cities into the local storage
        if (citiesArray.indexOf(city.toLowerCase()) === -1) {
            citiesArray.push(city.toLowerCase())
            localStorage.setItem("cities", JSON.stringify(citiesArray))
            renderCities();
        }
    })
}

function fiveDayWeather(city) {
    var API_Key = "0d0f0152212d1d78d1fa67d26aa4056b";
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + API_Key;
    var foreCast = $("#forecast");
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response2) {
        console.log(response2) // for testing
        console.log(queryURL2) // for testing

        //display to 5-day forecast section
        foreCast.empty();
        foreCast.append("<h2>" + "5-Day Forecast")
        foreCast.append("<div class ='card-container'>")
        var count = 1;
        for (var i = 0; i < response2.list.length; i++) {
            if (response2.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                date = moment().add(count++, 'days').format('l');
                var fiveDayWeatherDisplay = $(`
                    <div class = "card">
                        <h6> ${date} </h6> 
                        <img src = 'http://openweathermap.org/img/w/${response2.list[i].weather[0].icon}.png' width='50px'>
                        <p> ${response2.list[i].weather[0].description}</p>
                        <p> Temp: ${Math.floor(response2.list[i].main.temp)}<sup>o</sup>F</p>
                        <p> Humidity: ${response2.list[i].main.humidity}%</p>
                    </div>
            `)
                $(".card-container").append(fiveDayWeatherDisplay);
            }
        }
    })
}
function uvIndex(lat, lon) {
    var API_Key = "0d0f0152212d1d78d1fa67d26aa4056b";
    var url = "https://api.openweathermap.org/data/2.5/uvi?appid=" + API_Key + "&lat=" + lat + "&lon=" + lon;
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response3) {
        console.log(response3);
        var uvValue = response3.value;
        $(".uv").text(uvValue);
        if (parseInt(uvValue) < 3) {
            $(".uv").text(uvValue).css({ "backgroundColor": "green", "border-radius": ".25rem" });
            $(".risk-level").text("Low risk").css({ "color": "green", "font-style": "italic" });
        }
        else if (parseInt(uvValue) >= 3 && parseInt(uvValue) < 8) {
            $(".uv").text(uvValue).css({ "backgroundColor": "orange", "border-radius": ".25rem" });
            $(".risk-level").text("Moderate risk").css({ "color": "orange", "font-style": "italic" })
        }
        else {
            $(".uv").text(uvValue).css({ "backgroundColor": "red", "border-radius": ".25rem" });
            $(".risk-level").text("High risk").css({ "color": "red", "font-style": "italic" })
        }
    })
}
renderCities()



















