# document-management-system
[![Build Status](https://travis-ci.org/andela-tAdedotun/document-management-system.svg?branch=development)](https://travis-ci.org/andela-tAdedotun/document-management-system)
[![Coverage Status](https://coveralls.io/repos/github/andela-tAdedotun/document-management-system/badge.svg?branch=development)](https://coveralls.io/github/andela-tAdedotun/document-management-system?branch=development)
[![Code Climate](https://codeclimate.com/github/andela-tAdedotun/document-management-system/badges/gpa.svg)](https://codeclimate.com/github/andela-tAdedotun/document-management-system)

The Document Management System API contains several API end points that allow users to create, edit, retrieve and delete documents. In addition, it
contains API end points that allow the management of users i.e. create, edit, retrieve, delete users. Users can also have roles assigned to them with.

#### [Find the Documentation Here](https://andela-tadedotun.github.io/document-management-system/)

Development
-----------
1. [NodeJS](http://nodejs.org)
2. [Express](http://expressjs.com)
3. [Postgres](http://postgresql.com)
4. [Sequelize](http://sequelizejs.com)
5. [ReactJS](http://facebook.github.io/react)

Installation
------------
1.  Install NodeJS and Postgres
2.  Clone the repository `https://github.com/andela-tAdedotun/document-management-system`
3.  Change your directory `cd document-management-system`
4.  Install all dependencies `npm install`
5.  Run tests  `npm test`
6.  Run integration test `npm run e2e`
7.  Start the app in production mode: `npm start` or development mode: `npm run start:dev`
8. Use [Postman](https://www.getpostman.com/) to test the API endpoints.

### Features
The Document Management System app spots the following features:
1. A markdown editor for creating and editing documents.
2. A homepage spotting a user's personal documents.
3. A separate dashboard for admins and regular users.
4. Ability to explore and view other people's documents.
5. Search that cuts across the whole platform.

*NB*: All these features are available only to authenticated users.

### Contribute
1. Fork this repository
2. Clone it to your local machine
3. Create a branch for the feature you want to implement
4. Push your changes to your repository
5. Submit a pull request

### Limitations:
1. Currently, as a regular user, you cannot search for other users and view their documents. It's something that will be addressed in future releases.
2.  Unauthenticated users cannot view public documents.
3. You cannot view other people's documents by clicking on their profile names.


Issue Tracker:

https://github.com/andela-tAdedotun/document-management-system/issues
