import BredCrumbsSection from "@/app/components/BredCrumbsSection";
import Image from "next/image";
import Link from "next/link"; 
import ContactUsSection from "@/app/components/ContactUsSection";
import "@/app/components/css/blogs.css";

const blog = {
    title: "Choosing the Right Siemens S7-1200 PLC: CPU Models and Use Cases Explained",
    category: "Automation",
    author: "PLC",
    date: "Jul 13, 2025",
};

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

const popularBlogs = [
    {
        title: "PLC Basics Explained for Beginners",
        image: "/assets/engineering-services-1.jpg",
        desc: "Understand PLC fundamentals in simple language for beginners.",
    },
    {
        title: "Top Automation Trends 2026",
        image: "/assets/engineering-services-2.jpg",
        desc: "Discover industrial automation trends shaping global manufacturing.",
    },
    {
        title: "How PLC Improves Manufacturing Efficiency",
        image: "/assets/engineering-services-3.jpg",
        desc: "Learn how PLC systems improve speed, accuracy, and productivity.",
    },
];

export default function BlogDetails() {
    return (
        <main>

            <BredCrumbsSection
                title={blog.title}
                bgImage="/assets/engineering-services-1.jpg"
                items={[
                    { label: "Home", link: "/" },
                    { label: "Blogs", link: "/blogs" },
                    { label: blog.category },
                ]}
            />

            <section className="section_grey_content">

                <div className="section_container blogx_container" style={{paddingTop:"0px"}}>

                    {/* LEFT */}
                    <div className="blogx_left">

                        <Image
                            src="/assets/engineering-services-4.jpg"
                            alt={blog.title}
                            width={900}
                            height={450}
                            className="blogx_main_img"
                        />

                        <div className="blogx_meta">
                            <span>{blog.category}</span>
                            <span>By {blog.author}</span>
                            <span>{blog.date}</span>
                        </div>

                        <h1 className="blogx_title">{blog.title}</h1>

                        <div className="blogx_content">

                            <h2>Introduction</h2>
                            <p>Choosing the right PLC for your automation project doesn’t have to be complicated...</p>

                            <h2>What is Siemens S7-1200 PLC?</h2>
                            <p>The Siemens S7-1200 is part of the SIMATIC automation system designed for modular control...</p>

                            <h2>Overview of CPU Models</h2>
                            <p>The S7-1200 series includes multiple CPU models from 1211C to 1217C...</p>

                            <h2>Expansion & Communication</h2>
                            <p>Signal modules, PROFINET, Modbus, and scalability make it flexible...</p>

                            <h2>Final Thoughts</h2>
                            <p>The Siemens S7-1200 PLC family delivers reliability, scalability, and performance...</p>

                        </div>

                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside className="blogx_right">

                        <div className="blogx_card">
                            <h3>Categories</h3>
                            <div className="blogx_tags">
                                {categories.map((t, i) => (
                                    <span key={i}>{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="blogx_card">
                            <h3>Tags</h3>
                            <div className="blogx_tags">
                                {tags.map((t, i) => (
                                    <span key={i}>{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Popular */}
                        <div className="blogx_card">
                            <h3>Popular Blogs</h3>

                            <div className="blogx_popular">

                                {popularBlogs.map((b, i) => (
                                    <Link key={i} href={`/blog/${b.title.toLowerCase().replace(/ /g, '-')}`} className="blogx_pop_title">
                                        <div className="blogx_pop_item">

                                            <Image
                                                src={b.image}
                                                alt={b.title}
                                                width={70}
                                                height={70}
                                                className="blogx_pop_img"
                                            />

                                            <div>
                                                <h4>{b.title}</h4>
                                                <p>{b.desc}</p>
                                            </div>

                                        </div>
                                    </Link>
                                ))}

                            </div>

                        </div>

                    </aside>

                </div>

            </section>
            <ContactUsSection />

        </main>
    );
}