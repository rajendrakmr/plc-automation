from pydantic import BaseModel, EmailStr


class SignupRequest(BaseModel):
    user_name: str
    last_name: str | None = None
    first_name: str | None = None
    image_url: str | None = None
    phone: str | None = None
    password: str
    email: EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"