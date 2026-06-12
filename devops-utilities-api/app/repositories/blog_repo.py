from sqlalchemy.orm import Session, joinedload,load_only
from fastapi import HTTPException, status

from typing import Optional, Tuple, List 
from app.models.blog_model import Blog,BlogCategory,BlogTag
from app.schemas.blog_schema import BlogCreate,BlogUpdate



def list_feature(
    db: Session, 
    limit: int, 
    search: Optional[str] = None, 
    type: Optional[str] = None
) -> tuple[list[Blog], int]:
     
    query = db.query(Blog) 
    if type:
        query = query.filter(Blog.type == type) 
    if search: 
        query = query.filter(
            Blog.blog_title.ilike(f"%{search}%")
        )

  
    blogs = (
        query.options(
            load_only(
                Blog.blog_id, 
                Blog.blog_img_url, 
                Blog.blog_title,
                Blog.blog_slug, 
                Blog.blog_excerpt,
                Blog.blog_content,
                Blog.blog_published_at,
                Blog.blog_meta_title, 
                Blog.blog_meta_keywords,
                Blog.blog_meta_desc, 
                Blog.blog_author,
            ),
            joinedload(Blog.category).load_only(
                BlogCategory.blog_cat_id,
                BlogCategory.blog_cat_name,
            )
        )
        .order_by(Blog.blog_id.asc())  
        .limit(limit)
        .all() 
    )
    
    return blogs


 
 
def list_all(
    db: Session,
    page: int,
    limit: int, 
    search: Optional[str] = None,
    blog_cat_id: Optional[int] = None,
    url: Optional[str] = None, 
    status: Optional[str] = None
) -> tuple[list[Blog], int]:
     
    query = db.query(Blog) 
    if blog_cat_id:
        query = query.filter(Blog.blog_cat_id == blog_cat_id)   
    if status:
        query = query.filter(Blog.status == status)
    if url: 
        query = query.filter( Blog.blog_slug.ilike(f"%{url}%"))
    if search: 
        query = query.filter(
            Blog.blog_title.ilike(f"%{search}%")
        )

 
    total = query.count() 
    blogs = (
        query.options(
            load_only(
                Blog.blog_id, 
                Blog.blog_img_url, 
                Blog.blog_title,
                Blog.blog_slug, 
                Blog.blog_excerpt,
                Blog.blog_content,
                Blog.blog_published_at,
                Blog.blog_meta_title, 
                Blog.blog_meta_keywords,
                Blog.blog_meta_desc, 
                Blog.blog_author,
            ),
            joinedload(Blog.category).load_only(
                BlogCategory.blog_cat_id,
                BlogCategory.blog_cat_name,
            )
        )
        .order_by(Blog.blog_id.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all() 
    )
    
    return blogs, total





def list_all_cat(
    db: Session, 
    limit: int, 
    search: Optional[str] = None, 
    url: Optional[str] = None,  
) -> tuple[list[Blog], int]:
     
    query = db.query(BlogCategory)   
    if url: 
        query = query.filter( Blog.blog_cat_slug.ilike(f"%{url}%"))
    if search: 
        query = query.filter(
            BlogCategory.blog_title.ilike(f"%{search}%")
        ) 
    cats = (
        query.options(
            load_only(
              BlogCategory.blog_cat_id,
              BlogCategory.blog_cat_name,
              BlogCategory.blog_cat_slug
            )
        )
        .order_by(BlogCategory.blog_cat_id.desc()) 
        .limit(limit)
        .all() 
    )
    
    return cats



def list_all_tag(
    db: Session, 
    limit: int, 
    search: Optional[str] = None, 
    url: Optional[str] = None,  
) -> tuple[list[Blog], int]:
     
    query = db.query(BlogTag)   
    if url: 
        query = query.filter( Blog.blog_tag_slug.ilike(f"%{url}%"))
    if search: 
        query = query.filter(
            BlogCategory.blog_tag_name.ilike(f"%{search}%")
        ) 
    cats = (
        query.options(
            load_only(
              BlogTag.blog_tag_id,
              BlogTag.blog_tag_name,
              BlogTag.blog_tag_slug
            )
        )
        .order_by(BlogTag.blog_tag_id.desc()) 
        .limit(limit)
        .all() 
    )
    
    return cats

# from app.models.category import Category
# from app.models.product_type import ProductType 
 

# def get_all(
#     db: Session,
#     page: int,
#     limit: int,
#     category_id: Optional[int] = None,
#     search: Optional[str] = None,
#     product_type_id: Optional[int] = None,
#     stock: Optional[str] = None,
#     status: Optional[str] = None
# ) -> tuple[list[Blog], int]:

#     query = db.query(Blog) 
#     query = query.options(
#         joinedload(Blog.category),
#         joinedload(Blog.product_type),
#         joinedload(Blog.meta)
#     )
     
#     if category_id is not None:
#         query = query.filter(Blog.category_id == category_id)

#     if product_type_id is not None:
#         query = query.filter(Blog.product_type_id == product_type_id)

#     if stock:
#         query = query.filter(Blog.stock == stock)

#     if status:
#         query = query.filter(Blog.status == status)
 
#     if search:
#         search = f"%{search.lower()}%"
#         query = query.filter(
#             Blog.part_no.ilike(search) |
#             Blog.url.ilike(search) |
#             Blog.short_desc.ilike(search)
#         )

#     # total BEFORE pagination
#     total = query.count()

#     # pagination
#     products = (
#         query
#         .order_by(Blog.product_id.desc())
#         .offset((page - 1) * limit)
#         .limit(limit)
#         .all()
#     )

#     return products, total
 
 
# def get_by_slug(db: Session, part_no: str) -> Product | None:
#     return db.query(Product).filter(Product.part_no == part_no).first()


# def get_by_slug(db: Session, url: str) -> Product | None:
#     return db.query(Product).filter(Product.url == url).first()

# def create(db: Session, payload: ProductCreate) -> Product:
#     product = Product(**payload.model_dump())
#     db.add(product)
#     db.commit()
#     db.refresh(product)
#     return product

# from app.models.products import Product
# from app.models.product_meta import ProductMeta


# def create(db: Session, payload: ProductCreate) -> Product:

#     data = payload.model_dump(exclude={"meta"})

#     product = Product(**data)

#     db.add(product)
#     db.flush()  # product_id generate ho jayega

#     for item in payload.meta:
#         meta = ProductMeta(
#             product_id=product.product_id,
#             meta_key=item.meta_key,
#             meta_title=item.meta_title,
#             meta_desc=item.meta_desc,
#         )
#         db.add(meta)

#     db.commit()
#     db.refresh(product)

#     return product

# # update product
# def update(
#     db: Session,
#     product_id: int,
#     payload: ProductUpdate
# ) -> Product:

#     product = (
#         db.query(Product)
#         .filter(Product.product_id == product_id)
#         .first()
#     )

#     if not product:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail={"errors": {"product_id": "Product not found"}}
#         )

#     data = payload.model_dump(
#         exclude_unset=True,
#         exclude={"meta"}
#     )

#     for key, value in data.items():
#         setattr(product, key, value)

#     db.commit()
#     db.refresh(product)

#     return product



# def delete(db: Session, product_id: int) -> None:
#     product = db.query(Product).filter(Product.id == product_id).first()
#     if not product:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail={"errors": {"product_id": "Product not found"}}
#         )
    
#     db.delete(product)
#     db.commit()


