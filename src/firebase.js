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

/*const postDataConfig = {
    apiKey: "AIzaSyDx11FU-J-M-JDcOaBkGNakjK7mjnWjEw8",
    authDomain: "post-data-fb032.firebaseapp.com",
    databaseURL: "https://post-data-fb032-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "post-data-fb032",
    storageBucket: "post-data-fb032.appspot.com",
    messagingSenderId: "464047198047",
    appId: "1:464047198047:web:5ef23bf2ae1473c080b0ea"
};*/

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
export default firebase;