import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import SQL from './connect_to_sql.jsx';

// ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<SQL />, document.getElementById('sql'));

/*(navigator.geolocation.getCurrentPosition(function (position) {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 10
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}))();*/

