import React from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

export class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            markers: [],
            currentLoc : {lat:42, lng:-73},
            showInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };

        this.addMarker = this.addMarker.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.isEqual = this.isEqual.bind(this);
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
        this.setState({
            showInfoWindow: false
        });
        if (!window.toggle) return;
        window.createdMarkerPosition = {lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng()};
        this.setState({
            markers: [{name: "Current Location", latitude: window.createdMarkerPosition.lat, longitude: window.createdMarkerPosition.lng}]
        });
        console.log("should have added marker");
    }

    onMarkerClick(markerProps, marker, e) {
        this.setState({
            selectedPlace: markerProps,
            activeMarker: marker,
            showInfoWindow: this.isEqual(marker, this.state.activeMarker)
        });
    }

    isEqual(marker1, marker2) {
        if(this.state.showInfoWindow === false || "undefined" === typeof marker2 || Object.keys(marker2).length === 0 || 
            !(marker1.position.lat() === marker2.position.lat() && marker1.position.lng() === marker2.position.lng())){
            return true;
        }
        return false;
    }

    render() {
        const style = {
            width: '60%',
            height: '100%'
        }
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <Map google={this.props.google} containerStyle={{width: "60%", height: "100%"}} style={{width: "100%", height: "100%"}} initialCenter={this.state.currentLoc} onClick={this.addMarker}>
                {this.state.markers.map((marker, index) => {
                    return <Marker name={marker.name} position={{lat:Number(marker.latitude), lng:Number(marker.longitude)}} onClick={this.onMarkerClick} key={index} />
                })}
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showInfoWindow}>
                    <div><h1>{this.state.selectedPlace.name}</h1></div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAsA8dWaWu4HzipdUVUTgWGm_8xF8lGiWA",
  version: 3.26
})(Container);