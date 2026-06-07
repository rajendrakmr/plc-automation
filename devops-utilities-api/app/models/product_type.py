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
from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.orm import relationship

class ProductType(Base):
    __tablename__ = "plc_m_product_types" 
    product_type_id = Column(BigInteger,primary_key=True,index=True,autoincrement=True) 
    name = Column(String(255),nullable=False, unique=True,index=True) 
    description = Column(Text,nullable=False)  
    status = Column(SmallInteger,nullable=False,default=1,index=True) 
    products = relationship("Product", back_populates="product_type")