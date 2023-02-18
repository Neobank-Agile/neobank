DROP TABLE rates;

CREATE TABLE rates (
    time_stamp TIMESTAMP,
    rate NUMERIC(10, 3),
    curr_from VARCHAR(3),
    curr_to VARCHAR(3),
    PRIMARY KEY(time_stamp, curr_from, curr_to)
);

COPY rates (time_stamp, rate, curr_from, curr_to)
FROM '/usr/data/usd-eur.csv'
DELIMITER ','
CSV HEADER;

COPY rates (time_stamp, rate, curr_from, curr_to)
FROM '/usr/data/usd-gbp.csv'
DELIMITER ','
CSV HEADER;

COPY rates (time_stamp, rate, curr_from, curr_to)
FROM '/usr/data/btc-usd.csv'
DELIMITER ','
CSV HEADER;