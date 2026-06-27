
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Optional
from app.repositories import blog_repo,blog_cat_repo,blog_tag_repo
from app.schemas.blog_schema import BlogCreate,BlogUpdate,BlogCategoryCreate,BlogCategoryUpdate,BlogTagUpdate,BlogTagCreate,BlogTagResponse
from app.models.blog_model import Blog,BlogCategory,BlogTag
 
import math

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
            "pages": math.ceil(total/limit)  
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
            "pages": math.ceil(total/limit) // limit
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
 
 
 
#  Category & Tags

# list of categories of blogs
def blog_category(
    db: Session,
    page: int,
    limit: int,
    search: Optional[str] = None,  
    status: Optional[int] = None
) -> dict:

    catogory, total = blog_cat_repo.all_category(db,page,limit,search,status)

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
def create_blog_category(db: Session, payload: BlogCategoryCreate) -> BlogCategory:  
    existing = blog_cat_repo.get_by_title(db, payload.blog_cat_name)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"blog_cat_name": "Same name category title is already exist"}}
        )
    existing_slug = blog_cat_repo.get_by_cat_slug(db, payload.blog_cat_slug)
    if existing_slug:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"blog_cat_slug": "Parmalink is already exist"}}
        )

    return blog_cat_repo.create_category(db, payload)


# UPdate blogs Category
def update_blog_category(db: Session, category_id: int, payload: BlogCategoryUpdate) -> BlogCategory:
    existing = blog_cat_repo.get_by_title(db, payload.blog_cat_name)
    if existing and existing.blog_cat_id != category_id: 
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"blog_title": "Same name Category title already exists"}}
        )

    existing_slug = blog_cat_repo.get_by_cat_slug(db, payload.blog_cat_slug)
    if existing_slug and existing_slug.blog_cat_id != category_id:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"blog_slug": "Permalink is already exists"}}
        )

    return blog_cat_repo.update_category(db, category_id, payload)

def delete_blog_category(db: Session, category_id: int) -> None:
    category = blog_cat_repo.delete_category(db, category_id) 
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"errors": {"blog_cat_id": "Category not found"}}
        )
    return





def blog_tag(
    db: Session,
    page: int,
    limit: int,
    search: Optional[str] = None,  
    status: Optional[int] = None
) -> dict:

    catogory, total = blog_tag_repo.all_tag(db,page,limit,search,status)

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
def create_blog_tag(db: Session, payload: BlogTagCreate) -> BlogTag:  
    existing = blog_tag_repo.get_by_title(db, payload.blog_tag_name)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"blog_cat_name": "Same name category title is already exist"}}
        )
    existing_slug = blog_tag_repo.get_by_cat_slug(db, payload.blog_tag_slug)
    if existing_slug:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"blog_cat_slug": "Parmalink is already exist"}}
        )

    return blog_tag_repo.create_tag(db, payload)


# UPdate blogs Category
def update_blog_tag(db: Session, tag_id: int, payload: BlogTagUpdate) -> BlogTag:
    existing = blog_tag_repo.get_by_title(db, payload.blog_tag_name)
    if existing and existing.blog_tag_id != tag_id: 
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"blog_title": "Same name Category title already exists"}}
        )

    existing_slug = blog_tag_repo.get_by_cat_slug(db, payload.blog_tag_slug)
    if existing_slug and existing_slug.blog_tag_id != tag_id:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"errors": {"blog_slug": "Permalink is already exists"}}
        )

    return blog_tag_repo.update_tag(db, tag_id, payload)

def delete_blog_tag(db: Session, tag_id: int) -> None:
    category = blog_tag_repo.delete_tag(db, tag_id) 
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"errors": {"blog_cat_id": "Category not found"}}
        )
    return