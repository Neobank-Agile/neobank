# Grafana Setup Guide

## 1. Run init_grafana.sh 

This commands does the basic setup of the Grafana stand-alone binary

```rb
sudo init_grafana.sh
```

## 2. Start the Grafana Server

The server will start on port 2999

```rb
/usr/neobank/grafna-9.3.6/bin/grafana-server
```

## 3. Aaccess the web service at localhost:2999

Enter the user/passwrod. The default is admin/admin

## 4. Add the data source of postgres from the config icon

## 5. Import all the JSON files in ./data/migration to the dashboard. 

If the panel doesn't load. Try select the data source and run the query again.