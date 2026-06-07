import Image from "next/image";

export default function FeatureHighlightsBar() {
  const items = [
    {
      icon: "/assets/Icons/calendar-plcautomationgroup.png",
      title: "12-month warranty",
    },
    {
      icon: "/assets/Icons/delivery-plcautomationgroup.png",
      title: "Immediate dispatch",
    },
    {
      icon: "/assets/Icons/globus-plcautomationgroup.png",
      title: "Global delivery",
    },
  ];

  return (
    <section className="section_grey_content">
      <div className="product-feature-bar">

        {items.map((item, index) => (
          <div className="feature-item" key={index}>
            
            <div className="feature-icon">
              <Image
                src={item.icon}
                alt={item.title}
                width={28}
                height={28}
              />
            </div>

            <span className="feature-text">
              {item.title}
            </span>

          </div>
        ))}

      </div>
    </section>
  );
}