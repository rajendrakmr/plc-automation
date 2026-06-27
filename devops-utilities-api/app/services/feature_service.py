from sqlalchemy.orm import Session 
from fastapi import HTTPException, status
from typing import Optional
from app.repositories import  feature_repo
from app.schemas.feature_schema import  FeatureResponse,FeatureTypeCreate,FeatureTypeUpdate
from app.models.feature_type import FeatureType
import math 

def all(
    db: Session,
    page: int,
    limit: int,
    search: Optional[str] = None,  
    type: Optional[str] = None,  
    status: Optional[str] = None
) -> dict:

    records, total = feature_repo.all_feature_types(db,page,limit,search,type,status)

    return {
        "records": records,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": math.ceil(total/limit)  
        }
    }  
    
 
def create(db: Session, payload: FeatureTypeCreate) -> FeatureType:  

    return feature_repo.create_feature_type(db, payload)

 
 
def delete(db: Session, feature_id: int) -> None:
    category = feature_repo.delete_feature_type(db, feature_id) 
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"errors": {"feature_id": "Feature type not found"}}
        )
    return

 