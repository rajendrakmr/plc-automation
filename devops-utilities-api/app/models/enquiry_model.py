from sqlalchemy import (
    Column,
    String,
    Text,
    TIMESTAMP,
    ForeignKey,
    Integer,
    func,
    Date,
)
from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.orm import relationship
from app.core.database import Base


class Enquiry(Base):
    __tablename__ = "plc_trn_enquiry_requests"

    contact_id = Column(BIGINT(unsigned=True), primary_key=True, autoincrement=True)
 
    product_id = Column(
        BIGINT(unsigned=True),
        ForeignKey("plc_trn_products.product_id"),
        nullable=True,
        index=True,
    )
    category_id = Column(
        BIGINT(unsigned=True),
        ForeignKey("plc_m_categories.category_id"),
        nullable=True,
        index=True,
    )

    part_number = Column(String(100), nullable=True)
    subject = Column(String(100), nullable=True)
    manufacturer = Column(String(100), nullable=True)
    quantity = Column(Integer, nullable=False, default=1)
    enquiry_date = Column(Date, nullable=False)
    telephone = Column(String(30), nullable=True)
    email_address = Column(String(255), nullable=True)
    first_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=True)
    company_name = Column(String(150), nullable=True)
    customer_name = Column(String(150), nullable=False)
    content = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
 
    product = relationship("Product", back_populates="enquiries")
    category = relationship("Category", back_populates="enquiries")