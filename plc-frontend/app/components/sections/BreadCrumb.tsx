type BreadcrumbItem = {
  label: string;
  link?: string;
};

type BreadcrumbProps = {
  title: string;
  items: BreadcrumbItem[];
  bgImage: string;
};

const BreadCrumb: React.FC<BreadcrumbProps> = ({ title, items, bgImage }) => {
  return (
    <section
      className="breadcrumb" 
    >
      <div className="breadcrumb-overlay" /> 
      <div className="breadcrumb-inner"> 
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
    </section>
  );
};

export default BreadCrumb;