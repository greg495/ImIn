import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class Container extends React.Component {
    render() {
        const style = {
            width: '70%',
            height: '100%'
        }
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <Map google={this.props.google} style={style}/>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAsA8dWaWu4HzipdUVUTgWGm_8xF8lGiWA"
})(Container);