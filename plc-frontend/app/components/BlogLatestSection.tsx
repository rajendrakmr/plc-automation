"use client";

import Link from "next/link";
import styles from "./LatestBlogs.module.css";
import { useFetchData } from "../utils/useFetchData";
export interface BlogCategory {
  blog_cat_id: number;
  blog_cat_name: string;
}

export interface Blog {
  blog_id: number;
  blog_title: string;
  blog_meta_title: string;
  blog_slug: string;
  blog_meta_desc: string;
  blog_excerpt: string;
  blog_meta_keywords: string;
  blog_content: string;
  blog_published_at: string | null;
  blog_img_url: string;
  blog_author: string;
  category: BlogCategory;
}

export default function BlogLatestSection() {
  const { data: BLOGS, loading: BlogLoading } = useFetchData<Blog[]>({
    url: '/blogs/feature',
    params: {
      limit: 3,
      type: "h"
    },

  });

  return (
    <section className={styles.rkb_section}>
      <div className={styles.rkb_container}>

        {/* Header */}
        <div className={styles.rkb_header}>
          <span className={styles.rkb_eyebrow}>From Our Blog</span>
          <h2 className={styles.rkb_heading}>Latest Insights & Updates</h2>
          <p className={styles.rkb_subtext}>
            Stay ahead with expert articles on PLC automation, industrial
            controls, and engineering best practices.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className={styles.rkb_grid}>
          {BLOGS?.map((slide) => (
            <Link
              key={slide.blog_id}
              href={`/blog/${slide.blog_slug}`}
              className={styles.rkb_card}
            >
              <div className={styles.rkb_imageWrap}>
                <img
                  src={'/assets/engineering-services-1.jpg'}
                  alt={slide.blog_title}
                  className={styles.rkb_image}
                />
                <span className={styles.rkb_badge}>{slide.category.blog_cat_name}</span>
              </div>
              <div className={styles.rkb_cardBody}>
                <div className={styles.rkb_meta}> 
                  <span>{slide.blog_author}</span>
                </div>
                <h3 className={styles.rkb_cardTitle}>{slide.blog_title}</h3>
                <p className={styles.rkb_excerpt}>{slide.blog_excerpt}</p>
                <span className={styles.rkb_readMore}>
                  Read Article <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.rkb_cta}>
          <Link href="/blogs" className={styles.rkb_ctaBtn}>
            View All Articles
          </Link>
        </div>

      </div>
    </section>
  );
}