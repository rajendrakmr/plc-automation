"use client";
import { useFetchData } from "@/app/utils/useFetchData";
import Image from "next/image";
import Link from "next/link";

export interface Categories {
  category_id: number;
  cat_name: string;
  cat_desc: string;
  image_url: string;
  cat_slug: string;
}

export default function BrandsManufactureSection() {
  const { data: categories, loading: catLoading } = useFetchData<Categories[]>({
    url: "/categories/slugs",
    params: {},
  });

  return (
    <section className="section_white_content">
      <div className="section_container manufacturers-container" style={{ paddingBottom: "18px" }}>
        <div className="manufacturers-content">
          <h2 className="title">Manufacturers</h2>
        </div>
        <div className="manufacturers-container-grid">
          <div className="rk_mega_right">
            <p className="rk_mega_desc">
              We supply an extensive catalogue of automation and control
              equipment from over 100 of the world's leading parts
              manufacturers, with many qualifying for same or next day delivery.
            </p>
          </div>
        </div>
      </div>
      <div className="section_container" style={{ paddingTop: "0px" }}>
        <div className="mrk_brands_grid">
          {catLoading ? (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rk_mega_card rk_mega_card--skeleton" />
              ))}
            </>
          ) : (
            categories?.slice(0, 8).map((brand) => (
              <Link
                href={`/brands/${brand.cat_slug}`}
                key={brand.cat_slug}
                className="rk_mega_card"
              >
                <div className="rk_mega_card_img">
                  <Image
                    src={`/assets/items/abb.webp`}
                    alt={brand.cat_name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="rk_mega_card_info">
                  <span className="rk_mega_card_name">{brand.cat_name}</span>
                  <span className="rk_mega_card_cta">View all parts</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}