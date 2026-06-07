
from sqlalchemy.orm import Session
from typing import Optional
from fastapi import HTTPException, status
from app.repositories import category_repo
from app.schemas.products import ProductCreate,ProductUpdate
from app.models.products import Product

# # Create new product
# def create_product(db: Session, payload: ProductCreate) -> Product: 
#     existing = product_repo.get_by_part(db, payload.part)
#     if existing:
#         raise HTTPException(
#             status_code=status.HTTP_409_CONFLICT,
#             detail={"errors": {"part": "Part No is already exist"}}
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
#     existing_part = product_repo.get_by_part(db, payload.part)
#     if existing_part and existing_part.id != product_id:
#         raise HTTPException(
#             status_code=status.HTTP_409_CONFLICT,
#             detail={"errors": {"part": "Part No already exists"}}
#         )
 
#     existing_slug = product_repo.get_by_slug(db, payload.url)
#     if existing_slug and existing_slug.id != product_id:
#         raise HTTPException(
#             status_code=status.HTTP_409_CONFLICT,
#             detail={"errors": {"url": "Permalink already exists"}}
#         )

#     return product_repo.update(db, product_id, payload)

# # Delete the existing product
# def delete_product(db: Session, product_id: int) -> dict:
#     return product_repo.delete(db, product_id)



def fetch_categories(db: Session) -> dict:
    records = category_repo.get_all(db) 
    return records

# import csv
# import io
# from sqlalchemy.orm import Session
# from sqlalchemy.exc import IntegrityError
# from fastapi import HTTPException, status
# from app.models.products import Product
# from app.schemas.products import ProductCreate, ProductUpdate


# # ─── CREATE ───────────────────────────────────────────────
# # def create_product(db: Session, payload: ProductCreate) -> Product:
# #     # Duplicate part check
# #     existing = db.query(Product).filter(Product.part == payload.part).first()
# #     if existing:
# #         raise HTTPException(
# #             status_code=status.HTTP_409_CONFLICT,
# #             detail={"errors": {"part": "Yeh part number pehle se exist karta hai"}}
# #         )

# #     product = Product(**payload.model_dump())
# #     db.add(product)
# #     db.commit()
# #     db.refresh(product)
# #     return product


# def create_product(db: Session, payload: ProductCreate) -> Product:
#     # ✅ Business validation — duplicate part check
#     existing = product_repo.get_by_part(db, payload.part)
#     if existing:
#         raise HTTPException(
#             status_code=status.HTTP_409_CONFLICT,
#             detail={"errors": {"part": "Yeh part number pehle se exist karta hai"}}
#         )

#     return product_repo.create(db, payload)


# # ─── GET ALL ──────────────────────────────────────────────
# def get_products(
#     db: Session,
#     page: int = 1,
#     limit: int = 20,
#     ptype: str = None,
#     stock: int = None,
#     status: bool = None
# ) -> dict:
#     query = db.query(Product)

#     if ptype:
#         query = query.filter(Product.ptype == ptype)
#     if stock is not None:
#         query = query.filter(Product.stock == stock)
#     if status is not None:
#         query = query.filter(Product.status == status)

#     total = query.count()
#     products = query.offset((page - 1) * limit).limit(limit).all()

#     return {
#         "total": total,
#         "page": page,
#         "limit": limit,
#         "products": products
#     }


# # ─── GET ONE ──────────────────────────────────────────────
# def get_product(db: Session, product_id: int) -> Product:
#     product = db.query(Product).filter(Product.id == product_id).first()
#     if not product:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail={"errors": {"product": "Product nahi mila"}}
#         )
#     return product


# # ─── UPDATE ───────────────────────────────────────────────
# def update_product(db: Session, product_id: int, payload: ProductUpdate) -> Product:
#     product = get_product(db, product_id)

#     update_data = payload.model_dump(exclude_unset=True)
#     for key, value in update_data.items():
#         setattr(product, key, value)

#     db.commit()
#     db.refresh(product)
#     return product


# # ─── DELETE ───────────────────────────────────────────────
# def delete_product(db: Session, product_id: int) -> dict:
#     product = get_product(db, product_id)
#     db.delete(product)
#     db.commit()
#     return {"message": "Product delete ho gaya"}


# # ─── CSV IMPORT ───────────────────────────────────────────
# def import_products_csv(db: Session, file_content: bytes) -> dict:
#     content = file_content.decode("utf-8")
#     reader = csv.DictReader(io.StringIO(content))

#     REQUIRED_COLUMNS = {"part"}

#     if not REQUIRED_COLUMNS.issubset(set(reader.fieldnames or [])):
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail={"errors": {"csv": f"Required columns missing: {REQUIRED_COLUMNS}"}}
#         )

#     NULL_VALUES = {"", "NA", "NULL", "None", "null", "none"}

#     inserted = 0
#     skipped = 0
#     errors = []
#     total = 0

#     for row_num, row in enumerate(reader, start=2):
#         total += 1
#         part = row.get("part", "").strip()

#         if not part:
#             errors.append(f"Row {row_num}: 'part' empty hai — skip")
#             skipped += 1
#             continue

#         existing = db.query(Product).filter(Product.part == part).first()
#         if existing:
#             errors.append(f"Row {row_num}: '{part}' pehle se exist karta hai — skip")
#             skipped += 1
#             continue

#         try:
#             def clean(val):
#                 return None if val.strip() in NULL_VALUES else val.strip() or None

#             def clean_int(val):
#                 return int(val.strip()) if val.strip() not in NULL_VALUES and val.strip() else None

#             product_data = {
#                 "part":               part,
#                 "url":                clean(row.get("url", "")),
#                 "mrp":                clean(row.get("mrp", "")),
#                 "price":              clean(row.get("price", "")),
#                 "ptype":              clean(row.get("ptype", "")),
#                 "pimage":             clean(row.get("pimage", "")),
#                 "stock":              clean_int(row.get("stock", "")),
#                 "stext":              clean(row.get("stext", "")),
#                 "ftext":              clean(row.get("ftext", "")),
#                 "mtag":               clean(row.get("mtag", "")),
#                 "mkey":               clean(row.get("mkey", "")),
#                 "mdesc":              clean(row.get("mdesc", "")),
#                 "status":             row.get("status", "1").strip() in ("1", "true", "yes"),
#                 "dates":              clean(row.get("dates", "")),
#                 "ipaddress":          clean(row.get("ipadress", "")),   # ← CSV ka typo handle
#                 "category_id":        clean_int(row.get("cat", "")),    # ← cat → category_id
#                 "subcategory_id":     clean_int(row.get("subcat", "")), # ← subcat → subcategory_id
#                 "subsubcategory_id":  clean_int(row.get("subsubcat", "")), # ← subsubcat
#             }

#             product = Product(**product_data)
#             db.add(product)
#             db.commit()
#             db.refresh(product)
#             inserted += 1

#         except Exception as e:
#             db.rollback()
#             errors.append(f"Row {row_num}: '{part}' — Error: {str(e)}")
#             skipped += 1
#             continue

#     return {
#         "total": total,
#         "inserted": inserted,
#         "skipped": skipped,
#         "errors": errors
#     }