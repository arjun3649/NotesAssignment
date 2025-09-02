from fastapi import APIRouter, HTTPException, Depends
from app.notes.service.notes_service import notes_service
from app.notes.schema.notes_schema import NoteRequest
from app.users.jwthelper import get_current_user
from fastapi.security import HTTPBearer

security = HTTPBearer()

router = APIRouter(
    prefix="/api/v1/notes",
    tags=["notes"]
)

@router.post("/new_note", dependencies=[Depends(security)])
async def create_note(
    note_data: NoteRequest, 
    current_user_id: str = Depends(get_current_user)
):
    note_id = notes_service.create_note(note_data, current_user_id)
    return {"note_id": note_id, "message": "Note created successfully"}

@router.get("/", dependencies=[Depends(security)])
async def get_all_notes(current_user_id: str = Depends(get_current_user)):
    notes = notes_service.get_all_notes_for_user(current_user_id)
    return {"notes": notes}

@router.get("/{note_id}", dependencies=[Depends(security)])
async def get_note_by_id(
    note_id: str, 
    current_user_id: str = Depends(get_current_user)
):
    note = notes_service.get_note_by_id(note_id, current_user_id)
    return {"note": note}

@router.put("/edit/{note_id}", dependencies=[Depends(security)])
async def update_note(
    note_id: str, 
    note_data: NoteRequest,
    current_user_id: str = Depends(get_current_user)
):
    notes_service.update_note(note_id, note_data, current_user_id)
    return {"message": "Note updated successfully"}

@router.delete("/{note_id}", dependencies=[Depends(security)])
async def delete_note(
    note_id: str,
    current_user_id: str = Depends(get_current_user)
):
    notes_service.delete_note(note_id, current_user_id)
    return {"message": "Note deleted successfully"}