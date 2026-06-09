'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LatestBlogSection() {
  interface Slide {
    id: number;
    image: string;
    title: string;
    description: string;
    author: string;
    date: string;
  }

  const SLIDES: Slide[] = [
    {
      id: 1,
      author: 'By Plc Automation Group',
      date: 'Apr 28, 2025',
      image: '/assets/engineering-services-1.jpg',
      title:
        'How Many Critical Automation Spares Should You Keep in Stock',
      description:
        'A smarter approach to reducing downtime, risk, and cost in industrial automation environments.',
    },
    {
      id: 2,
      author: 'By Plc Automation Group',
      date: 'Apr 28, 2025',
      image: '/assets/engineering-services-2.jpg',
      title:
        'Lifecycle Status: Identify Risks Before Components Become Obsolete',
      description:
        'Understand lifecycle management and avoid costly production disruptions.',
    },
    {
      id: 3,
      author: 'By Plc Automation Group',
      date: 'Apr 28, 2025',
      image: '/assets/engineering-services-3.jpg',
      title:
        'Free Preventive Maintenance Planner Excel (PM & PdM)',
      description:
        'Improve maintenance planning and reduce failures using preventive strategies.',
    },
  ];

  return ( 
      <section className="section_grey_content">
        <div className="section_container rk_blog_container"> 
          <div className="rk_blog_header">
            <div> 
              <h2 className="rk_blog_title">
                Insights, Updates & Articles
              </h2>

              <p className="rk_blog_subtitle">
                Stay updated with the latest trends,
                industrial automation insights and
                engineering articles.
              </p>
            </div>

            <Link
              href="/blogs"
              className="rk_blog_view_all"
            >
              All Articles →
            </Link>
          </div>

          {/* GRID */}
          <div className="rk_blog_grid"> 
            <motion.article
              className="rk_blog_featured"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="rk_blog_featured_img">
                <Image
                  src="/assets/engineering-services-5.jpg"
                  alt="Featured Blog"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="rk_blog_featured_body">
                <div className="rk_blog_meta">
                  <span>
                    By Plc Automation Group
                  </span>

                  {/* <span>Apr 28, 2025</span> */}

                  {/* <span>8 min read</span> */}
                </div>

                <h3 className="rk_blog_featured_title">
                  A Symbiotic Relationship with
                  Precision Engineering and
                  Automation
                </h3>

                <p className="rk_blog_featured_desc">
                  Precision engineering plays a
                  critical role across industries
                  including aerospace, electronics,
                  manufacturing and industrial
                  automation. Discover how advanced
                  engineering and automation improve
                  reliability, efficiency and
                  productivity.
                </p>

                <div className="rk_blog_footer">
                  <div className="rk_blog_tags">
                    <span>Siemens</span>
                    <span>PLC</span>
                    <span>S7-300</span>
                  </div>

                  <Link
                    href="/blogs"
                    className="rk_blog_read_more"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.article>

            {/* SIDE BLOGS */}
            <div className="rk_blog_side">
              {SLIDES.map((slide) => (
                <motion.article
                  key={slide.id}
                  className="rk_blog_card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="rk_blog_card_img">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <div className="rk_blog_card_body">
                    {/* <div className="rk_blog_meta">
                      <span>{slide.date}</span>
                      <span>5 min read</span>
                    </div> */}

                    <h3 className="rk_blog_card_title">
                      {slide.title}
                    </h3>

                    <p className="rk_blog_card_desc">
                      {slide.description}
                    </p>

                    <Link
                      href="/blogs"
                      className="rk_blog_read_more"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>  
  );
}