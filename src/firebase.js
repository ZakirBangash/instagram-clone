import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyD_8uooQ-nDSYiiSVHFkoE4OxdpACBNa9Q",
    authDomain: "instagram-clone-7c5ea.firebaseapp.com",
    databaseURL: "https://instagram-clone-7c5ea.firebaseio.com",
    projectId: "instagram-clone-7c5ea",
    storageBucket: "instagram-clone-7c5ea.appspot.com",
    messagingSenderId: "738665760875",
    appId: "1:738665760875:web:0f6220417c3c28e6a9092e",
    measurementId: "G-Q239X34MVL"

});


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};

