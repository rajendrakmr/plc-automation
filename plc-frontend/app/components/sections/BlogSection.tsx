"use client";
import { useState } from "react";

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
};

const blogsData: Blog[] = [
  {
    id: 1,
    title: "Understanding PLC Automation Systems",
    excerpt: "Learn how PLC systems power modern industries and improve efficiency.",
    image: "/assets/1.jpg",
    date: "Aug 12, 2025",
  },
  {
    id: 2,
    title: "How to Handle Obsolete Automation Parts",
    excerpt: "Best strategies to manage discontinued industrial components.Best strategies to manage discontinued industrial components.Best strategies to manage discontinued industrial components.Best strategies to manage discontinued industrial components.Best strategies to manage discontinued industrial components.Best strategies to manage discontinued industrial components.Best strategies to manage discontinued industrial components.Best strategies to manage discontinued industrial components.Best strategies to manage discontinued industrial components.Best strategies to manage discontinued industrial components.Best strategies to manage discontinued industrial components.Best strategies to manage discontinued industrial components.",
    image: "/assets/2.jpg",
    date: "Aug 10, 2025",
  },
  {
    id: 3,
    title: "Top 5 Industrial Automation Brands",
    excerpt: "A breakdown of the most trusted automation manufacturers.",
    image: "/assets/3.jpg",
    date: "Aug 05, 2025",
  },
  {
    id: 4,
    title: "Reducing Downtime with Spare Parts",
    excerpt: "Tips to ensure continuous operations in industrial setups.",
    image: "/assets/4.jpg",
    date: "Aug 01, 2025",
  },
  {
    id: 5,
    title: "Automation Trends in 2025",
    excerpt: "Explore the future of industrial automation and AI integration.",
    image: "/assets/5.jpg",
    date: "Jul 28, 2025",
  },
  {
    id: 6,
    title: "Choosing the Right PLC",
    excerpt: "Factors to consider when selecting PLC systems.",
    image: "/assets/6.jpg",
    date: "Jul 20, 2025",
  },
  {
    id: 7,
    title: "Choosing the Right PLC",
    excerpt: "Factors to consider when selecting PLC systems.",
    image: "/assets/6.jpg",
    date: "Jul 20, 2025",
  },
  {
    id: 8,
    title: "Choosing the Right PLC",
    excerpt: "Factors to consider when selecting PLC systems.",
    image: "/assets/6.jpg",
    date: "Jul 20, 2025",
  },
  {
    id: 9,
    title: "Choosing the Right PLC",
    excerpt: "Factors to consider when selecting PLC systems.",
    image: "/assets/6.jpg",
    date: "Jul 20, 2025",
  },
  {
    id: 10,
    title: "Choosing the Right PLC",
    excerpt: "Factors to consider when selecting PLC systems.",
    image: "/assets/6.jpg",
    date: "Jul 20, 2025",
  },
  {
    id: 11,
    title: "Choosing the Right PLC",
    excerpt: "Factors to consider when selecting PLC systems.",
    image: "/assets/6.jpg",
    date: "Jul 20, 2025",
  },
  {
    id: 12,
    title: "Choosing the Right PLC",
    excerpt: "Factors to consider when selecting PLC systems.",
    image: "/assets/6.jpg",
    date: "Jul 20, 2025",
  },
  {
    id: 13,
    title: "Choosing the Right PLC",
    excerpt: "Factors to consider when selecting PLC systems.",
    image: "/assets/6.jpg",
    date: "Jul 20, 2025",
  },
];

const truncateWords = (text: string, maxWords: number) => {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};
export default function BlogSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = blogsData.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(blogsData.length / blogsPerPage);

  return (
    <section className="blog-section">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Our Latest Insights & News</h2>
          <p className="section-sub">
            Stay informed with expert articles and updates in industrial automation, supply chain optimization, and critical spare parts sourcing.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {currentBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <div
                className="blog-img"
                style={{ backgroundImage: `url(${blog.image})` }}
              />

              <div className="blog-content">
                <span className="blog-date">{blog.date}</span>
                <h3>{blog.title}</h3>
                <p>{truncateWords(blog.excerpt, 25)}</p>
                <a href="#" className="read-more">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}