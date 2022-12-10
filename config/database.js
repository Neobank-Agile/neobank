const pg = require("pg").Pool;
const connectionString =
  process.env.DB_URL ||
  "postgres://postgres:secret@localhost:5432/neobank?sslmode=disable";

const db = new pg({
  connectionString: connectionString,
});

module.exports = db;
