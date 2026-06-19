
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Optional
from app.repositories import category_repo
from app.schemas.products import ProductCreate,ProductUpdate
from app.models.products import Product
 
def fetch_categories(db: Session, 
        limit: Optional[int] = None,
        search: Optional[str] = None,
        category_id: Optional[int] = None,
        url: Optional[str] = None
        ) -> dict:
    records = category_repo.get_all(db,limit,search,category_id,url) 
    return records

def feature_categories(db: Session, 
        limit: Optional[int] = None,
        search: Optional[str] = None, 
        type: Optional[str] = None
        ) -> dict:
    records = category_repo.get_feature_categories(db,limit,search,type) 
    return records

def get_svc_all(db: Session, 
        limit: Optional[str] = None,
        search: Optional[str] = None,
        slug: Optional[str] = None,
        category_id: Optional[int] = None
        ) -> dict:
    records = category_repo.get_slug_all(db,limit,search,slug,category_id) 
    return records
