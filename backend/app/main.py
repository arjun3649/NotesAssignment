import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
from app.config.app_config import get_config
from app.notes.router import notes_router
from app.users.router import users_router

import logging



# Configure FastAPI app based on environment
if get_config().APP_ENV == "PROD":
    app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
    print("Running in PRODUCTION mode")
elif get_config().APP_ENV == "DEV":
    app = FastAPI()
    print("Running in DEVELOPMENT mode")
else:
    app = FastAPI()
    print("Running in DEFAULT mode")

# Configure CORS
origins = get_config().ALLOWED_ORIGINS
methods = get_config().ALLOWED_METHODS
headers = get_config().ALLOWED_HEADERS

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=methods,
    allow_headers=headers,
)

# Register exception handlers


# Include routers
app.include_router(notes_router.router)
app.include_router(users_router.router)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Boilerplate"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, log_level="info")
