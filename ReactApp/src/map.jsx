import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class Container extends React.Component {
    render() {
        const markers = [
            {
                name: 'SOMA',
                position: {lat: 37.778519, lng: -122.405640}
            },
            {
                name: 'Dolores park',
                position: {lat: 37.759703, lng: -122.428093}
            }
        ]
        const style = {
            width: '70%',
            height: '100%'
        }
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <Map google={this.props.google} style={style}>
                {markers.map(function(marker, index){
                    return <Marker name={marker.name} position={marker.position} />
                })}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAsA8dWaWu4HzipdUVUTgWGm_8xF8lGiWA"
})(Container);