from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from app.middlewares.logging_middleware import LoggingMiddleware
# from app.middlewares.context_middleware import ContextMiddleware
from app.core.config import settings
from app.routers import auth,users,products,product_type ,category,blogs 
app = FastAPI(title=settings.app_name)

origins = [origin.strip() for origin in settings.allowed_origins.split(",") if origin.strip()]

 

from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi import Depends

from app.core.database import get_db

from app.core.exceptions import validation_exception_handler
from fastapi.exceptions import RequestValidationError
app.add_exception_handler(RequestValidationError, validation_exception_handler)

@app.get("/api/db/health")
def check_db_connection(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {
            "status": "success",
            "database": "connected"
        }
    except Exception as e:
        return {
            "status": "error",
            "database": "not connected",
            "detail": str(e)
        }
# app.add_middleware(
#     ContextMiddleware
# )


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.add_middleware(
#     LoggingMiddleware
# )

# app.include_router(products.router, prefix="/api")
# app.include_router(admin.router, prefix="/api")
# app.include_router(infos.router, prefix="/api")
# app.include_router(blogs.router, prefix="/api")
# app.include_router(search.router, prefix="/api")
# app.include_router(jobs.router, prefix="/api")

# start_log_scheduler()

@app.get("/api/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(blogs.router, prefix="/api")
app.include_router(products.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(category.router, prefix="/api")
app.include_router(product_type.router, prefix="/api")