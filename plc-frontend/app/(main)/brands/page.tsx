import "@/app/components/css/product.css";
import BrandProductList from "@/app/components/BrandProductList";
import FeatureHighlightsBar from "@/app/components/FeatureHighlightsBar";
import ContactUsSection from "@/app/components/ContactUsSection";
import BrandsManufactureSection from "@/app/components/main-ui/BrandsManufactureSection";
import BrandsDirectory from "@/app/components/BrandsDirectory";
import ProductBredCrumbs from "@/app/components/main-ui/ProductBredCrumbs"; 
import PrdHeroBannerSection from "@/app/components/main-ui/PrdHeroBannerSection";
import TrustBadgeSection from "@/app/components/main-ui/TrustBadgeSection";

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

  return (
    <main>
      <FeatureHighlightsBar />
      <ProductBredCrumbs
        title={brandName}
        bgImage="/assets/engineering-services-4.jpg"
        items={[
          {
            label: "Home",
            link: "/",
          },
          {
            label: "Manufacturers",
            link: "/brands",
          },
        ]}
      />
      <BrandsManufactureSection /> 
      <BrandProductList />
      <section className="section_white_content">
        <div className="section_container mmp-container ">
          <div className="mmp-content">
            <h2 className="mmp-title">
              Manufacturing Made Possible
            </h2>

            <p className="mmp-desc">
              At EU Automation we specialise in the procurement of essential and
              hard-to-find automation components required to keep the manufacturing
              world turning.
            </p>

            <p className="mmp-desc">
              We will find and deliver the parts you need, regardless of their age,
              scarcity or location, to get your facility back up and running swiftly.
            </p> 
            <div className="mmp-features">
               <TrustBadgeSection />
            </div>
          </div>

          {/* RIGHT */}
          <div className="mmp-video-wrap">
            <div className="mmp-video-circle">
              <video
                className="mmp-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source
                  src="/assets/plc_automation/plcautomation-animation-video.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </section>
      <PrdHeroBannerSection />
      <ContactUsSection />
    </main>
  );
}

