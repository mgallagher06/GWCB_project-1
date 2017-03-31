function initMap(){
	firebase.database().ref('playgrounds/').on("value", function(snapshot) {

		// Use equalTo() with lat/lng bounds to choose arbitrary starting, ending, and equivalence points for queries.
		// This can be useful for paginating data or finding items with children that have a specific value.

		var locations = snapshot.val();
		// collect Place for each location from createMarkers
		var places = [];

		var Place = function(data, map) {
			var self = this;
			// self.defaultIcon = makeMarkerIcon('ff5c33');
			// self.highlitedIcon = makeMarkerIcon('9653ac');
			self.marker = new google.maps.Marker({
				map: map,
				position: data.location,
				animation: google.maps.Animation.DROP,
				name: data.name,
				address: data.address,
				city: data.city,
				state: data.state,
				zip: data.zip,
				location: data.location,
				url: data.utl,
				features: data.features
			});
			self.marker.addListener('click', function(){
				console.log(this.name, this.city, this.location);

				// TO-DO: figure out how to launch details screen ob click
			});

			//geocoding query... works, but why did I put this here? IDK I'm tired.
			// this will be used to convert address or zip to lat/lng and then center map accordingly
			// sample format: address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
			// TO-DO: get key
			var address = data.address +', '+data.city+', '+data.state;
			var addressArray = address.split(' ');
			var addressParam = addressArray.join('+');
			queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+addressParam;
			// $.ajax({
			// 	url: queryURL,
			// 	method: "GET"
			// })
			// .done(function(response) {
			// 	console.log(response);
			// })
		}

		//create a marker for each location in database using the Place constructor and put it on the map
		this.createMarkers = function(map) {
			for (var key in locations){
				if(!locations.hasOwnProperty(key)) continue;
				var obj = locations[key];
				places.push(new Place(obj, map));
			}
		};

		var map = new google.maps.Map(document.getElementById('googleMap'), {
			zoom: 10,
	      //TO-DO: Center map on user input
	      //user will submit zip code or address, which is passed to geocode api. response provides lat/lng used to center map accordingly.
	      center:  {"lat" : 32.760391, "lng" : -97.371262},
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	  });

		this.createMarkers(map);

	   	// refactored this code to use info from FB objects
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