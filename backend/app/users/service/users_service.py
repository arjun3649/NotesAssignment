from app.users.jwthelper import create_token
from fastapi import HTTPException
from app.users.dao.users_dao import users_dao
from app.users.schema.users_schema import UserCreate, authenticate
import logging
import bcrypt
import uuid

class UsersService:
    def create_user(self, user_data: UserCreate):
        try:
            # Check if user already exists
            if users_dao.get_user_by_email(user_data.user_email):
                raise HTTPException(status_code=400, detail="Email already registered")
            
           
            hashed_password = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt())
            
          
            user_id = str(uuid.uuid4())

            
            created_user_id = users_dao.create_user(
                user_id=user_id,
                user_name=user_data.user_name,
                user_email=user_data.user_email,
                password=hashed_password.decode('utf-8')
            )

            if not created_user_id:
                
                raise HTTPException(status_code=500, detail="Failed to create user.")
            
            return created_user_id
        except Exception as e:
            print(f"error:{str(e)}")
            raise HTTPException(status_code=500, detail="An unexpected error occurred while creating the user.")
    def authenticate_user(self, auth_data: authenticate):
        try:
           
            user = users_dao.authenticate_user(auth_data)
            
            if not user:
                raise HTTPException(status_code=401, detail="Invalid email or password")
            
            
            if not bcrypt.checkpw(auth_data.password.encode('utf-8'), user['password'].encode('utf-8')):
                raise HTTPException(status_code=401, detail="Invalid email or password")
            
            # Create token
            token = create_token(user['user_id'])
            
            return {"access_token": token, "token_type": "bearer"}
            
        except HTTPException:
            raise
        except Exception as e:
            logging.error(f"Error authenticating user: {str(e)}")
            raise HTTPException(status_code=500, detail="An unexpected error occurred during authentication.")
users_service = UsersService()