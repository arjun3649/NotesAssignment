from app.db_session import db_connection
from app.users.schema.users_schema import authenticate

class UsersDao:
    def create_user(self, user_id: str, user_name: str, user_email: str, password: str):
        connection = None
        cursor = None
        try:
            connection = db_connection()
            cursor = connection.cursor()
            
            query = "INSERT INTO USERS (user_id, user_name, user_email, password) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (user_id, user_name, user_email, password))
            connection.commit()
            return user_id
        except Exception as e:
            if connection:
                connection.rollback()
            raise e
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    def get_user_by_email(self, email: str):
        connection = None
        cursor = None
        try:
            connection = db_connection()
            cursor = connection.cursor(dictionary=True)
            query = "SELECT * FROM USERS WHERE user_email = %s"
            cursor.execute(query, (email,))
            user = cursor.fetchone()
            return user
        except Exception as e:
            raise e
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
    
    def authenticate_user(self, auth_data: authenticate):
    
        connection = None
        cursor = None
        try:
            connection = db_connection()
            cursor = connection.cursor(dictionary=True)
            query = "SELECT * FROM USERS WHERE user_email = %s"
            cursor.execute(query, (auth_data.user_email,))
            user = cursor.fetchone()
            return user
            
        except Exception as e:
            raise e
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

users_dao = UsersDao()