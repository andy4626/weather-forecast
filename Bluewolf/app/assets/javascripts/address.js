// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function(){
	var request = $.ajax({
		type: "GET",
		url: "https://api.forecast.io/forecast/" + APIKEY +"/" + latitude "," + longitude
,
		dataType: "json"});
	request.done(function(response){
		var events = response.data
		// function to return timestamp string to access google calendar
		function gSub(timeString) {
			return timeString.replace("-0400","").replace(/-/g, "").replace(/:/g, "")};
		// loop to parse thru json object data
		for(var i=0; i<events.length;i++){
			var event = events[i];
			// some events do not have an endtime
			if (typeof event.end_time !== "undefined"){
				var eventLink = "https://facebook.com/" + event.id
				var place = event.place
				var placeLink = "https://facebook.com/" + place.id
				// array + string to return formatted date
				var dateArray = new Date(event.start_time).toDateString().split(" ");
				var dateString = dateArray[1] + " " + dateArray[2] + ", " + dateArray[3]
				// html to open google calendar with event data
				var calendarLink = "https://www.google.com/calendar/render?action=TEMPLATE&text="+event.name+"&dates="+gSub(event.start_time)+"/"+gSub(event.end_time)+"&details=For+details,+link+here:+"+eventLink+"&location="+place.name+"&sf=true&output=xml"
				// html to append event elements to container
				var appendThis = "<table><tr class='post-image'><img class='cover-photo' src='"+event.cover.source+"'></tr><tr class='event-name'><h4><span class='glyphicon glyphicon-star'>&nbsp;</span><a href='"+eventLink+"'>"+event.name+"</a></h4></tr><tr class='place-name'><h4><span class='glyphicon glyphicon-map-marker'>&nbsp;</span><a href='"+placeLink+"'>"+place.name+"</a></h4></tr></table><br><br>"
				// redacted until ios chrome date settings are updated
				// var appendThis = "<table><tr class='post-image'><img class='cover-photo' src='"+event.cover.source+"'></tr><tr class='event-name'><h4><span class='glyphicon glyphicon-star'>&nbsp;</span><a href='"+eventLink+"'>"+event.name+"</a></h4></tr><tr class='place-name'><h4><span class='glyphicon glyphicon-map-marker'>&nbsp;</span><a href='"+placeLink+"'>"+place.name+"</a></h4></tr><tr class='event-date'><h4><span class='glyphicon glyphicon-calendar'>&nbsp;</span><a href='"+calendarLink+"'>"+dateString+"</a></h4></tr></table><br><br>"
				$("#events-container").append(appendThis);
			};
		};
	});
});