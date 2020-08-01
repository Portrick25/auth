 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyC1SSuF6ibJw6vpzbb38WDVBl2f4EWXYJY",
    authDomain: "samchikitsa-f6d9b.firebaseapp.com",
    databaseURL: "https://samchikitsa-f6d9b.firebaseio.com",
    projectId: "samchikitsa-f6d9b",
    storageBucket: "samchikitsa-f6d9b.appspot.com",
    messagingSenderId: "196670220970",
    appId: "1:196670220970:web:201a0e8a9cce3cefb27ed3",
    measurementId: "G-TBY5QYXRB6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();
  const auth = firebase.auth();




function signUp(){
   var email =  document.getElementById("email");
   var password =  document.getElementById("password");

   const promise = auth.createUserWithEmailAndPassword(email.value, password.value).then(cred =>{
       return db.collection('users').doc(cred.user.uid).set({
           name : document.getElementById("name")
       })
   });
   promise.catch(e =>alert(e.message));

   alert('signed UP successfully');

}


function signIn(){
    var email =  document.getElementById("email");
    var password =  document.getElementById("password");
 
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    window.location.replace("http://www.samchikitsa-mobile.netlify.app");
    promise.catch(e =>alert(e.message));
 
    alert('signed In successfully');
 }


 function signOut(){
     auth.signOut();
     window.location.replace("http://www.samchikitsa-mobile.netlify.app");
     alert('signed Out')
 }


auth.onAuthStateChanged(function(user){
    if(user){
        var email = user.email;
        alert("active user  : " + email);

        //is signed in
    
    }else{
        alert('no active user');
    }
})


var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}



googleSignIn=()=>{
    base_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(base_provider).then(function(result){
      console.log(result)
      console.log("success. google account linked")
    }).catch(function(err){
      console.log("failed")
    })
}


window.onload = function(){
    render();
};

function render(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}

