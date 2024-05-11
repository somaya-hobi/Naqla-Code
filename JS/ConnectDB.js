// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAb-YVnmlKhe4NUAhGInLIPnBPepEjpLu8",
    authDomain: "naqla-vr.firebaseapp.com",
    databaseURL: "https://naqla-vr-default-rtdb.firebaseio.com",
    projectId: "naqla-vr",
    storageBucket: "naqla-vr.appspot.com",
    messagingSenderId: "532930291336",
    appId: "1:532930291336:web:a8fed45ec0fdeed728613d",
    measurementId: "G-HH44E4L1W6"
};
