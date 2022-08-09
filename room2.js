


const firebaseConfig = {
    apiKey: "AIzaSyCqlElosq11maQzrN4svrhD83HWlYjJwM0",
    authDomain: "kwittertest-9c32e.firebaseapp.com",
    databaseURL: "https://kwittertest-9c32e-default-rtdb.firebaseio.com",
    projectId: "kwittertest-9c32e",
    storageBucket: "kwittertest-9c32e.appspot.com",
    messagingSenderId: "49780003628",
    appId: "1:49780003628:web:1ca8c0be03f29431ae9289"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  user_name=localStorage.getItem("user_name");
  document.getElementById("user_name").innerHTML="Welcome "+user_name+"!";
  
  function addRoom(){
    room_name=document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose:"adding username"
    });
    localStorage.setItem("room_name",room_name);
    window.location="page.html";
  }
  
  
  function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
         Room_names = childKey;
         console.log("Room_names= "+Room_names);
         row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div> <hr>";
         document.getElementById("output").innerHTML+=row;
        });});}
  getData();
  
  function  redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name",name);
    window.location="kwitter_page.html";
  }
  
  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
  }
    
  
  