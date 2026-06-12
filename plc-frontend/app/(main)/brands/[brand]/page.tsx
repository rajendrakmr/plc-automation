import "@/app/components/css/product.css";
import BrandDetailProduct from "@/app/components/main-ui/BrandDetailProduct";
import FeatureHighlightsBar from "@/app/components/FeatureHighlightsBar";
import ContactUsSection from "@/app/components/ContactUsSection";
import ProductAboutSection from "@/app/components/ProductAboutSection";
import ProductBredCrumbs from "@/app/components/main-ui/ProductBredCrumbs";
import PrdHeroBannerSection from "@/app/components/main-ui/PrdHeroBannerSection";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Brands",
    description: "PLC automation spare parts supplier",
};

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
}

export default async function Brands({ params }: Props) {
    const { brand } = await params;
    let categories: Categories[] = [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/slugs?slug=${brand}`, { cache: "no-store" });

        if (!res.ok) {
            notFound();
        }
        categories = await res.json();
        if (!categories || categories.length === 0) {
            notFound();
        }
    } catch (error) {
        notFound();
    }
    const category_id: number | null = categories?.[0]?.category_id ?? null;
    const formattedBrand = categories?.[0].cat_name || "";
    const description = categories?.[0].cat_desc || "";

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
            <ProductAboutSection products={{ title: formattedBrand, description: description }} />
            <BrandDetailProduct cat_id={category_id} />
            <PrdHeroBannerSection />
            <ContactUsSection />
        </main>
    );
}