from app.db_session import db_connection
import uuid
from app.notes.schema.notes_schema import NoteRequest

class NotesDao:
    
    def create_note(self, note_data: NoteRequest, user_id: str):
        connection = None
        cursor = None
        try:
            connection = db_connection()
            cursor = connection.cursor()
            note_id = str(uuid.uuid4())
            
         
            query = "INSERT INTO NOTES (note_id, user_id, note_title, note_content) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (note_id, user_id, note_data.note_title, note_data.note_content))
            connection.commit()
            return note_id
        except Exception as e:
            if connection:
                connection.rollback()
            raise e
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    def get_note_by_id(self, note_id: str, user_id: str = None):
        """Get note by ID, optionally verify ownership"""
        connection = None
        cursor = None
        try:
            connection = db_connection()
            cursor = connection.cursor(dictionary=True)
            
            if user_id:
                
                query = "SELECT * FROM NOTES WHERE note_id = %s AND user_id = %s"
                cursor.execute(query, (note_id, user_id))
            else:
                query = "SELECT * FROM NOTES WHERE note_id = %s"
                cursor.execute(query, (note_id,))
                
            note = cursor.fetchone()
            return note
        except Exception as e:
            raise e
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    def get_all_notes_for_user(self, user_id: str):
        connection = None
        cursor = None
        try:
            connection = db_connection()
            cursor = connection.cursor(dictionary=True)
            query = "SELECT * FROM NOTES WHERE user_id = %s ORDER BY last_update DESC"
            cursor.execute(query, (user_id,))
            notes = cursor.fetchall()
            return notes
        except Exception as e:
            raise e
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    def update_note(self, note_id: str, note_data: NoteRequest, user_id: str):
        """Update note with ownership verification"""
        connection = None
        cursor = None
        try:
            connection = db_connection()
            cursor = connection.cursor()
            
            
            query = "UPDATE NOTES SET note_title = %s, note_content = %s WHERE note_id = %s AND user_id = %s"
            cursor.execute(query, (note_data.note_title, note_data.note_content, note_id, user_id))
            connection.commit()
            
            return cursor.rowcount > 0
        except Exception as e:
            if connection:
                connection.rollback()
            raise e
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    def delete_note(self, note_id: str, user_id: str):
        """Delete note with ownership verification"""
        connection = None
        cursor = None
        try:
            connection = db_connection()
            cursor = connection.cursor()
            query = "DELETE FROM NOTES WHERE note_id = %s AND user_id = %s"
            cursor.execute(query, (note_id, user_id))
            connection.commit()
            
            return cursor.rowcount > 0
        except Exception as e:
            if connection:
                connection.rollback()
            raise e
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

notes_dao = NotesDao()