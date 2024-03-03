const row = document.getElementsByClassName("row")[0];

const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTc0ZjRjNTllYzAwMTk5MGQ2ZTQiLCJpYXQiOjE3MDkzODc4OTQsImV4cCI6MTcxMDU5NzQ5NH0.fJUCEyhI4pIrrVsPe3b_USwlFMg0toReqi7EoMED1gQ";

const url = "https://striveschool-api.herokuapp.com/api/product/";

function creaCard(immagine, title, descrizione, id) {
  const col = document.createElement("div");
  col.className = "col-6 col-md-3";

  const card = document.createElement("div");
  card.className = "card shadow rounded";
  card.style.height = "23rem";

  const img = document.createElement("img");
  img.className = "card-img-top object-fit-cover";
  img.src = immagine;
  img.style.height = "60%";

  const body = document.createElement("div");
  body.className = "card-body";

  const h5 = document.createElement("h5");
  h5.className = "card-title fw-semibold";
  h5.textContent = title;

  const p = document.createElement("p");
  p.className = "card-text";
  p.textContent = descrizione;

  const btnDettaglio = document.createElement("a");
  btnDettaglio.href = `./detail.html?idProdotto=${id}`;
  btnDettaglio.className = "btn btn-dark btn-sm me-2 w-25 rounded";
  btnDettaglio.innerText = "Info";

  const btnModifica = document.createElement("a");
  btnModifica.href = `./back-office.html?idProdotto=${id}`;
  btnModifica.className = "btn btn-danger btn-sm rounded";
  btnModifica.innerText = "Modifica";

  row.appendChild(col);
  col.appendChild(card);
  card.appendChild(img);
  card.appendChild(body);
  body.appendChild(h5);
  body.appendChild(p);
  body.appendChild(btnDettaglio);
  body.appendChild(btnModifica);
}

fetch(url, {
  method: "GET",
  headers: {
    Authorization: apiKey,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
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
    newAppointment.forEach((oggetto) => {
      creaCard(oggetto.imageUrl, oggetto.name, oggetto.description, oggetto._id);
    });
  })
  .catch((err) => console.log(err));
