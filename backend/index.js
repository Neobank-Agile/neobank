// read configuration from env vars
require("dotenv").config();

const port = process.env.PORT || 3001;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const accounts = require("./accounts");
const rates = require("./rates");
const auth = require("./auth");

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

// administrative routes
app.post("/rates", auth.admin, rates.createRate);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
