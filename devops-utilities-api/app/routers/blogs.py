from fastapi import APIRouter, Depends, UploadFile, File, Query,status
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.users import User
from app.schemas.blog_schema import BlogCreate,BlogResponse,BlogUpdate,BlogCategoryCreate,BlogCategoryUpdate,BlogCategoryResponse,BlogTagResponse,BlogTagCreate,BlogTagUpdate
# from app.schemas.category import CategoryResponse
# from app.schemas.products import ProductCreate, ProductUpdate, ProductResponse 
from app.services.blog_service import (
    fetch_all,
    all_feature,
    all_tags,
    all_cat,
    create_blog,
    all,
    update_blog,
    blog_category,
    create_blog_category,
    update_blog_category,
    delete_blog_category,
    blog_tag,
    create_blog_tag,
    update_blog_tag,
    delete_blog_tag
    # create_product,
    # update_product,
    # delete_product,
    # fetch_products,
    # get_products,
    # get_product,
)

router = APIRouter(prefix="/blogs", tags=["Blogs"])


@router.get("/list")
def blog_list(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100), 
    search: Optional[str] = None,
    blog_cat_id: Optional[int] = None, 
    url: Optional[str] = None,  
    status: Optional[int] = None , 
    db: Session = Depends(get_db),
):
    return fetch_all( db,page,limit,search,blog_cat_id,url,status)
 
 



@router.get("/")
def get_all(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100), 
    search: Optional[str] = None,
    blog_cat_id: Optional[int] = None, 
    url: Optional[str] = None,  
    status: Optional[int] = None , 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return all( db,page,limit,search,blog_cat_id,url,status)
 
 
 
@router.get("/feature")
def blog_list( 
    limit: int = Query(20, ge=1, le=100), 
    search: Optional[str] = None, 
    type: Optional[str] = None , 
    db: Session = Depends(get_db),
):
    return all_feature( db,limit,search,type)


 
@router.get("/categories")
def cat_list( 
    limit: int = Query(20, ge=1, le=100), 
    search: Optional[str] = None, 
    url: Optional[str] = None , 
    db: Session = Depends(get_db),
):
    return all_cat( db,limit,search,url)


@router.get("/tags")
def cat_list( 
    limit: int = Query(20, ge=1, le=100), 
    search: Optional[str] = None, 
    url: Optional[str] = None , 
    db: Session = Depends(get_db),
):
    return all_tags( db,limit,search,url)
 


# ─── CREATE ───────────────────────────────────────────────
@router.post("/", response_model=BlogResponse)
def create( 
    payload: BlogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    return create_blog(db, payload)

@router.patch("/{blog_id}", response_model=BlogResponse)
def update(
    blog_id: int,
    payload: BlogUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return update_blog(db, blog_id, payload)





# Blogs categorys & tags

@router.get("/category")
def get_category(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100), 
    search: Optional[str] = None,  
    status: Optional[int] = None , 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
): 
    return blog_category( db,page,limit,search,status)
 
 
@router.post("/category", response_model=BlogCategoryResponse)
def create_category( 
    payload: BlogCategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_blog_category(db, payload)


@router.patch("/category/{category_id}", response_model=BlogCategoryResponse)
def update_category(
    category_id: int,
    payload: BlogCategoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return update_blog_category(db, category_id, payload)

 
@router.delete("/category/{category_id}", status_code=status.HTTP_200_OK)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    delete_blog_category(db, category_id)
    return {"success": True, "message": "Category deleted successfully"}




@router.get("/tag")
def get_category(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100), 
    search: Optional[str] = None,  
    status: Optional[int] = None , 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
): 
    return blog_tag( db,page,limit,search,status)
 
 
@router.post("/tag", response_model=BlogTagResponse)
def create_category( 
    payload: BlogTagCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_blog_tag(db, payload)


@router.patch("/tag/{tag_id}", response_model=BlogTagResponse)
def update_category(
    tag_id: int,
    payload: BlogTagUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return update_blog_tag(db, tag_id, payload)

 
@router.delete("/tag/{tag_id}", status_code=status.HTTP_200_OK)
def delete_category(tag_id: int, db: Session = Depends(get_db)):
    delete_blog_tag(db, tag_id)
    return {"success": True, "message": "Tag deleted successfully"}
 
 