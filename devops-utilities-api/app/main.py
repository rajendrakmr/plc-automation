from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.config import settings
from app.core.database import get_db
from app.core.exceptions import validation_exception_handler
from app.routers import auth, users, products, product_type, category, blogs, enquiry

# ─── App ──────────────────────────────────────────────────────────────────────
app = FastAPI(title=settings.app_name)

# ─── Exception Handlers ───────────────────────────────────────────────────────
app.add_exception_handler(RequestValidationError, validation_exception_handler)

# ─── Middleware ───────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ──────────────────────────────────────────────────────────────────
app.include_router(auth.router,         prefix="/api")
app.include_router(users.router,        prefix="/api")
app.include_router(category.router,     prefix="/api")
app.include_router(product_type.router, prefix="/api")
app.include_router(products.router,     prefix="/api")
app.include_router(blogs.router,        prefix="/api")
app.include_router(enquiry.router,      prefix="/api")

# ─── Health Checks ────────────────────────────────────────────────────────────
@app.get("/api/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}

@app.get("/api/db/health")
def check_db_connection(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "success", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": "not connected", "detail": str(e)}
    
    
