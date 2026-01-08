import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Usa DB_HOST para permitir cambiar entre localhost (dev) y db (docker)
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_USER = os.getenv("DB_USER", "user")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "password")
    DB_NAME = os.getenv("DB_NAME", "club_database")
    
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Seguridad JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback_secret_key_dev")