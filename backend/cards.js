const pool = require("./config/database");

const createCard = (request, response) => {
  const { card_type, card_number, exp_month, exp_year } = request.body;
  // retrieve user id from auth token
  const account_id = response.locals.userId;
  pool.query(
    "insert into cards (account_id,card_type,card_number,exp_month,exp_year) values($1, $2, $3, $4, $5) returning id",
    [account_id, card_type, card_number, exp_month, exp_year],
    (error, results) => {
      if (error) {
        response.status(500).send({ error });
      }

      response.status(201).send({
        id: results.rows[0].id,
        account_id,
        card_type,
        card_number,
        exp_month,
        exp_year,
      });
    }
  );
};

const getCards = (request, response) => {
  // retrieve user id from auth token
  const account_id = response.locals.userId;
  pool.query(
    "select * from cards where account_id = $1 ",
    [account_id],
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
  createCard,
  getCards,
};
