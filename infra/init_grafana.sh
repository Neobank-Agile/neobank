#!/bin/bash

wget https://dl.grafana.com/oss/release/grafana-9.3.6.linux-amd64.tar.gz

tar -zxvf grafana-9.3.6.linux-amd64.tar.gz

rm -rf grafana-9.3.6.linux-amd64.tar.gz

sudo service postgresql start

sudo mkdir /usr/neobank

sudo mv ./grafana-9.3.6 /usr/neobank/

sudo cp -f ./data/migration/defaults.ini /usr/neobank/grafana-9.3.6/conf/defaults.ini

sudo cp ./data/postgres/* /usr/neobank/

sudo -u postgres psql neobank < ./data/migration/load_rates.sql