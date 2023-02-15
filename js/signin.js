// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCatcv_FNhm49WmGP6Op0fY3JqIXNTada4",
  authDomain: "tbr-studio.firebaseapp.com",
  projectId: "tbr-studio",
  storageBucket: "tbr-studio.appspot.com",
  messagingSenderId: "872371330756",
  appId: "1:872371330756:web:294662aff195c63f7e7391",
  measurementId: "G-6MHFPZSJEE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('fullname').value


  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('信箱或密碼輸入錯誤或空白!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false) {
    alert('名字輸入錯誤或空白!!')
    return
  }


  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        email: email,
        full_name: fullname,

        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)

      // DOne
      alert('註冊成功!!')
    })


    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('信箱或密碼輸入錯誤或空白!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)

      // DOne
      alert('登入成功!!')

      window.location.href="index.html";

    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}




function googleSignIn() {
var provider = new firebase.auth.GoogleAuthProvider()
firebase.auth().signInWithPopup(provider).then(function(result) {
 // This gives you a Facebook Access Token. You can use it to access the Facebook API.
 var token = result.credential.accessToken;
 // The signed-in user info.
 var user = result.user;
 // ...
}).catch(function(error) {
 // Handle Errors here.
 var errorCode = error.code;
 var errorMessage = error.message;
 // The email of the user's account used.
 var email = error.email;
 // The firebase.auth.AuthCredential type that was used.
 var credential = error.credential;
 // ...
});
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}