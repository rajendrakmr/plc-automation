from sqlalchemy.orm import Session, joinedload,load_only
from fastapi import HTTPException, status

from typing import Optional, Tuple, List 
from app.models.blog_model import Blog,BlogCategory,BlogTag,BlogTagMapping
from app.schemas.blog_schema import BlogCreate,BlogUpdate



def list_feature(
    db: Session, 
    limit: int, 
    search: Optional[str] = None, 
    type: Optional[str] = None
) -> tuple[list[Blog], int]:
     
    query = db.query(Blog) 
    if type:
        query = query.filter(Blog.type == type) 
    if search: 
        query = query.filter(
            Blog.blog_title.ilike(f"%{search}%")
        )

  
    blogs = (
        query.options(
            load_only(
                Blog.blog_id, 
                Blog.blog_img_url, 
                Blog.blog_title,
                Blog.blog_slug, 
                Blog.blog_excerpt,
                Blog.blog_content,
                Blog.blog_published_at,
                Blog.blog_meta_title, 
                Blog.blog_meta_keywords,
                Blog.blog_meta_desc, 
                Blog.blog_author,
            ),
            joinedload(Blog.category).load_only(
                BlogCategory.blog_cat_id,
                BlogCategory.blog_cat_name,
            )
        )
        .order_by(Blog.blog_id.asc())  
        .limit(limit)
        .all() 
    )
    
    return blogs

def list_all(
    db: Session,
    page: int,
    limit: int, 
    search: Optional[str] = None,
    blog_cat_id: Optional[int] = None,
    url: Optional[str] = None, 
    status: Optional[str] = None
) -> tuple[list[Blog], int]:
     
    query = db.query(Blog) 
    if blog_cat_id:
        query = query.filter(Blog.blog_cat_id == blog_cat_id)   
    if status:
        query = query.filter(Blog.status == status)
    if url: 
        query = query.filter( Blog.blog_slug.ilike(f"%{url}%"))
    if search: 
        query = query.filter(
            Blog.blog_title.ilike(f"%{search}%")
        )

 
    total = query.count() 
    blogs = (
        query.options(
            load_only(
                Blog.blog_id, 
                Blog.blog_img_url, 
                Blog.blog_title,
                Blog.blog_slug, 
                Blog.blog_excerpt,
                Blog.blog_content,
                Blog.blog_published_at,
                Blog.blog_meta_title, 
                Blog.blog_meta_keywords,
                Blog.blog_meta_desc, 
                Blog.blog_author,
            ),
            joinedload(Blog.category).load_only(
                BlogCategory.blog_cat_id,
                BlogCategory.blog_cat_name,
            )
        )
        .order_by(Blog.blog_id.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all() 
    )
    
    return blogs, total

def get_all(
    db: Session,
    page: int,
    limit: int,
    search: Optional[str] = None,
    blog_cat_id: Optional[int] = None,
    url: Optional[str] = None,
    status: Optional[str] = None,
) -> tuple[list[Blog], int]:

    query = db.query(Blog).options( 
        load_only(
            Blog.blog_id,
            Blog.blog_img_url,
            Blog.blog_title,
            Blog.blog_slug,
            Blog.blog_excerpt,
            Blog.blog_content,
            Blog.blog_published_at,
            Blog.blog_meta_title,
            Blog.blog_meta_keywords,
            Blog.blog_meta_desc,     
            Blog.blog_author,
            Blog.status,            
            Blog.blog_cat_id,      
        ),
        joinedload(Blog.category).load_only(
            BlogCategory.blog_cat_id,
            BlogCategory.blog_cat_name,
        ),
        joinedload(Blog.tags).load_only(
            BlogTagMapping.blog_tag_id, 
        ),
    )

    if blog_cat_id: 
        query = query.filter(Blog.blog_cat_id == blog_cat_id)

    if status:
        query = query.filter(Blog.status == status)

    if search:
        search = f"%{search.lower()}%"
        query = query.filter(
            Blog.blog_title.ilike(search) |
            Blog.blog_slug.ilike(search) |
            Blog.blog_excerpt.ilike(search)
        )

    if url:   
        query = query.filter(Blog.blog_slug == url)

    total = query.count()

    blogs = (
        query
        .order_by(Blog.blog_id.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return blogs, total
 
def get_by_slug(db: Session, url: str) -> Blog | None:
    return db.query(Blog).filter(Blog.blog_slug == url).first()

def get_by_title(db: Session, title: str) -> Blog | None:
    return db.query(Blog).filter(Blog.blog_title == title).first()

def create(db: Session, payload: BlogCreate) -> Blog: 
    tag_ids = payload.tags 
    blog_data = payload.model_dump(exclude={"tags"}) 
    blog = Blog(**blog_data)
    db.add(blog)
    db.flush()    
    for tag_id in tag_ids:
        mapping = BlogTagMapping(blog_id=blog.blog_id, blog_tag_id=tag_id)
        db.add(mapping) 
    db.commit()
    db.refresh(blog)
    return blog

def update(db: Session, blog_id: int, payload: BlogUpdate) -> Blog:
    blog = db.query(Blog).filter(Blog.blog_id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")

    tag_ids = payload.tags
    blog_data = payload.model_dump(exclude={"tags"}, exclude_unset=True) 
    for key, val in blog_data.items():
        setattr(blog, key, val) 
    db.query(BlogTagMapping).filter(BlogTagMapping.blog_id == blog_id).delete()
    for tag_id in tag_ids:
        mapping = BlogTagMapping(blog_id=blog_id, blog_tag_id=tag_id)
        db.add(mapping)

    db.commit()
    db.refresh(blog)
    return blog

def list_all_cat(
    db: Session, 
    limit: int, 
    search: Optional[str] = None, 
    url: Optional[str] = None,  
) -> tuple[list[Blog], int]:
     
    query = db.query(BlogCategory)   
    if url: 
        query = query.filter( Blog.blog_cat_slug.ilike(f"%{url}%"))
    if search: 
        query = query.filter(
            BlogCategory.blog_title.ilike(f"%{search}%")
        ) 
    cats = (
        query.options(
            load_only(
              BlogCategory.blog_cat_id,
              BlogCategory.blog_cat_name,
              BlogCategory.blog_cat_slug
            )
        )
        .order_by(BlogCategory.blog_cat_id.desc()) 
        .limit(limit)
        .all() 
    )
    
    return cats



def list_all_tag(
    db: Session, 
    limit: int, 
    search: Optional[str] = None, 
    url: Optional[str] = None,  
) -> tuple[list[Blog], int]:
     
    query = db.query(BlogTag)   
    if url: 
        query = query.filter( Blog.blog_tag_slug.ilike(f"%{url}%"))
    if search: 
        query = query.filter(
            BlogCategory.blog_tag_name.ilike(f"%{search}%")
        ) 
    cats = (
        query.options(
            load_only(
              BlogTag.blog_tag_id,
              BlogTag.blog_tag_name,
              BlogTag.blog_tag_slug
            )
        )
        .order_by(BlogTag.blog_tag_id.desc()) 
        .limit(limit)
        .all() 
    )
    
    return cats

 