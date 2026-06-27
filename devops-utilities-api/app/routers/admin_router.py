from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.users import User

# ── Import your models ────────────────────────────────────────────────────────
from app.models.blog_model import Blog,BlogCategory
from app.models.products import Product        
from app.models.enquiry_model import Enquiry       
# from app.models. import BlogCategory

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # ── Blogs ──────────────────────────────────────────────────────────────────
    total_blogs       = db.query(func.count(Blog.blog_id)).scalar()
    published_blogs   = db.query(func.count(Blog.blog_id)).filter(Blog.status == "published").scalar()
    draft_blogs       = db.query(func.count(Blog.blog_id)).filter(Blog.status == "draft").scalar()

    # ── Blog Categories ────────────────────────────────────────────────────────
    total_blog_cats   = db.query(func.count(BlogCategory.blog_cat_id)).scalar()

    # ── Products ───────────────────────────────────────────────────────────────
    total_products    = db.query(func.count(Product.product_id)).scalar()
    instock_products  = db.query(func.count(Product.product_id)).filter(Product.stock == "in-stock").scalar()
    limited_products  = db.query(func.count(Product.product_id)).filter(Product.stock == "limited").scalar()
    outstock_products = db.query(func.count(Product.product_id)).filter(Product.stock == "out-stock").scalar()

    # ── Enquiries ──────────────────────────────────────────────────────────────
    total_enquiries   = db.query(func.count(Enquiry.contact_id)).scalar()
    # new_enquiries     = db.query(func.count(Enquiry.contact_id)).filter(Enquiry.status == "new").scalar()
    # resolved_enquiries = db.query(func.count(Enquiry.contact_id)).filter(Enquiry.status == "resolved").scalar()

    return {
        "blogs": {
            "total":     total_blogs,
            "published": published_blogs,
            "draft":     draft_blogs,
        },
        "blog_categories": {
            "total": total_blog_cats,
        },
        "products": {
            "total":     total_products,
            "in_stock":  instock_products,
            "limited":   limited_products,
            "out_stock": outstock_products,
        },
        "enquiries": {
            "total":    total_enquiries,
            # "new":      new_enquiries,
            # "resolved": resolved_enquiries,
        },
    }