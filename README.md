# NodeJS rest api
### NodeJS rest api with auth

Documentation also available at https://documenter.getpostman.com/view/6550608/2s9YC5wrJh

`GET /api/movies` - Gets a list of all movies
```json
[
  {
    "_id": "64dedb89295ebc62c1cf1da3",
    "user": "64c9c24e71928f0b3f18a083",
    "username": "aman",
    "title": "The Shawshank Redemption",
    "director": "Frank Darabont",
    "synopsis": "Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.",
    "createdAt": "2023-08-18T02:46:33.610Z",
    "updatedAt": "2023-08-18T02:46:33.610Z",
    "__v": 0
  },
  {
    "_id": "64fbafb4afbd65e7e94753dd",
    "user": "64f6f699582334fc86b6c22a",
    "username": "smith",
    "title": "The Godfather",
    "director": "Francis Ford Coppola",
    "synopsis": "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
    "createdAt": "2023-09-08T23:35:16.048Z",
    "updatedAt": "2023-09-08T23:35:16.048Z",
    "__v": 0
  }
]
```
`GET /api/movies/:movieID` - Get one movie
```json
{
  "_id": "64dedb89295ebc62c1cf1da3",
  "user": "64c9c24e71928f0b3f18a083",
  "username": "aman",
  "title": "The Shawshank Redemption",
  "director": "Frank Darabont",
  "synopsis": "Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.",
  "createdAt": "2023-08-18T02:46:33.610Z",
  "updatedAt": "2023-08-18T02:46:33.610Z",
  "__v": 0
}
```

`POST /api/users` - Register user

**email** `example@email.com`

**name** example007

**password** pass
```json
{
  "name": "example007",
  "email": "example@email.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDJkZWYyNWJmNjU4ZmRhYTMwMDNhNSIsImlhdCI6MTY5NDY4Njk2MiwiZXhwIjoxNjk3Mjc4OTYyfQ.VIZ8K9sFrlcsFp0MOBASQkt8j3VbIyb36AdRtBcZ340"
}
```

`POST /api/users/login` - Login user

**emailLogin** `example@email.com`

**passwordLogin** pass
```json
{
  "name": "example007",
  "email": "example@email.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDJkZWYyNWJmNjU4ZmRhYTMwMDNhNSIsImlhdCI6MTY5NDgyMDc3OCwiZXhwIjoxNjk3NDEyNzc4fQ.nrWgG-lW0Y6RHVc9Ebak003T5nbLSu9zSfXEnp2AdBs"
}
```
`POST /api/movies`

`Authorization - Bearer Token`

**title** Casino Royale

**director** Martin Campbell

**synopsis** Special Agent James Bond embarks on a mission to prevent Le Chiffre, a mob banker, from winning a high stakes poker game. He is aided by Vesper Lynd, a British Treasury agent.
```json
{
  "user": "6502def25bf658fdaa3003a5",
  "username": "example007",
  "title": "Casino Royale",
  "director": "Martin Campbell",
  "synopsis": "Special Agent James Bond embarks on a mission to prevent Le Chiffre, a mob banker, from winning a high stakes poker game. He is aided by Vesper Lynd, a British Treasury agent.",
  "_id": "6504eb595bf658fdaa3003b3",
  "createdAt": "2023-09-15T23:40:09.652Z",
  "updatedAt": "2023-09-15T23:40:09.652Z",
  "__v": 0
}
```
`PUT /api/movies/:movieID`

`Authorization - Bearer Token`

**title** Casino Royale - James Bond
```json
{
  "_id": "6504eb595bf658fdaa3003b3",
  "user": "6502def25bf658fdaa3003a5",
  "username": "example007",
  "title": "Casino Royal - James Bond",
  "director": "Martin Campbell",
  "synopsis": "Special Agent James Bond embarks on a mission to prevent Le Chiffre, a mob banker, from winning a high stakes poker game. He is aided by Vesper Lynd, a British Treasury agent.",
  "createdAt": "2023-09-15T23:40:09.652Z",
  "updatedAt": "2023-09-15T23:45:55.460Z",
  "__v": 0
}
```
