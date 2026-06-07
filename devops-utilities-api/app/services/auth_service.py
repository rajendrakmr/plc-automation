from sqlalchemy.orm import Session
from app.models.users import User
from app.repositories.user_repo import get_user_by_email, create_user
from app.core.security import hash_password, verify_password,create_access_token
from fastapi import HTTPException, status

def signup_user(db: Session, data):
    if get_user_by_email(db, data.email):
        raise Exception("Email already exists")

    user = User(
        user_name=data.user_name,
        email=data.email,
        phone=data.phone,
        password_hash=hash_password(data.password)
    )

    return create_user(db, user)


def login_user(db: Session, email: str, password: str) -> User:
    user = get_user_by_email(db, email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"errors": {"email": "Email is not registred"}}
        )

    if user.status == "inactive":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={"errors": {"email": "Account is inactive. Contact administrator."}}
        )

    if user.status == "blocked":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={"errors": {"email": "Account has been blocked."}}
        )

    if not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"errors": {"password": "Entered invalid password."}}
        )

    return user