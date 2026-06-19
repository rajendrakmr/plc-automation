import "@/app/components/css/product.css";
import BrandDetailProduct from "@/app/components/main-ui/BrandDetailProduct";
import FeatureHighlightsBar from "@/app/components/FeatureHighlightsBar";
import ContactUsSection from "@/app/components/ContactUsSection";
import ProductAboutSection from "@/app/components/ProductAboutSection";
import ProductBredCrumbs from "@/app/components/main-ui/ProductBredCrumbs";
import PrdHeroBannerSection from "@/app/components/main-ui/PrdHeroBannerSection";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    brand: string;
  }>;
};

export interface Categories {
  category_id: number;
  cat_name: string;
  cat_desc: string;
  image_url: string;
  cat_slug: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

async function getCategories(brand: string): Promise<Categories[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/list?url=${brand}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data: Categories[] = await res.json();
    if (!data || data.length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const categories = await getCategories(brand);
  const category = categories?.[0];

  if (!category) {
    return {
      title: "Brand Not Found",
      description: "",
    };
  }

  return {
    title: category.meta_title,
    description: category.meta_description,
    keywords: category.meta_keywords, 
  };
}

export default async function Brands({ params }: Props) {
  const { brand } = await params;
  const categories = await getCategories(brand);

  if (!categories) notFound();

  const category_id: number | null = categories[0]?.category_id ?? null;
  const formattedBrand = categories[0]?.cat_name || "";
  const description = categories[0]?.cat_desc || "";

  return (
    <main>
      <FeatureHighlightsBar />
      <ProductBredCrumbs
        title={formattedBrand}
        bgImage="/assets/engineering-services-4.jpg"
        items={[
          { label: "Home", link: "/" },
          { label: "Brands", link: "/brands" },
          { label: formattedBrand },
        ]}
      />
      <ProductAboutSection
        products={{ title: formattedBrand, description: description }}
      />
      <BrandDetailProduct cat_id={category_id} />
      <PrdHeroBannerSection />
      <ContactUsSection />
    </main>
  );
}