import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            markers: [
                {
                    name:'SOMA',
                    position:{lat: 37.778519, lng: -122.405640}
                }],
        };
    }

    componentDidMount() {
        setTimeout(() => {
            /*Container.prototype.setState({markers : [
                {
                    name:"Dolores park",
                    position:{lat: 37.759703, lng: -122.428093}
                }
            ]});*/
            this.setState({
                    markers : [{
                    name:"Dolores park",
                    position:{lat: 37.759703, lng: -122.428093}
                }]
            });
            console.log("changed");
        }, 5000);
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
            <Map google={this.props.google} style={style} >
                {this.state.markers.map(function(marker, index){
                    return <Marker name={marker.name} position={marker.position} key={index} />
                })}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAsA8dWaWu4HzipdUVUTgWGm_8xF8lGiWA"
})(Container);