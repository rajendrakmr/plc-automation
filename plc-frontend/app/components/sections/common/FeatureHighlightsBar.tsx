export default function FeatureHighlightsBar() {
  const items = [
    {
      icon: "📅",
      title: "12-month warranty",
    },
    {
      icon: "🚚",
      title: "Immediate dispatch",
    },
    {
      icon: "🌐",
      title: "Global delivery",
    },
  ];

  return (
   <section className="feature-bar">
  <div className="feature-bar-container">

    <div className="feature-item">
      <div className="feature-icon">📅</div>
      <span className="feature-text">
        12-month warranty
      </span>
    </div>

    <div className="feature-item">
      <div className="feature-icon">🚚</div>
      <span className="feature-text">
        Immediate dispatch
      </span>
    </div>

    <div className="feature-item">
      <div className="feature-icon">🌐</div>
      <span className="feature-text">
        Global delivery
      </span>
    </div>

  </div>
</section>
  );
}
