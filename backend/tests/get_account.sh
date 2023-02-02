ID=5f7f422b-5399-4322-874f-d2d52cefae65
TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IEZlYiAwMiAyMDIzIDAzOjAxOjQ3IEdNVCswMTAwIChDZW50cmFsIEV1cm9wZWFuIFN0YW5kYXJkIFRpbWUpIiwidXNlcklkIjoiNWY3ZjQyMmItNTM5OS00MzIyLTg3NGYtZDJkNTJjZWZhZTY1IiwiaWF0IjoxNjc1MzAzMzA3fQ.IawGT1aRND9TEdzUMh6Nz62PQBJOyatOQGCZdQrafUI
curl -H "Accept: application/json" -H "Authorization: Bearer ${TOKEN}" http://localhost:3001/accounts?id=$ID
#curl http://localhost:3001/accounts?id=XX
#curl http://localhost:3001/accounts

