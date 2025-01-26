 
# API Documentation
## User
### User Login or Registration
- code 200: If requested user already exists, return jwt token
- code 201: Create a new user and return jwt token
- Everytime retrun new token 
-

<Details>

<summary>Code</summary>
 

```
// Request 

POST /api/users/login HTTP/1.1
Host: localhost:5001
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRva2VuIjoiZmlyZWJhc2VfdG9rZW4iLCJlbWFpbCI6Im1haW51bEBnbWFpbC5jb20iLCJpZCI6IjY3OTRkNDIwOGU5ODE3ZjE0OGJhYzZmMyIsInR5cGUiOiJ1c2VyIiwiZGF0YSI6eyJ0eXBlIjoidXNlciJ9fSwiaWF0IjoxNzM3ODg0NTExLCJleHAiOjE3NDA0NzY1MTF9.0AJ4CDVdpG3Ba8-UM3ArozgUajc-yLBRBbrCNlJCHRU
Content-Length: 131

{ 
    "email":"mainul@gmail.com", 
    "name":"Mainul Islam", 
    "image":"hello.png",  
    "firebase_token":"firebase_token"
}

```

```
// Response

{"msg":"Login successful","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRva2VuIjoiZmlyZWJhc2VfdG9rZW4iLCJlbWFpbCI6Im1haW51bEBnbWFpbC5jb20iLCJpZCI6IjY3OTRkNDIwOGU5ODE3ZjE0OGJhYzZmMyIsInR5cGUiOiJ1c2VyIiwiZGF0YSI6eyJ0eXBlIjoidXNlciJ9fSwiaWF0IjoxNzM3ODg4NDI1LCJleHAiOjE3NDA0ODA0MjV9.dDJyJaQmddZCH-CYJkw6NmpD9Qe7JDX6bid8H9rXvqw","firebase_token":"firebase_token"}

```
</Details>


### Sponsor
- code 200: if successfully set sponsor
- code 400: If requested user aready set sponsor  

<Details>

<summary>Code</summary>
 

```
// Request 

POST /api/users/sponsor HTTP/1.1
Host: localhost:5001
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRva2VuIjoiZmlyZWJhc2VfdG9rZW4iLCJlbWFpbCI6Im1haW51bEBnbWFpbC5jb20iLCJpZCI6IjY3OTRkNDIwOGU5ODE3ZjE0OGJhYzZmMyIsInR5cGUiOiJ1c2VyIiwiZGF0YSI6eyJ0eXBlIjoidXNlciJ9fSwiaWF0IjoxNzM3ODg4NDI1LCJleHAiOjE3NDA0ODA0MjV9.dDJyJaQmddZCH-CYJkw6NmpD9Qe7JDX6bid8H9rXvqw
Content-Length: 26

{ 
  "sponsor": "ruhul"
}


```

```
// Response 200

{"msg":"Sponsor update Successful","sponsor":"ruhul"}
```

```
// Response 400

{"msg":"Bed Request"}

```
</Details>

## Quiz


### Active Quiz


<Details>

<summary>Code</summary>
 

```
// Request 

 GET /api/quizzes/active-quizzzes HTTP/1.1
Host: localhost:5001
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRva2VuIjoiZmlyZWJhc2VfdG9rZW4iLCJlbWFpbCI6InJ1aHVsLm9rMTNAZ21haWwuY29tIiwiaWQiOiI2NzhjOWFlM2E4OGM0NjczYjQ1YmRhYTQiLCJ0eXBlIjoidXNlciIsImRhdGEiOnsidHlwZSI6InVzZXIifX0sImlhdCI6MTczNzI2ODM4NywiZXhwIjoxNzM3ODczMTg3fQ.Izfn5MDUbkt2CIrp3lrdz92-yH2Ajjd1v3GUgTssE3U


```

```

{
    "quizzes": [
        {
            "status": true,
            "isEnrolled": true,
            "_id": "6795020f44db1a424412732f",
            "quizType": "test",
            "round": 2,
            "entryFees": 500,
            "totalQuestions": 5,
            "questionTypes": [
                {
                    "count": 1,
                    "_id": "6795020f44db1a4244127330",
                    "type": "International"
                },
                {
                    "count": 1,
                    "_id": "6795020f44db1a4244127331",
                    "type": "History"
                },
                {
                    "count": 1,
                    "_id": "6795020f44db1a4244127332",
                    "type": "Islamic"
                },
                {
                    "count": 1,
                    "_id": "6795020f44db1a4244127333",
                    "type": "general"
                },
                {
                    "count": 1,
                    "_id": "6795020f44db1a4244127334",
                    "type": "test"
                }
            ],
            "maxParticipants": 1000,
            "prizes": [
                {
                    "_id": "6795020f44db1a4244127335",
                    "label": "1st",
                    "total_person": 1,
                    "amount": 100
                },
                {
                    "_id": "6795020f44db1a4244127336",
                    "label": "2nd",
                    "total_person": 2,
                    "amount": 600
                },
                {
                    "_id": "6795020f44db1a4244127337",
                    "label": "3rd",
                    "total_person": 5,
                    "amount": 600
                },
                {
                    "_id": "6795020f44db1a4244127338",
                    "label": "4th",
                    "total_person": 10,
                    "amount": 800
                },
                {
                    "_id": "6795020f44db1a4244127339",
                    "label": "5th",
                    "total_person": 90,
                    "amount": 900
                }
            ],
            "createdAt": "2025-01-25T15:23:59.848Z",
            "updatedAt": "2025-01-25T17:17:46.288Z",
            "__v": 0
        },
        {},
        {}
    ]
}
```
</Details>




