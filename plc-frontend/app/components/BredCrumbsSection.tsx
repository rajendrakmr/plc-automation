type BreadcrumbItem = {
  label: string;
  link?: string;
};

type BreadcrumbProps = {
  title: string;
  items: BreadcrumbItem[];
  bgImage: string;
  cl?: string;
};

const BreadCrumbsSection: React.FC<BreadcrumbProps> = ({ title, items, bgImage, cl = "section_grey_content" }) => {
  return (
    <section className={`${cl} `}>
      <div className="section_container bredcrumbs">
        <div className="breadcrumb-inner bred-crumb-section" >
          <div className="breadcrumb-path">
            {items.map((item, index) => (
              <span key={index} className="breadcrumb-item">
                {item.link ? (
                  <a href={item.link}>{item.label}</a>
                ) : (
                  <span className="active">{item.label}</span>
                )}

                {index < items.length - 1 && (
                  <span className="separator"> / </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbsSection;