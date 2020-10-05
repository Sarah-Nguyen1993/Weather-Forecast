
//var today = localStorage.getItem("today")

//when the search button is clicked
//how to make the search works either by clicking button or hitting enter
$("#today").hide();


function searchBtn (){
$("#search-btn").click(function () {
    var city = $("#input-box").val();
    var cityEl = $(".city-search-history");
    cityEl.prepend(
        $("<button>")
        .text(city.charAt(0).toUpperCase() + city.slice(1))
        .addClass("city-btn")
        .attr("data", city)
    );

    //function for today weather 
    function todayWeather() {
        $("#today").show();
        var API_Key = "0d0f0152212d1d78d1fa67d26aa4056b";
        var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + API_Key;
        var todayWeatherDisplay = $("#today");
        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function (response1) {
            console.log(response1) // for testing
            var todayTemp = response1.main.temp;
            var todayHumidity = response1.main.humidity;
            var todayWindSpeed = response1.wind.speed;

            //display today weather 
            todayWeatherDisplay.empty();
            todayWeatherDisplay.append(
                //city name and date
                "<h1>" + city.charAt(0).toUpperCase() + city.slice(1) + "   " + "(" + moment().format('l') + ")",
                //temp
                "<p>" + "Temperature: " + todayTemp + " F",
                //humidity
                "<p>" + "Humidity: " + todayHumidity + " %",
                //wind speed  
                "<p>" + "Wind speed: " + todayWindSpeed + " mph",
                //uv index
            )
        })
        
    }

    // function for 5-day forecast
    function fiveDayWeather() {
        var savedCity = $("#input-box").val();
        var API_Key = "0d0f0152212d1d78d1fa67d26aa4056b";
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + API_Key;
        var foreCast =$("#forecast");
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response2) {
            console.log(response2) // for testing
            console.log(queryURL2) // for testing

            //display to  5-day forecast section
            foreCast.empty();
            foreCast.append("<h2>" + "5-Day Forecast")
            var cardContainer = $("#forecast").append("<div class ='card-container'>")
            var count = 1;
            for (var i = 0; i < response2.list.length; i++) {
                if (response2.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                    date = moment().add(count++, 'days').format('l');
                    //console.log(response2.list[i].main.temp);
                    //console.log(response2.list[i].main.humidity);
                    var fiveDayWeatherDisplay = $(`
                
                        <div class = "card">
                            <h6> ${date} </h6> 
                            <p> ${response2.list[i].weather[0].description}</p>
                            <p> Temp: ${response2.list[i].main.temp}F</p>
                            <p> Humidity: ${response2.list[i].main.humidity}%</p>
                        </div>

                `)
                    $(".card-container").append(fiveDayWeatherDisplay);
                }

            }
        })
    }
    todayWeather();
    fiveDayWeather();
})
}
searchBtn();


$(".city-btn").click(function(){
    console.log ("124")
    todayWeather();


})










