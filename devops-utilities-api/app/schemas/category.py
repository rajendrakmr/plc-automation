from typing import Optional
from pydantic import BaseModel, Field, field_validator


class CategoryCreate(BaseModel):
    cat_name: str = Field(..., min_length=2, max_length=255)
    cat_slug: str = Field(..., min_length=2, max_length=255) 
    cat_desc: Optional[str] = None 
    meta_title: Optional[str] = None
    meta_keywords: Optional[str] = None
    meta_description: Optional[str] = None 
    image_url: Optional[str] = None 
    status: int = 1 
    @field_validator("cat_name")
    @classmethod
    def validate_name(cls, v: str):
        v = v.strip() 
        if len(v) < 2:
            raise ValueError("Category name must be at least 2 characters") 
        return v

    @field_validator("cat_slug")
    @classmethod
    def validate_slug(cls, v: str):
        v = v.strip().lower() 
        import re 
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("Slug can only contain lowercase letters, numbers and hyphens") 
        return v


class CategoryUpdate(BaseModel):
    cat_name: str = Field(..., min_length=2, max_length=255)
    cat_slug: str = Field(..., min_length=2, max_length=255) 
    cat_desc: Optional[str] = None 
    meta_title: Optional[str] = None
    meta_keywords: Optional[str] = None
    meta_description: Optional[str] = None 
    image_url: Optional[str] = None 
    status: int = 1 
    @field_validator("cat_name")
    @classmethod
    def validate_name(cls, v: str):
        return v.strip() 
    @field_validator("cat_slug")
    @classmethod
    def validate_slug(cls, v: str):
        v = v.strip().lower() 
        import re 
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("Slug can only contain lowercase letters, numbers and hyphens") 
        return v

class CatPageResponse(BaseModel):
    category_id: int 
    cat_name: str
    cat_slug: str 
    class Config:
        from_attributes = True

class CateResp(BaseModel):
    category_id: int 
    cat_name: str
    cat_slug: str
    cat_desc: str 
    image_url: str
    class Config:
        from_attributes = True


class Category(BaseModel):
    category_id: int 
    cat_name: str
    cat_slug: str 
    class Config:
        from_attributes = True



        
class CategoryResponse(BaseModel):
    category_id: int 
    cat_name: str
    cat_slug: str 
    cat_desc: Optional[str] 
    meta_title: Optional[str]
    meta_keywords: Optional[str]
    meta_description: Optional[str] 
    image_url: Optional[str] 
    status: int 
    class Config:
        from_attributes = True