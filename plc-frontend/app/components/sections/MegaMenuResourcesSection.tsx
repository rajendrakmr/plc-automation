import Image from "next/image";
import Link from "next/link";
import s from "@/app/components/layout/MegaMenu.module.css";
const blogs = [
  {
    title: "How PLC Automation Works",
     image: "/assets/engineering-services-1.jpg",
    href: "/blogs/plc-automation"
  },
  {
    title: "Top 5 Siemens PLC Tips",
    image: "/assets/engineering-services-2.jpg",
    href: "/blogs/siemens-tips"
  },
  {
    title: "Troubleshooting Drives",
    image: "/assets/engineering-services-5.jpg",
    href: "/blogs/drives-troubleshooting"
  },
  {
    title: "Industrial IoT Guide",
    image: "/assets/engineering-services-3.jpg",
    href: "/blogs/iiot-guide"
  }
];
export default function MegaMenuResourcesSection() {
  return (
    <div className={s.megaMenuResources}>
      <div className={s.blogGrid}>
        {blogs.map((blog, i) => (
          <Link key={i} href={blog.href} className={s.blogCard}>
            <div className={s.blogImageWrap}>
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className={s.blogImage}
              />
            </div>
            <div className={s.blogTitle}>
              {blog.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}