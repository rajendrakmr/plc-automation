from sqlalchemy.orm import Session
from app.models.products import Product
from app.schemas.products import ProductCreate


def get_by_part(db: Session, part: str) -> Product | None:
    return db.query(Product).filter(Product.part == part).first()

def get_by_slug(db: Session, url: str) -> Product | None:
    return db.query(Product).filter(Product.url == url).first()


def create(db: Session, payload: ProductCreate) -> Product:
    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product