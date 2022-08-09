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
  room_name=localStorage.getItem("room_name");

  function send(){
        msg=document.getElementById("msg").value;
        firebase.database().ref(room_name).push({
             name:user_name,
             message:msg,
             like:0,
             dislike:0
          
        });
        document.getElementById("msg").value="";
  }
  

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;

       console.log(firebase_message_id);
       console.log(message_data);
       name=message_data['name'];
       message=message_data['message'];
       like=message_data['like'];
       dislike=message_data['dislike'];
       name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
       message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
       like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id);'>";
       span_with_tag="<span class='glyphicon glyphicon-thumbs-up'> Like:"+like+"</span></button>";
       dislike_button="<button class='btn btn-danger' id="+firebase_message_id+" value="+dislike+" onclick='updateLike1(this.id);'>";
       span_with_tag1="<span class='glyphicon glyphicon-thumbs-down'> Dislike:"+dislike+"</span></button><hr>";


       row=name_with_tag+message_with_tag+like_button+span_with_tag+dislike_button+span_with_tag1;
       document.getElementById("output").innerHTML+=row;


    } });  }); }
getData();

function updateLike(message_id){
    console.log("click on the like button-"+message_id);
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updated_likes=Number(likes)+1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
          like:updated_likes
    });
}

function updateLike1(message_id1){
    console.log("click on the like button-"+message_id1);
    button_id1=message_id1;
    dislikes=document.getElementById(button_id1).value;
    updated_likes1=Number(dislikes)+1;
    console.log(updated_likes1);

    firebase.database().ref(room_name).child(message_id1).update({
          dislike:updated_likes1
    });
}


function logOut(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("login2.html");
}
