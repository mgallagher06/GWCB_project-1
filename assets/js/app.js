function initMap(){
firebase.database().ref('playgrounds/').on("value", function(snapshot) {

		// Use equalTo() with lat/lng bounds to choose arbitrary starting, ending, and equivalence points for queries.
		// This can be useful for paginating data or finding items with children that have a specific value.
		locations = snapshot.val();
		// location = locations['-alison-hardin-playground-eli-bradford-garden-of-angels-at-jo-kelly-school-fort-worth-tx'];

		    //locations populated by snapshot in app.js
	    //FB always returns nested objects, not arrays, so locations is an object now.
	    //https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html
	    //save nested objects in array locally or rewrite maps code in order to access data in objects
	    var locations;

	    var map = new google.maps.Map(document.getElementById('googleMap'), {
	      zoom: 10,
	      //based on the user zip code and we will need to geo code to take the lat long
	      center: new google.maps.LatLng(-33.92, 151.25),
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    });

	    var marker, i;

	    for (i = 0; i < locations.length; i++) {
	      marker = new google.maps.Marker({
	        position: locations[i].location,
	        map: map
	      });

	      google.maps.event.addListener(marker, 'click', (function(marker, i) {

	          return function() {
	            console.log(this);
	            //update how to navigate to this string
	            // var address = location.address;
	            var addressArray = address.split(' ');
	            var addressParam = addressArray.join('+');
	            queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+addressParam;
	            $.ajax({
	                  url: queryURL,
	                  method: "GET"
	                })
	                .done(function(response) {
	                  console.log(response);
	                })//html
	        }
	      })(marker, i));
	    }

	    // function showInfo(photo,weather,etc){
	    //   //hide map
	    //   // show weather div
	    //   // show photo
	    // }

	$(document).ready(function(){
	  $('#myModal').on('shown.bs.modal', function(){
	    google.maps.event.trigger(map, 'resize');
	    map.setCenter(new google.maps.LatLng(-33.8688, 151.2195));
	  });
	});

});
}

//link index.html to firebase;
// add accessiblePlaygrounds to firebase;
//populate locations array in maps with firebase objects
//sort by region?