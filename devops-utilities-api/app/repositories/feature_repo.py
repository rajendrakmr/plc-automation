from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional 
from app.models.feature_type import FeatureType
from app.schemas.feature_schema import FeatureTypeCreate, FeatureTypeUpdate
from app.repositories import blog_repo,category_repo,product_repo
 
def create_feature_type(db: Session, payload: FeatureTypeCreate) -> list[FeatureType]:
    
    db.query(FeatureType).filter(
        FeatureType.types == payload.types,
        FeatureType.feature_type == payload.feature_type,
    ).delete(synchronize_session=False)
    db.flush()  
    
    created = []
    for item_id in payload.items_id:
        
        title:str =""
        if payload.feature_type=="blog":
           response= blog_repo.get_by_id(db,item_id)
           title = response.blog_title
           
        elif payload.feature_type=="product":
           response= product_repo.get_by_id(db,item_id)
           title = response.part_no
        else:
            response= category_repo.get_by_id(db,item_id)
            title = response.cat_name
           
        feature = FeatureType(
            title=title,
            types=payload.types,
            feature_type=payload.feature_type,
            status=payload.status or "active",
            id=item_id,
        )
        db.add(feature)
        created.append(feature)

    db.flush()
    db.commit()

    for f in created:
        db.refresh(f) 
    return created

 
def get_feature_type_by_id(db: Session, feature_id: int) -> FeatureType:
    feature = (
        db.query(FeatureType)
        .filter(FeatureType.feature_id == feature_id)
        .first()
    )
    if not feature:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"errors": {"feature_id": "Feature not found"}},
        )
    return feature

 
def all_feature_types(
    db: Session,
    page: int,
    limit: int,
    search: Optional[str] = None,
    type: Optional[str] = None,
    status: Optional[str] = None,
) -> tuple[list[FeatureType], int]:
    query = db.query(FeatureType)

    if type:
        query = query.filter(FeatureType.feature_type == type)

    if status:
        query = query.filter(FeatureType.status == status)
        
    if search:
        query = query.filter(FeatureType.types == search)
 
    total = query.count()

    features = (
        query
        .order_by(FeatureType.feature_id.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return features, total


# ─── Update ───────────────────────────────────────────────────────────────────

def update_feature_type(
    db: Session,
    feature_id: int,
    payload: FeatureTypeUpdate,
) -> FeatureType:
    feature = get_feature_type_by_id(db, feature_id)

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(feature, key, value)

    db.commit()
    db.refresh(feature)
    return feature


# ─── Toggle status ────────────────────────────────────────────────────────────

def toggle_feature_type_status(db: Session, feature_id: int) -> FeatureType:
    feature = get_feature_type_by_id(db, feature_id)
    feature.status = "inactive" if feature.status == "active" else "active"
    db.commit()
    db.refresh(feature)
    return feature
 
def delete_feature_type(db: Session, feature_id: int) -> FeatureType:
    feature = get_feature_type_by_id(db, feature_id)
    db.delete(feature)
    db.commit()
    return feature