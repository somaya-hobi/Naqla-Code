// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

class House {

    constructor() {
        // Your web app's Firebase configuration
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

        // Initialize Firebase
        this.app = firebase.initializeApp(this.firebaseConfig);
        this.database = firebase.database(this.app);
    }

    addHouse() {
        const housename = document.getElementById('housename').value;
        const houseaddress = document.getElementById('houseaddress').value;
        const photo = document.getElementById('Photo').value;

        const newHouseRef = push(ref(database, 'Houses'));
        set(newHouseRef, {
            name: housename,
            address: houseaddress,
            photo: photo
        }).then(() => {
            alert('House added successfully!');
        }).catch((error) => {
            console.error('Error adding house: ', error);
            alert('Error adding house: ' + error.message);
        });
    }
}

// Usage
const house = new House();

// Event listener for adding a house
document.getElementById('addHouse').addEventListener('click', (e) => {
    e.preventDefault();
    house.addHouse();
});