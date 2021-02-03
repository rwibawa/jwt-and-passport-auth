# jwt-and-passport-auth
[Tutorial](https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport)

## 1. Setup
```bash
$ mkdir jwt-and-passport-auth
$ cd jwt-and-passport-auth
$ git init

$ npm init -y
$ npm install --save bcrypt@4.0.1 body-parser@1.19.0 express@4.17.1 jsonwebtoken@8.5.1 mongoose@5.9.15 passport@0.4.1 passport-jwt@4.0.0 passport-local@1.0.0
```

## 2. Add UserModel
```bash
$ mkdir -p model
$ vi model/model.js

$ mkdir -p auth
$ vi auth/auth.js

$ mkdir -p routes
$ vi routes/routes.js

$ vi app.js
$ npm i -s dotenv
$ node app.js
```

## 3. API calls
### 3.1. Sign Up
```bash
$ curl -X POST \
  http://localhost:4000/signup \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'email=example%40example.com&password=password'
```

Response:
```json
{
    "message": "Signup successful",
    "user": {
        "_id": "601a4498128b75ac56603858",
        "email": "example@example.com",
        "password": "$2b$10$WMA05GzIDIG.OZcZmFQZ6OeDobezHHL/iWED9ai5gNUcj4EJAMTXu",
        "__v": 0
    }
}
```

### 3.2. Login
```bash
$ curl -X POST \
  http://localhost:4000/login \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'email=example%40example.com&password=password'
```

Response:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMWE0NDk4MTI4Yjc1YWM1NjYwMzg1OCIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSJ9LCJpYXQiOjE2MTIzMzQ3NjF9.ts5jDopjL8OQZN5U_cdMY6u8RPm6qJ6PMAryDDH4tBY"
}
```

### 3.3. Get Profile
```bash
$ curl -X GET \
  'http://localhost:4000/user/profile?secret_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMWE0NDk4MTI4Yjc1YWM1NjYwMzg1OCIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSJ9LCJpYXQiOjE2MTIzMzQ3NjF9.ts5jDopjL8OQZN5U_cdMY6u8RPm6qJ6PMAryDDH4tBY'
```

Response:
```json
{
    "message": "You made it to the secure route",
    "user": {
        "_id": "601a4498128b75ac56603858",
        "email": "example@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMWE0NDk4MTI4Yjc1YWM1NjYwMzg1OCIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSJ9LCJpYXQiOjE2MTIzMzQ3NjF9.ts5jDopjL8OQZN5U_cdMY6u8RPm6qJ6PMAryDDH4tBY"
}
```
