# schemas/blog_schema.py

from pydantic import BaseModel, Field, field_validator
from typing import Optional, Literal
from datetime import datetime
import re

BlogStatus = Literal["published", "draft"]

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
# Blog References
# ─────────────────────────────────────────
class BlogRefCreate(BaseModel):
    """Used when creating/updating — no IDs exist yet.""" 
    ref_title: str = Field(..., max_length=255)
    ref_url: str = Field(..., max_length=255)

class BlogRefUpdate(BaseModel):
    """Used when creating/updating — no IDs exist yet.""" 
    blog_ref_id: Optional[int] = None
    ref_title: str = Field(..., max_length=255)
    ref_url: str = Field(..., max_length=255)


class BlogRefResponse(BaseModel):
    """Used when returning data that already exists in the DB."""
    blog_ref_id: int
    blog_id: int
    ref_title: str
    ref_url: str

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
    status: BlogStatus = "published"
    tags: list[int] = []
    references: list[BlogRefCreate] = []

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
    status: Optional[BlogStatus] = None
    tags: list[int] = []
    references: list[BlogRefUpdate] = []

    @field_validator("blog_slug")
    @classmethod
    def validate_slug(cls, v: Optional[str]):
        if v is None:
            return v
        v = v.strip().lower()
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("Slug can only contain lowercase letters, numbers and hyphens")
        return v

    @field_validator("blog_title")
    @classmethod
    def validate_title(cls, v: Optional[str]):
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
    blog_excerpt: Optional[str] = None
    blog_content: Optional[str] = None
    blog_img_url: Optional[str] = None
    blog_author: Optional[str] = None
    blog_tags: Optional[str] = None
    blog_sort: int
    blog_meta_title: Optional[str] = None
    blog_meta_desc: Optional[str] = None
    blog_meta_keywords: Optional[str] = None
    blog_published_at: Optional[datetime] = None
    status: BlogStatus
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
    
    
    
    
class BlogCategoryCreate(BaseModel):
    # blog_cat_id: int
    blog_cat_name: str = Field(..., min_length=3, max_length=255)
    blog_cat_slug: str = Field(..., min_length=3, max_length=255) 

    @field_validator("blog_cat_slug")
    @classmethod
    def validate_slug(cls, v: str):
        v = v.strip().lower()
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("Slug can only contain lowercase letters, numbers and hyphens")
        return v

    @field_validator("blog_cat_name")
    @classmethod
    def validate_title(cls, v: str):
        v = v.strip()
        if len(v) < 3:
            raise ValueError("Title must be at least 3 characters")
        return v
    
    

class BlogCategoryUpdate(BaseModel):
    blog_cat_id: int
    status: int
    blog_cat_name: str = Field(..., min_length=3, max_length=255)
    blog_cat_slug: str = Field(..., min_length=3, max_length=255) 

    @field_validator("blog_cat_slug")
    @classmethod
    def validate_slug(cls, v: str):
        v = v.strip().lower()
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("Slug can only contain lowercase letters, numbers and hyphens")
        return v

    @field_validator("blog_cat_name")
    @classmethod
    def validate_title(cls, v: str):
        v = v.strip()
        if len(v) < 3:
            raise ValueError("Title must be at least 3 characters")
        return v


 
    
class BlogTagCreate(BaseModel):
    # blog_cat_id: int
    blog_tag_name: str = Field(..., min_length=3, max_length=255)
    blog_tag_slug: str = Field(..., min_length=3, max_length=255) 

    @field_validator("blog_tag_slug")
    @classmethod
    def validate_slug(cls, v: str):
        v = v.strip().lower()
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("Slug can only contain lowercase letters, numbers and hyphens")
        return v

    @field_validator("blog_tag_name")
    @classmethod
    def validate_title(cls, v: str):
        v = v.strip()
        if len(v) < 3:
            raise ValueError("Title must be at least 3 characters")
        return v
    
    

class BlogTagUpdate(BaseModel):
    blog_tag_id: int
    status: int
    blog_tag_name: str = Field(..., min_length=3, max_length=255)
    blog_tag_slug: str = Field(..., min_length=3, max_length=255) 

    @field_validator("blog_tag_slug")
    @classmethod
    def validate_slug(cls, v: str):
        v = v.strip().lower()
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("Slug can only contain lowercase letters, numbers and hyphens")
        return v

    @field_validator("blog_tag_name")
    @classmethod
    def validate_title(cls, v: str):
        v = v.strip()
        if len(v) < 3:
            raise ValueError("Title must be at least 3 characters")
        return v


class BlogTagResponse(BaseModel):
    blog_tag_id: int
    blog_tag_name: str
    blog_tag_slug: str
    status: int

    class Config:
        from_attributes = True