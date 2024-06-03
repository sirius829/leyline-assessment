# Layline Take Home Task

## Overview

This technical challenge involves implementing a settlement process between two parties, Party A and Party B. The system should handle iterative negotiation of settlement amounts by Party A, along with approvals or objections from Party B. The process should ensure that all changes and responses are reflected on Party A's and Party B's interface.

## Structure

/settlement-backend: backend(Node.js, Express.js), database (SQLite)
/settlement-frontend: frontend(React)

## How to run the application

You need to have installed Node.js (developed with Node.js 18.18.2)

- Running backend
```bash
    cd settlement-backend
    npm run dev
```
It will run the backend development server on http://localhost:5000.
And database file will be created at `settlement-backend/db/`.

- Running frontend
```bash
    cd settlement-frontend
    npm start
```
It will run the frontend application on http://localhost:3000.

## Guide to application

After run the project locally, go to http://localhost:3000/party-a.
It's the page for Party A, and you can input and submit amount there.
And on http://localhost:3000/party-b, you can check and deal with it.

## To Do

- The authorization and authenticate need to be added to detect which party has logined to the application.
- Should show only allowed page for party A or B.

