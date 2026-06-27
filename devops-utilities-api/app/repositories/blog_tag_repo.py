from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload,load_only
from typing import Optional, Tuple, List 
from app.schemas.blog_schema import BlogTagCreate,BlogTagUpdate 
from app.models.blog_model import BlogTag

def get_by_title(db: Session, title: str) -> BlogTag | None:
    return db.query(BlogTag).filter(BlogTag.blog_tag_name == title).first()
 
def get_by_cat_slug(db: Session, slug: str) -> BlogTag | None:
    return db.query(BlogTag).filter(BlogTag.blog_tag_slug == slug).first()
 
def create_tag(db: Session, payload: BlogTagCreate) -> BlogTag:  
    # print(payload)
    tag = BlogTag(**payload.model_dump())
    db.add(tag)
    db.flush()   
    db.commit()
    db.refresh(tag) 
    return tag

# update product
def update_tag(
    db: Session,
    tag_id: int,
    payload: BlogTagUpdate
) -> BlogTag: 
    tag = (
        db.query(BlogTag)
        .filter(BlogTag.blog_tag_id == tag_id)
        .first()
    ) 
    if not tag:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"errors": {"blog_tag_id": "tag not found"}}
        ) 

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(tag, key, value)

    db.commit()
    db.refresh(tag)

    return tag



def delete_tag(db: Session, tag_id: int) -> None:
    tag = db.query(BlogTag).filter(BlogTag.blog_tag_id == tag_id).first()
    if not tag:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"errors": {"tag_id": "tag not found"}}
        )
    
    db.delete(tag)
    db.commit()
    return tag
 

def all_tag(
    db: Session,
    page: int,
    limit: int, 
    search: Optional[str] = None,  
    status: Optional[int] = None
) -> tuple[list[BlogTag], int]:

    query = db.query(BlogTag)   
    
    if status is not None: 
        query = query.filter(BlogTag.status == status)
 
    if search:
        search = f"%{search.lower()}%"
        query = query.filter(
            BlogTag.blog_tag_slug.ilike(search) |
            BlogTag.blog_tag_name.ilike(search) 
        ) 
    total = query.count() 
    tag = (
        query
        .order_by(BlogTag.blog_tag_id.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return tag, total
 
 
 
  