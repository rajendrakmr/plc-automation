from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category import CategoryCreate,CategoryUpdate
from fastapi import HTTPException, status
from typing import Optional


# def get_by_part(db: Session, part: str) -> Category | None:
#     return db.query(Category).filter(Category.part == part).first()


# def get_by_slug(db: Session, url: str) -> Category | None:
#     return db.query(Category).filter(Category.url == url).first()

# def create(db: Session, payload: CategoryCreate) -> Category:
#     product = Category(**payload.model_dump())
#     db.add(product)
#     db.commit()
#     db.refresh(product)
#     return product

# def update(db: Session, product_id: int, payload: CategoryUpdate) -> Category:
#     product = db.query(Category).filter(Category.id == product_id).first()
#     if not product:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail={"errors": {"product_id": "Product not found"}}
#         )
    
#     for key, value in payload.model_dump(exclude_unset=True).items():
#         setattr(product, key, value) 
#     db.commit()
#     db.refresh(product)
#     return product



# def delete(db: Session, product_id: int) -> None:
#     product = db.query(Category).filter(Category.id == product_id).first()
#     if not product:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail={"errors": {"product_id": "Product not found"}}
#         )
    
#     db.delete(product)
#     db.commit()


def get_all(db:Session)->tuple[list[Category], int]:
    return db.query(Category).all()
    

# def get_all(
#     db: Session,
#     page: int,
#     limit: int,
#     ptype: Optional[str],
#     stock: Optional[int],
#     status: Optional[bool]
# ) -> tuple[list[Category], int]:
    
#     query = db.query(Category) 
#     if ptype is not None:
#         query = query.filter(Category.ptype == ptype)
#     if stock is not None:
#         query = query.filter(Category.stock == stock)
#     if status is not None:
#         query = query.filter(Category.status == status)

#     total = query.count()
#     products = query.offset((page - 1) * limit).limit(limit).all()

#     return products, total
