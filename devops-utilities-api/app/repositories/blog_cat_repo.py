from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload,load_only
from typing import Optional, Tuple, List 
from app.schemas.blog_schema import BlogCategoryCreate,BlogCategoryUpdate 
from app.models.blog_model import BlogCategory

def get_by_title(db: Session, title: str) -> BlogCategory | None:
    return db.query(BlogCategory).filter(BlogCategory.blog_cat_name == title).first()
 
def get_by_cat_slug(db: Session, slug: str) -> BlogCategory | None:
    return db.query(BlogCategory).filter(BlogCategory.blog_cat_slug == slug).first()
 
def create_category(db: Session, payload: BlogCategoryCreate) -> BlogCategory:  
    # print(payload)
    category = BlogCategory(**payload.model_dump())
    db.add(category)
    db.flush()   
    db.commit()
    db.refresh(category) 
    return category

# update product
def update_category(
    db: Session,
    category_id: int,
    payload: BlogCategoryUpdate
) -> BlogCategory: 
    category = (
        db.query(BlogCategory)
        .filter(BlogCategory.blog_cat_id == category_id)
        .first()
    ) 
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"errors": {"blog_cat_id": "Category not found"}}
        ) 

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(category, key, value)

    db.commit()
    db.refresh(category)

    return category



def delete_category(db: Session, category_id: int) -> None:
    category = db.query(BlogCategory).filter(BlogCategory.blog_cat_id == category_id).first()
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"errors": {"category_id": "Category not found"}}
        )
    
    db.delete(category)
    db.commit()
    return category
 

def all_category(
    db: Session,
    page: int,
    limit: int, 
    search: Optional[str] = None,  
    status: Optional[str] = None
) -> tuple[list[BlogCategory], int]:

    query = db.query(BlogCategory) 
    if status is not None: 
        query = query.filter(BlogCategory.status == status)
 
    if search:
        search = f"%{search.lower()}%"
        query = query.filter(
            BlogCategory.blog_cat_slug.ilike(search) |
            BlogCategory.blog_cat_name.ilike(search) 
        ) 
    total = query.count() 
    catogory = (
        query
        .order_by(BlogCategory.blog_cat_id.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return catogory, total
 
 
 
  