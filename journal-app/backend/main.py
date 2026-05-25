from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db, engine, Journal
from models import JournalCreate, JournalUpdate, JournalResponse

app = FastAPI(title="My Journal API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/journals/", response_model=JournalResponse)
def create_journal(journal: JournalCreate, db: Session = Depends(get_db)):
    db_journal = Journal(title=journal.title, content=journal.content)
    db.add(db_journal)
    db.commit()
    db.refresh(db_journal)
    return db_journal

@app.get("/journals/", response_model=List[JournalResponse])
def get_journals(q: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Journal)
    if q:
        query = query.filter(Journal.title.ilike(f"%{q}%"))
    journals = query.order_by(Journal.created_at.desc()).all()
    return journals

@app.get("/journals/{journal_id}", response_model=JournalResponse)
def get_journal(journal_id: int, db: Session = Depends(get_db)):
    journal = db.query(Journal).filter(Journal.id == journal_id).first()
    if not journal:
        raise HTTPException(status_code=404, detail="Journal not found")
    return journal

@app.put("/journals/{journal_id}", response_model=JournalResponse)
def update_journal(journal_id: int, journal_update: JournalUpdate, db: Session = Depends(get_db)):
    db_journal = db.query(Journal).filter(Journal.id == journal_id).first()
    if not db_journal:
        raise HTTPException(status_code=404, detail="Journal not found")
    
    if journal_update.title is not None:
        db_journal.title = journal_update.title
    if journal_update.content is not None:
        db_journal.content = journal_update.content
    
    db.commit()
    db.refresh(db_journal)
    return db_journal

@app.delete("/journals/{journal_id}")
def delete_journal(journal_id: int, db: Session = Depends(get_db)):
    db_journal = db.query(Journal).filter(Journal.id == journal_id).first()
    if not db_journal:
        raise HTTPException(status_code=404, detail="Journal not found")
    
    db.delete(db_journal)
    db.commit()
    return {"message": "Journal deleted successfully"}