import logging
from fastapi import HTTPException, status
from typing import Optional
from sqlalchemy.orm import Session, joinedload
 
from app.models.enquiry_model import Enquiry
from app.repositories import enquiry_repo
from app.schemas.enquiry_schema import EnquiryCreate, EnquiryUpdate, EnquiryListResponse
import math

logger = logging.getLogger(__name__)
 


def get_all_enquiries(
    db: Session,
    page: int = 1,
    limit: int = 10,
    search: Optional[str] = None,
    category_id: Optional[int] = None,
    product_id: Optional[int] = None,
) -> EnquiryListResponse:

    enquiries, total = enquiry_repo.get_all(db, page,limit,search,category_id,product_id)


    return {
        "records": enquiries,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": math.ceil(total / limit) 
        }
    } 
    
    

  
def create_enquiry(db: Session, payload: EnquiryCreate) -> Enquiry:
    """
    Save a new enquiry to the database and return the full ORM object
    (with category and product relationships eagerly loaded).
    """
    try:
        enquiry = Enquiry(
            product_id=payload.product_id,
            category_id=payload.category_id,
            part_number=payload.part_number,
            manufacturer=payload.manufacturer,
            quantity=payload.quantity or 1,
            subject=f"New Enquiry: {payload.part_number or 'General'} from {payload.customer_name}",
            enquiry_date=payload.enquiry_date,
            telephone=payload.telephone,
            email_address=payload.email_address,
            first_name=payload.first_name,
            last_name=payload.last_name,
            company_name=payload.company_name,
            customer_name=payload.customer_name,
            content=payload.content,
        )
        db.add(enquiry)
        db.commit()
        db.refresh(enquiry) 
        return (
            db.query(Enquiry)
            .options(
                joinedload(Enquiry.category),
                joinedload(Enquiry.product),
            )
            .filter(Enquiry.contact_id == enquiry.contact_id)
            .first()
        )
 
    except Exception as exc:
        db.rollback() 
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not save enquiry. Please try again.",
        )
 
