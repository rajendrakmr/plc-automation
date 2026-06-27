from fastapi import APIRouter, Depends, UploadFile, File, Query,status
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.users import User
from app.schemas.products import ProductCreate, ProductUpdate, ProductResponse
from app.schemas.category import CategoryCreate,CategoryUpdate,CategoryResponse
# from app.services.product_service import get_products as fetch_products,import_products_csv
from app.services.product_service import (
    create_product,
    update_product,
    delete_product,
    fetch_products,
    fetch_all,
    
    # get_products,
    # get_product,
)
from app.services import cat_services
router = APIRouter(prefix="/products", tags=["Products"])


# ─── CREATE ───────────────────────────────────────────────
@router.post("/", response_model=ProductResponse)
def create( 
    payload: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_product(db, payload)

@router.patch("/{product_id}", response_model=ProductResponse)
def update(
    product_id: int,
    payload: ProductUpdate,
    db: Session = Depends(get_db),
):
    return update_product(db, product_id, payload)


@router.delete("/{product_id}")
def delete(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return delete_product(db, product_id)

# Get protected routes data
@router.get("/")
def get_all(
    page: int = Query(1, ge=1),
    limit: int = Query(20, le=100),
    search: Optional[str] = None,
    stock: Optional[str] = None,
    status: Optional[bool] = None,
    product_type_id: Optional[int] = None,
    category_id: Optional[int] = None,
    
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return fetch_products(db, page, limit,search,category_id,product_type_id,stock,status)

 
# Get puplic routes data
@router.get("/list")
def product_list(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100), 
    search: Optional[str] = None,
    category_id: Optional[int] = None,
    product_type_id: Optional[int] = None, 
    url: Optional[str] = None, 
    stock: Optional[str] = Query( None, pattern="^(in-stock|limited|out-stock)$"  ), 
    status: Optional[str] = Query(
        None,
        pattern="^(draft|published|inactive|archived)$"
    ), 
    db: Session = Depends(get_db),
):
    return fetch_all(
        db=db,
        page=page,
        limit=limit,
        search=search,
        category_id=category_id,
        product_type_id=product_type_id,
        url=url,
        stock=stock,
        status=status
    )



# # ─── CSV IMPORT ───────────────────────────────────────────
# @router.post("/import", response_model=ProductImportResponse)
# # @router.post("/import")
# def import_csv(
#     file: UploadFile = File(...),    # ← yeh hona chahiye
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ): 
#     if not file.filename.endswith(".csv"):
#         raise HTTPException(
#             status_code=400,
#             detail={"errors": {"file": "Sirf CSV file allowed hai"}}
#         )
#     content = file.file.read()
#     return import_products_csv(db, content)





# # ─── GET ALL (protected) ──────────────────────────────────
 
# # ─── GET FOR PAGE (public) ────────────────────────────────
# @router.get("/list")
# def product_list(                    # ← naam badla
#     page: int = Query(1, ge=1),
#     limit: int = Query(20, le=100),
#     ptype: Optional[str] = None,
#     stock: Optional[int] = None,
#     status: Optional[bool] = None,
#     db: Session = Depends(get_db),
# ):
#     return fetch_products(db, page, limit, ptype, stock, status)



# # ─── GET ONE ──────────────────────────────────────────────
# @router.get("/{product_id}", response_model=ProductResponse)
# def get_one(
#     product_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     return get_product(db, product_id)


 
 
 
 

# Blogs categorys & tags

@router.get("/category")
def get_category(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100), 
    search: Optional[str] = None,  
    status: Optional[int] = None , 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
): 
    return cat_services.category( db,page,limit,search,status)
 
 
@router.post("/category", response_model=CategoryResponse)
def create_category( 
    payload: CategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return cat_services.create(db, payload)


@router.patch("/category/{category_id}", response_model=CategoryResponse)
def update_category(
    category_id: int,
    payload: CategoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return cat_services.delete_category(db, category_id)

 
@router.delete("/category/{category_id}", status_code=status.HTTP_200_OK)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    cat_services.delete_category(db, category_id)
    return {"success": True, "message": "Category deleted successfully"}
