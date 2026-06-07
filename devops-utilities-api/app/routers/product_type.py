from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session 
from app.core.database import get_db 
from app.schemas.product_type import ProductTypeResponse 
from app.services.product_type_service import (fetch_types)
router = APIRouter(prefix="/ptypes", tags=["Product Type"])

 
# Get puplic routes data
@router.get("/list", response_model=list[ProductTypeResponse])
def product_list(db: Session = Depends(get_db),):
    return fetch_types(db)

 