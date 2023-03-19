const productList = document.querySelector("#productList");
const productInput = document.querySelector("#productInput");
const priceInput = document.querySelector("#priceInput");
const productSubmitBtn = document.querySelector("#productSubmit");

const products = [];

//Funksjon for popup velkomstmelding (Leste meg opp på w3schools)
const welcome = document.querySelector(".welcome-container");
const closeBtn = document.querySelector(".close-btn");

window.addEventListener("load", function () {
  welcome.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  welcome.style.display = "none";
});

// Legge til funksjon til button
productSubmitBtn.addEventListener("click", addProduct);

// Lar brukeren kunne trykke "Enter" tasten etter å ha skrevet inn i input-feltene. (Inspirasjon fra W3Schools)
productInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addProduct();
  }
});

priceInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addProduct();
  }
});

// Funksjon for å legge til et produkt på slutten i liste... (Skolemateriale)
function addProduct() {
  const productName = productInput.value;
  const productPrice = Number(priceInput.value);

  // Hvis ikke det er angitt noe produktnavn så alert
  if (!productName) {
    alert("Produktnavn ikke angitt");
    return;
    // Eller hvis produktpris ikke er angitt eller prisen er 0 eller mindre så alert
  } else if (!productPrice || productPrice <= 0) {
    alert(
      "Pris ikke angitt. Det kan kun legges inn tall, og tallet må være høyere enn 0."
    );
    return;
    // Om kriteriene over er oppfyllt vil produktet og prisen vises på siden
  } else {
    const product = {
      name: productName,
      price: productPrice,
    };
    products.push(product);

    productList.innerHTML = "";
    productInput.value = "";
    priceInput.value = "";
  }
  updateList();
  updateSum();
}

// Funksjon for å oppdatere produktlisten
function updateList() {
  for (let i = 0; i < products.length; i++) {
    productList.innerHTML += ` 
    <li>
      ${products[i].name} - ${products[i].price},-
      <button class="removeBtn" onclick="removeProduct(${i})">X</button>
    </li>
  `;
  }
}

// Funksjon for å oppdatere totalsummen
function updateSum() {
  let totalSum = 0;
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    totalSum += Number(product.price);
  }
  const sumOutput = document.querySelector("#sumOutput");
  sumOutput.innerHTML = `${totalSum},-`;
}

// Funksjon for å fjerne valgfritt produkt fra listen
function removeProduct(index) {
  //Legge til en confirm() metode som åpner en dialogbox med en beskjed og OK/Cancel button. OK = True. Annet = False
  const confirmDelete = confirm("Vil du slette dette produktet fra listen?");
  if (confirmDelete) {
    products.splice(index, 1);

    productList.innerHTML = "";

    updateList();
    updateSum();
  }
}
