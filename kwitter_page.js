var firebaseConfig = {
      apiKey: "AIzaSyBVjGw-CbCgoNDQM-xDRZ8olQ0Z3NLoptw",
      authDomain: "ffef-27c5d.firebaseapp.com",
      databaseURL: "https://ffef-27c5d-default-rtdb.firebaseio.com",
      projectId: "ffef-27c5d",
      storageBucket: "ffef-27c5d.appspot.com",
      messagingSenderId: "832409649413",
      appId: "1:832409649413:web:47733b70234c6a30d9776c",
      measurementId: "G-XW08MGRCVB"
    };
    firebase.initializeApp(firebaseConfig);
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data('name');
                        message = message_data('message');
                        like = message_data('like');
                        name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });

      document.getElementById("msg").value = "";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}