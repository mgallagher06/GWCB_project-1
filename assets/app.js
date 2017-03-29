//array of accessible playground objects
var accessiblePlaygrounds = [];

//loop through the entire NPR playground data set, create an obj with relevant info for each park, push obj to array for use in other functions, such as makeMarkers.
function parse(data){
	pgData = data.playgrounds;

	pgData.forEach(function(entry){

		var newPg = {};
		newPg.name = entry.name;
		var pgLat = entry.latitude;
		var pgLong = entry.longitude;
		var latLong = {lat: pgLat, lng: pgLong};
		newPg.slug = entry.slug;
		newPg.location = latLong;
		newPg.address = entry.address;
		newPg.state = entry.state;
		newPg.url = entry.url;
		newPg.zip = entry.zip_code;
		newPg.features = features(entry.features);

		accessiblePlaygrounds.push(newPg);
		writeUserData(newPg.slug, newPg.name, newPg.location, newPg.address, newPg.state, newPg.url, newPg.zip, newPg.features);

		function features(arr){
			var pgFeatures = [];
			arr.forEach(function(feature) {
			    pgFeatures.push(feature.name);
			});
			return pgFeatures;
		}

	});
}

parse(pgDataSet);
console.log(accessiblePlaygrounds);

function writeUserData(userId, name, location, address, state, url, zip, features) {

	var path = 'playgrounds/'+ userId;
	console.log(path);
  	firebase.database().ref(path).set({
  	userId: userId,
    name: name,
    location: location,
   	address: address,
   	state: state,
   	url: url,
   	zip: zip,
   	features: features
  });
}

firebase.database().ref('playgrounds/').on("value", function(snapshot) {

	// Use equalTo() with lat/lng bounds to choose arbitrary starting, ending, and equivalence points for queries.
	// This can be useful for paginating data or finding items with children that have a specific value.
	locations = snapshot.val();
});

//link index.html to firebase;
// add accessiblePlaygrounds to firebase;
//populate locations array in maps with firebase objects
//sort by region?