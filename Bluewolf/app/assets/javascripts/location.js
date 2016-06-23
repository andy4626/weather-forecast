// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.



$(document).ready(function() {
  $("#add").on("click", function(e){
    e.preventDefault();
    var self = this;
    var address = document.getElementById("address").innerHTML.replace(/ /g, "+")
		var request = $.ajax({
			type: "GET",
			url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address +"&key=" +GOOGLE_API_KEY,
			dataType: "json"});
    request.done(function(response){
    	var weather_location_lat = response.results[0].geometry.location.lat;
			var weather_location_lng = response.results[0].geometry.location.lng;
      $('.weather').html(weather_location_lat + " "+ weather_location_lng);
    })
    request.fail(function(response){
      console.log(response)
    })
  })









});




// var adddress = document.getElementById("address").innerHTML.replace(/ /g, "+")

// $(function(){
// 	var request = $.ajax({
// 		type: "GET",
// 		url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address +"&key=" +GOOGLE_API_KEY,
// 		dataType: "json"});
// 	request.done(function(response){
// 		var weather_location_lat = response.results[0].geometry.location.lat;
// 		var weather_location_lng = response.results[0].geometry.location.lng;
// 		$('.weather').html(weather_location_lat, weather_location_lng)

// 	});
// });