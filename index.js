const row = document.getElementsByClassName("row")[0];

function creaCard(immagine, title, descrizione) {
  const col = document.createElement("div");
  row.appendChild(col);
  col.className = "col-6 col-md-3";

  const card = document.createElement("div");
  col.appendChild(card);
  card.className = "card";
  card.style.width = "18rem";

  const img = document.createElement("img");
  card.appendChild(img);
  img.className = "card-img-top";
  img.src = immagine;

  const body = document.createElement("div");
  card.appendChild(body);
  body.className = "card-body";

  const h5 = document.createElement("h5");
  body.appendChild(h5);
  h5.className = "card-title";
  h5.textContent = title;

  const p = document.createElement("p");
  body.appendChild(p);
  p.className = "card-text";
  p.textContent = descrizione;

  const btnDettaglio = document.createElement("a");
  body.appendChild(btnDettaglio);
  btnDettaglio.className = "btn btn-primary fw-semibold";
  btnDettaglio.textContent = "Dettaglio";
  btnDettaglio.href = "./detail.html";

  const btnModifica = document.createElement("a");
  body.appendChild(btnModifica);
  btnModifica.className = "btn btn-info ms-2 text-white fw-semibold";
  btnModifica.textContent = "Modifica";
  btnModifica.href = "./back-office.html";
}

//Fetch///////////////////

const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTc0ZjRjNTllYzAwMTk5MGQ2ZTQiLCJpYXQiOjE3MDkyODc1NDgsImV4cCI6MTcxMDQ5NzE0OH0.U8XNafNCJbo0Yq6MN0cSl0ysXfdMifNNsggpvqQNsW8";
const url = "https://striveschool-api.herokuapp.com/api/product/";
///////////////////////////////////
fetch(url, {
  method: "GET",
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
    console.log(newAppointment);

    newAppointment.forEach((oggetto) => {
      creaCard(oggetto.imageUrl, oggetto.name, oggetto.description, oggetto.brand);
    });
  })
  .catch((err) => console.log(err));
