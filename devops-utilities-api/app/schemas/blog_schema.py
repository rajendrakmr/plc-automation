 
# schemas/blog_schema.py

from pydantic import BaseModel, Field, field_validator
from typing import Optional, Literal
from datetime import datetime
import re


# ─────────────────────────────────────────
# Blog Category
# ─────────────────────────────────────────
class BlogCategoryResponse(BaseModel):
    blog_cat_id: int
    blog_cat_name: str
    blog_cat_slug: str
    status: int

    class Config:
        from_attributes = True



class BlogTagMap(BaseModel): 
    blog_tag_id: str | None = None
    
# ─────────────────────────────────────────
# Blog Tag
# ─────────────────────────────────────────
class BlogTagResponse(BaseModel):
    blog_tag_id: int
    blog_tag_name: str
    blog_tag_slug: str
    status: int

    class Config:
        from_attributes = True


# ─────────────────────────────────────────
# Blog Create
# ─────────────────────────────────────────
class BlogCreate(BaseModel):
    blog_cat_id: int
    blog_title: str = Field(..., min_length=3, max_length=255)
    blog_slug: str = Field(..., min_length=3, max_length=255)
    blog_excerpt: Optional[str] = None
    blog_content: Optional[str] = None
    blog_img_url: Optional[str] = None
    blog_author: Optional[str] = None
    blog_tags: Optional[str] = None
    blog_sort: int = 0
    blog_meta_title: Optional[str] = Field(None, max_length=255)
    blog_meta_desc: Optional[str] = Field(None, max_length=500)
    blog_meta_keywords: Optional[str] = Field(None, max_length=500)
    # blog_published_at: Optional[datetime] = None 
    # tags: list[BlogTagMap] = []
    status: str = "published"
    tags: list[int] = []
    @field_validator("blog_slug")
    @classmethod
    def validate_slug(cls, v: str):
        v = v.strip().lower()
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("Slug can only contain lowercase letters, numbers and hyphens")
        return v

    @field_validator("blog_title")
    @classmethod
    def validate_title(cls, v: str):
        v = v.strip()
        if len(v) < 3:
            raise ValueError("Title must be at least 3 characters")
        return v


# ─────────────────────────────────────────
# Blog Update
# ─────────────────────────────────────────
class BlogUpdate(BaseModel):
    blog_cat_id: Optional[int] = None
    blog_title: Optional[str] = Field(None, min_length=3, max_length=255)
    blog_slug: Optional[str] = Field(None, min_length=3, max_length=255)
    blog_excerpt: Optional[str] = None
    blog_content: Optional[str] = None
    blog_img_url: Optional[str] = None
    blog_author: Optional[str] = None
    blog_tags: Optional[str] = None
    blog_sort: Optional[int] = None
    blog_meta_title: Optional[str] = Field(None, max_length=255)
    blog_meta_desc: Optional[str] = Field(None, max_length=500)
    blog_meta_keywords: Optional[str] = Field(None, max_length=500)
    blog_published_at: Optional[datetime] = None 
    tags: list[int] = []
    @field_validator("blog_slug")
    @classmethod
    def validate_slug(cls, v: str):
        if v is None:
            return v
        v = v.strip().lower()
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("Slug can only contain lowercase letters, numbers and hyphens")
        return v

    @field_validator("blog_title")
    @classmethod
    def validate_title(cls, v: str):
        if v is None:
            return v
        v = v.strip()
        if len(v) < 3:
            raise ValueError("Title must be at least 3 characters")
        return v


# ─────────────────────────────────────────
# Blog Response
# ─────────────────────────────────────────
class BlogResponse(BaseModel):
    blog_id: int
    blog_cat_id: int
    blog_title: str
    blog_slug: str
    blog_excerpt: Optional[str]
    blog_content: Optional[str]
    blog_img_url: Optional[str]
    blog_author: Optional[str]
    blog_tags: Optional[str]
    blog_sort: int
    blog_meta_title: Optional[str]
    blog_meta_desc: Optional[str]
    blog_meta_keywords: Optional[str]
    blog_published_at: Optional[datetime]
    status: str
    created_at: datetime
    updated_at: datetime
    category: Optional[BlogCategoryResponse] = None

    class Config:
        from_attributes = True


# ─────────────────────────────────────────
# Blog List Response (pagination ke liye)
# ─────────────────────────────────────────
class BlogListResponse(BaseModel):
    blogs: list[BlogResponse]
    total: int
    page: int
    limit: int
    total_pages: int
from datetime import datetime



class CategoryResponse(BaseModel):
    category_id: int
    name: str
    cat_name: str
    cat_desc: str

    class Config:
        from_attributes = True
        
class ProductTypeResponse(BaseModel):
    product_type_id: int
    name: str 
    class Config:
        from_attributes = True

       
class ProductResponse(BaseModel):
    product_id: int 
    category_id: int
    product_type_id: int 
    part_no: str
    url: str
    
    # category: Optional[CategoryResponse] = None
    # product_type: Optional[ProductTypeResponse] = None

    short_desc: Optional[str]
    product_desc: Optional[str]

    image_url: Optional[str]

    meta_title: Optional[str]
    meta_keywords: Optional[str]
    meta_description: Optional[str]

    stock: str
    status: str
    # meta: list[ProductMetaCreate] = []

    class Config:
        from_attributes = True
 