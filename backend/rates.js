const pool = require("./config/database");

const createRate = (request, response) => {
  const { from, to, rate } = request.body;
  pool.query(
    "insert into rates (curr_from,curr_to,rate) values($1, $2, $3) returning id",
    [from, to, rate],
    (error, results) => {
      if (error) {
        response.status(500).send({ error });
      }

      response.status(201).send({
        id: results.rows[0].id,
        from,
        to,
        rate,
      });
    }
  );
};

const getRates = (request, response) => {
  const { from, to } = request.query;
  pool.query(
    "select * from rates where curr_from  = coalesce($1,curr_from) and curr_to = coalesce($2,curr_to) ",
    [from, to],
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
  createRate,
  getRates,
};
