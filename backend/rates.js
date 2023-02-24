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
    );
  }
  catch (err) {
    console.error(err);
  }
};

const getRates = (request, response) => {
  let { timestamp, from, to } = request.query;
  // debug
  // console.log(timestamp, from, to);

  let query = "";
  if (from === "usd") {
    to = to ?? 'eur';
    query = "select time_stamp, rate from rates where time_stamp=COALESCE($1, '2023-02-15')::timestamp and curr_from=$2 and curr_to=$3;"
  }
  else {
    from = from ?? 'eur';
    to = to ?? 'usd';
    query = "select time_stamp, (1/rate) as rate from rates where time_stamp=COALESCE($1, '2023-02-15')::timestamp and curr_from=$3 and curr_to=$2;"
  }

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
