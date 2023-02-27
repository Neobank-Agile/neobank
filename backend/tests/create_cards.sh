TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiRnJpIEZlYiAwMyAyMDIzIDAxOjMxOjQ5IEdNVCswMTAwIChDZW50cmFsIEV1cm9wZWFuIFN0YW5kYXJkIFRpbWUpIiwidXNlcklkIjoiNWY3ZjQyMmItNTM5OS00MzIyLTg3NGYtZDJkNTJjZWZhZTY1IiwiaWF0IjoxNjc1Mzg0MzA5fQ.y4Qk7pFik9jAKW0L6pzmYyQqYmx3wKib1OKlei17on0"
curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" -d '{"card_type":"VISA", "card_number":"4567890123456789", "expiration": "12-2025" , "holder": "John Doe", "csv": "123"}' http://localhost:3001/cards
curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" -d '{"card_type": "MASTERCARD", "card_number": "8567890123456789", "expiration": "10-2027", "holder": "John Doe", "csv": "456"}' http://localhost:3001/cards

