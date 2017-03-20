
function fbLoaded() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      getData();
    }
  });
}

function getData() {
  var name;
  var userid;
  FB.api('/me', function(response) {
      console.log(JSON.stringify(response));
      name = response["name"];
      userid = response["id"];
      showData(name, userid);
  });
}

function showData(name, userid) {
  document.getElementById("username").innerHTML = name;
  document.getElementById("profile_picture").src = "https://graph.facebook.com/"+userid+"/picture?width=500";
}
