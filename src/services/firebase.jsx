import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFxnuMaXeBzfJ1Rw7nXSwDXbD_Zlapuls",
  authDomain: "storygen-3ca1a.firebaseapp.com",
  projectId: "storygen-3ca1a",
  storageBucket: "storygen-3ca1a.firebasestorage.app",
  messagingSenderId: "720246060258",
  appId: "1:720246060258:web:c95709411780181f23dabb",
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);

// Inicializa Auth e Firestore
const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, auth, app, firestore };
