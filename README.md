# digitit-app (full-stack)

This repository contains a ready-to-run full-stack application (server + client) for the DigitIt take-home assignment.

Two folders:
- server/  (Node + Express + MongoDB)
- client/  (Vite + React)

Quickstart:
1. Start MongoDB locally.
2. Server:
   cd server
   npm install
   cp .env.example .env
   # update JWT_SECRET if desired
   npm run seed
   npm run dev
3. Client:
   cd client
   npm install
   npm run dev
   Open the client at the printed Vite URL.

Demo accounts (seed):
- teacherA@example.com / Pass1234
- studentX@example.com / Pass1234
- studentY@example.com / Pass1234
