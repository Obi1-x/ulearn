import "/__/firebase/9.1.0/firebase-app-compat.js"
import "/__/firebase/9.1.0/firebase-auth-compat.js"
import "/__/firebase/9.1.0/firebase-database-compat.js"
import "/__/firebase/9.1.0/firebase-storage-compat.js"
import "/__/firebase/9.1.0/firebase-analytics-compat.js"

const firebaseConfig = {
     apiKey: "AIzaSyBWfCo44afVSfGor1qPrjTXJktOZni2xOo",
     authDomain: "ulearn-ffc79.firebaseapp.com",
     databaseURL: "https://ulearn-ffc79-default-rtdb.firebaseio.com",
     projectId: "ulearn-ffc79",
     storageBucket: "ulearn-ffc79.appspot.com",
     messagingSenderId: "187142078708",
     appId: "1:187142078708:web:7e4fea560c75805a731ea1",
     measurementId: "G-X5RPWYLHVV"
    };

//Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
var database = firebase.database();
// Get a reference to the storage service
var storage = firebase.storage();
//const analytics = getAnalytics(app);