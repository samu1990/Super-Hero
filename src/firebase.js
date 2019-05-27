const firebase = require("firebase/app");
require("firebase/auth");
//require("firebase/database");
require("firebase/firestore");
require("firebase/storage");
//require("firebase/messaging");
//require("firebase/functions");


const firebaseConfig = {
  apiKey: "AIzaSyAXHBYVVtW-UYw6eO_ZagWSuhAimdHyo0A",
  authDomain: "valued-cumulus-149420.firebaseapp.com",
  databaseURL: "https://valued-cumulus-149420.firebaseio.com",
  projectId: "valued-cumulus-149420",
  storageBucket: "valued-cumulus-149420.appspot.com",
  messagingSenderId: "592466972604",
  appId: "1:592466972604:web:87e10dac96514ae8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {
  firebase,
  db,
  auth,
  storage
}