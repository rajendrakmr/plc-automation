# from fastapi import APIRouter, Depends, UploadFile, File, Query
from fastapi import APIRouter, BackgroundTasks, Depends, Request,Query
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.users import User 
from app.schemas.enquiry_schema import EnquiryCreate,EnquiryResponse
from app.core.mail import send_contact_emails
from app.services.enquiry_service import ( 
    get_all_enquiries, 
    create_enquiry
)

router = APIRouter(prefix="/enquiries", tags=["Enquiry Request"])
 
@router.get("/")
def get_all(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100), 
    search: Optional[str] = None,
    category_id: Optional[int] = None, 
    product_id: Optional[str] = None,   
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
): 
    return get_all_enquiries( db,page,limit,search,category_id,product_id)
 
 
 

@router.post("/", response_model=EnquiryResponse)   
async def create(                                  
    payload: EnquiryCreate,
    background_tasks: BackgroundTasks,              
    request: Request,                              
    db: Session = Depends(get_db),
): 
    
    enquiry = create_enquiry(db, payload)     
    
    forwarded_for = request.headers.get("X-Forwarded-For")
    client_ip = (
        forwarded_for.split(",")[0].strip()
        if forwarded_for
        else (request.client.host if request.client else "")
    ) 
    background_tasks.add_task(
        send_contact_emails,
        name=enquiry.customer_name,
        email=enquiry.email_address or "",
        phone=enquiry.telephone or "",
        message=enquiry.content or "",
        part_no=enquiry.part_number or "",
        category=enquiry.category.cat_name if enquiry.category else "",
        ip=client_ip,
    )

    return enquiry
  