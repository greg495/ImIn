import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            markers: [],
            currentLoc : {lat:42.7284, lng:-73.6918}
        };
    }

    componentDidMount() {
        $.getJSON('/api/getGames', {}, (data) => {
            this.setState({
                markers : data
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
            })
        }

    }
    render() {
        const style = {
            width: '70%',
            height: '100%'
        }
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
       
        return (
            <Map google={this.props.google} style={style} initialCenter={this.state.currentLoc}>
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