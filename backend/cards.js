const pool = require("./config/database");

const createCard = (request, response) => {
  const { card_type, card_number, expiration, holder, csv } = request.body;
  // retrieve user id from auth token
  const account_id = response.locals.userId;
  pool.query(
    "insert into cards (account_id,card_type,card_number,expiration,holder,csv) values($1, $2, $3, $4, $5, $6) returning id",
    [account_id, card_type, card_number, expiration, holder, csv],
    (error, results) => {
      if (error) {
        response.status(500).send({ error });
      }

      response.status(201).send({
        id: results.rows[0].id,
        account_id,
        card_type,
        card_number,
        expiration,
        holder,
        csv,
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

const deleteCard = (request, response) => {
  const { id } = request.query;
  // retrieve user id from auth token
  const account_id = response.locals.userId;
  pool.query("delete from cards where id = $1", [id], (error, results) => {
    if (error) {
      response.status(500).send({ error });
    }

    response.status(200).send({ ok: true });
  });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
};
