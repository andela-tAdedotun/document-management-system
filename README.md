# document-management-system
[![Build Status](https://travis-ci.org/andela-tAdedotun/document-management-system.svg?branch=development)](https://travis-ci.org/andela-tAdedotun/document-management-system)
[![Coverage Status](https://coveralls.io/repos/github/andela-tAdedotun/document-management-system/badge.svg?branch=development)](https://coveralls.io/github/andela-tAdedotun/document-management-system?branch=development)

[Production App](https://taiwo-dms.herokuapp.com/)

The Document Management System API contains several API end points that allow users to create, edit, retrieve and delete documents. In addition, it
contains API end points that allow the management of users i.e. create, edit, retrieve, delete users. Users can also have roles assigned to them with.

Development
-----------
The application was developed with [NodeJS](http://nodejs.org) and [Express](http://expressjs.com) is used for routing. The [Postgres](http://postgresql.com) database was used with [Sequelize](http://sequelizejs.com) as the ORM

Installation
------------
1.  Install NodeJS and Postgres
2.  Clone the repository `https://github.com/andela-tAdedotun/document-management-system`
3.  Change your directory `cd document-management-system`
4.  Install all dependencies `npm install`
5.  Run tests  `npm test`
6.  Run integration test `npm run e2e`
7.  Start the app `npm start` and use [postman](https://www.getpostman.com/) to test the API


## API ENDPOINTS
**Users**

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/users](#create-users) | Create a new user
GET | [/users](#get-users) | Get all users
GET | [/users/:id](#get-a-user) | Get details of a specific user
PUT | [/users/:id](#update-user) | Edit user details
DELETE | [/users/:id](#delete-user) | Remove a user from storage
POST | [/users/login](#login) | To log a user in
GET| [/users/:id/documents](#get-usersdoc) | To get document of a specific user
GET | [/search/users?={}](#search-user) | Search for a user

**Roles**

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/roles](#create-role) | Create a new role
GET | [/roles](#get-roles) | Get all created roles
DELETE | [/role/:id](#delete-a-role) | To delete a role

**Documents**

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/documents](#create-document) | Create a new document
GET | [/documents](#get-documents) | Retrieve all documents
GET | [/documents/:id](#get-a-document) | Retrieve a specific document
PUT | [/documents/:id](#update-document) | Update a specific document
DELETE | [/documents/:id](#delete-document) | Delete a specific document
GET | [/documents?offset=0&limit=10](#get-documents) | Pagination for document retrieval

**Search**

Request type | Endpoint | Action
------------ | -------- | ------
GET | [/search/documents/](#search-document) | Search for documents
GET | [/search/users?={}](#search-user) | Search for users

Users
-----

## Create Users
To create a new user, make a **POST** request to `/users`
#### Request
```
{
    "name": "Taiwo",
    "email": "taiwo.adedotun@gmail.com",
    "password":"password"
}
```

#### Response
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjE1LCJFbWFpbCI6ImFkYUBnbWFpbC5jb20iLCJSb2xlSWQiOjEsImlhdCI6MTQ5MTIyMTk4NiwiZXhwIjoxNDkxMjU3OTg2fQ.MtqGTyA5q7zrs7pgbKwtsVUqiTyWYcH6KINgnQK8KJA",
  "expiresIn": "1day",
  "user": {
    "id": 1,
    "name": "Taiwo",
    "email": "taiwo.adedotun@gmail.com",
    "privacy": "public",
    "RoleId": 2,
    "updatedAt": "2017-04-03T12:19:45.740Z",
    "createdAt": "2017-04-03T12:19:45.740Z"
  }
}
```

## Get Users
Fetches all users' details,
#### Request
  - Endpoint: **GET**: `/users`
  - Optional queries **offset** (where to start from) && **limit** (number of users per page)
  - Requires `Authorization` header to be set
#### Response
```
{
"paginationInfo": {
  "totalCount": 40,
  "currentPage": 1,
  "pageCount": 3,
  "pageSize": 15
},
"users": [
  {
    "id": 18,
    "name": "Arden Leannon",
    "email": "gennaro.harvey@gmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T01:23:36.614Z",
    "updatedAt": "2017-05-28T01:23:36.614Z",
    "RoleId": 3
  },
  {
    "id": 19,
    "name": "Marquis Walker",
    "email": "elissa_volkman80@hotmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T01:26:21.992Z",
    "updatedAt": "2017-05-28T01:26:21.992Z",
    "RoleId": 3
  },
  {
    "id": 20,
    "name": "Alexa Batz",
    "email": "frederique50@gmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T01:28:17.185Z",
    "updatedAt": "2017-05-28T01:28:17.185Z",
    "RoleId": 3
  },
  {
    "id": 21,
    "name": "Nora Ortiz",
    "email": "mose_strosin@hotmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T01:31:14.617Z",
    "updatedAt": "2017-05-28T01:31:14.617Z",
    "RoleId": 3
  },
  {
    "id": 22,
    "name": "Vernice Conn",
    "email": "favian49@hotmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T01:32:24.079Z",
    "updatedAt": "2017-05-28T01:32:24.079Z",
    "RoleId": 3
  },
  {
    "id": 23,
    "name": "Victor Conn",
    "email": "boris_beahan34@gmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T01:36:09.119Z",
    "updatedAt": "2017-05-28T01:36:09.119Z",
    "RoleId": 3
  },
  {
    "id": 24,
    "name": "Davin Champlin",
    "email": "rashawn_ratke@hotmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T01:38:08.849Z",
    "updatedAt": "2017-05-28T01:38:08.849Z",
    "RoleId": 3
  },
  {
    "id": 25,
    "name": "Dolores Wiza",
    "email": "emilie.boehm@gmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T01:42:02.241Z",
    "updatedAt": "2017-05-28T01:42:02.241Z",
    "RoleId": 3
  },
  {
    "id": 26,
    "name": "Elbert Johnson I",
    "email": "frankie29@yahoo.com",
    "privacy": "public",
    "createdAt": "2017-05-28T01:48:43.767Z",
    "updatedAt": "2017-05-28T01:48:43.767Z",
    "RoleId": 3
  },
  {
    "id": 27,
    "name": "Reymundo Jacobs",
    "email": "claudine.nikolaus42@yahoo.com",
    "privacy": "public",
    "createdAt": "2017-05-28T01:56:17.010Z",
    "updatedAt": "2017-05-28T01:56:17.010Z",
    "RoleId": 3
  },
  {
    "id": 28,
    "name": "Chet Botsford",
    "email": "luigi_marquardt@hotmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T02:00:05.454Z",
    "updatedAt": "2017-05-28T02:00:05.454Z",
    "RoleId": 3
  },
  {
    "id": 29,
    "name": "Oran Huels",
    "email": "caleigh66@gmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T08:56:31.538Z",
    "updatedAt": "2017-05-28T08:56:31.538Z",
    "RoleId": 3
  },
  {
    "id": 30,
    "name": "Donnell King",
    "email": "clara.cole@gmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T09:03:18.953Z",
    "updatedAt": "2017-05-28T09:03:18.953Z",
    "RoleId": 3
  },
  {
    "id": 31,
    "name": "Mabel Langworth",
    "email": "missouri.jacobs@gmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T09:06:32.206Z",
    "updatedAt": "2017-05-28T09:06:32.206Z",
    "RoleId": 3
  },
  {
    "id": 32,
    "name": "Maximilian Krajcik",
    "email": "sheldon.kub@gmail.com",
    "privacy": "public",
    "createdAt": "2017-05-28T09:07:44.566Z",
    "updatedAt": "2017-05-28T09:07:44.566Z",
    "RoleId": 3
  }
]
}
```


## Get A User
#### Request
  - Endpoint: **GET**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response
```
{
  "id": 1,
  "name": "Taiwo Adedotun",
  "email": "taiwo.adedotun@andela.com",
  "privacy": "public",
  "createdAt": "2017-05-20T14:01:51.891Z",
  "updatedAt": "2017-05-28T19:13:20.281Z",
  "RoleId": 1
}
```
## Update user
#### Request
  - Endpoint: **PUT**: `/users/:id`
  - Requires `Authorization` header to be set
```
{
  "RoleId": 2
}
```
#### Response
```
{
  "id": 1,
  "name": "Taiwo Adedotun",
  "email": "taiwo.adedotun@andela.com",
  "privacy": "public",
  "createdAt": "2017-05-20T14:01:51.891Z",
  "updatedAt": "2017-05-28T19:13:20.281Z",
  "RoleId": 2
}
```

## Delete user
#### Request
  - Endpoint: **DELETE**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response

```
{
  "message": "User deleted successfully."
}
```

## User login
### Request
 - Endpoint: **POST**: `/users/login`
```
{
    "username": "taiwo.adedotun@andela.com",
    "password":"password"
}
```

### Response
```
{
  message: "Ok.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIlJvbGVJZCI6MSwiaWF0IjoxNDkyNzczMzc4LCJleHAiOjE0OTI4NTk3Nzh9.6C9u-1ylQOUpTQDVPm0TmIuVmDaP2PMgMxLkP1sjI"
}
```

# Get user's Document
### Request
  - Endpoint: **GET**: `/users/:id/documents`
  - Requires `Authorization` header to be set

### Response
```
{
"documents": [
  {
    "id": 2,
    "title": "Taiwo",
    "content": "Hi, Johny.",
    "isProtected": true,
    "views": 8,
    "access": "public",
    "createdAt": "2017-05-20T14:36:22.247Z",
    "updatedAt": "2017-05-23T22:47:36.725Z",
    "documentOwnerId": 1
  },
  {
    "id": 3,
    "title": "Sharp",
    "content": "She no get opportunity and she quick marry...",
    "isProtected": true,
    "views": 2,
    "access": "public",
    "createdAt": "2017-05-20T15:16:03.978Z",
    "updatedAt": "2017-05-20T15:37:42.021Z",
    "documentOwnerId": 1
  },
  {
    "id": 53,
    "title": "ada ada",
    "content": "Have you seen my beautiful baby?",
    "isProtected": false,
    "views": 2,
    "access": "public",
    "createdAt": "2017-05-26T13:30:58.441Z",
    "updatedAt": "2017-05-28T18:13:11.951Z",
    "documentOwnerId": 1
  },
  {
    "id": 54,
    "title": "ada",
    "content": "Have you seen my beautiful baby?",
    "isProtected": false,
    "views": 1,
    "access": "public",
    "createdAt": "2017-05-26T13:31:03.171Z",
    "updatedAt": "2017-05-28T18:33:11.303Z",
    "documentOwnerId": 1
  },
  {
    "id": 85,
    "title": "We have got holes in our hearts",
    "content": "...and in our lives. But we carry on.",
    "isProtected": false,
    "views": 0,
    "access": "public",
    "createdAt": "2017-05-28T21:24:24.762Z",
    "updatedAt": "2017-05-28T21:24:24.762Z",
    "documentOwnerId": 1
  }
],
"paginationInfo": {
  "totalCount": 5,
  "currentPage": 1,
  "pageCount": 1,
  "pageSize": 5
}
}
```

ROLES
-----
## Create Role
#### Request
  - Endpoint **POST** `/roles`
  - Requires `Authorization` header to be set
Body (application/json)
```
{
  "title": "content creator"
}
```
#### Response
Body (application/json)
```
{
  "id": 4,
  "title": "author",
  "updatedAt": "2017-04-21T11:24:44.344Z",
  "createdAt": "2017-04-21T11:24:44.344Z"
}
```

## Get Roles
#### Request
  - Endpoint **GET** `/roles`
  - Requires `Authorization` header to be set

#### Response
Body (application/json)
```
[
  {
    "id": 1,
    "userRole": "Super Admin",
    "createdAt": "2017-05-20T14:00:23.296Z",
    "updatedAt": "2017-05-20T14:00:23.296Z"
  },
  {
    "id": 2,
    "userRole": "Admin",
    "createdAt": "2017-05-20T14:00:33.765Z",
    "updatedAt": "2017-05-20T14:00:33.765Z"
  },
  {
    "id": 3,
    "userRole": "Regular",
    "createdAt": "2017-05-20T14:00:38.504Z",
    "updatedAt": "2017-05-20T14:00:38.504Z"
  }
]
```

## Delete Role
#### Request
  - Endpoint **DELETE** `/roles/:id`
  - Requires `Authorization` header to be set
#### Response
Body (application/json)
```
{
  "message": "Role successfully deleted."
}
```

DOCUMENTS
---------
## Create Document
#### Request
  - Endpoint **POST** `/documents`
  - Requires `Authorization` header to be set
```
{
  "title": "Ogboju Ode",
  "content": "Aalo o...",
  "access": "public"
}
```
#### Response
  - Body `(application/json)`
```
{
  "id": 5,
  "title": "Ogboju Ode",
  "content": "Aalo o...",
  "access": "public",
  "ownerId": 3,
  "updatedAt": "2017-04-21T11:29:49.031Z",
  "createdAt": "2017-04-21T11:29:49.031Z"
}
```
## Get Documents
#### Request
  - Endpoint **GET** `/documents`
  - Optional queries **offset** (where to start from) && **limit** (number of documents per page)
  - Requires `Authorization` header to be set

#### Response
```
[
  {
    "id": 5,
    "title": "Merlin",
    "content": "The Home of magic",
    "access": "public",
    "ownerId": 3,
    "RoleId": 1,
    "createdAt": "2017-04-21T11:29:49.031Z",
    "updatedAt": "2017-04-21T11:29:49.031Z"
  },
  {
    "id": 4,
    "title": "Andela Talent",
    "content": "Technical leadership program",
    "access": "public",
    "ownerId": 3,
    "RoleId": 2,
    "createdAt": "2017-04-21T05:36:09.373Z",
    "updatedAt": "2017-04-21T05:49:32.626Z"
  },
  {
    "id": 3,
    "title": "Stakeholder Management",
    "content": "Agile development is an important practice in SD",
    "access": "public",
    "ownerId": 3,
    "RoleId": 2,
    "createdAt": "2017-04-21T05:34:15.168Z",
    "updatedAt": "2017-04-21T05:34:15.168Z"
  },
  {
    "id": 2,
    "title": "HTML and CSS",
    "content": "Web development with tags and styles",
    "access": "public",
    "ownerId": 3,
    "RoleId": 2,
    "createdAt": "2017-04-21T05:33:01.265Z",
    "updatedAt": "2017-04-21T05:33:01.265Z"
  },
  {
    "id": 1,
    "title": "My Adventure",
    "content": "sourvenier gives motivation",
    "access": "public",
    "ownerId": 3,
    "RoleId": 2,
    "createdAt": "2017-04-21T05:31:16.778Z",
    "updatedAt": "2017-04-21T05:31:16.778Z"
  }
]
```

## Get A Document
#### Request
  - Endpoint **GET** `/documents/:id` where id is the id of the document
  - Requires `Authorization` header to be set

##### Response
```
{
    "id": 1,
    "title": "consectetur",
    "content": "enim ex velit",
    "access": "public",
    "ownerId": 3,
    "RoleId": 2,
    "createdAt": "2017-04-21T05:31:16.778Z",
    "updatedAt": "2017-04-21T05:31:16.778Z"
}
```

## Update Document
#### Request
  - Endpoint **PUT** `/documents/:id` id is the id of the document
  - Requires `Authorization` header to be set
```
{
  "title": "Kako Onikumekun",
}
```
##### Response
```
{
  "id": 1,
  "title": "Kako Onikumekun",
  "content": "Ni aye atijo",
  "access": "public",
  "ownerId": 3,
  "createdAt": "2017-04-21T05:31:16.778Z",
  "updatedAt": "2017-04-21T11:33:18.850Z"
}
```

## Delete Document
#### Request
  - Endpoint **DELETE** `/documents/:id`id of the document
  - Requires `Authorization` header to be set
#### Response
```
{
  message: 'Document deleted.'
}
```

Search
-----

## Search Users
#### Request
  - Endpoint **GET** `/search/users?q=taiwo`
  - Requires `Authorization` header to be set
#### Response
```
{
  "users": [
    {
      "id": 4,
      "name": "Taiwo XYZ",
      "email": "taiwo@xyz.com",
      "privacy": "public",
      "createdAt": "2017-05-20T14:03:32.158Z",
      "updatedAt": "2017-05-22T10:14:25.666Z",
      "RoleId": 3
    },
    {
      "id": 8,
      "name": "Taye Taiwo",
      "email": "taye@taiwo.com",
      "privacy": "public",
      "createdAt": "2017-05-23T11:15:47.052Z",
      "updatedAt": "2017-05-23T11:15:47.052Z",
      "RoleId": 3
    },
    {
      "id": 1,
      "name": "Taiwo Adedotun",
      "email": "taiwo.adedotun@andela.com",
      "privacy": "public",
      "createdAt": "2017-05-20T14:01:51.891Z",
      "updatedAt": "2017-05-28T19:13:20.281Z",
      "RoleId": 1
    }
  ],
  "paginationInfo": {
    "totalCount": 3,
    "currentPage": 1,
    "pageCount": 1,
    "pageSize": 3
  }
}
```

## Search Documents
#### Request
  - Endpoint **GET** `/search/documents?q=ada`
  - Requires `Authorization` header to be set
#### Response
```
{
  "documents": [
    {
      "id": 41,
      "title": "adasd",
      "content": "Taiwo",
      "isProtected": false,
      "views": 3,
      "access": "public",
      "createdAt": "2017-05-21T08:26:02.355Z",
      "updatedAt": "2017-05-28T17:58:26.800Z",
      "documentOwnerId": 4
    },
    {
      "id": 53,
      "title": "ada ada",
      "content": "Have you seen my beautiful baby?",
      "isProtected": false,
      "views": 2,
      "access": "public",
      "createdAt": "2017-05-26T13:30:58.441Z",
      "updatedAt": "2017-05-28T18:13:11.951Z",
      "documentOwnerId": 1
    },
    {
      "id": 54,
      "title": "ada",
      "content": "Have you seen my beautiful baby?",
      "isProtected": false,
      "views": 1,
      "access": "public",
      "createdAt": "2017-05-26T13:31:03.171Z",
      "updatedAt": "2017-05-28T18:33:11.303Z",
      "documentOwnerId": 1
    }
  ],
  "paginationInfo": {
    "totalCount": 3,
    "currentPage": 1,
    "pageCount": 1,
    "pageSize": 3
  }
}
```

Issue Tracker:

https://github.com/andela-tAdedotun/document-management-system/issues
