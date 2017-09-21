import Firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBa7AHgeeKObEk0AoNNi8E3AGE7HVIdo0g",
    authDomain: "thrive-app-3a3bc.firebaseapp.com",
    databaseURL: "https://thrive-app-3a3bc.firebaseio.com",
    projectId: "thrive-app-3a3bc",
    storageBucket: "thrive-app-3a3bc.appspot.com",
    messagingSenderId: "869272160764"
  }
  
Firebase.initializeApp(config);

export default Firebase


  