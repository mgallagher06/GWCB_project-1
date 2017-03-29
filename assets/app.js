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
		newPg.location = latLong;
		newPg.address = entry.address;
		newPg.state = entry.state;
		newPg.url = entry.url;
		newPg.zip = entry.zip_code;
		newPg.features = features(entry.features);

		accessiblePlaygrounds.push(newPg);

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

//link index.html to firebase;
// add accessiblePlaygrounds to firebase;