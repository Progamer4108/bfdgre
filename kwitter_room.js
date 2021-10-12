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

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick = 'redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });
}
getData();

function addRoom() {
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });
  localStorage.setItem("room_name", room_name);
  window.location = "kwitter_page.html";
}

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}