// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var GOOGLE_API_KEY= "AIzaSyBygyIwNNt8tWLw5hfdv_izDth1jaq8TnI"
var location_lat, location_lng

$(document).ready(function() {
    var address = document.getElementById("address").innerHTML.replace(/ /g, "+")
		var coordinates_request = $.ajax({
			type: "GET",
			url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address +"&key=" +GOOGLE_API_KEY,
			dataType: "json"});
    coordinates_request.done(function(response){
    	 location_lat = response.results[0].geometry.location.lat
			 location_lng = response.results[0].geometry.location.lng;
      $('.weather').html(location_lat + " "+ location_lng);
    })
    request.fail(function(response){
      console.log(response)
    })
//got the coordinates

    // var weather_request = $.ajax({
    //   type: "GET",
    //   url: "https://api.forecast.io/forecast/ef4dc6ca1e4cb43dbab92f2f5a815fda/"+ location_lat.toString() +"," +location_lng.toString(),
    //   dataType: "json"});
    // weather_request.done(function(response){
    //   $('.weather').html(response);
    // })
    // request.fail(function(response){
    //   console.log(response)
    // })



});


