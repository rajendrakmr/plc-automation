from fastapi import APIRouter, Depends, UploadFile, File, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.users import User
from app.schemas.blog_schema import BlogCreate,BlogResponse,BlogUpdate
# from app.schemas.products import ProductCreate, ProductUpdate, ProductResponse 
from app.services.blog_service import (
    fetch_all,
    all_feature,
    all_tags,
    all_cat,
    create_blog,
    all,
    update_blog,
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


# @router.delete("/{product_id}")
# def delete(
#     product_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     return delete_product(db, product_id)

# # Get protected routes data
# @router.get("/")
# def get_all(
#     page: int = Query(1, ge=1),
#     limit: int = Query(20, le=100),
#     search: Optional[str] = None,
#     stock: Optional[str] = None,
#     status: Optional[bool] = None,
#     product_type_id: Optional[int] = None,
#     category_id: Optional[int] = None,
    
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     return fetch_products(db, page, limit,search,category_id,product_type_id,stock,status)

 
# Get puplic routes data
