import React from 'react';

class Form extends React.Component {
   render() {
      return (
         <div id="form">
            <form action="/api/form" method="post" encType="multipart/form-data">
                Event Name: <input type="text" name="eventName"></input>
                <input type="textarea" name="description" rows="4" cols="20" placeholder="Enter a description for the event if you want."></input>
                <select name="sport">
                    <option value="BasketBall">Basketball</option>
                    <option value="Baseball">Baseball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Frisbee">Frisbee</option>
                    <option value="Soccer">Soccer</option>
                </select>
                <input type="number" name="longitude" hidden>{}</input>
                <input type="number" name="latitude" hidden>{}</input>
                <input type="number" name="creatorID" hidden>{facebookUserID}</input>
                <input type="submit" value="Submit"></input>
            </form>
         </div>
      );
   }
}

export default Form;