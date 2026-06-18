# ─── repo/enquiry_repo.py ─────────────────────────────────────────────────────

from sqlalchemy.orm import Session,joinedload,load_only
from sqlalchemy import or_
from app.models.enquiry_model import Enquiry
from app.models.products import Product
from app.models.category import Category
from typing import Optional


# def get_by_id(db: Session, contact_id: int) -> Enquiry | None:
#     return db.query(Enquiry).filter(Enquiry.contact_id == contact_id).first()


def get_all(
    db: Session,
    page: int,
    limit: int,
    search: Optional[str] = None,
    category_id: Optional[int] = None,
    product_id: Optional[int] = None,
) -> tuple[list[Enquiry], int]:

    query = db.query(Enquiry).options(
        load_only(
            Enquiry.contact_id,
            Enquiry.content,
            Enquiry.first_name,
            Enquiry.last_name,
            Enquiry.enquiry_date,
            Enquiry.email_address,
            Enquiry.customer_name,
            Enquiry.manufacturer,
            Enquiry.part_number, 
            Enquiry.subject, 
            Enquiry.telephone
        ),
        joinedload(Enquiry.product).load_only(
            Product.product_id,
            Product.part_no,
        ),
        joinedload(Enquiry.category).load_only(
            Category.cat_name, 
        ),
    )

    if category_id:
        query = query.filter(Enquiry.category_id == category_id)

    if product_id:
        query = query.filter(Enquiry.product_id == product_id)

    if search:
        s = f"%{search.lower()}%"
        query = query.filter(
            or_(
                Enquiry.customer_name.ilike(s),
                Enquiry.email_address.ilike(s),
                Enquiry.part_number.ilike(s),
                Enquiry.telephone.ilike(s),
                Enquiry.company_name.ilike(s),
            )
        )

    total = query.count()

    enquiries = (
        query
        .order_by(Enquiry.contact_id.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return enquiries, total


# def create(db: Session, payload) -> Enquiry:
#     enquiry = Enquiry(**payload.model_dump())
#     db.add(enquiry)
#     db.commit()
#     db.refresh(enquiry)
#     return enquiry


# def update(db: Session, contact_id: int, payload) -> Enquiry | None:
#     enquiry = get_by_id(db, contact_id)
#     if not enquiry:
#         return None
#     for key, val in payload.model_dump(exclude_unset=True).items():
#         setattr(enquiry, key, val)
#     db.commit()
#     db.refresh(enquiry)
#     return enquiry


# def delete(db: Session, contact_id: int) -> bool:
#     enquiry = get_by_id(db, contact_id)
#     if not enquiry:
#         return False
#     db.delete(enquiry)
#     db.commit()
#     return True