"use client";

import { useFetchData } from "@/app/utils/useFetchData";
import useScrollReveal from "@/app/components/hooks/useScrollReveal";
import Link from "next/link";

 


interface Categories {
  category_id: number;
  cat_name: string;
  cat_slug: string;
}

export default function BrandsSection() {
  const { ref, isVisible } = useScrollReveal();
const { data: manufacturers, loading: catLoading } = useFetchData<Categories[]>({
    url: '/categories/feature',
    params: {
      type: 'about'
    },

  });
  return (
    <section className="section_white_content">
      <div className="section_container about-brands">
      <div className="about-brands__header">
        <h2 className="section-title">Supporting the World's Leading Automation Brands</h2>
        <p className="about-brands__sub">
          We source components from top-tier manufacturers, ensuring your systems run on trusted, industrial-grade hardware.
        </p>
      </div>
      <div className={`about-brands__grid reveal reveal--up ${isVisible ? "visible" : ""}`} ref={ref}>
        {manufacturers?.map((brand, i) => (
           <Link href={`/brands/${brand.cat_slug}`} className="about-brands__link">
          <div className="about-brands__item" key={i} style={{ transitionDelay: `${i * 60}ms` }}>
            {brand.cat_name}
          </div>
            </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
