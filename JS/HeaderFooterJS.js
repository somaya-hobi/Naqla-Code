const headerContainer = document.getElementById("header-container");
const footerContainer = document.getElementById("footer-container");

function insertHeader() {
  fetch("../HTML/Header.html")
    .then(response => response.text())
    .then(data => {
      headerContainer.innerHTML = data;
    })
    .catch(error => console.error(error));
}

function insertFooter() {
  fetch("../HTML/Footer.html")
    .then(response => response.text())
    .then(data => {
      footerContainer.innerHTML = data;
    })
    .catch(error => console.error(error));
}

insertHeader();
//insertFooter();