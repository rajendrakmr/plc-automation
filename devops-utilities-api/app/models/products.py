from sqlalchemy import (
    Column,
    String,
    Text,
    TIMESTAMP,
    Enum,
    ForeignKey,
    func,
    Index
)

from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.orm import relationship

from app.core.database import Base


class Product(Base):
    __tablename__ = "plc_trn_products"

    product_id = Column(BIGINT(unsigned=True),primary_key=True,autoincrement=True)
    category_id = Column(BIGINT(unsigned=True), ForeignKey("plc_m_categories.category_id"), nullable=False,index=True) 
    product_type_id = Column(BIGINT(unsigned=True), ForeignKey("plc_m_product_types.product_type_id"), nullable=False,index=True)

    part_no = Column(String(255),nullable=False,unique=True) 
    url = Column(String(255), nullable=False, unique=True)

    short_desc = Column(String(500))
    product_desc = Column(Text) 
    image_url = Column(String(255)) 
    meta_title = Column(String(255))
    meta_keywords = Column(String(255))
    meta_description = Column(String(500))

    stock = Column(Enum("in-stock", "limited", "out-stock", name="product_stock" ),default="in-stock", nullable=False)
    status = Column(Enum( "draft", "published", "inactive", "archived", name="product_status" ), default="published", nullable=False )

   
    created_at = Column(TIMESTAMP,server_default=func.now()) 
    updated_at = Column(TIMESTAMP,server_default=func.now(), onupdate=func.now())
    # Relationships
    category = relationship("Category", back_populates="products") 
    product_type = relationship("ProductType", back_populates="products") 
    meta = relationship("ProductMeta", back_populates="product",cascade="all, delete-orphan")

    __table_args__ = (Index("idx_product_cat_status", "category_id", "status"), Index("idx_product_created", "created_at"), )
