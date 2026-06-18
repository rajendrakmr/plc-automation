from pydantic import BaseModel, EmailStr, Field,field_validator
from typing import Optional,Any
from datetime import date, datetime


class EnquiryCreate(BaseModel):
    product_id: Optional[int] = None
    category_id: Optional[int] = None
    part_number: Optional[str] = Field(None, max_length=100)
    manufacturer: Optional[str] = Field(None, max_length=100)
    subject: Optional[str] = Field(None, max_length=100)
    quantity: int = 1
    enquiry_date: date  = None
    telephone: Optional[str] = Field(None, max_length=30)
    email_address: Optional[EmailStr] = None
    first_name: Optional[str] = Field(None, max_length=100)
    last_name: Optional[str] = Field(None, max_length=100)
    company_name: Optional[str] = Field(None, max_length=150)
    customer_name: str = Field(..., max_length=150)
    content: Optional[str] = None


class EnquiryUpdate(BaseModel):
    product_id: Optional[int] = None
    category_id: Optional[int] = None
    part_number: Optional[str] = Field(None, max_length=100)
    manufacturer: Optional[str] = Field(None, max_length=100)
    subject: Optional[str] = Field(None, max_length=100)
    quantity: Optional[int] = None
    enquiry_date: Optional[date] = None
    telephone: Optional[str] = Field(None, max_length=30)
    email_address: Optional[EmailStr] = None
    first_name: Optional[str] = Field(None, max_length=100)
    last_name: Optional[str] = Field(None, max_length=100)
    company_name: Optional[str] = Field(None, max_length=150)
    customer_name: Optional[str] = Field(None, max_length=150)
    content: Optional[str] = None


class EnquiryResponse(BaseModel):
    contact_id: int
    product_id: Optional[int]
    category_id: Optional[int]
    part_number: Optional[str]
    manufacturer: Optional[str]
    quantity: int
    enquiry_date: Optional[date] = None
    subject: Optional[str] = None
    telephone: Optional[str]
    email_address: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    company_name: Optional[str]
    customer_name: str
    content: Optional[str]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    @field_validator("enquiry_date", mode="before")
    @classmethod
    def fix_date(cls, v: Any):
        if not v or str(v) in ("0000-00-00", "0000-00-00 00:00:00"):
            return None
        return v


    class Config:
        from_attributes = True


class EnquiryListResponse(BaseModel):
    enquiries: list[EnquiryResponse]
    total: int
    page: int
    limit: int
    total_pages: int