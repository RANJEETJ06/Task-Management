# Task Management System

This is a Task Management System built with React.js for the frontend and Spring Boot for the backend.

## Development setup

### Frontend (React.js)

1. Navigate to the `client` directory:
   ```bash
   cd client
   npm install
### Backend (Java SpringBoot)
2. Navigate to the `Server` directory in another terminal:
   ```bash
   cd Server
As this is based on JPA so start the ServerApplication.
and before running backend 

    1.Setup database in your database of any then change in the `application.properties` accordingly. the database name must be `taskmanagement` or else you change in and put in `spring.datasource.url`

    2.replace username of the database at `DB_Username`

    3. replace database passsword of the database at `DB_password`
### Start system

in client terminal run `npm start` 

