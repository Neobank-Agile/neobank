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

// authorized routes
app.put("/accounts", auth.authorized, accounts.updateAccount);
app.get("/accounts", auth.authorized, accounts.getAccount);
app.get("/rates", auth.authorized, rates.getRates);
app.post("/cards", auth.authorized, cards.createCard);
app.get("/cards", auth.authorized, cards.getCards);

// administrative routes
app.post("/rates", auth.admin, rates.createRate);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
