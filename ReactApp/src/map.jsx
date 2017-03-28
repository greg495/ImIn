import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class Container extends React.Component {
    render() {
        // markers.push(//) = [
        //     {
        //         name: 'SOMA',
        //         position: {lat: 37.778519, lng: -122.405640}
        //     });
        var markers = [];
        // markers.push( {name:'asdf', position: {lat: 37.759703, lng: -122.44093}});
        $.getJSON('/api/getGames', {}, function(data) {
            markers.push( {name:data[0]['sport'], position: {lat: 37.759703, lng: -122.44093}});
        });


        const style = {
            width: '70%',
            height: '100%'
        }
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        console.log(markers);
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