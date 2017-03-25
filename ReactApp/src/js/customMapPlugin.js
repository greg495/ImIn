// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
// Currently, this will always prompt for permission, might want to save this in cookies
var map;
var placement = false;
var marker = null;

function allowMarker() {
    if (placement == true) {
    placement = false;
    }
    else {
    placement = true;
    }
}

function initMap() {
    var myLatlng=new google.maps.LatLng(-34.397, 150.644);

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        myLatlng = pos;

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
        }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    google.maps.event.addListener(map, 'click', function(e) {
        placeMarker(e.latLng, map);
        myLatlng = e.latLng;
        //marker.setPosition(e.latLng);
        document.getElementById("lat").value = e.latLng.lat();
        document.getElementById("long").value = e.latLng.lng();
        console.log(myLatlng.lat());
    });

    google.maps.event.addListener(marker, 'dragend', function(e) {
        myLatlng = e.latLng;
        document.getElementById("lat").value = e.latLng.lat();
        document.getElementById("long").value = e.latLng.lng();
    });

    function placeMarker(location) {
        //clear the previous marker and circle.
        if(marker != null && placement == true){
            marker.setMap(null);
        }

        if (placement == true) {
            marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable:true,
            title: "New Game"
            });
        }
    }
}
google.maps.event.addDomListener(window, "load", initMap());

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}