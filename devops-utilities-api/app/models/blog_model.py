from sqlalchemy import (
    Column,
    String,
    Text,
    TIMESTAMP,
    Enum,
    ForeignKey,
    Integer,
    func,
    Index,
)
from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.orm import relationship
from app.core.database import Base


class Blog(Base):
    __tablename__ = "plc_trn_blogs"

    blog_id = Column(BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    blog_cat_id = Column(
        BIGINT(unsigned=True),
        ForeignKey("plc_m_blog_categories.blog_cat_id"),
        nullable=False,
        index=True,
    )
    type = Column(String(11), nullable=True)
    blog_title = Column(String(255), nullable=False)
    blog_slug = Column(String(255), nullable=False, unique=True)
    blog_excerpt = Column(String(500), nullable=True)
    blog_content = Column(Text, nullable=True)
    blog_img_url = Column(String(500), nullable=True)
    blog_author = Column(String(255), nullable=True)
    blog_tags = Column(String(500), nullable=True)
    blog_sort = Column(Integer, nullable=False, default=0)

    blog_meta_title = Column(String(255), nullable=True)
    blog_meta_desc = Column(String(500), nullable=True)
    blog_meta_keywords = Column(String(500), nullable=True)

    blog_published_at = Column(TIMESTAMP, nullable=True)
    status = Column(
        Enum("draft", "published", "inactive", "archived", name="blog_status"),
        default="published",
        nullable=False,
    )

    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    # Relationships
    category = relationship("BlogCategory", back_populates="blogs")

    __table_args__ = (
        Index("idx_blog_cat_status", "blog_cat_id", "status"),
        Index("idx_blog_published_at", "blog_published_at"),
        Index("idx_blog_sort", "blog_sort"),
    )


class BlogCategory(Base):
    __tablename__ = "plc_m_blog_categories"

    blog_cat_id = Column(BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    blog_cat_name = Column(String(255), nullable=False)
    blog_cat_slug = Column(String(255), nullable=False, unique=True)
    status = Column(Integer, nullable=False, default=1)

    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    # Relationships
    blogs = relationship("Blog", back_populates="category")


class BlogTag(Base):
    __tablename__ = "plc_m_blog_tags"

    blog_tag_id = Column(BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    blog_tag_name = Column(String(255), nullable=False)
    blog_tag_slug = Column(String(255), nullable=False, unique=True)
    status = Column(Integer, nullable=False, default=1)

    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())