from pydantic import BaseModel, Field, field_validator
from typing import Optional, Literal
import re

class ProductMetaCreate(BaseModel):
    meta_key: str
    meta_title: str | None = None
    meta_desc: str | None = None

class ProductCreate(BaseModel):
    category_id: int
    product_type_id: int
    part_no: str = Field(..., min_length=3, max_length=255)
    url: str = Field(..., min_length=3, max_length=255)
    short_desc: Optional[str] = None
    product_desc: Optional[str] = None
    image_url: Optional[str] = None
    meta_title: Optional[str] = None
    meta_keywords: Optional[str] = None
    meta_description: Optional[str] = None

    stock: Literal[
        "in-stock",
        "limited",
        "out-stock"
    ] = "in-stock"

    status: Literal[
        "draft",
        "published",
        "inactive",
        "archived"
    ] = "published"
    meta: list[ProductMetaCreate] = []

    @field_validator("part_no")
    @classmethod
    def validate_part_no(cls, v: str):
        v = v.strip()
        if len(v) < 3:
            raise ValueError("Part number must be at least 3 characters")

        return v 

    @field_validator("url")
    @classmethod
    def validate_url(cls, v: str):
        v = v.strip().lower() 
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("URL can only contain lowercase letters, numbers and hyphens")

        return v
    
    
class ProductUpdate(BaseModel):
    category_id: Optional[int] = None
    product_type_id: Optional[int] = None 
    part_no: Optional[str] = None
    url: Optional[str] = None 
    short_desc: Optional[str] = None
    product_desc: Optional[str] = None 
    image_url: Optional[str] = None 
    meta_title: Optional[str] = None
    meta_keywords: Optional[str] = None
    meta_description: Optional[str] = None

    stock: Optional[
        Literal[
            "in-stock",
            "limited",
            "out-stock"
        ]
    ] = None

    status: Optional[
        Literal[
            "draft",
            "published",
            "inactive",
            "archived"
        ]
    ] = None
    meta: list[ProductMetaCreate] = []
    @field_validator("part_no")
    @classmethod
    def validate_part_no(cls, v: str):
        v = v.strip()
        if len(v) < 3:
            raise ValueError("Part number must be at least 3 characters")

        return v 

    @field_validator("url")
    @classmethod
    def validate_url(cls, v: str):
        v = v.strip().lower() 
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("URL can only contain lowercase letters, numbers and hyphens")

        return v


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

# from pydantic import BaseModel
# from typing import Optional



# from pydantic import BaseModel, Field, field_validator, model_validator


# class ProductCreate(BaseModel):
#     part: str = Field(..., min_length=3, max_length=255)

#     url: Optional[str] = None
#     mrp: Optional[str] = None
#     price: Optional[str] = None
#     ptype: Optional[str] = None
#     pimage: Optional[str] = None 
#     stock: int = 0 
#     stext: Optional[str] = None
#     ftext: Optional[str] = None 
#     mtag: Optional[str] = None
#     mkey: Optional[str] = None
#     mdesc: Optional[str] = None 
#     status: bool = True 
#     dates: Optional[str] = None
#     ipaddress: Optional[str] = None 
#     category_id: Optional[int] = None
#     subcategory_id: Optional[int] = None
#     subsubcategory_id: Optional[int] = None 
#     @field_validator("part")
#     @classmethod
#     def validate_part(cls, v: str):
#         v = v.strip()

#         if len(v) < 3:
#             raise ValueError("Part number must be at least 3 characters")

#         return v

#     @field_validator("url")
#     @classmethod
#     def validate_url(cls, v):
#         if v is None:
#             return v

#         import re

#         if not re.match(r"^[a-z0-9-]+$", v):
#             raise ValueError(
#                 "URL can only contain lowercase letters, numbers and hyphens. Example: siemens-s7-1200"
#             )

#         return v


# class ProductUpdate(BaseModel):
#     part: str = Field(..., min_length=3, max_length=255) 
#     url: Optional[str] = None
#     mrp: Optional[str] = None
#     price: Optional[str] = None
#     ptype: Optional[str] = None
#     pimage: Optional[str] = None 
#     stock: int = 0 
#     stext: Optional[str] = None
#     ftext: Optional[str] = None 
#     mtag: Optional[str] = None
#     mkey: Optional[str] = None
#     mdesc: Optional[str] = None 
#     status: bool = True 
#     dates: Optional[str] = None
#     ipaddress: Optional[str] = None 
#     category_id: Optional[int] = None
#     subcategory_id: Optional[int] = None
#     subsubcategory_id: Optional[int] = None 
#     @field_validator("part")
#     @classmethod
#     def validate_part(cls, v: str):
#         v = v.strip()

#         if len(v) < 3:
#             raise ValueError("Part number must be at least 3 characters")

#         return v

#     @field_validator("url")
#     @classmethod
#     def validate_url(cls, v):
#         if v is None:
#             return v 
#         import re 
#         if not re.match(r"^[a-z0-9-]+$", v):
#             raise ValueError(
#                 "URL can only contain lowercase letters, numbers and hyphens. Example: siemens-s7-1200"
#             )

#         return v


# class ProductResponse(BaseModel):
#     id: int
#     part: str
#     url: Optional[str]
#     mrp: Optional[str]
#     price: Optional[str]
#     ptype: Optional[str]
#     pimage: Optional[str]
#     stock: Optional[int]
#     stext: Optional[str]
#     ftext: Optional[str]
#     mtag: Optional[str]
#     mkey: Optional[str]
#     mdesc: Optional[str]
#     status: Optional[bool]
#     dates: Optional[str]
#     ipaddress: Optional[str]
#     category_id: Optional[int]
#     subcategory_id: Optional[int]
#     subsubcategory_id: Optional[int]

#     class Config:
#         from_attributes = True


# class ProductImportResponse(BaseModel):
#     total: int
#     inserted: int
#     skipped: int
#     errors: list[str]