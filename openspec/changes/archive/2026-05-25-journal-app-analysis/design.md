# Design: Journal Application Architecture

## Component Architecture

`
+----------------------------------------------------------+
|                     FRONTEND (Vite:5173)                 |
|                                                          |
|  +--------------------------------------------------+   |
|  | App.jsx                                          |   |
|  | - State: journals[], editingJournal, loading   |   |
|  | - Handlers: handleCreate, handleUpdate, etc.     |   |
|  +--------------------------+----------------------+   |
|                             |                            |
|       +---------------------+---------------------+      |
|       |                     |                     |      |
|       v                     v                     v      |
|  +----------+         +-----------+         +----------+ |
|  |JournalForm|         |JournalList|         |  api.js  | |
|  |- Form state     |  |- Map journals  |  |- Axios instance| |
|  |- Validation     |  |- Edit/Delete   |  |- CRUD functions| |
|  +----------+         +-----------+         +----------+ |
+-----------+--------------------------------------^--------+
            |                                      |
            | HTTP/JSON (Axios)                    |
            v                                      |
+---------+----------------------------------------------+
|                    BACKEND (UVICORN:8000)               |
|                                                         |
|  +--------------------------------------------------+   |
|  | main.py                                          |   |
|  | - FastAPI app with CORS                          |   |
|  | - CRUD endpoints                                 |   |
|  +--------------------------+-----------------------+   |
|                             |                            |
|       +---------------------+---------------------+      |
|       |                     |                     |      |
|       v                     v                     v      |
|  +----------+         +-----------+         +----------+ |
|  |database.py|         | models.py |         | Journal  | |
|  |- Engine     |  |- Pydantic models|  |- SQLAlchemy model| |
|  |- Session    |  |- JournalCreate  |  |- Table definition | |
|  |  provider   |  |- JournalResponse|  |                    | |
|  +----------+         +-----------+         +----------+ |
+-----------+--------------------------------------^--------+
            |                                      |
            | SQLAlchemy ORM                       |
            v                                      |
+---------+-------------------------------+--------+
|                DATABASE (SQLite)                 |
|  journals table                                |
|  - id (PK)                                     |
|  - title                                       |
|  - content                                     |
|  - created_at                                  |
|  - updated_at                                  |
+------------------------------------------------+
`

## Data Flow

`
User Action        Frontend              Backend             Database
-------------------------------------------------------------------------
Create Entry   --? Form submit       --? POST /journals/   --? INSERT
                   --? api.post()       --? create_journal()  --? RETURN new row
                   --? fetchJournals()  --? GET /journals/

Edit Entry     --? Form submit       --? PUT /journals/{id}--? UPDATE
                   --? api.put()        --? update_journal()  --? RETURN updated

Delete Entry   --? Confirm dialog    --? DELETE /journals/{id}
                   --? api.delete()     --? delete_journal()  --? DELETE

View List      --? useEffect mount   --? GET /journals/    --? SELECT all
                   --? api.get()        --? get_journals()    --? RETURN list
`

## Key Design Decisions

1. **SQLite for simplicity** - No external DB server needed, file-based persistence
2. **Separate models** - Pydantic models (API) separate from SQLAlchemy models (DB)
3. **CORS enabled** - Allows frontend dev server to communicate with backend
4. **Functional components** - React hooks for state management (no Redux)
