function initMap(){
		firebase.database().ref('playgrounds/').on("value", function(snapshot) {

		// Use equalTo() with lat/lng bounds to choose arbitrary starting, ending, and equivalence points for queries.
		// This can be useful for paginating data or finding items with children that have a specific value.
		var locations = snapshot.val();
		// var location = locations['-alison-hardin-playground-eli-bradford-garden-of-angels-at-jo-kelly-school-fort-worth-tx'];
		var places = [];

		var Place = function(data, map) {
			var self = this;
			// self.defaultIcon = makeMarkerIcon('ff5c33');
			// self.highlitedIcon = makeMarkerIcon('9653ac');
			self.marker = new google.maps.Marker({
				map: map,
				position: data.location,
				animation: google.maps.Animation.DROP,
				name: data.name
			});
			self.marker.addListener('click', function(){
				console.log(this);
			});

			//geocoding query... why did I put this here? IDK I'm tired.
			// sample format: address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
			var address = data.address +', '+data.city+', '+data.state;
			var addressArray = address.split(' ');
			var addressParam = addressArray.join('+');
			queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+addressParam;
			$.ajax({
			      url: queryURL,
			      method: "GET"
			    })
			    .done(function(response) {
			      console.log(response);
			    })
		}

		this.createMarkers = function(map) {
			for (var key in locations){
				if(!locations.hasOwnProperty(key)) continue;
				var obj = locations[key];
				// console.log( obj.name, obj.location, obj.address, obj.state, obj.zip, obj.url);
				places.push(new Place(obj, map));
			}
		};


		    //locations populated by snapshot in app.js
	    //FB always returns nested objects, not arrays, so locations is an object now.
	    //https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html
	    //save nested objects in array locally or rewrite maps code in order to access data in objects

	    var map = new google.maps.Map(document.getElementById('googleMap'), {
	      zoom: 10,
	      //based on the user zip code and we will need to geo code to take the lat long
	      center:  {"lat" : 32.760391, "lng" : -97.371262},
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    });

	    this.createMarkers(map);

	    // var marker, i;

	    // for (i = 0; i < locations.length; i++) {
	    //   marker = new google.maps.Marker({
	    //     position: locations[i].location,
	    //     map: map
	    //   });

	    //   google.maps.event.addListener(marker, 'click', (function(marker, i) {

	    //       return function() {
	    //     }
	    //   })(marker, i));
	    // }

	    // function showInfo(photo,weather,etc){
	    //   //hide map
	    //   // show weather div
	    //   // show photo
	    // }

	$(document).ready(function(){
	  $('#myModal').on('shown.bs.modal', function(){
	    google.maps.event.trigger(map, 'resize');
	    map.setCenter(new google.maps.LatLng(32.760391, -97.371262));
	  });
	});

});
}

//link index.html to firebase;
// add accessiblePlaygrounds to firebase;
//populate locations array in maps with firebase objects
//sort by region?