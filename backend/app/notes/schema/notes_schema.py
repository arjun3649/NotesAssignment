from pydantic import BaseModel
import datetime


class NoteRequest(BaseModel):
    note_title: str
    note_content: str | None = None


class NoteResponse(BaseModel):
    note_id: str
    user_id: str
    note_title: str
    note_content: str | None
    last_update: datetime.datetime
    created_on: datetime.datetime

    