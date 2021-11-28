  var firebaseConfig = {
    apiKey: "AIzaSyCEXT5Zn4TIEIo_7JiB4oDIbz_HFfprnnQ",
    authDomain: "ccbv2-9336b.firebaseapp.com",
    databaseURL: "https://ccbv2-9336b-default-rtdb.firebaseio.com",
    projectId: "ccbv2-9336b",
    storageBucket: "ccbv2-9336b.appspot.com",
    messagingSenderId: "533324318150",
    appId: "1:533324318150:web:da7381398593ec962fdec7",
    measurementId: "G-K7M93CJMHE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

n = "keep"
myHand = 0
enemyHand = 0
myID = 0
enemyID = 0
roomCode = 0
wol = 0
test =0
characterr =0
enemycharacter=0
ready = 0
userid=uuidv4()

//CHARACTERS
var Dummy = {name:"Dummy", health:10, currenthealth:10, rock:3, scissor:2, paper:1}
var Dio = {name:"Dio", health:12, currenthealth:12, rock:3, scissor:2, paper:1}
var Person = {name:"Person", health:8, currenthealth:8, rock:1, scissor:2, paper:3}


//THIS IS FOR SELECTING ROCK PAPER SCISSOR
function hand(x){
if (roomCode != 0){
    firebase.database().ref("room/"+[roomCode]+"/"+[userid]+"/"+[characterr]).set({
    [x]: 0
    
    })
     firebase.database().ref("room/"+[roomCode]+"/"+[userid]+"/"+[characterr]).update({
    
    [n]: 0
    })
} 
}

function create(){

  roomCode = new Date().getTime()
  firebase.database().ref("room/").update({
  [roomCode]:0


  })
//firebase.database().ref("room/"+[roomCode]).update({
 // 1 :0
//})
  console.log('you are in the room'+roomCode)
  document.getElementById("currentroom").innerHTML = roomCode;
}

function join(x){
  roomCode = x
  document.getElementById("currentroom").innerHTML = roomCode;
  
  document.getElementById("gameplay").style.display = "block"
  document.getElementById("rps").style.display = "block"


  firebase.database().ref("room/"+[roomCode]).on('value',function(a){
  a.forEach(function(snapshot){
  //console.log(snapshot.val())
  //console.log("123")
  //console.log(snapshot.key)

      //THIS IS FOR DETECTING MY HAND
      if (snapshot.key == userid){
         firebase.database().ref("room/"+[roomCode]+"/"+[snapshot.key]+"/"+[characterr]).on('value',function(a){a.forEach(function(snapshot){
//console.log(snapshot.key)

        myHand = snapshot.key 

         })
         })

      }

      //THIS IS FOR DETECTING ENEMY HAND
      if (snapshot.key != userid){
     
      enemyID = snapshot.key
 //console.log(enemyID)

firebase.database().ref("room/"+[roomCode]+"/"+[enemyID]).on('value',function(a){a.forEach(function(snapshot){

//console.log(snapshot.val())

  enemycharacter = snapshot.key
//console.log(enemycharacter)


enemychar()


  firebase.database().ref("room/"+[roomCode]+"/"+[enemyID]+"/"+[enemycharacter]).on('value',function(a){a.forEach(function(snapshot){
       // console.log(snapshot.key)
       if (snapshot.key != "keep"){
        enemyHand = snapshot.key

       }
  })
  })

 })
 })

} 

//PUT ENEMY CHARACTER ON YOUR SCREEN
function enemychar(){
//  console.log(window[enemycharacter].health)
document.getElementById("name2").innerHTML = window[enemycharacter].name;
document.getElementById("health2").innerHTML = window[enemycharacter].health+"/"+window[enemycharacter].currenthealth;
  document.getElementById("rock2").innerHTML = window[enemycharacter].rock;
  document.getElementById("paper2").innerHTML = window[enemycharacter].scissor;
  document.getElementById("scissor2").innerHTML = window[enemycharacter].paper;
} 


      //console.log(myHand)
     // console.log("---")
     // console.log(enemyHand)
//THIS IS FOR THE RESULTS
if (myHand != 0){
  if (myHand != "keep"){
document.getElementById("yourhand").innerHTML = myHand;
  }
  else{
    document.getElementById("yourhand").innerHTML = "select";
  }
}


if (enemyHand == 0){
  wol = 4
}


if (myHand == 'paper' && enemyHand == 'rock'){
wol = 1
}
if (myHand == 'paper' && enemyHand == 'paper'){
wol = 2
}
if (myHand == 'paper' && enemyHand == 'scissor'){
wol = 3
}
if (myHand == 'rock' && enemyHand == 'scissor'){
wol = 1
}
if (myHand == 'rock' && enemyHand == 'rock'){
wol = 2  
}
if (myHand == 'rock' && enemyHand == 'paper'){
wol = 3
}
if (myHand == 'scissor' && enemyHand == 'paper'){
wol = 1
}
if (myHand == 'scissor' && enemyHand == 'scissor'){
wol = 2
}
if (myHand == 'scissor' && enemyHand == 'rock'){
wol = 3
}


if (wol == 1) {
  document.getElementById("winorlose").innerHTML = "You Win";
  document.getElementById("enemyhand").innerHTML = enemyHand;
}
if (wol == 2) {
  document.getElementById("winorlose").innerHTML = "tie";
  document.getElementById("enemyhand").innerHTML = enemyHand;
}
if (wol == 3) {
  document.getElementById("winorlose").innerHTML = "You lost";
  document.getElementById("enemyhand").innerHTML = enemyHand;
}
if (wol == 4) {
  document.getElementById("winorlose").innerHTML = "Wait for the other player";
}





  })
})
}




function refresh(){
firebase.database().ref("room/").once('value').then(function(a){
    a.forEach(function(snapshot){
    var elem = document.getElementById(snapshot.key);
    elem.parentNode.removeChild(elem);

})
})
}


var lengthRoom = 0
firebase.database().ref("room/").once('value').then(function(a){
  
  lengthRoom = Object.keys(a.val()).length -1 
 // console.log(lengthRoom)
})


setTimeout('showRoom()', 1000) 

function showRoom(){
firebase.database().ref("room/").limitToFirst(lengthRoom).once('value').then(function(a){
    a.forEach(function(snapshot){
    // console.log(snapshot.key)
   
    var newButton = document.createElement("BUTTON")

    document.getElementById("rooms").appendChild(newButton);
    
     newButton.setAttribute("id", snapshot.key)
      
     newButton.setAttribute("onclick","join(this.id)")

     document.getElementById(snapshot.key).innerHTML = snapshot.key
  

  })
    
})

}


postSnapShotKey = 0
firebase.database().ref("room/").limitToLast(1).on('value',function(a){
  a.forEach(function(snapshot){

   // console.log(snapshot.key+"snapshot key")
    if (snapshot.key!=postSnapShotKey){
    var newButton = document.createElement("BUTTON")

    document.getElementById("rooms").appendChild(newButton);
    
     newButton.setAttribute("id", snapshot.key)
      
     newButton.setAttribute("onclick","join(this.id)")

     document.getElementById(snapshot.key).innerHTML = snapshot.key

     postSnapShotKey = snapshot.key
     }
  })
})




//function replay(){
  //  firebase.database().ref("room/"+[roomCode]).once('value',function(a){
  //a.forEach(function(snapshot){
  //console.log(snapshot.key)
  
 //if (snapshot.key == userid){
    //    myID = snapshot.key  
    //  }
    //  else{
    //    enemyID = snapshot.key
    //  }   
       
     // console.log(myID)
     // console.log("---")
    //  console.log(enemyID)
      
      //firebase.database().ref("room/"+[roomCode]+"/"+[myID]).remove()
    //  firebase.database().ref("room/"+[roomCode]+"/"+[enemyID]).remove()

 // })
 //})
  
//}


function dlete(){
firebase.database().ref("room/"+[roomCode]).remove()
}


function dar(){
  firebase.database().ref().remove()
}




function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}







