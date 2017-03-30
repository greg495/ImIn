import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './chat.jsx';
import Container from './map.jsx';
import Form from './form.jsx';

window.toggle = false;
window.createdMarkerPosition = {lat: 0, lng: 0};
ReactDOM.render(<Container />, document.getElementById('mapContainer'));
ReactDOM.render(<Chat />, document.getElementById('chatContainer'));
ReactDOM.render(<Form />, document.getElementById('formContainer'));

var chat = $("#chatContainer").detach();
var form = null;

/*(navigator.geolocation.getCurrentPosition(function (position) {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 10
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}))();*/

