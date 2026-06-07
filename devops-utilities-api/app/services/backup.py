import csv
import io
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.repositories.product_repository import ProductRepository
from app.schemas.product import ProductCreate, ProductUpdate
from app.models.product import Product


class ProductService:

    def __init__(self, db: Session):
        self.repo = ProductRepository(db)

    def create(self, payload: ProductCreate) -> Product:
        if self.repo.get_by_part(payload.part):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"errors": {"part": "Yeh part number pehle se exist karta hai"}}
            )
        return self.repo.create(payload.model_dump())

    def get_all(self, page: int, limit: int, ptype=None, stock=None, status=None) -> dict:
        products, total = self.repo.get_all(page, limit, ptype, stock, status)
        return {
            "total": total,
            "page": page,
            "limit": limit,
            "products": products
        }

    def get_one(self, product_id: int) -> Product:
        product = self.repo.get_by_id(product_id)
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"errors": {"product": "Product nahi mila"}}
            )
        return product

    def update(self, product_id: int, payload: ProductUpdate) -> Product:
        product = self.get_one(product_id)
        return self.repo.update(product, payload.model_dump(exclude_unset=True))

    def delete(self, product_id: int) -> dict:
        product = self.get_one(product_id)
        self.repo.delete(product)
        return {"message": "Product delete ho gaya"}

    def import_csv(self, file_content: bytes) -> dict:
        content = file_content.decode("utf-8")
        reader = csv.DictReader(io.StringIO(content))

        if not {"part"}.issubset(set(reader.fieldnames or [])):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={"errors": {"csv": "Required column 'part' missing hai"}}
            )

        OPTIONAL_COLUMNS = {
            "url", "mrp", "price", "ptype", "pimage",
            "stock", "stext", "ftext", "mtag", "mkey",
            "mdesc", "status", "dates", "ipaddress",
            "category_id", "subcategory_id", "subsubcategory_id"
        }
        INT_COLUMNS = {"stock", "category_id", "subcategory_id", "subsubcategory_id"}
        NULL_VALUES = {"", "NA", "NULL", "None", "null", "none"}

        inserted = 0
        skipped = 0
        errors = []
        total = 0
        products_to_insert = []

        for row_num, row in enumerate(reader, start=2):
            total += 1
            part = row.get("part", "").strip()

            if not part:
                errors.append(f"Row {row_num}: 'part' empty hai — skip")
                skipped += 1
                continue

            if self.repo.get_by_part(part):
                errors.append(f"Row {row_num}: '{part}' pehle se exist karta hai — skip")
                skipped += 1
                continue

            try:
                product_data = {"part": part}

                for col in OPTIONAL_COLUMNS:
                    val = row.get(col, "").strip()
                    if val in NULL_VALUES:
                        product_data[col] = None
                    elif col in INT_COLUMNS:
                        product_data[col] = int(val) if val else None
                    elif col == "status":
                        product_data[col] = val.lower() in ("1", "true", "yes")
                    else:
                        product_data[col] = val or None

                products_to_insert.append(Product(**product_data))
                inserted += 1

            except Exception as e:
                errors.append(f"Row {row_num}: '{part}' — Error: {str(e)}")
                skipped += 1

        if products_to_insert:
            self.repo.bulk_add(products_to_insert)

        return {
            "total": total,
            "inserted": inserted,
            "skipped": skipped,
            "errors": errors
        }
    


