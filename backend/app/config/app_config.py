from typing import List
from pydantic_settings import BaseSettings
import os
from pathlib import Path

config_dir = Path(__file__).resolve().parent


class Configurations(BaseSettings):
    DB_NAME: str
    DB_HOST: str
    DB_USER: str
    DB_PASSWORD: str
    DB_PORT: int
    ALLOWED_ORIGINS: List[str] = ["*"]
    ALLOWED_METHODS: List[str] = ["*"]
    ALLOWED_HEADERS: List[str] = ["*"]
    APP_ENV: str
    

    class Config:
        env_file = os.path.join(config_dir, ".env")


def get_config() -> Configurations:
    if os.getenv("APP_ENV", None) == "DEV":
        return Configurations(_env_file=os.path.join(config_dir, ".env.dev"))
    elif os.getenv("APP_ENV", None) == "PROD":
        print("WE ARE USING PROD ENV")
        return Configurations(_env_file=os.path.join(config_dir, ".env.prod"))
    else:
        return Configurations(_env_file=os.path.join(config_dir, ".env"))


def get_env():
    return os.getenv("APP_ENV", "DEFAULT") 