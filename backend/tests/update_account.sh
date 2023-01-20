ID=d9005a66-d7ca-45e7-8207-bca59614c3bf
curl -X PUT -H 'Content-Type: application/json' -d '{"password": "supersecret2","status":"ok"}' http://localhost:3001/accounts
curl -X PUT -H 'Content-Type: application/json' -d '{"password": "supersecret2","id": "d9005a66-d7ca-45e7-8207-bca59614c3bf"}' http://localhost:3001/accounts
curl -X PUT -H 'Content-Type: application/json' -d '{"status":"ok", "id": "d9005a66-d7ca-45e7-8207-bca59614c3bf"}' http://localhost:3001/accounts
curl -X PUT -H 'Content-Type: application/json' -d '{"status":"super", "password": "maxima", "id": "d9005a66-d7ca-45e7-8207-bca59614c3bf"}' http://localhost:3001/accounts
