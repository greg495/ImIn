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
        /*if (navigator && navigator.geolocation) {
            console.log("start of geolocation");
            navigator.geolocation.getCurrentPosition((pos) => {
                console.log("inside of geolocation");
                const coords = pos.coords;
                console.log(coords);
                this.setState({
                    currentLoc: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
            console.log("HERE");
            // console.log(this.state.currentLoc);
        }*/

    }
    render() {
        //markers={[{name:"some",position:{lat: 37.778519, lng: -122.405640}}]}
        const style = {
            width: '70%',
            height: '100%'
        }
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        // console.log(markers);
        return (
            <Map google={this.props.google} style={style} initialCenter={this.state.currentLoc}>
                {this.state.markers.map(function(marker, index){
                    return <Marker name={marker.name} position={{lat:Number(marker.latitude), lng:Number(marker.longitude)}} key={index} />
                })}
            </Map>
        );
    }
}
/*{this.state.markers.map(function(marker, index){
                    return <Marker name={marker.name} position={{lat:Number(marker.latitude), lng:Number(marker.longitude)}} key={index} />
                })}*/

export default GoogleApiWrapper({
  apiKey: "AIzaSyAsA8dWaWu4HzipdUVUTgWGm_8xF8lGiWA",
  version: 3.26
})(Container);