### Inactive Quiz


<Details>

<summary>Code</summary>
 

```
// Request 

GET /api/quizzes/inactive-quizzzes HTTP/1.1
Host: localhost:5001
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRva2VuIjoiZmlyZWJhc2VfdG9rZW4iLCJlbWFpbCI6InJ1aHVsLm9rMTNAZ21haWwuY29tIiwiaWQiOiI2NzhjOWFlM2E4OGM0NjczYjQ1YmRhYTQiLCJ0eXBlIjoidXNlciIsImRhdGEiOnsidHlwZSI6InVzZXIifX0sImlhdCI6MTczNzI2ODM4NywiZXhwIjoxNzM3ODczMTg3fQ.Izfn5MDUbkt2CIrp3lrdz92-yH2Ajjd1v3GUgTssE3U


```

```



```
</Details>



## Enrollment

### Enroll Quiz


<Details>

<summary>Code</summary>
 

```
// Request 

POST /api/quizzes/enroll/6795336c87eaec6d318ebab6 HTTP/1.1
Host: localhost:5001
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRva2VuIjoiZmlyZWJhc2VfdG9rZW4iLCJlbWFpbCI6Im1haW51bEBnbWFpbC5jb20iLCJpZCI6IjY3OTRkNDIwOGU5ODE3ZjE0OGJhYzZmMyIsInR5cGUiOiJ1c2VyIiwiZGF0YSI6eyJ0eXBlIjoidXNlciJ9fSwiaWF0IjoxNzM3ODg4ODI5LCJleHAiOjE3NDA0ODA4Mjl9.K3_KKNH7HLH1Gr6oSAchrqcsw-z8A_kmiwLRKbIG4PI
Content-Length: 24

{
    "paymentData":[]
}


```

```
{
    "message": "Enroll user to quiz",
    "enrollment": {
        "earnedPoints": 0,
        "totalCorrectAnswer": 0,
        "totalWrongAnswer": 0,
        "isCompleted": false,
        "_id": "6796780cc78636a26edc13a1", 
        "userId": "6794d4208e9817f148bac6f3",
        "quizId": "6795020f44db1a424412732f",
        "createdAt": "2025-01-26T17:59:40.211Z",
        "updatedAt": "2025-01-26T17:59:40.211Z",
        "__v": 0
    }
}
 

```
</Details>




### Get quiz question

- "isEnrolled": User already enrolled or not. 
- "enrollmentId": Active enrollment id. this will be used to submit the quiz answer
- "enrollements": [{},{},,,,]. All enrollments. User can enroll multiple tymes for a quiz.
- 
```
 "questionsList": [
        {
            "_id": "6796780dc78636a26edc13ae",  // UserQuizQuestion id /// this is the id that will be use to submit answer of specific quesiton
            
            "questionId": {
                "options": [
                    "China",
                    "Japan",
                    "Korea",
                    "Thailand"
                ],
                "_id": "678cc145e74e416a5c8cc6d9",
                "title": "Which country is known as the Land of the Rising Sun?",
                "correctAnswer": 2
            }
        },
        {},
        {}
        ]
``` 
. 
<Details>

<summary>Code</summary>
 

```
// Request 

GET /api/quizzes/6795336c87eaec6d318ebab6 HTTP/1.1
Host: localhost:5001
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRva2VuIjoiZmlyZWJhc2VfdG9rZW4iLCJlbWFpbCI6Im1haW51bEBnbWFpbC5jb20iLCJpZCI6IjY3OTRkNDIwOGU5ODE3ZjE0OGJhYzZmMyIsInR5cGUiOiJ1c2VyIiwiZGF0YSI6eyJ0eXBlIjoidXNlciJ9fSwiaWF0IjoxNzM3ODg4ODI5LCJleHAiOjE3NDA0ODA4Mjl9.K3_KKNH7HLH1Gr6oSAchrqcsw-z8A_kmiwLRKbIG4PI

```

