import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            markers: [],
            currentLoc : {lat:42, lng:-73}
        };

        this.addMarker = this.addMarker.bind(this);
    }

    componentDidMount() {
         $.getJSON('/api/getGames', {}, (data) => {
             this.setState({
                 markers: data
             });
         });
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLoc: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                });
            });
        };
    }

    addMarker(mapProps, map, clickEvent) {
        if (!window.toggle) return;
        window.createdMarkerPosition = {lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng()};
        this.setState({
            markers: [{name: "Current Location", latitude: window.createdMarkerPosition.lat, longitude: window.createdMarkerPosition.lng}]
        });
        console.log("should have added marker");
    }
    render() {
        //markers={[{name:"some",position:{lat: 37.778519, lng: -122.405640}}]}
        const style = {
            width: '60%',
            height: '100%'
        }
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <Map google={this.props.google} containerStyle={{width: "60%", height: "100%"}} style={{width: "100%", height: "100%"}} initialCenter={this.state.currentLoc} onClick={this.addMarker}>
                {this.state.markers.map(function(marker, index){
                    return <Marker name={marker.name} position={{lat:Number(marker.latitude), lng:Number(marker.longitude)}} key={index} />
                })}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAsA8dWaWu4HzipdUVUTgWGm_8xF8lGiWA",
  version: 3.26
})(Container);