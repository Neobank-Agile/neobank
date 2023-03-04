const pool = require("./config/database");

const createRate = (request, response) => {
  const { from, to, rate } = request.body;
  pool.query(
    "insert into rates (curr_from,curr_to,rate) values($1, $2, $3) returning id",
    [from, to, rate],
    (error, results) => {
      if (error) {
        response.status(500).send({ error });
        return;
      }

      if (!results.rows) {
        response
          .status(422)
          .send({ error: "invalid parameters to create rate" });
        return;
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
    "select curr_from,curr_to, max(rate) as rate from rates where curr_from  = coalesce($1,curr_from) and curr_to = coalesce($2,curr_to) group by 1,2 ",
    [from, to],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (!results.rows) {
        response.status(422).send({ error: "cannot retrieve rows" });
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
