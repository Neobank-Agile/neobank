TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiRnJpIEZlYiAwMyAyMDIzIDAxOjMxOjQ5IEdNVCswMTAwIChDZW50cmFsIEV1cm9wZWFuIFN0YW5kYXJkIFRpbWUpIiwidXNlcklkIjoiNWY3ZjQyMmItNTM5OS00MzIyLTg3NGYtZDJkNTJjZWZhZTY1IiwiaWF0IjoxNjc1Mzg0MzA5fQ.y4Qk7pFik9jAKW0L6pzmYyQqYmx3wKib1OKlei17on0"
curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" -d '{"type":"deposit", "amount":500.0, "source": "VISA 4506 9999 8888 7777", "destination": "USD", "status": "OK"}' http://localhost:3001/transactions
curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" -d '{"type":"deposit", "amount":1500.0, "source": "VISA 4506 9999 8888 7777", "destination":"EUR", "status": "OK"}' http://localhost:3001/transactions
curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" -d '{"type":"withdraw", "amount": 50.8, "source": "EUR", "destination": "VISA 4506 9999 8888 7777", "status": "OK"}' http://localhost:3001/transactions
curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" -d '{"type":"withdraw", "amount": 125.0, "source": "USD","destination": "VISA 4506 9999 8888 7777", "status": "OK"}' http://localhost:3001/transactions
curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" -d '{"type":"withdraw", "amount":17.5, "source": "USD", "destination": "VISA 4506 9999 8888 7777", "status": "OK"}' http://localhost:3001/transactions
curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" -d '{"type":"transfer", "amount":29.5, "source":"USD", "destination": "ckuroki@gmail.com", "status": "OK"}' http://localhost:3001/transactions
curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" -d '{"type":"exchange_sell", "amount":190.0, "source": "EUR", "destination": "BTC", "status": "OK"}' http://localhost:3001/transactions
curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" -d '{"type":"exchange_buy", "amount":0.002, "source": "EUR", "destination": "BTC", "status": "OK"}' http://localhost:3001/transactions
