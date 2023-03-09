CREATE TABLE hist_rates (
    time_stamp TIMESTAMP,
    rate NUMERIC(10, 7),
    curr_from VARCHAR(3),
    curr_to VARCHAR(3),
    PRIMARY KEY(time_stamp, curr_from, curr_to)
);

COPY hist_rates (time_stamp, rate, curr_from, curr_to)
FROM 'usd-eur.csv'
DELIMITER ','
CSV HEADER;

COPY hist_rates (time_stamp, rate, curr_from, curr_to)
FROM 'usd-btc.csv'
DELIMITER ','
CSV HEADER;
