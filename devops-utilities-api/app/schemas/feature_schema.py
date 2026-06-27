from pydantic import BaseModel, Field
from typing import Optional


# ─── Response ─────────────────────────────────────────────────────────────────

class FeatureResponse(BaseModel):
    feature_id: int
    id: int
    types: str
    feature_type: str
    status: str 
    class Config:
        from_attributes = True


# ─── Create ───────────────────────────────────────────────────────────────────

class FeatureTypeCreate(BaseModel):
    types: str = Field(..., min_length=2, max_length=255)
    feature_type: str = Field(..., min_length=2, max_length=255)
    status: Optional[str] = "active"
    items_id: list[int] = Field(..., min_length=1)


# ─── Update (single row) ──────────────────────────────────────────────────────

class FeatureTypeUpdate(BaseModel):
    types: Optional[str] = Field(None, min_length=3, max_length=255)
    feature_type: Optional[str] = Field(None, min_length=3, max_length=255)
    id: Optional[int] = None
    status: Optional[str] = None