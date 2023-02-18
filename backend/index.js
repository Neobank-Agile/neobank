// read configuration from env vars
require("dotenv").config();

const port = process.env.PORT || 3001;
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const accounts = require("./accounts");
const rates = require("./rates");
const cards = require("./cards");
const auth = require("./auth");
const transactions = require("./transactions");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// routes
app.post("/accounts", accounts.createAccount);
app.post("/login", auth.login);
app.get("/rates", rates.getRates);

// authorized routes
app.put("/accounts", auth.authorized, accounts.updateAccount);
app.get("/accounts", auth.authorized, accounts.getAccount);
app.post("/cards", auth.authorized, cards.createCard);
app.get("/cards", auth.authorized, cards.getCards);
app.delete("/cards", auth.authorized, cards.deleteCard);
app.post("/transactions", auth.authorized, transactions.createTransaction);
app.get("/transactions", auth.authorized, transactions.getTransactions);
app.get("/balances", auth.authorized, transactions.getBalances);

// administrative routes
app.post("/rates", rates.createRate);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
