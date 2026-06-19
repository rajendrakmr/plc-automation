from fastapi import APIRouter, Depends,Query
from sqlalchemy.orm import Session 
from app.core.database import get_db 
from app.schemas.category import CatPageResponse ,CateResp
from typing import Optional
from app.services.cat_services import (fetch_categories,feature_categories,get_svc_all)
router = APIRouter(prefix="/categories", tags=["Category"])


@router.get("/list", response_model=list[CateResp])
def category_list( 
        limit: int = Query(20, ge=1, le=100), 
        search: Optional[str] = None, 
        category_id: Optional[int] = None,
        url: Optional[str] = None, 
        db: Session = Depends(get_db)):
    return fetch_categories(db, limit,search,category_id,url)

 
# @router.get("/slugs", response_model=list[CateResp])
# def category_slugs( 
#         limit: Optional[int] = None,
#         search: Optional[str] = None, 
#         category_id: Optional[int] = None,
#         slug: Optional[str] = None,
#         db: Session = Depends(get_db)):
#     return get_svc_all(
#         db=db, 
#         limit=limit,
#         search=search,
#         slug=slug,
#         category_id=category_id)


# list as feature categories as per admin  selected
@router.get("/feature", response_model=list[CatPageResponse])
def product_list( 
        limit: int = Query(20, ge=1, le=100), 
        search: Optional[str] = None,  
        type: Optional[str] = None,
        db: Session = Depends(get_db)):
    return feature_categories(db, limit,search,type)
   

 
 