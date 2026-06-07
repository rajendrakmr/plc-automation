from fastapi import APIRouter, Depends, Response, Cookie
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.auth import SignupRequest, LoginRequest
from app.services.auth_service import signup_user, login_user
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup")
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
     
    user = signup_user(db, payload)
    return {"message": "User created", "user_id": user.user_id}



@router.post("/login")
def login(
    response: Response,
    payload: LoginRequest,
    db: Session = Depends(get_db)
):
    user = login_user(db, payload.email, payload.password)

    token = create_access_token({"sub": str(user.user_id)})

    # Cookie mein token set karo
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,        # JS se access nahi hoga — XSS safe
        samesite="lax",
        secure=False,         # Production mein True karo (HTTPS)
        max_age=60 * 60 * 24  # 1 din
    )

    return {
        "message": "Login successful",
        "user": {
            "user_id": user.user_id,
            "user_name": user.user_name,
            "email": user.email,
            "status": user.status
        }
    }


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logout successful"}