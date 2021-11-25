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

  
myHand = 0
enemyHand = 0

roomCode = 0
userid=uuidv4()

function hand(x){

    firebase.database().ref("room/"+[roomCode]).update({
    [userid]: x
    })
    
  }

function create(){

  roomCode = new Date().getTime()
  firebase.database().ref("room/").update({
  [roomCode]:3
  })


  console.log('you are in the room'+roomCode)
}

function join(x){
  roomCode = x
}

function joinButton(){
  firebase.database().ref("room/").once('value').then(function(a){
    a.forEach(function(snapshot){
      
      console.log(snapshot.key)
  
    if (snapshot.key != ""){
    var newButton = document.createElement("BUTTON")

    document.getElementById("hi").appendChild(newButton);
    
     newButton.setAttribute("id",snapshot.key)
      
     newButton.setAttribute("onclick","join(this.id)")

     document.getElementById(snapshot.key).innerHTML = snapshot.key
    }


      })
    
  })
}

function roomcode(){
  console.log(roomCode)
}


function show(){
  
firebase.database().ref("room/"+[roomCode]).once('value').then(function(a){
    a.forEach(function(snapshot){

      console.log(snapshot.key)
      console.log(snapshot.val())
      if (snapshot.key == userid){
        myHand = snapshot.val()  
      }
      else{
        enemyHand = snapshot.val()
      }

      
  
 })

})


}
 
function test(){
console.log('-------------------')
console.log(enemyHand)
console.log(myHand)

if (myHand == 'paper' && enemyHand == 'rock'){
console.log('you win')
}
if (myHand == 'paper' && enemyHand == 'paper'){
console.log('tie')
}
if (myHand == 'paper' && enemyHand == 'scissor'){
console.log('you lose')
}
if (myHand == 'rock' && enemyHand == 'rock'){
console.log('you tie')
}
if (myHand == 'rock' && enemyHand == 'paper'){
console.log('lose')
}
if (myHand == 'rock' && enemyHand == 'scissor'){
console.log('you win')
}
if (myHand == 'scissor' && enemyHand == 'rock'){
console.log('you lose')
}
if (myHand == 'scissor' && enemyHand == 'paper'){
console.log('you win')
}
if (myHand == 'scissor' && enemyHand == 'scissor'){
console.log('tie')
}

}









function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
