import BredCrumbsSection from "@/app/components/BredCrumbsSection";
import Image from "next/image"; 
import ContactUsSection from "@/app/components/ContactUsSection";
import "@/app/components/css/blogs.css";
import Reference from "@/app/components/main-ui/Reference"; 
import { notFound } from "next/navigation"; 
import PopularBlogSection from "@/app/components/PopularBlogSection";
 
const categories = [
    "PLC Basics",
    "Siemens PLC",
    "Automation",
    "Industrial IoT",
    "HMI Systems",
];

const tags = [
    "S7-1200",
    "Siemens",
    "PLC",
    "Automation",
    "Industry 4.0",
];
 
type Props = {
    params: Promise<{
        blog: string;
    }>;
};


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

export default async function BlogDetails({
    params,
}: Props) {
    const { blog: blogSlug } = await params;
    let blog: Blog | null = null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/feature?limit=1&url=${blogSlug}`, { cache: "no-store" });
        if (!res.ok) notFound();
        const blogs: Blog[] = await res.json();
        blog = blogs[0] ?? null;

        if (!blog) notFound();

    } catch {
        notFound();
    }

    return (
        <main>

            <BredCrumbsSection
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

                    {/* LEFT */}
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
                            {/* <span>{blog.date}</span> */}
                        </div>

                        <h1 className="blogx_title">{blog.blog_title}</h1>

                        <div className="blogx_content">

                            {
                                blog.blog_content && <div
                                    // className="product_desc"
                                    dangerouslySetInnerHTML={{ __html: blog.blog_content }}
                                />
                            }
                        </div>

                    </div>

                    {/* RIGHT SIDEBAR */}
                   
                        <PopularBlogSection />


                </div>

            </section>
            <Reference />
            <ContactUsSection />

        </main>
    );
}