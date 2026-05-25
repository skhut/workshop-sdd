from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class JournalBase(BaseModel):
    title: str
    content: str

class JournalCreate(JournalBase):
    pass

class JournalUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

class JournalResponse(JournalBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True