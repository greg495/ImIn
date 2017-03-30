import React from 'react';
import createdMarkerPosition from "./main.js";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: "",
            description: "",
            sport: "",
            markerAddingButton: "Click to place marker",
            longitude: 0,
            latitude: 0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleAddMarker = this.toggleAddMarker.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleInputChange(event) {
        // function to handle when a user updates an input field on the form
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    toggleAddMarker(event) {
        // update the button value on if a user is able ot add a marker to the map or not
        window.toggle = !window.toggle;
        this.setState({
            markerAddingButton: window.toggle ? "Click to interact with the map again" : "Click to place marker on map"
        });
    }

    validateForm(e) {
        // function to validate the form on submission
        // e.g. an event name and location for event is required
        // then the data is sent to the server and the game is saved
        e.preventDefault();
        this.setState({
            latitude: window.createdMarkerPosition.lat,
            longitude: window.createdMarkerPosition.lng
        });
        if (this.state.latitude === 0 && this.state.longitude == 0) {
            $("#form").validate().showErrors({latitude: "Please place a marker first"});
            return;
        }
        FB.api('/me', {fields: 'name,first_name'}, (response) => {
            var stringToBeSent = $("#form").serialize()+`&creatorID=${response.id}`;
            $.post("/api/form", stringToBeSent, function(data, textStatus){
                window.location = data.redirect;
            });
        });
    }

    render() {
        return (
            <form id="form" action="/api/form" method="post" encType="multipart/form-data" onSubmit={this.validateForm}>
                Event Name: <input type="text" name="eventName" placeholder="Event name..." value={this.state.eventName} onChange={this.handleInputChange} required></input>
                <input type="textarea" name="description" rows="4" cols="20" placeholder="Enter a description for the event if you want." value={this.state.description} onChange={this.handleInputChange}></input>
                <select name="sport" value={this.state.sport} onChange={this.handleInputChange} required>
                    <option value="BasketBall">Basketball</option>
                    <option value="Baseball">Baseball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Frisbee">Frisbee</option>
                    <option value="Soccer">Soccer</option>
                </select>
                <input type="button" name="markerAddingButton" value={this.state.markerAddingButton} onClick={this.toggleAddMarker}></input>
                <input type="number" name="latitude" value={this.state.latitude} hidden required></input>
                <input type="number" name="longitude" value={this.state.longitude} hidden required></input>
                <input type="submit" value="Submit"></input>
            </form>
        );
    }
}

export default Form;