TOKEN=abbb065c3fc6e070870ee624db930c990af364be6c8bc588a56123ab623a783e
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"EUR", "to": "USD","rate": 1.08}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"USD", "to": "EUR","rate": 0.92}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"YEN", "to": "USD","rate": 0.0077}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"USD", "to": "YEN","rate": 130.14}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"EUR", "to": "YEN","rate": 140.90}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"YEN", "to": "EUR","rate": 0.0071}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"GBP", "to": "USD","rate": 1.24}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"USD", "to": "GBP","rate": 0.81}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"GBP", "to": "EUR","rate": 1.14}' http://localhost:3001/rates
curl -H 'Content-Type: application/json' -H "Authorization: Admin ${TOKEN}" -d '{"from":"EUR", "to": "GBP","rate": 0.87}' http://localhost:3001/rates

