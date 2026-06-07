from sqlalchemy.orm import Session, joinedload
from typing import Optional, Tuple, List
from app.models.products import Product 
from app.schemas.products import ProductCreate,ProductUpdate
from fastapi import HTTPException, status
 

def get_by_part(db: Session, part_no: str) -> Product | None:
    return db.query(Product).filter(Product.part_no == part_no).first()


def get_by_slug(db: Session, url: str) -> Product | None:
    return db.query(Product).filter(Product.url == url).first()

# def create(db: Session, payload: ProductCreate) -> Product:
#     product = Product(**payload.model_dump())
#     db.add(product)
#     db.commit()
#     db.refresh(product)
#     return product

from app.models.products import Product
from app.models.product_meta import ProductMeta


def create(db: Session, payload: ProductCreate) -> Product:

    data = payload.model_dump(exclude={"meta"})

    product = Product(**data)

    db.add(product)
    db.flush()  # product_id generate ho jayega

    for item in payload.meta:
        meta = ProductMeta(
            product_id=product.product_id,
            meta_key=item.meta_key,
            meta_title=item.meta_title,
            meta_desc=item.meta_desc,
        )
        db.add(meta)

    db.commit()
    db.refresh(product)

    return product

# update product
def update(
    db: Session,
    product_id: int,
    payload: ProductUpdate
) -> Product:

    product = (
        db.query(Product)
        .filter(Product.product_id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"errors": {"product_id": "Product not found"}}
        )

    data = payload.model_dump(
        exclude_unset=True,
        exclude={"meta"}
    )

    for key, value in data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product



def delete(db: Session, product_id: int) -> None:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"errors": {"product_id": "Product not found"}}
        )
    
    db.delete(product)
    db.commit()



def get_all(
    db: Session,
    page: int,
    limit: int,
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    product_type_id: Optional[int] = None,
    stock: Optional[str] = None,
    status: Optional[str] = None
) -> tuple[list[Product], int]:

    query = db.query(Product) 
    query = query.options(
        joinedload(Product.category),
        joinedload(Product.product_type),
        joinedload(Product.meta)
    )
    

    # Filters
    if category_id is not None:
        query = query.filter(Product.category_id == category_id)

    if product_type_id is not None:
        query = query.filter(Product.product_type_id == product_type_id)

    if stock:
        query = query.filter(Product.stock == stock)

    if status:
        query = query.filter(Product.status == status)

    # 🔥 SEARCH FIX (important)
    if search:
        search = f"%{search.lower()}%"
        query = query.filter(
            Product.part_no.ilike(search) |
            Product.url.ilike(search) |
            Product.short_desc.ilike(search)
        )

    # total BEFORE pagination
    total = query.count()

    # pagination
    products = (
        query
        .order_by(Product.product_id.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return products, total

# class ProductRepository:

#     def __init__(self, db: Session):
#         self.db = db

#     def get_by_id(self, product_id: int) -> Optional[Product]:
#         return self.db.query(Product).filter(Product.id == product_id).first()

#     def get_by_part(self, part: str) -> Optional[Product]:
#         return self.db.query(Product).filter(Product.part == part).first()

#     def get_by_url(self, url: str) -> Optional[Product]:
#         return self.db.query(Product).filter(Product.url == url).first()

#     def get_all(
#         self,
#         page: int = 1,
#         limit: int = 20,
#         ptype: Optional[str] = None,
#         stock: Optional[int] = None,
#         status: Optional[bool] = None
#     ) -> tuple[list[Product], int]:
#         query = self.db.query(Product)

#         if ptype:
#             query = query.filter(Product.ptype == ptype)
#         if stock is not None:
#             query = query.filter(Product.stock == stock)
#         if status is not None:
#             query = query.filter(Product.status == status)

#         total = query.count()
#         products = query.offset((page - 1) * limit).limit(limit).all()
#         return products, total

#     def create(self, data: dict) -> Product:
#         product = Product(**data)
#         self.db.add(product)
#         self.db.commit()
#         self.db.refresh(product)
#         return product

#     def update(self, product: Product, data: dict) -> Product:
#         for key, value in data.items():
#             setattr(product, key, value)
#         self.db.commit()
#         self.db.refresh(product)
#         return product

#     def delete(self, product: Product) -> None:
#         self.db.delete(product)
#         self.db.commit()

#     def bulk_add(self, products: list[Product]) -> None:
#         self.db.add_all(products)
#         self.db.commit()
        
        
        
        
        
        