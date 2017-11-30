const Firebase = require('firebase')

var config = {
    apiKey: "AIzaSyChcTl-VSSvXeG1pymeTYlQb_mfi6jz2VA",
    authDomain: "thrive-app-neural.firebaseapp.com",
    databaseURL: "https://thrive-app-neural.firebaseio.com",
    projectId: "thrive-app-neural",
    storageBucket: "thrive-app-neural.appspot.com",
    messagingSenderId: "786349530257"
  };
  Firebase.initializeApp(config);

module.exports = Firebase


  