//console.log(Dummy.health)

function character(x){
 // console.log(x.name)

firebase.database().ref("room/"+[roomCode]+"/"+[userid]).set({
    [x.name] :1
    
    })

  
characterr = x.name

  document.getElementById("name1").innerHTML = x.name;
  document.getElementById("health1").innerHTML = x.health + "/"+x.currenthealth;
  document.getElementById("rock1").innerHTML = x.rock;
  document.getElementById("paper1").innerHTML = x.scissor;
  document.getElementById("scissor1").innerHTML = x.paper;
  
}



function next(){
  document.getElementById("rps").style.display = "none"
 ready = "ready"
  firebase.database().ref("room/"+[roomCode]+"/"+[userid]+"/"+[characterr]).update({
  [ready]:0


  })

firebase.database().ref("room/"+[roomCode]+"/"+[userid]+"/"+[characterr]).once('value',function(a){a.forEach(function(snapshot){

if(snapshot.key != "keep" && snapshot.key != "ready"){
console.log(snapshot.key)
a = snapshot.key

firebase.database().ref("room/"+[roomCode]+"/"+[userid]+"/"+[characterr]+"/"+[a]).remove()

}

})
})

firebase.database().ref("room/"+[roomCode]+"/"+[enemyID]+"/"+[enemycharacter]).on('value',function(a){a.forEach(function(snapshot){

if(snapshot.key == "ready"){
   document.getElementById("rps").style.display = "block"
firebase.database().ref("room/"+[roomCode]+"/"+[userid]+"/"+[characterr]+"/ready").remove()

}


})
})




}
