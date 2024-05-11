import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

class User {

    constructor() {
        // Your Firebase configuration
        this.firebaseConfig = {
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
        this.auth = firebase.getAuth();
    }

    bookTicket() {
        const mail = document.getElementById('mail').value;
        const ticketId = document.getElementById('ticket').value; // Store ticket ID as foreign key
        const confirmationModal = document.getElementById('confirmationModal');
        const confirmationMessageElement = document.getElementById('confirmationMessage');

        try {
            // Search for user ID using email
            const usersRef = ref(database, 'users');
            const snapshot = async(usersRef);

            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                if (userData.email === mail) {
                    const userId = childSnapshot.key;

                    // Check if ticket ID exists before creating a ticket
                    const ticketRef = ref(database, 'Tickets/' + ticketId);
                    get(ticketRef).then((ticketSnapshot) => {
                        if (ticketSnapshot.exists()) {
                            // Create a new database named bookedTickets
                            const newTicketRef = push(ref(database, 'bookedTickets'));
                            set(newTicketRef, {
                                ticketId: ticketId, // Store ticket ID as foreign key
                                userId: userId // Store user ID
                            }).then(() => {
                                const ticketData = ticketSnapshot.val();
                                const confirmationMessage = `Name: ${name}\n
                                Email: ${mail}\n
                                Month: ${ticketData.ticketMonth}\n
                                Day: ${ticketData.ticketDay}\n
                                Time: ${ticketData.ticketTime}`;
                                confirmationMessageElement.textContent = confirmationMessage;
                                confirmationModal.style.display = 'block';
                                //alert('Ticket booked successfully!');
                            }).catch((error) => {
                                console.error('Error booking ticket: ', error);
                                alert('Error booking ticket: ' + error.message);
                            });
                        } else {
                            alert('Invalid TICKET ID. Please enter a valid ID.');
                        }
                    }).catch((error) => {
                        console.error('Error checking ticket: ', error);
                        alert('An error occurred');
                    });
                }
            });
        } catch (error) {
            console.error('Error searching for user: ', error);
            alert('An error occurred');
        }
    }

    signUp() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;
        const phoneNumber = document.getElementById('phoneNumber').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;

                // Store additional user information in the database
                set(ref(database, 'users/' + user.uid), {
                    username: username,
                    email: email,
                    phoneNumber: phoneNumber
                }).then(() => {
                    alert('Signed Up successfully!');

                }).catch((error) => {
                    alert(error.message);
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    login() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert('Login successful!');
                // Redirect to another page or perform further actions
                window.location.href = '../HTML/Home.html';
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }
}

// Usage
const user = new User();

// Event listener for adding a ticket
document.getElementById('bookingForm').addEventListener('click', (e) => {
    e.preventDefault();
    user.bookTicket();
});

// Event listener for signin up
document.getElementById('signup').addEventListener('click', (e) => {
    e.preventDefault();
    user.signUp();
});

// Event listener for login
document.getElementById('login').addEventListener('click', (e) => {
    e.preventDefault();
    user.login();
});