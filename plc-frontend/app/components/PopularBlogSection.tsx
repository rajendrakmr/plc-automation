"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PaginatedResponse } from "@/app/components/hooks/useFetch";
import "@/app/components/css/product.css";
import { useGetData } from "@/app/utils/useGetData";
import Link from "next/link";
import { getBlogImageUrl, truncate } from "../utils/helper";

export interface BlogCategory {
  blog_cat_id: number;
  blog_cat_name: string;
  blog_cat_slug?: string;
}
export interface BlogTag {
  blog_tag_id: number;
  blog_tag_name: string;
  blog_tag_slug?: string;
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

const PopularBlogSection: React.FC = () => {
  const { loading, data: BLOGS_POPULAR } = useGetData<Blog[]>({
    url: "/blogs/feature",
    params: { limit: 4 },
  });

  const { loading:cateLoading, data: categories } = useGetData<BlogCategory[]>({
    url: "/blogs/categories",
    params: { limit: 11 },
  });

  const { loading:tagLoading, data: tags } = useGetData<BlogTag[]>({
    url: "/blogs/tags",
    params: { limit: 10 },
  });

  if (loading) return null;

  return (
    <aside className="blogx_right">

      <div className="blogx_card">
        <h3>Categories</h3>
        <div className="blogx_tags">
          {categories?.map((t, i) => (
            <span key={t.blog_cat_id}>{t.blog_cat_name}</span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="blogx_card">
        <h3>Tags</h3>
        <div className="blogx_tags">
          {tags?.map((t, i) => (
            <span key={t.blog_tag_id}>{t.blog_tag_name}</span>
          ))}
        </div>
      </div>

      {/* Popular */}
      <div className="blogx_card">
        <h3>Popular Blogs</h3>
        <div className="blogx_popular">
          {BLOGS_POPULAR?.map((b: Blog) => (
            <Link key={b.blog_id} href={`/blog/${b.blog_slug}`} className="blogx_pop_title">
              <div className="blogx_pop_item">
                <Image
                  src={`/assets/engineering-services-4.jpg`}
                  alt={b.blog_title}
                  width={70}
                  height={70}
                  className="blogx_pop_img"
                />
                <div>
                  <h4>{truncate(b.blog_title, 2)}</h4>
                  <p>{truncate(b.blog_excerpt, 6)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>

  );
};

export default PopularBlogSection;