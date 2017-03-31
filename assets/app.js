
firebase.database().ref('playgrounds/').on("value", function(snapshot) {

	// Use equalTo() with lat/lng bounds to choose arbitrary starting, ending, and equivalence points for queries.
	// This can be useful for paginating data or finding items with children that have a specific value.
	locations = snapshot.val();
	console.log(locations);
});

//link index.html to firebase;
// add accessiblePlaygrounds to firebase;
//populate locations array in maps with firebase objects
//sort by region?