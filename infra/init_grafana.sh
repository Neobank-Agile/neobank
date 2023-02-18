#!/bin/bash

wget https://dl.grafana.com/oss/release/grafana-9.3.6.linux-amd64.tar.gz

tar -zxvf grafana-9.3.6.linux-amd64.tar.gz

rm -rf grafana-9.3.6.linux-amd64.tar.gz

sudo service postgresql start

sudo mkdir /usr/data/

sudo mv ./grafana-9.3.6 /usr/data/

mv ./data/migration/defaults.ini /usr/data/grafana-9.3.6/conf/defaults.ini

sudo cp ./data/postgres/* /usr/data/

sudo -u postgres psql neobank < ./data/migration/load_rates.sql