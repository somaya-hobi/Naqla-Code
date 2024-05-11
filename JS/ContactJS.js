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
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var txt_name = getElementVal("txt_name");
    var txt_email = getElementVal("txt_email");
    var txt_message = getElementVal("txt_message");
  
    saveMessages(txt_name, txt_email, txt_message);
  
    //   enable alert
    document.querySelector(".alert").style.display = "block";
  
    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    //   reset the form
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (txt_name, txt_email, txt_message) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: txt_name,
      emailid: txt_email,
      msgContent: txt_message,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
