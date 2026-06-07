from sqlalchemy.orm import Session
from app.models.product_type import ProductType
from app.schemas.category import CategoryCreate,CategoryUpdate
from fastapi import HTTPException, status
from typing import Optional

 
def get_all(db:Session)->tuple[list[ProductType], int]:
    return db.query(ProductType).all()
    
 