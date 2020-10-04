

// var cities = localStorage.getItem("cities");
// if (cities === null){
//     var cities ={}
// }
// else{
//     cities = JSON.parse(cities);
// }

//when the search button is clicked
    //how to make the search works either by clicking button or hitting enter
    $("#today").hide();
    var API_Key = "0d0f0152212d1d78d1fa67d26aa4056b";
$("#search-btn").click(function ()
{ 
    //why it does not work when vars are outside of the function
    var city = $("#input-box").val();
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + API_Key;
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city +"&cnt=5&units=imperial&appid=" + API_Key;
    var cityEl = $(".city-search-history");
    var todayWeatherDisplay = $("#today");
    var fiveDayWeatherDisplay = $("#forecast");

    //request info to get today weather
    $("#today").show();
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function(response1) 
    { 
        console.log(response1)
        cityEl.append(
            $("<button class ='city-btn'>").text(city.charAt(0).toUpperCase() + city.slice(1))
        );
       
        //display today weather 
        todayWeatherDisplay.append(
            //city name and date
            "<h1>" + city.charAt(0).toUpperCase() + city.slice(1) + "   " + "(" + moment().format('l') + ")",
            //temp
            "<p>" + "Temperature: " + response1.main.temp + " F", 
            //humidity
            "<p>" + "Humidity: " + response1.main.humidity + " %",
            //wind speed  
            "<p>" + "Wind speed: " + response1.wind.speed + " mph", 
            //uv index
            )    

    })

    
    $.ajax({
       url: queryURL2,
        method: "GET"
       }).then( function(response2){
           console.log(response2)
           console.log(queryURL2)

       })
   
       //var uvIndex;
 //  localStorage.setItem('cities', JSON.stringify(cities))      
})

// function fiveDayDisplay(){
//         var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + API_Key;
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).then(function(response){
//             console.log("Sda")
//             console.log(response)
//             // $("#forecast"). append(
//             //     ("<h2>").text("5-Day Forecast")  
    
//             // )
//         })
// }

// $("#search-btn").click(function ()
// { 
//     var city = $("#input-box").val();
//     var API_Key = "0d0f0152212d1d78d1fa67d26aa4056b";
//     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&units=imperial&appid=" + API_Key;
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then( function(){
//         console.log(response)
//         console.log(queryURL)

//     })
// })
