import firebase from 'firebase/compat/app';
import 'firebase/compat/database';    // for realtime database

const firebaseConfig = {
    apiKey: "AIzaSyCgBEeqpfLUpRcTuF6sA4SZMDR5aBJNsIQ",
    authDomain: "econnect-db.firebaseapp.com",
    databaseURL: "https://econnect-db-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "econnect-db",
    storageBucket: "econnect-db.appspot.com",
    messagingSenderId: "517009271779",
    appId: "1:517009271779:web:99ee316bb77de082c0ced6"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
export default firebase;