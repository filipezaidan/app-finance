import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyDyExSDX9UZLJQJhGUMmA4fZ7UkKc2Iym0",
    authDomain: "app-finance-808d6.firebaseapp.com",
    projectId: "app-finance-808d6",
    storageBucket: "app-finance-808d6.appspot.com",
    messagingSenderId: "1037823480349",
    appId: "1:1037823480349:web:aa7fddf589255a4312acf4",
    measurementId: "G-8M3E35ZX0V"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
