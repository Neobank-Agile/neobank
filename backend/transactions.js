const pool = require("./config/database");

const createTransaction = (request, response) => {
  const { type, amount, source, destination, status } = request.body;
  // retrieve user id from auth token
  const account_id = response.locals.userId;
  pool.query(
    "insert into transactions (account_id,type,amount,source,destination,status) values($1, $2, $3, $4, $5, $6) returning id",
    [account_id, type, amount, source, destination, status],
    (error, results) => {
      if (error) {
        response.status(500).send({ error });
      }

      response.status(201).send({
        id: results.rows[0].id,
        account_id,
        type,
        amount,
        source,
        destination,
        status,
      });
    }
  );
};

const getTransactions = (request, response) => {
  // retrieve user id from auth token
  const account_id = response.locals.userId;
  pool.query(
    "select * from transactions where account_id = $1 order by created_at desc",
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

const getBalances = (request, response) => {
  // retrieve user id from auth token
  const account_id = response.locals.userId;
  pool.query(
    "select (case when type = 'deposit' or type = 'exchange_buy' then destination when type = 'withdrawal' or type = 'transfer' or type = 'exchange_sell' then source end ) currency, sum ((amount * case when type = 'deposit' or type = 'exchange_buy' then 1 when type = 'withdrawal' or type = 'transfer' or type = 'exchange_sell' then -1 end )) as balance from transactions where account_id = $1 group by 1",
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
  createTransaction,
  getTransactions,
  getBalances,
};
