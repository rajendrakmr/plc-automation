from fastapi import Request, HTTPException, status, Depends, Cookie
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.users import User


def get_current_user(
    db: Session = Depends(get_db),
    access_token: Optional[str] = Cookie(default=None)
) -> User:

    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"errors": {"session": "Login karein pehle"}}
        )

    payload = decode_access_token(access_token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"errors": {"token": "Token expired hai, dobara login karein"}}
        )

    user = db.query(User).filter(User.user_id == int(payload["sub"])).first()

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

    return user