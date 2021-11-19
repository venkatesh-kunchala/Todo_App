import firebase from 'firebase/app';
import 'firebase/firestore';

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDhJPdtHZCgPUrwA4hHiwmZPrVu7uxPD_4",
    authDomain: "todo-app-cp-27582.firebaseapp.com",
    projectId: "todo-app-cp-27582",
    storageBucket: "todo-app-cp-27582.appspot.com",
    messagingSenderId: "432375304487",
    appId: "1:432375304487:web:d8cbd34595951f2b681902",
    measurementId: "G-XR56J84ZYF"
  });

  const db = firebaseApp.firestore();

  export default db;