import React from 'react';

class Form extends React.Component {
   render() {
      return (
         <div>
            <form action="/api/form">
                Event Name: <input type="text" name="eventName"></input>
                <select name="sport">
                    <option value="BasketBall">Basketball</option>
                    <option value="Baseball">Baseball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Frisbee">Frisbee</option>
                    <option value="Soccer">Soccer</option>
                </select>
                <input type="submit" value="Submit"></input>
            </form>
         </div>
      );
   }
}

export default Form;