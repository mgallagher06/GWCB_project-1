
// $('#title').on(click, funciton(){ this.toggleClass('visible')});

function initMap(){
	console.log(autocomplete)
	console.log('initMap');
	firebase.database().ref('playgrounds/').on("value", function(snapshot) {

		// Use equalTo() with lat/lng bounds to choose arbitrary starting, ending, and equivalence points for queries.
		// This can be useful for paginating data or finding items with children that have a specific value.

		var locations = snapshot.val();
		// collect Place for each location from createMarkers
		var places = [];
		var center;
		var input = document.getElementById('autocomplete');
		var place;

		// Create the autocomplete object, restricting the search to geographical
		// location types.
		//TO-DO: add component restrictions;
		// google.maps.places.PlaceGeometry
		autocomplete = new google.maps.places.Autocomplete(
		    /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
		    {types: ['geocode']});

		autocomplete.addListener('place_changed', function(){
			  place = autocomplete.getPlace();
			  console.log(place);
		});

		$('#submit').on('click', function(){
			//geocoding query... works, but why did I put this here? IDK I'm tired.
			// this will be used to convert address or zip to lat/lng and then center map accordingly
			// sample format: address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
			// TO-DO: get key
			var address = place.formatted_address;;
			var addressArray = address.split(' ');
			var addressParam = addressArray.join('+');
			var components = '&components=country:US';
			queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+addressParam+components;
			$.ajax({
				url: queryURL,
				method: "GET"
			})
			.done(function(response) {
				center = response.results[0].geometry.location;



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
	      center: center,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	  });

		this.createMarkers(map);


	    // $(document).ready(function(){
	    // 	$('#myModal').on('shown.bs.modal', function(){
	    // 		google.maps.event.trigger(map, 'resize');
	    // 		// map.setCenter(new google.maps.LatLng(32.760391, -97.371262));
	    // 	});
	    // });

	    	})
	    })

	});
}

function googleError(){
	alert('Sorry, Google did not respond');
}

//link index.html to firebase;
// add accessiblePlaygrounds to firebase;
//populate locations array in maps with firebase objects
//sort by region?