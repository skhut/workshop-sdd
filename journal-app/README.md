# My Journal Application

A web application to manage daily journal entries using React, FastAPI, and SQLite.

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: FastAPI
- **Database**: SQLite

## Setup

### Backend Setup
```bash
cd journal-app/backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The API will run at http://localhost:8000

### Frontend Setup
```bash
cd journal-app/frontend
npm install
npm run dev
```
The app will run at http://localhost:5173

## Features
- Create new journal entries
- View all journal entries
- Edit existing journal entries
- Delete journal entries
- All data persisted in SQLite database