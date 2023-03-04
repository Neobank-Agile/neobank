const pool = require("./config/database");
const jwt = require("jsonwebtoken");
//let jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtSecretKey = "neobank_JWT_SECRET_KEY";
const bearerKey = "Bearer";
//let adminAuthHeader = process.env.ADMIN_AUTH_HEADER;
const adminAuthHeader =
  "Admin abbb065c3fc6e070870ee624db930c990af364be6c8bc588a56123ab623a783e";
const invalidAuthMessage = "invalid authorization";

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

      if (!results.rows || results.rows.length !== 1) {
        response.status(422).send({ error: "invalid login" });
        return;
      }

      let data = {
        time: Date(),
        userId: results.rows[0].id,
      };

      const token = jwt.sign(data, jwtSecretKey);

      response.status(201).send({ token });
    }
  );
};

// authenticate user
const authorized = (request, response, next) => {
  // check auth header
  if (!request.headers.authorization) {
    response.status(401).send({ error: "authorization required" });
    return;
  }
  const tokenArr = request.headers.authorization.split(" ");
  if (tokenArr.length != 2 || tokenArr[0] != bearerKey) {
    response.status(401).send({ error: invalidAuthMessage });
    return;
  }
  const token = tokenArr[1];

  try {
    // decode token
    const decoded = jwt.verify(token, jwtSecretKey);
    // store decoded user id in local var
    response.locals.userId = decoded.userId;
    console.log("authorized:" + decoded.userId);
  } catch (err) {
    response.status(401).send({ error: invalidAuthMessage });
    return;
  }
  next();
};

// authenticate admin user
const admin = (request, response, next) => {
  // check auth header
  if (
    !request.headers.authorization ||
    request.headers.authorization != adminAuthHeader
  ) {
    response.status(401).send({ error: invalidAuthMessage });
    return;
  }
  next();
};

module.exports = {
  login,
  authorized,
  admin,
};
