import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // your Firebase credentials go here
  apiKey: "AIzaSyAKiZzGZHajDUch_lNan6iANpaQSW6yLg0",
  authDomain: "facebook-messenger-114d3.firebaseapp.com",
  databaseURL: "https://facebook-messenger-114d3.firebaseio.com",
  projectId: "facebook-messenger-114d3",
  storageBucket: "facebook-messenger-114d3.appspot.com",
  messagingSenderId: "366264047157",
  appId: "1:366264047157:web:0dff5e6330e3137575837c",
  measurementId: "G-3TR3V4DN85",
});

const db = firebaseApp.firestore();

export default db;
