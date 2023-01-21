// read configuration from env vars
require("dotenv").config();

const port = process.env.PORT || 3001;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const accounts = require("./accounts");
const rates = require("./rates");
const session = require("./session");

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// routes
app.post("/accounts", accounts.createAccount);
app.put("/accounts", accounts.updateAccount);
app.get("/accounts", accounts.getAccount);
app.post("/rates", rates.createRate);
app.get("/rates", rates.getRates);
app.post("/login", session.login);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
