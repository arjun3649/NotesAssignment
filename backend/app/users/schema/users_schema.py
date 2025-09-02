from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    user_name: str
    user_email: EmailStr
    password: str

class authenticate(BaseModel):
    user_email:EmailStr
    password:str