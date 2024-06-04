# Layline Take Home Task

## Overview

This technical challenge involves implementing a settlement process between two parties, Party A and Party B. The system should handle iterative negotiation of settlement amounts by Party A, along with approvals or objections from Party B. The process should ensure that all changes and responses are reflected on Party A's and Party B's interface.

## Structure

- /settlement-backend: backend(Node.js, Express.js), database (SQLite)
- /settlement-frontend: frontend(React)

## How to run the application

You need to have installed Node.js (developed with Node.js 18.18.2)

- Running backend
```bash
    cd settlement-backend
    npm install
    // should migrate and seed
    npx knex migrate:latest
    npx knex seed:run
    npm run dev
```
It will run the backend development server on http://localhost:5000.
And database file will be created at `settlement-backend/db/`.

- Running frontend
You should create .env and add `REACT_APP_API_URL` first.
```bash
    cd settlement-frontend
    echo REACT_APP_API_URL=http://localhost:5000 > .env
```
Then you can install necessary packages and start the server.
```bash
    npm install
    npm start
```
It will run the frontend application on http://localhost:3000.

## Guide to application

After run the project locally, go to http://localhost:3000.
You will be redirect to login page.
Here are login infos:
Party A:
name: `partyA`, password: `passwordA`
party B:
name: `partyB`, password: `passwordB`

## screenshots
![image](https://github.com/sirius829/leyline-assessment/assets/133846033/67bb7d5d-cffc-4884-8372-bfb47fa518ae)
![image](https://github.com/sirius829/leyline-assessment/assets/133846033/a015e881-6f1a-4d09-b11f-994a2a886537)
![image](https://github.com/sirius829/leyline-assessment/assets/133846033/e700840a-f7ba-422a-bdab-815211d33eb5)

## To Do
- logout on frontend not implemented.
