"use client";

import { useFetchData } from "@/app/utils/useFetchData";
import Image from "next/image";
import Link from "next/link";


interface Categories {
  category_id: number;
  cat_name: string;
  cat_slug: string;
}


export default function ManufacturersSection() {

  const { data: manufacturers, loading: catLoading } = useFetchData<Categories[]>({
    url: '/categories/feature',
    params: {
      type: 'home'
    },

  });
  return (
    <section className="section_white_content">
      <div className="section_container manufacturers-container">
        <div className="manufacturers-content">
          <h2 className="title">Manufacturers</h2>

          <p className="desc">
            We stock thousands of automation and control components from
            leading OEMs, all accessible to you from a single place. If it’s
            not in stock, our multilingual team will scour the globe to find
            you the part you need for the best price.
          </p>

          <Link href="/brands" className="view-link">
            View all manufacturers
          </Link>
        </div>
        <div className="manufacturers-grid">
          {manufacturers?.map((item) => (
            <>
              <Link
                href={`/brands/${item.cat_slug}`}
                key={item.category_id}
                className="rk_mega_card_cta"
              >

                <div className="manufacturer-card" key={item.category_id}>
                  <div className="manufacturer-image">
                    <Image
                      src={'/assets/items/abb.webp'}
                      alt={item.cat_name}
                      fill
                      className="img"
                    />
                  </div>

                  <h3 className="manufacturer-name">{item.cat_name}</h3>

                </div>
              </Link>

            </>
          ))}
        </div>
      </div>
    </section>
  );
}