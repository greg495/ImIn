import React from 'react';

class SQL extends React.Component {

  handleSubmit(event) {
    console.log("starting handling submit");
    var user = {
        'clientname': 'CH Yamini Sankar',
        'email': 'mail@mail.com',
        'phonenumber': '9490430491',
        'message': 'hello world'
    };

    fetch('http://localhost:8009', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //mode: 'no-cors',
      body: JSON.stringify(user)
    }).then(function(response) {
        console.log("from JSX:");
        console.log(response);
    });
  }

  render() {
    return (
        <div>
            <button onClick={this.handleSubmit}>Connect to database</button>
        </div>
    );
  }

}

export default SQL;