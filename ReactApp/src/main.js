import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App.jsx';
// import SQL from './connect_to_sql.jsx';
import Chat from './Chat.jsx';
import Container from './Map.jsx';
import Form from './Form.jsx';

// ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<SQL />, document.getElementById('sql'));
ReactDOM.render(<Container />, document.getElementById('mapContainer'));
ReactDOM.render(<Chat />, document.getElementById('chatContainer'));
ReactDOM.render(<Form />, document.getElementById('formContainer'));

var chat = $("#chat").detach();
var form = null;

/*(navigator.geolocation.getCurrentPosition(function (position) {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 10
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}))();*/

