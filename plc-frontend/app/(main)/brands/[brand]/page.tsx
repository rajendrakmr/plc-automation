import BreadCrumb from "@/app/components/sections/BreadCrumb";
import "@/app/components/css/product.css";
import BrandProductList from "@/app/components/BrandProductList";
import FeatureHighlightsBar from "@/app/components/FeatureHighlightsBar";
import ContactUsSection from "@/app/components/ContactUsSection";
import ProductAboutSection from "@/app/components/ProductAboutSection";
import ProductBredCrumbs from "@/app/components/main-ui/ProductBredCrumbs";

export const metadata = {
    title: "Brands",
    description: "PLC automation spare parts supplier",
};

type Props = {
    params: Promise<{
        brand: string;
    }>;
};

export default async function Brands({
    params,
}: Props) {
    const { brand } = await params;

    const brandName = decodeURIComponent(brand);
const formattedBrand =
  brandName.charAt(0).toUpperCase() +
  brandName.slice(1).toLowerCase();
    return (
        <main>
            <FeatureHighlightsBar />
            <ProductBredCrumbs
                title={formattedBrand}
                bgImage="/assets/engineering-services-4.jpg"
                items={[
                    {
                        label: "Home",
                        link: "/",
                    },
                    {
                        label: "Brands",
                        link: "/brands",
                    },
                    {
                        label: formattedBrand,
                    },
                ]}
            />
            <ProductAboutSection products={{ title: formattedBrand, description: "" }} />

            <BrandProductList />

            <ContactUsSection />
        </main>
    );
}