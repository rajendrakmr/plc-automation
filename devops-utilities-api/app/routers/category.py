from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session 
from app.core.database import get_db 
from app.schemas.category import CatPageResponse 
from app.services.cat_services import (fetch_categories)
router = APIRouter(prefix="/categories", tags=["Category"])

 
# Get puplic routes data
@router.get("/list", response_model=list[CatPageResponse])
def product_list(db: Session = Depends(get_db),):
    return fetch_categories(db)

 