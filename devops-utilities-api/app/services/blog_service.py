
from sqlalchemy.orm import Session
from typing import Optional
from fastapi import HTTPException, status
from app.repositories import blog_repo
from app.schemas.products import ProductCreate,ProductUpdate
from app.models.products import Product


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
 
# # Create new product
# def create_product(db: Session, payload: ProductCreate) -> Product: 
#     existing = product_repo.get_by_part(db, payload.part_no)
#     if existing:
#         raise HTTPException(
#             status_code=status.HTTP_409_CONFLICT,
#             detail={"errors": {"part_no": "Part No is already exist"}}
#         )
#     existing_slug = product_repo.get_by_slug(db, payload.url)
#     if existing_slug:
#         raise HTTPException(
#             status_code=status.HTTP_409_CONFLICT,
#             detail={"errors": {"part": "Parmalink is already exist"}}
#         )

#     return product_repo.create(db, payload)

# # Update existing product
# def update_product(db: Session,product_id: int, payload: ProductUpdate) -> Product: 
#     existing_part = product_repo.get_by_part(db, payload.part_no)
#     if existing_part and existing_part.product_id != product_id:
#         raise HTTPException(
#             status_code=status.HTTP_409_CONFLICT,
#             detail={"errors": {"part_no": "Part No already exists"}}
#         )
 
#     existing_slug = product_repo.get_by_slug(db, payload.url)
#     if existing_slug and existing_slug.product_id != product_id:
#         raise HTTPException(
#             status_code=status.HTTP_409_CONFLICT,
#             detail={"errors": {"url": "Permalink already exists"}}
#         )

#     return product_repo.update(db, product_id, payload)

# # Delete the existing product
# def delete_product(db: Session, product_id: int) -> dict:
#     return product_repo.delete(db, product_id)



# def fetch_products(
#     db: Session,
#     page: int,
#     limit: int,
#     search: Optional[str] = None,
#     category_id: Optional[int] = None,
#     product_type_id: Optional[int] = None,
#     stock: Optional[str] = None,
#     status: Optional[str] = None
# ) -> dict:

#     products, total = product_repo.get_all(
#     db=db,
#     page=page,
#     limit=limit,
#     search=search,
#     category_id=category_id,
#     product_type_id=product_type_id,
#     stock=stock,
#     status=status
# )

#     return {
#         "records": products,
#         "pagination": {
#             "page": page,
#             "limit": limit,
#             "total": total,
#             "pages": (total + limit - 1) // limit
#         }
#     }
    
    
    

