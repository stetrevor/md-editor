import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyByL1dv3jV9V4y1jxfRx9DJz1hwSy4K0rc",
  authDomain: "writer-joshua.firebaseapp.com",
  databaseURL: "https://writer-joshua.firebaseio.com",
  projectId: "writer-joshua",
  storageBucket: "writer-joshua.appspot.com",
  messagingSenderId: "383614170299",
  appId: "1:383614170299:web:c8702657a838e4afc5659e"
});

export default firebase;
