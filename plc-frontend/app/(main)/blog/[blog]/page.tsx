
import { notFound } from "next/navigation";
import BlogDetail from "./BlogDetail";
import { Metadata } from "next";
import { PaginatedResponse } from "@/app/components/hooks/useFetch";
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
    params: Promise<{
        blog: string;
    }>;
};

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
}
async function getBlog(blog: string): Promise<PaginatedResponse<Blog> | null> {
    try {
        const apiEndPoint = `${process.env.NEXT_PUBLIC_API_URL}/blogs/list?url=${blog}`
        const res = await fetch(apiEndPoint, { cache: "no-store" });
        if (!res.ok) return null;
        const data: PaginatedResponse<Blog> = await res.json();
        if (!data?.records?.length) return null;
        return data;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { blog } = await params;
    const blogs = await getBlog(blog);

    const blogData = blogs?.records?.[0];
    console.log("blogDatablogDatablogDatablogData", blogData)

    if (!blogData) {
        return {
            title: "blog Not Found",
            description: "",
        };
    }

    return {
        title: blogData.blog_title,
        description: blogData.blog_title,
        keywords: blogData.blog_title,
    };
}

export default async function Blog({ params }: Props) {
    
    const { blog } = await params;
    const blogs = await getBlog(blog);
    if (!blogs) notFound();
    const blogData = blogs.records[0];
    return <BlogDetail blog={blogData} />;
}
