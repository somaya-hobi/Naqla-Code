class Ticket {

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
    }

    addTicket() {
        const houseId = document.getElementById('houseId').value;
        const time = document.getElementById('time').value;
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const countTicket = document.getElementById('count').value;

        // Check if house ID exists before creating a ticket
        firebase.database().ref('/Houses/' + houseId + '/').once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const newTicketRef = firebase.database().ref('Tickets').push();
                    newTicketRef.set({
                        houseId: houseId, // Store house ID as foreign key
                        ticketTime: time,
                        ticketDay: day,
                        ticketMonth: month,
                        ticketCount: countTicket
                    }).then(() => {
                        alert('Ticket added successfully!');
                    }).catch((error) => {
                        console.error('Error adding ticket: ', error);
                        alert('Error adding ticket: ' + error.message);
                    });
                } else {
                    alert('Invalid House ID. Please enter a valid ID.');
                }
            })
            .catch((error) => {
                console.error('Error checking house ID: ', error);
                alert('An error occurred');
            });
    }
}

// Usage
const ticket = new Ticket();


// Event listener for adding a ticket
document.getElementById('addTicket').addEventListener('click', (e) => {
    e.preventDefault();
    ticket.addTicket();
});
