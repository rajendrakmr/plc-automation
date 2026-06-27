from fastapi import APIRouter, Depends, UploadFile, File, Query,status
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.users import User
from app.schemas.feature_schema import FeatureResponse,FeatureTypeCreate,FeatureTypeUpdate
from app.services import feature_service
router = APIRouter(prefix="/feature_types", tags=["Blogs"])


@router.get("/")
def all(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100), 
    search: Optional[str] = None, 
    type: Optional[str] = None,  
    status: Optional[str] = None , 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return feature_service.all( db,page,limit,search,type,status)
  
  

@router.post("/", response_model=list[FeatureResponse])
def create( 
    payload: FeatureTypeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return feature_service.create(db, payload)

# @router.patch("/{blog_id}", response_model=FeatureResponse)
# def update(
#     blog_id: int,
#     payload: FeatureTypeUpdate,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     return feature_service.update(db, blog_id, payload)


 
@router.delete("/{feature_id}", status_code=status.HTTP_200_OK)
def delete(feature_id: int, db: Session = Depends(get_db)):
    feature_service.delete(db, feature_id)
    return {"success": True, "message": "Feature deleted successfully"}


 