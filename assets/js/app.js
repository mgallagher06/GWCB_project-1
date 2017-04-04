function initMap(){
	//make sure map callback fires
	console.log('initMap');
	//grab playground data from fb
	firebase.database().ref('playgrounds/').on("value", function(snapshot) {
	var locations = snapshot.val();

	// collect Place for each location from createMarkers
	var places = [];
	//define map center
	var center;
	var input = document.getElementById('autocomplete');
	//save google place info
	var place;

	// Create the autocomplete object, restricting the search to geographical
	// location types.
	autocomplete = new google.maps.places.Autocomplete(
	    /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
	    {types: ['geocode']});
	//save place info on user selection
	autocomplete.addListener('place_changed', function(){
		  place = autocomplete.getPlace();
		  console.log(place);
	});

	$('#submit').on('click', function(){

		// Make api call to convert address or zip to lat/lng and then center map accordingly
		// format: address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
		// TO-DO: get key?
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


		//Place constructor obj
		var Place = function(data, map) {
			var self = this;
			//TO-DO: use this later to animate markers
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

				// TO-DO: figure out how to launch details screen on click
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
		  //user will submit zip code or address, which is passed to geocode api. response provides lat/lng used to center map accordingly.
		  center: center,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
			});

		this.createMarkers(map);

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