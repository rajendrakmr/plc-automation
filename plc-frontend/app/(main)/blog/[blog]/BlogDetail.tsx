"use client";

import BreadCrumbsSection from "@/app/components/BredCrumbsSection";
import ContactUsSection from "@/app/components/ContactUsSection";
import Image from "next/image"; 
import PopularBlogSection from "@/app/components/PopularBlogSection";
import Reference from "@/app/components/main-ui/Reference"; 
import "@/app/components/css/blogs.css";

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

type Props = {
    blog: Blog;
};

export default function BlogDetail({ blog }: Props) {

    return (
        <main>
            <BreadCrumbsSection
                title={blog.blog_title}
                bgImage="/assets/engineering-services-1.jpg"
                items={[
                    { label: "Home", link: "/" },
                    { label: "Blogs", link: "/blogs" },
                    { label: blog.category.blog_cat_name },
                ]}
            />
            <section className="section_grey_content"> 
                <div className="section_container blogx_container" style={{ paddingTop: "0px" }}> 
                    <div className="blogx_left"> 
                        <Image
                            src="/assets/engineering-services-4.jpg"
                            alt={blog.blog_title}
                            width={900}
                            height={450}
                            className="blogx_main_img"
                        /> 
                        <div className="blogx_meta">
                            <span>{blog.category.blog_cat_name}</span>
                            <span>By {blog.blog_author}</span> 
                        </div> 
                        <h1 className="blogx_title">{blog.blog_title}</h1> 
                        <div className="blogx_content"> 
                            {
                                blog.blog_content && <div 
                                    dangerouslySetInnerHTML={{ __html: blog.blog_content }}
                                />
                            } 
                             <Reference />
                        </div>

                    </div> 

                    <PopularBlogSection />


                </div>

            </section>
           



            <ContactUsSection />
        </main>
    );
}