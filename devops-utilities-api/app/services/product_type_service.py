
from sqlalchemy.orm import Session
from typing import Optional
from fastapi import HTTPException, status
from app.repositories import product_type_repo
# from app.schemas.products import ProductCreate,ProductUpdate
# from app.models.products import Product
 
def fetch_types(db: Session) -> dict:
    records = product_type_repo.get_all(db) 
    return records
