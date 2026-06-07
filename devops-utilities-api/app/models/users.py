# from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
 

from sqlalchemy import (
    Column,
    String,
    TIMESTAMP,
    Enum,
    BigInteger,
    func
)
from app.core.database import Base

 
class User(Base):
    __tablename__ = "plc_m_users" 
    user_id = Column(BigInteger, primary_key=True, index=True) 
    user_name = Column(String(100), nullable=False) 
    email = Column(String(255),unique=True, nullable=False,index=True ) 
    password_hash = Column(String(255), nullable=False) 
    first_name = Column(String(100))
    last_name = Column(String(100)) 
    phone = Column(String(20)) 
    image_url = Column(String(255)) 
    last_login = Column(TIMESTAMP, nullable=True) 
    status = Column( Enum( "active", "inactive", "blocked", name="user_status" ), default="active", nullable=False)

    created_at = Column( TIMESTAMP, server_default=func.now() )

    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now() )
    
 