
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Optional
from app.repositories import category_repo
from app.schemas.products import ProductCreate,ProductUpdate
from app.models.category import Category 
from app.schemas.category import CategoryCreate,CategoryUpdate,CategoryResponse
import math

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



# list of categories of blogs
def category(
    db: Session,
    page: int,
    limit: int,
    search: Optional[str] = None,  
    status: Optional[int] = None
) -> dict:

    catogory, total = category_repo.all_category(db,page,limit,search,status)

    return {
        "records": catogory,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": math.ceil(total/limit)  
        }
    }  
    
    
# Create Blog Category
def create(db: Session, payload: CategoryCreate) -> Category:  
    existing = category_repo.get_by_title(db, payload.cat_name)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"cat_name": "Same name category is already exist"}}
        )
    existing_slug = category_repo.get_by_slug(db, payload.cat_slug)
    if existing_slug:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"cat_slug": "Slug is already exist"}}
        )

    return category_repo.create_category(db, payload)


# UPdate blogs Category
def update(db: Session, category_id: int, payload: CategoryUpdate) -> Category:
    existing = category_repo.get_by_title(db, payload.cat_name)
    if existing and existing.category_id != category_id: 
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"cat_name": "Same name Category title already exists"}}
        )

    existing_slug = category_repo.get_by_slug(db, payload.cat_slug)
    if existing_slug and existing_slug.category_id != category_id:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"cat_slug": "Permalink is already exists"}}
        )

    return category_repo.update_category(db, category_id, payload)

def delete_category(db: Session, category_id: int) -> None:
    category = category_repo.delete_category(db, category_id) 
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"errors": {"category_id": "Category not found"}}
        )
    return