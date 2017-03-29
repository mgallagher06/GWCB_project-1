    var locations;

    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 10,
      //based on the user zip code and we will need to geo code to take the lat long
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: locations[i].location,
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
        	//html
          infowindow.setContent(locations[i].name);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

$(document).ready(function(){
  $('#myModal').on('shown.bs.modal', function(){
    google.maps.event.trigger(map, 'resize');
    map.setCenter(new google.maps.LatLng(-33.8688, 151.2195));
  });
});