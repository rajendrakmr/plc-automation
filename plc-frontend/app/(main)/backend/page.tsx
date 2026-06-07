
export const metadata = {
  title: "Home",
  description: "PLC automation spare parts supplier",
};

export default function Login() {
  return (
    <main> 
      <section className="section features-section">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <span className="section-tag" style={{ 'color': 'var(--orange)' }}>
                Why Choose
              </span>
              <h2 className="section-title" style={{ 'color': 'white' }}>
                PLC Automation Group?
              </h2>
              <p className="section-sub" style={{ 'color': 'rgba(255,255,255,0.6)' }}>
                16+ years of expertise in industrial automation sourcing across India and globally.
              </p>
            </div>
          </div>
          <div className="features-grid">
            <div className="feat-card">
              <div className="feat-num">
                99.2%
              </div>
              <h3>
                Genuine Parts Rate
              </h3>
              <p>
                Every part is tested and verified. Counterfeit-free guarantee or full refund — no questions asked.
              </p>
            </div>
            <div className="feat-card">
              <div className="feat-num">
                24h
              </div>
              <h3>
                Emergency Sourcing
              </h3>
              <p>
                Production line down? Our emergency team works around the clock to find your critical parts fast.
              </p>
            </div>
            <div className="feat-card">
              <div className="feat-num">
                500+
              </div>
              <h3>
                Global Brands
              </h3>
              <p>
                If it runs on electricity and controls a machine, we can source it — new, obsolete, or discontinued.
              </p>
            </div>
            <div className="feat-card">
              <div className="feat-num">
                15K+
              </div>
              <h3>
                Satisfied Clients
              </h3>
              <p>
                From small workshops to Fortune 500 plants — trusted by India's leading manufacturers.
              </p>
            </div>
            <div className="feat-card">
              <div className="feat-num">
                3x
              </div>
              <h3>
                Faster than OEM
              </h3>
              <p>
                Our global supplier network means we find obsolete parts 3x faster than going to the original manufacturer.
              </p>
            </div>
            <div className="feat-card">
              <div className="feat-num">
                12mo
              </div>
              <h3>
                Parts Warranty
              </h3>
              <p>
                All parts carry a minimum 12-month warranty. Repaired units come with full post-repair test certificates.
              </p>
            </div>
          </div>
        </div>
      </section> 
    </main>
  );
}