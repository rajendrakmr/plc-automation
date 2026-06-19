from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.category import Category 
from typing import Optional 
from app.models.feature_type import FeatureType
from sqlalchemy.orm import Session, joinedload,load_only
from fastapi import HTTPException, status




def get_feature_categories(
    db: Session,
    limit: int,
    search: Optional[str] = None,
    type: Optional[str] = None
) -> tuple[list[Category], int]:
    query = db.query(Category).options(
            load_only(
                Category.cat_name, 
                Category.cat_slug, 
                Category.category_id,
                Category.image_url,
            ), 
        )

    if search:
        query = query.filter(
            Category.blog_title.ilike(f"%{search}%")
        )

    if type:  
        feature_ids = (
            db.query(FeatureType.id)
            .filter(
                FeatureType.types == type,
                FeatureType.feature_type == 'category',
                FeatureType.status == "active",
            )
            .subquery()
        )
        query = query.filter(Category.category_id.in_(feature_ids)).order_by(Category.cat_name.asc()) 
 
    blogs = query.limit(limit).all()

    return blogs



def get_all(db:Session,limit,search,category_id,url)->tuple[list[Category], int]:
    query = db.query(Category)
    if category_id is not None:
        query = query.filter(Category.category_id == category_id) 
          
    if search:
        search = f"{search.lower()}%"
        query = query.filter(
            Category.cat_name.ilike(search)
        ) 
    if url:
        url = f"{url.lower()}%"
        query = query.filter(
            Category.cat_slug.ilike(url)
        ) 
    categories = (
        query
        .order_by(Category.cat_name.asc()) 
        .limit(limit)
        .all()
    ) 
    return categories

 
 
 

def get_slug_all(db: Session, limit: str | None = None,search: str | None = None,slug: str | None = None,category_id: str | None = None) -> list[Category]:
    query = db.query(Category)
    if search:
        query = query.filter(Category.cat_name.ilike(f"{search}%"))
    if slug:
        query = query.filter(Category.cat_slug.ilike(f"{slug}%"))
        
    return query.order_by(Category.cat_name).all()
