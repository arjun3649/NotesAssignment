from fastapi import HTTPException
from app.notes.dao.notes_dao import notes_dao
from app.notes.schema.notes_schema import NoteRequest

class NotesService:
    def create_note(self, note_data: NoteRequest, user_id: str):
        try:
            note_id = notes_dao.create_note(note_data, user_id)
            if not note_id:
                raise HTTPException(status_code=500, detail="Failed to create note.")
            return note_id
        except Exception as e:
            raise HTTPException(status_code=500, detail="An unexpected error occurred while creating the note.")

    def get_all_notes_for_user(self, user_id: str):
        try:
            return notes_dao.get_all_notes_for_user(user_id)
        except Exception as e:
            raise HTTPException(status_code=500, detail="An unexpected error occurred while retrieving notes.")

    def get_note_by_id(self, note_id: str, user_id: str):
        try:
            
            note = notes_dao.get_note_by_id(note_id, user_id)
            if not note:
                raise HTTPException(status_code=404, detail="Note not found or you don't have permission to access it")
            return note
        except HTTPException as he:
            raise he
        except Exception as e:
            raise HTTPException(status_code=500, detail="An unexpected error occurred while retrieving the note.")

    def update_note(self, note_id: str, note_data: NoteRequest, user_id: str):
        try:
            existing_note = notes_dao.get_note_by_id(note_id, user_id)
            if not existing_note:
                raise HTTPException(status_code=404, detail="Note not found")
            
            success = notes_dao.update_note(note_id, note_data, user_id)
            if not success:
                 raise HTTPException(status_code=500, detail="Failed to update note.")
            return success
        except HTTPException as he:
            raise he
        except Exception as e:
            raise HTTPException(status_code=500, detail="An unexpected error occurred while updating the note.")

    def delete_note(self, note_id: str, user_id: str):
        try:
            existing_note = notes_dao.get_note_by_id(note_id, user_id)
            if not existing_note:
                raise HTTPException(status_code=404, detail="Note not found")

            success = notes_dao.delete_note(note_id, user_id)
            if not success:
                raise HTTPException(status_code=500, detail="Failed to delete note.")
            return success
        except HTTPException as he:
            raise he
        except Exception as e:
            raise HTTPException(status_code=500, detail="An unexpected error occurred while deleting the note.")

notes_service = NotesService()