// read configuration from env vars
require("dotenv").config();

const port = process.env.PORT || 3000;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const db = require("./store");

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// routes
app.post("/accounts", db.createAccount);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
