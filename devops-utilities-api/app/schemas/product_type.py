from typing import Optional
from pydantic import BaseModel, Field, field_validator


class ProductTypeCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255) 
    description: Optional[str] = None  
    status: int = 1 
    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str):
        v = v.strip() 
        if len(v) < 2:
            raise ValueError("Product Type name must be at least 2 characters") 
        return v 


class ProductTypeUpdate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    description: Optional[str] = None  
    status: int = 1 
    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str):
        return v.strip() 
     

class ProductTypeResponse(BaseModel):
    product_type_id: int 
    name: str
    description: Optional[str] = None  
    class Config:
        from_attributes = True 
        
class ProductType(BaseModel):
    product_type_id: int 
    name: str 
    class Config:
        from_attributes = True 