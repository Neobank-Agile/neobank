#!/bin/bash
# usd to eur
curl 'http://localhost:3001/rates?from=usd'
printf "\n"
# eur to usd
curl 'http://localhost:3001/rates?from=eur'
printf "\n"
# btc to usd
curl 'http://localhost:3001/rates?from=btc'
printf "\n"
# eur to usd
curl 'http://localhost:3001/rates?to=usd'
printf "\n"
# eur to eur => empty
curl 'http://localhost:3001/rates?to=eur'
printf "\n"
# eur to btc => empty
curl 'http://localhost:3001/rates?to=btc'
printf "\n"
# btc to usd with timestamp 2022-01-01
curl 'http://localhost:3001/rates?timestamp=2022-01-01&from=btc&to=usd'
printf "\n"
