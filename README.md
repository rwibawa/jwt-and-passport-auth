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

## 4. Connect to MySQL
```bash
$ npm i -s sequelize@5.22.3 mysql2 sha.js axios nodemon
$ vi model/admin.model.js
$ vi app.js
```

### 4.1. Login
```bash
$ curl -X POST \
  http://localhost:4000/login \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=FLinick&password=hello%23'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiRkxpbmljayIsImVtYWlsIjoiZ211cnVnYW5AZWhlaW50bC5jb20iLCJmaXJzdF9uYW1lIjoiRnJlZGVyaWNhIiwibGFzdF9uYW1lIjoiTGluaWNrIn0sImlhdCI6MTYxMjQyNDUwMH0.am2pe_kdVofbN3oTXBlDzpTqSoOD1Rxv4Ve1LMqvMPY"
}
```

### 4.2. Get profile
Put the token in the header as a bear token.
```bash
$ curl -X GET \
  http://localhost:4000/user/profile \
  -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiUUFBdXRvbWF0aW9uIiwiZW1haWwiOiJyd2liYXdhQGVoZS5oZWFsdGgiLCJmaXJzdF9uYW1lIjoiUUEiLCJsYXN0X25hbWUiOiJBdXRvbWF0aW9uIn0sImlhdCI6MTYxMjUwMzY1Nn0.0fqAsfm6Ubi4X-vdj9wRVOQ9327SL9dhiSCBaYahrdM' 
```

Response:
```json
{
    "message": "You made it to the secure route",
    "user": {
        "username": "QAAutomation",
        "email": "rwibawa@ehe.health",
        "first_name": "QA",
        "last_name": "Automation"
    },
    "token": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiUUFBdXRvbWF0aW9uIiwiZW1haWwiOiJyd2liYXdhQGVoZS5oZWFsdGgiLCJmaXJzdF9uYW1lIjoiUUEiLCJsYXN0X25hbWUiOiJBdXRvbWF0aW9uIn0sImlhdCI6MTYxMjUwMzY1Nn0.0fqAsfm6Ubi4X-vdj9wRVOQ9327SL9dhiSCBaYahrdM"
}
```

### 4.3. Get Patient Profile
#### EPMS Calls
```bash
$ curl -X GET \
  'http://localhost:8080/api/patient?employeeId=297-02-1974&clientId=41221'
```

Response:
```json
{
    "data": {
        "epmsPID": 872275,
        "uuid": "b1d6cb0e-03dd-11e9-9091-0aeb2681e1ac"
    }
}
```

#### get_patient
```bash
$ curl -X GET \
  'http://localhost:4000/patient?employeeId=297-02-1974&clientId=41221' \
  -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiUUFBdXRvbWF0aW9uIiwiZW1haWwiOiJyd2liYXdhQGVoZS5oZWFsdGgiLCJmaXJzdF9uYW1lIjoiUUEiLCJsYXN0X25hbWUiOiJBdXRvbWF0aW9uIn0sImlhdCI6MTYxMjUwMzY1Nn0.0fqAsfm6Ubi4X-vdj9wRVOQ9327SL9dhiSCBaYahrdM'
```

Response:
```json
{
    "epmsPID": 872275,
    "uuid": "b1d6cb0e-03dd-11e9-9091-0aeb2681e1ac"
}
```