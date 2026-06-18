from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional
from pathlib import Path

CONFIG_DIR = Path(__file__).parent
PROJECT_ROOT = CONFIG_DIR.parent
LOG_DIR = PROJECT_ROOT / "logs"

class Settings(BaseSettings):
    # App
    app_name: str = "PLC Backend"
    environment: str = "development"
    debug: bool = False
    secret_key: str
    allowed_origins: str = "http://localhost:3000"

    # Server
    host: str = "0.0.0.0"
    port: int = 8000

    # MySQL
    mysql_host: str
    mysql_port: int = 3306
    mysql_user: str
    mysql_password: str
    mysql_database: str
    database_url: str

    # JWT
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    # Mail
    mail_username: str
    mail_password: str
    mail_from: str
    mail_port: int = 587
    mail_server: str
    mail_from_name: str = "No Reply"

    # AWS
    aws_region: Optional[str] = None
    aws_s3_bucket: Optional[str] = None
    aws_access_key_id: Optional[str] = None
    aws_secret_access_key: Optional[str] = None

    # OpenAI
    openai_api_key: Optional[str] = None

    # Timezone
    timezone: str = "Asia/Kolkata"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore"  # changed from "forbid" to avoid .env key mismatches
    )

settings = Settings()