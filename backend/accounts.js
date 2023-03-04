const pool = require("./config/database");

const createAccount = (request, response) => {
  const { username, email, phone, password, second_factor, status } =
    request.body;
  pool.query(
    "insert into accounts(username,email,phone,password,second_factor,status) values($1, $2, $3, $4, $5, $6) returning id",
    [username, email, phone, password, second_factor, status],
    (error, results) => {
      if (error) {
        response.status(500).send({ error });
        return;
      }

      if (!results.rows) {
        response
          .status(422)
          .send({ error: "invalid parameters to create account" });
        return;
      }

      response.status(201).send({
        id: results.rows[0].id,
        username,
        email,
        phone,
        second_factor,
        status,
      });
    }
  );
};

const updateAccount = (request, response) => {
  const { username, email, phone, password } = request.body;
  // retrieve user id from auth token
  const account_id = response.locals.userId;

  if (!password || !email || !phone || !username || !account_id) {
    response.status(422).send({
      error: "account id, password , email , phone and username are required",
    });
    return;
  }
  pool.query(
    "update accounts set username = coalesce($1,username), email= coalesce($2,email), phone = coalesce(phone, $3),  password=coalesce($4,password) where id = $5",
    [username, email, phone, password, account_id],
    (error, results) => {
      if (error) {
        response.status(500).send({ error });
      }

      response.status(200).send({});
    }
  );
};

const getAccount = (request, response) => {
  // retrieve user id from auth token
  const account_id = response.locals.userId;
  pool.query(
    "select * from accounts where id  = $1 ",
    [account_id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
        return;
      }
      if (!results.rows) {
        response.status(422).send({ error: "account not found" });
        return;
      }
      response.status(200).send(results.rows);
    }
  );
};

module.exports = {
  getAccount,
  createAccount,
  updateAccount,
};
