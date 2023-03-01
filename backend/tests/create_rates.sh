TOKEN=abbb065c3fc6e070870ee624db930c990af364be6c8bc588a56123ab623a783e
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"EUR", "to": "USD","rate": 1.08}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"USD", "to": "EUR","rate": 0.92}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"BTC", "to": "USD","rate": 23721.30}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"USD", "to": "BTC","rate": 0.000042}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"EUR", "to": "BTC","rate": 140.90}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"BTC", "to": "EUR","rate": 22222.40}' http://localhost:3001/rates

