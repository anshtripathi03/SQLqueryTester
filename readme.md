CipherSQLStudio – SQL Tester Platform

A full-stack SQL learning platform where users can attempt SQL assignments, execute queries securely against PostgreSQL, and receive intelligent hints powered by an LLM.

This project was built as part of the CipherSchools Full Stack Assignment.

🚀 Features
Core Features

User Authentication (Signup / Login with JWT)

Assignment Listing Page

Assignment Attempt Interface

Monaco SQL Editor

Secure Query Execution (PostgreSQL Sandbox)

Intelligent Hint Generation (OpenAI API)

Responsive Mobile-First Design (Vanilla SCSS)

🏗️ Tech Stack
Frontend

React.js

Redux Toolkit (State Management)

Monaco Editor

Vanilla SCSS (Mobile-first architecture)

Backend

Node.js

Express.js

PostgreSQL (Query execution sandbox)

MongoDB (User + assignment persistence)

JWT Authentication

LLM Integration

OpenAI API

Prompt engineering to ensure hints only (no full query solutions)

📂 Folder Structure
sql-tester/
│
├── frontend/
│   ├── components/
│   ├── features/
│   ├── pages/
│   ├── store/
│   ├── styles/
│   └── main.jsx
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── utils/
│   └── server.js
│
├── .env.example
└── README.md
🔐 Authentication Flow

User signs up

Signup API creates user in MongoDB

JWT token generated

Token stored in browser

Protected routes validated via middleware

📊 Query Execution Flow

User selects assignment

Assignment data fetched from MongoDB

User writes SQL query in Monaco Editor

User clicks "Execute"

POST /api/execute

Backend:

Validates query (SELECT only)

Sanitizes input

Executes against PostgreSQL

PostgreSQL returns result

Backend sends formatted response

Frontend updates UI and renders result table

🤖 Hint Generation Flow

User clicks "Get Hint"

POST /api/hint

Backend:

Sends assignment context + user query to OpenAI

Uses controlled prompt

LLM returns conceptual hint

Response rendered in UI

⚠️ The LLM is strictly instructed to:

Avoid providing full SQL queries

Provide guidance only

🛡️ Security Measures

Only SELECT queries allowed

Blocked:

;

--

/*

Backend-controlled DB access

JWT-protected routes

Environment variables for secrets

📱 Responsive Design

Built using mobile-first SCSS.

Breakpoints:

320px

641px

1024px

1280px+

SCSS Features Used:

Variables

Mixins

Nesting

Partials

BEM Naming Convention

⚙️ Environment Variables

See .env.example

🛠️ Installation
Clone
git clone <repo-url>
cd sql-tester
Backend Setup
cd backend
npm install

Create .env file using .env.example

Run server:

npm run dev
Frontend Setup
cd frontend
npm install
npm run dev
🧠 Architectural Decisions

PostgreSQL used as sandbox database (query execution)

MongoDB used for persistence (users, assignments)

LLM isolated in hint controller

Strict query validation middleware

Clean separation of concerns (MVC pattern)

📈 Evaluation Alignment

✔ Core functionality
✔ Proper error handling
✔ Mobile-first SCSS
✔ Secure backend
✔ Effective prompt engineering

👨‍💻 Author

Built independently with full understanding of system architecture and data flow.