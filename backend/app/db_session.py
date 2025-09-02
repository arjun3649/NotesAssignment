import mysql.connector
from app.config.app_config import get_config

def db_connection():
    """
    Create and return a MySQL database connection
    """
    HOST = get_config().DB_HOST
    USER = get_config().DB_USER
    PASS = get_config().DB_PASSWORD
    DATABASE = get_config().DB_NAME
    PORT = get_config().DB_PORT
    print(f"DEBUG - Connecting to: {HOST}:{PORT} with user: {USER} and database: {DATABASE}")
    connection = mysql.connector.connect(
        host=HOST,
        user=USER,
        password=PASS,
        database=DATABASE,
        port=PORT,
        use_pure=True
        
    )
    
    return connection 