/* fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTc0ZjRjNTllYzAwMTk5MGQ2ZTQiLCJpYXQiOjE3MDkyODc1NDgsImV4cCI6MTcxMDQ5NzE0OH0.U8XNafNCJbo0Yq6MN0cSl0ysXfdMifNNsggpvqQNsW8",
  },
}); */

const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTc0ZjRjNTllYzAwMTk5MGQ2ZTQiLCJpYXQiOjE3MDkyODc1NDgsImV4cCI6MTcxMDQ5NzE0OH0.U8XNafNCJbo0Yq6MN0cSl0ysXfdMifNNsggpvqQNsW8";
const url = "https://striveschool-api.herokuapp.com/api/product/";

///////////////////////////////////////////////

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  postData();
});
function postData() {
  const titolo = document.getElementById("Titolo").value;
  const descrizione = document.getElementById("Descrizione").value;
  const brand = document.getElementById("brand").value;
  const imgUrl = document.getElementById("img").value;
  const prezzo = document.getElementById("prezzo").value;

  const data = {
    name: titolo,
    description: descrizione,
    brand: brand,
    imageUrl: imgUrl,
    price: prezzo,
  };
  fetch(url, {
    method: "POST", // è come scrivere method: method,
    body: JSON.stringify(data), // è fondamentale fare la stringhifizzazione dell'oggetto nativo o invieremo "[object Object]"
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("400 - Errore lato client");
        }
        if (response.status === 404) {
          throw new Error("404 - Dato non trovato");
        }
        if (response.status === 500) {
          throw new Error("500 - Errore lato server");
        }
        throw new Error("Errore nel reperimento dati");
      }
    })
    .then((newAppointment) => {
      if (newAppointment) {
        alert("Appuntamento con id: " + " è stato modificato con successo ");
      } else {
        alert("Appuntamento con id: " + " è stato creato correttamente");
        e.target.reset();
      }
    })
    .catch((err) => console.log(err));
}