```
{
    "quiz": {
        "_id": "6795020f44db1a424412732f",
        "status": true,
        "isEnrolled": true,
        "quizType": "test",
        "round": 2,
        "entryFees": 500,
        "totalQuestions": 5,
        "questionTypes": [
            {
                "count": 1,
                "_id": "6795020f44db1a4244127330",
                "type": "International"
            },
            {
                "count": 1,
                "_id": "6795020f44db1a4244127331",
                "type": "History"
            },
            {
                "count": 1,
                "_id": "6795020f44db1a4244127332",
                "type": "Islamic"
            },
            {
                "count": 1,
                "_id": "6795020f44db1a4244127333",
                "type": "general"
            },
            {
                "count": 1,
                "_id": "6795020f44db1a4244127334",
                "type": "test"
            }
        ],
        "maxParticipants": 1000,
        "prizes": [
            {
                "_id": "6795020f44db1a4244127335",
                "label": "1st",
                "total_person": 1,
                "amount": 100
            },
            {
                "_id": "6795020f44db1a4244127336",
                "label": "2nd",
                "total_person": 2,
                "amount": 600
            },
            {
                "_id": "6795020f44db1a4244127337",
                "label": "3rd",
                "total_person": 5,
                "amount": 600
            },
            {
                "_id": "6795020f44db1a4244127338",
                "label": "4th",
                "total_person": 10,
                "amount": 800
            },
            {
                "_id": "6795020f44db1a4244127339",
                "label": "5th",
                "total_person": 90,
                "amount": 900
            }
        ],
        "createdAt": "2025-01-25T15:23:59.848Z",
        "updatedAt": "2025-01-25T17:17:46.288Z",
        "__v": 0,
        "enrollmentId": "6796780cc78636a26edc13a1",
        "enrollements": [
            {
                "earnedPoints": 0,
                "totalCorrectAnswer": 0,
                "totalWrongAnswer": 0,
                "isCompleted": false,
                "_id": "6796780cc78636a26edc13a1",
                "userId": "6794d4208e9817f148bac6f3",
                "quizId": "6795020f44db1a424412732f",
                "createdAt": "2025-01-26T17:59:40.211Z",
                "updatedAt": "2025-01-26T17:59:40.211Z",
                "__v": 0
            }
        ]
    },
    "questionsList": [
        {
            "_id": "6796780dc78636a26edc13ae",
            "questionId": {
                "options": [
                    "China",
                    "Japan",
                    "Korea",
                    "Thailand"
                ],
                "_id": "678cc145e74e416a5c8cc6d9",
                "title": "Which country is known as the Land of the Rising Sun?",
                "correctAnswer": 2
            }
        },
        {
            "_id": "6796780dc78636a26edc13af",
            "questionId": {
                "options": [
                    "Go",
                    "Au",
                    "Ag",
                    "Gd"
                ],
                "_id": "678cc145e74e416a5c8cc6ec",
                "title": "What is the chemical symbol for gold?",
                "correctAnswer": 2
            }
        },
        {
            "_id": "6796780dc78636a26edc13b0",
            "questionId": {
                "options": [
                    "Parrot",
                    "Cuckoo",
                    "Kookaburra",
                    "Owl"
                ],
                "_id": "678cc145e74e416a5c8cc6e1",
                "title": "Which bird is known for its distinctive laughing call?",
                "correctAnswer": 3
            }
        },
        {
            "_id": "6796780dc78636a26edc13b1",
            "questionId": {
                "options": [
                    "Vincent van Gogh",
                    "Leonardo da Vinci",
                    "Pablo Picasso",
                    "Claude Monet"
                ],
                "_id": "678cc145e74e416a5c8cc6e6",
                "title": "Who painted the Mona Lisa?",
                "correctAnswer": 2
            }
        },
        {
            "_id": "6796780dc78636a26edc13b2",
            "questionId": {
                "options": [
                    "114 টি মন্জিল",
                    "9 টি মন্জিল",
                    "৭ টি মন্জিল",
                    "5 টি মন্জিল"
                ],
                "_id": "6795b601455af8ff0f1ae617",
                "title": "কুরআন শরিফে মোট কতগুলো মন্জিল আছে ?      ক) ৭ টি মন্জিল  ক) ৭ টি মন্জিল ক) ৭ টি মন্জিল ক) ৭ টি মন্জিল",
                "correctAnswer": 3
            }
        }
    ]
}
 

```
</Details>




### Submit Quiz Answers


- isCompleted: true/false ; indicate that answerd or not;  if true, quiz answer is over.
- totalCorrectAnswer
- totalWrongAnswer
- 
```
    "questions": [
        {
            "_id": "679654b5c4788d843a8a284a", // UserQuizQuestion id, // not question id 
            "answer": 1,
            "isCorrect": false
        },{},{}]

```


