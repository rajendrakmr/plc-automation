from sqlalchemy import Column, String, TIMESTAMP, ForeignKey, func
from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.orm import relationship
from app.core.database import Base

class ProductMeta(Base):
    __tablename__ = "plc_trn_product_meta"

    plc_trn_pmeta_id = Column(
        BIGINT(unsigned=True),
        primary_key=True,
        autoincrement=True
    )

    product_id = Column(
        BIGINT(unsigned=True),
        ForeignKey(
            "plc_trn_products.product_id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    meta_key = Column(String(100), nullable=False)
    meta_desc = Column(String(255))
    meta_title = Column(String(255))

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    product = relationship(
        "Product",
        back_populates="meta"
    )