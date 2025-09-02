from app.users.service.users_service import users_service  
from fastapi import APIRouter

from app.users.schema.users_schema import UserCreate, authenticate

router = APIRouter(
    prefix="/api/v1/users",
    tags=["users"]
)

@router.post("/signup")
async def create_user(user_data: UserCreate):
    user_id = users_service.create_user(user_data)
    return {"user_id": user_id, "message": "User created successfully"}

@router.post("/login")
async def login_user(auth_data: authenticate):
    token_data = users_service.authenticate_user(auth_data)
    return {"message": "Login successful", **token_data}