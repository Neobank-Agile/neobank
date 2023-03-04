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
  const { password, status, id } = request.body;

  if (!id) {
    response.status(422).send({ error: "no id provided" });
    return;
  }
  if (!password && !status) {
    response
      .status(422)
      .send({ error: "password or status should be provided" });
    return;
  }
  pool.query(
    "update accounts set password=coalesce($1,password), status=coalesce($2,status) where id = $3",
    [password, status, id],
    (error, results) => {
      if (error) {
        response.status(500).send({ error });
      }

      response.status(200).send({});
    }
  );
};

const getAccount = (request, response) => {
  if (!request.query.id) {
    response.status(422).send({ error: "no id provided" });
    return;
  }
  const id = request.query.id;
  pool.query(
    "select * from accounts where id  = $1 ",
    [id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
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
