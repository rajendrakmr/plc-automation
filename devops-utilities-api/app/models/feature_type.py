from sqlalchemy import (
    Column,
    String, 
    BigInteger
) 
from app.core.database import Base




class FeatureType(Base):
    __tablename__ = "plc_features_type"

    feature_id = Column(BigInteger, primary_key=True, autoincrement=True)
    id = Column(BigInteger, nullable=False, index=True)
    types = Column(String(255), nullable=False)
    feature_type = Column(String(255), nullable=False)
    status = Column(String(50), nullable=False, default="active")