# All rates
curl http://localhost:3001/rates
# from EUR 
curl http://localhost:3001/rates?from=EUR
# from GBP
curl http://localhost:3001/rates?from=GBP
# to EUR
curl http://localhost:3001/rates?to=EUR
# from EUR to YEN
curl 'http://localhost:3001/rates?from=EUR&to=YEN'

