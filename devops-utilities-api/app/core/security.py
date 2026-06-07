import hashlib
import base64
import bcrypt
from jose import jwt
from datetime import datetime, timedelta
from typing import Optional
from app.core.config import settings


def _prehash_password(password: str) -> str:
    sha256_hash = hashlib.sha256(password.encode("utf-8")).digest()
    return base64.b64encode(sha256_hash).decode("utf-8")


def hash_password(password: str) -> str:
    prehashed = _prehash_password(password)
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(prehashed.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    prehashed = _prehash_password(plain_password)
    return bcrypt.checkpw(prehashed.encode("utf-8"), hashed_password.encode("utf-8"))


def create_access_token(data: dict, expires_minutes: Optional[int] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        minutes=expires_minutes or settings.access_token_expire_minutes
    )
    to_encode.update({"exp": expire})
    return jwt.encode(
        to_encode,
        settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm
    )


def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm]
        )
        return payload
    except jwt.JWTError:
        return None