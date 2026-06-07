from sqlalchemy import (
    Column,
    String,
    Text,
    TIMESTAMP,
    BigInteger,
    SmallInteger,
    func
)

from app.core.database import Base 
from sqlalchemy.orm import relationship
class Category(Base):
    __tablename__ = "plc_m_categories" 
    category_id = Column(BigInteger,primary_key=True,index=True,autoincrement=True) 
    cat_name = Column(String(255),nullable=False) 
    cat_slug = Column(String(255),nullable=False, unique=True,index=True) 
    cat_desc = Column(Text) 
    meta_title = Column(String(200))
    meta_keywords = Column(String(500))
    meta_description = Column(Text) 
    image_url = Column(String(255)) 
    status = Column(SmallInteger,nullable=False,default=1,index=True) 
    created_at = Column(TIMESTAMP,server_default=func.now()) 
    updated_at = Column(TIMESTAMP,server_default=func.now(), onupdate=func.now())
    
    products = relationship("Product", back_populates="category")