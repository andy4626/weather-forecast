// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var GOOGLE_API_KEY= "AIzaSyBygyIwNNt8tWLw5hfdv_izDth1jaq8TnI"

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = month + ' ' + date + ' ' + year ;
  return time;
}

function getWeatherForLocation(lat, lng) {

    var weather_request = $.ajax({
      type: "GET",
      url: "https://api.forecast.io/forecast/ef4dc6ca1e4cb43dbab92f2f5a815fda/"+ lat +"," +lng,
      dataType: "jsonp"});

    weather_request.done(function(response){
//Make the temperature chart
      google.charts.load('current', {packages: ['corechart', 'line']});
      google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Date');
      data.addColumn('number', 'Temperature');
      var weather_data = response.daily
      data.addRows([
        [timeConverter(weather_data.data[0].time), weather_data.data[0].temperatureMax],   [timeConverter(weather_data.data[1].time), weather_data.data[1].temperatureMax],  [timeConverter(weather_data.data[2].time),  weather_data.data[2].temperatureMax],  [timeConverter(weather_data.data[3].time),  weather_data.data[3].temperatureMax],  [timeConverter(weather_data.data[4].time),  weather_data.data[4].temperatureMax],  [timeConverter(weather_data.data[5].time),  weather_data.data[5].temperatureMax],
        [timeConverter(weather_data.data[6].time), weather_data.data[6].temperatureMax],  [timeConverter(weather_data.data[7].time),  weather_data.data[7].temperatureMax]
      ]);

      var options = {
        title: "Max Temperature Prediction",
        curveType: 'function',
        hAxis: {
          title: 'Date'
        },
        vAxis: {
          title: 'Temperature (°F)'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('weather'));

      chart.draw(data, options);
    }
            //data for the table
      $('#forecast').append("<td>" +timeConverter(response.daily.data[0].time) + "</td><td>" +response.daily.data[0].temperatureMax+" °F</td><td>" + response.daily.data[0].summary+"</td><td>"+response.daily.data[1].precipProbability*100+"%</td><td>"+response.daily.data[0].humidity +"</td>");

    })

    weather_request.fail(function(response){
      console.log(response)
    })
}

$(document).ready(function() {
    var address = document.getElementById("address").innerHTML.replace(/ /g, "+")
		var coordinates_request = $.ajax({
			type: "GET",
			url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address +"&key=" +GOOGLE_API_KEY,
			dataType: "json"});

    coordinates_request.done(function(response){
    	var location_lat = response.results[0].geometry.location.lat.toString();
			var location_lng = response.results[0].geometry.location.lng.toString();
      getWeatherForLocation(location_lat, location_lng)
    })

    coordinates_request.fail(function(response){
      console.log(response)
    })





});//closes the whole thing



// Option two with promise
//     getAddressLatLng(address)
//     .then(getWeatherForLocation, displayError)
//     .then(function(data) {

//     })
// function getAddressLatLng(address) {
//     return new Promise(function(resolve, reject) {
//         $.getJSON(address).done(function(latLngResponse) {
//             resolve(latLngResponse)
//         }).fail(function(error) {
//             reject(error)
//         })
//     })
// }
