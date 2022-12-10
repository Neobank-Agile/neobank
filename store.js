const pool = require("./config/database");

const createAccount = (request, response) => {
  console.log(request.body);
  const {
    first_name,
    last_name,
    email,
    phone,
    password,
    second_factor,
    status,
  } = request.body;
  pool.query(
    "insert into accounts(first_name,last_name,email,phone,password,second_factor,status) values($1, $2, $3, $4, $5, $6, $7) returning id",
    [first_name, last_name, email, phone, password, second_factor, status],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Account added with ID: ${results.rows[0].id}\n`);
    }
  );
};

module.exports = {
  createAccount,
};
