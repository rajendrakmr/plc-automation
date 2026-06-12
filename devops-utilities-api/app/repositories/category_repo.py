from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.category import Category
from app.schemas.category import CategoryCreate,CategoryUpdate
from typing import Optional
 

def get_all(db:Session,limit,search,category_id,type)->tuple[list[Category], int]:
    query = db.query(Category)
    if category_id is not None:
        query = query.filter(Category.category_id == category_id)
    
    # if type:
    #     type = f"{type.lower()}%"
    #     query = query.filter(
    #         Category.type.ilike(search)
    #     )
          
    if search:
        search = f"{search.lower()}%"
        query = query.filter(
            Category.cat_name.ilike(search)
        )
        
    categories = (
        query
        .order_by(Category.cat_name.asc()) 
        .limit(limit)
        .all()
    ) 
    return categories

ALLOWED_CATEGORIES = [
    "Siemens",
    "ABB",
    "Schneider",
    "Mitsubishi",
    "Omron",
    "Yaskawa",
    "Fanuc",
    "Allen Bradley",
    "B&R",
    "Beckhoff",
]

def get_slug_all(db: Session, limit: str | None = None,search: str | None = None,slug: str | None = None,category_id: str | None = None) -> list[Category]:
    query = db.query(Category).filter(
        Category.cat_name.in_(ALLOWED_CATEGORIES)   
    )
    if search:
        query = query.filter(Category.cat_name.ilike(f"{search}%"))
    if slug:
        query = query.filter(Category.cat_slug.ilike(f"{slug}%"))
        
    return query.order_by(Category.cat_name).all()