<Details>

<summary>Code</summary>
 

```
// Request 

POST /api/quizzes/submit-answers/6795020f44db1a424412732f HTTP/1.1
Host: localhost:5001
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRva2VuIjoiZmlyZWJhc2VfdG9rZW4iLCJlbWFpbCI6Im1haW51bEBnbWFpbC5jb20iLCJpZCI6IjY3OTRkNDIwOGU5ODE3ZjE0OGJhYzZmMyIsInR5cGUiOiJ1c2VyIiwiZGF0YSI6eyJ0eXBlIjoidXNlciJ9fSwiaWF0IjoxNzM3ODg4ODI5LCJleHAiOjE3NDA0ODA4Mjl9.K3_KKNH7HLH1Gr6oSAchrqcsw-z8A_kmiwLRKbIG4PI
Content-Length: 610

{
    "enrollmentId": "679654b4c4788d843a8a283d",
    "isCompleted": true,
    "totalCorrectAnswer": 2,
    "totalWrongAnswer": 3,
    "questions": [
        {
            "_id": "679654b5c4788d843a8a284a",
            "answer": 1,
            "isCorrect": false
        },
        {},
        {},
        {},
        {}
    ]
}

```

```
{
    "message": "Sumitted answers are updated for quiz",
    "quizId": "6795020f44db1a424412732f",
    "userId": "6794d4208e9817f148bac6f3",
    "updatedEnrollment": {
      "earnedPoints": 0,
      "totalCorrectAnswer": 2,
      "totalWrongAnswer": 3,
      "isCompleted": true,
      "_id": "6796780cc78636a26edc13a1",
      "userId": "6794d4208e9817f148bac6f3",
      "quizId": "6795020f44db1a424412732f",
      "createdAt": "2025-01-26T17:59:40.211Z",
      "updatedAt": "2025-01-26T19:07:33.040Z",
      "__v": 0
        },
    "userQuizQuestions": [
        {
            "isAnswered": true,
            "_id": "6796780dc78636a26edc13ae",
            "userId": "6794d4208e9817f148bac6f3",
            "quizId": "6795020f44db1a424412732f",
            "enrollmentId": "6796780cc78636a26edc13a1",
            "questionId": "678cc145e74e416a5c8cc6d9",
            "questionType": "International",
            "__v": 0,
            "createdAt": "2025-01-26T17:59:41.520Z",
            "updatedAt": "2025-01-26T19:07:33.143Z",
            "isCorrect": false
        },
        {
            "isAnswered": true,
            "_id": "6796780dc78636a26edc13af",
            "userId": "6794d4208e9817f148bac6f3",
            "quizId": "6795020f44db1a424412732f",
            "enrollmentId": "6796780cc78636a26edc13a1",
            "questionId": "678cc145e74e416a5c8cc6ec",
            "questionType": "History",
            "__v": 0,
            "createdAt": "2025-01-26T17:59:41.520Z",
            "updatedAt": "2025-01-26T19:07:33.235Z",
            "isCorrect": false
        },
        {
            "isAnswered": true,
            "_id": "6796780dc78636a26edc13b0",
            "userId": "6794d4208e9817f148bac6f3",
            "quizId": "6795020f44db1a424412732f",
            "enrollmentId": "6796780cc78636a26edc13a1",
            "questionId": "678cc145e74e416a5c8cc6e1",
            "questionType": "Islamic",
            "__v": 0,
            "createdAt": "2025-01-26T17:59:41.521Z",
            "updatedAt": "2025-01-26T19:07:33.346Z",
            "isCorrect": true
        },
        {
            "isAnswered": true,
            "_id": "6796780dc78636a26edc13b1",
            "userId": "6794d4208e9817f148bac6f3",
            "quizId": "6795020f44db1a424412732f",
            "enrollmentId": "6796780cc78636a26edc13a1",
            "questionId": "678cc145e74e416a5c8cc6e6",
            "questionType": "general",
            "__v": 0,
            "createdAt": "2025-01-26T17:59:41.521Z",
            "updatedAt": "2025-01-26T19:07:33.583Z",
            "isCorrect": false
        },
        {
            "isAnswered": true,
            "_id": "6796780dc78636a26edc13b2",
            "userId": "6794d4208e9817f148bac6f3",
            "quizId": "6795020f44db1a424412732f",
            "enrollmentId": "6796780cc78636a26edc13a1",
            "questionId": "6795b601455af8ff0f1ae617",
            "questionType": "test",
            "__v": 0,
            "createdAt": "2025-01-26T17:59:41.521Z",
            "updatedAt": "2025-01-26T19:07:33.754Z",
            "isCorrect": true
        }
    ]
}

```

</Details>