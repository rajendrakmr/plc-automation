
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Optional
from app.repositories import blog_repo
from app.schemas.blog_schema import BlogCreate,BlogUpdate
from app.models.blog_model import Blog



def all(
    db: Session,
    page: int,
    limit: int,
    search: Optional[str] = None,
    blog_cat_id: Optional[int] = None, 
    url: Optional[str] = None, 
    status: Optional[int] = None
) -> dict:

    blogs, total = blog_repo.get_all(db,page,limit, search, blog_cat_id,url,status)

    return {
        "records": blogs,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": (total + limit - 1)  
        }
    } 
    
    
    
def fetch_all(
    db: Session,
    page: int,
    limit: int,
    search: Optional[str] = None,
    blog_cat_id: Optional[int] = None, 
    url: Optional[str] = None, 
    status: Optional[int] = None
) -> dict:

    blogs, total = blog_repo.list_all(db,page,limit, search, blog_cat_id,url,status)

    return {
        "records": blogs,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": (total + limit - 1) // limit
        }
    } 
 
 

def all_feature(
    db: Session, 
    limit: int,
    search: Optional[str] = None,
    type: Optional[int] = None
) -> dict:

    blogsal = blog_repo.list_feature(db,limit, search, type) 
    return blogsal 


# Get categories list
def all_cat(
    db: Session, 
    limit: int,
    search: Optional[str] = None,
    url: Optional[str] = None
) -> dict:

    categories = blog_repo.list_all_cat(db,limit, search, url) 
    return categories 

# Get tags list
def all_tags(
    db: Session, 
    limit: int,
    search: Optional[str] = None,
    url: Optional[str] = None
) -> dict:

    tags = blog_repo.list_all_tag(db,limit, search, url) 
    return tags 
 
# # Create new blogs service
def create_blog(db: Session, payload: BlogCreate) -> Blog:  
    existing = blog_repo.get_by_title(db, payload.blog_title)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"blug_title": "Same name blogs title is already exist"}}
        )
    existing_slug = blog_repo.get_by_slug(db, payload.blog_slug)
    if existing_slug:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"blog_slug": "Parmalink is already exist"}}
        )

    return blog_repo.create(db, payload)



#update blogs service
def update_blog(db: Session, blog_id: int, payload: BlogUpdate) -> Blog:
    existing = blog_repo.get_by_title(db, payload.blog_title)
    if existing and existing.blog_id != blog_id: 
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"blog_title": "Same name blog title already exists"}}
        )

    existing_slug = blog_repo.get_by_slug(db, payload.blog_slug)
    if existing_slug and existing_slug.blog_id != blog_id:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"blog_slug": "Permalink already exists"}}
        )

    return blog_repo.update(db, blog_id, payload)
 