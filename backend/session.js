const pool = require("./config/database");
const jwt = require("jsonwebtoken");

const login = (request, response) => {
  const { email, password } = request.body;
  pool.query(
    "select id from accounts where email = $1 and password = $2 ",
    [email, password],
    (error, results) => {
      if (error) {
        response.status(500).send({ error });
        return;
      }

      if (results.rows.length !== 1) {
        response.status(422).send({ error: "invalid login" });
        return;
      }

      //let jwtSecretKey = process.env.JWT_SECRET_KEY;
      let jwtSecretKey = "neobank_JWT_SECRET_KEY";
      let data = {
        time: Date(),
        userId: results.rows[0].id,
      };

      const token = jwt.sign(data, jwtSecretKey);

      response.status(201).send({ token });
    }
  );
};

module.exports = {
  login,
};
