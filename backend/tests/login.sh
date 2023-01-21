# valid token
curl -H 'Content-Type: application/json' -d '{"email": "jdoe@gmail.com","password": "supersecret"}' http://localhost:3001/login
echo ""
# invalid logins
curl -H 'Content-Type: application/json' -d '{"email": "jdoe@gmail.com","password": "mypassword"}' http://localhost:3001/login
echo ""
curl -H 'Content-Type: application/json' -d '{"email": "johnDoe@gmail.com","password": "supersecret"}' http://localhost:3001/login
echo ""

