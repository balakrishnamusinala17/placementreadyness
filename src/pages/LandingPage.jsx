import { useNavigate } from "react-router-dom";
import { Code2, Video, BarChart3 } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="app-root">
      <header className="landing-header">
        <div className="landing-logo">Placement Readiness</div>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero-content">
            <h1 className="landing-hero-heading">Ace Your Placement</h1>
            <p className="landing-hero-subheading">
              Practice, assess, and prepare for your dream job with structured,
              realistic preparation flows.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </section>

        <section className="landing-features">
          <h2 className="section-title">Everything you need to get ready</h2>
          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-icon">
                <Code2 aria-hidden="true" />
              </div>
              <h3 className="feature-title">Practice Problems</h3>
              <p className="feature-body">
                Solve curated coding challenges that mirror real interviews.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">
                <Video aria-hidden="true" />
              </div>
              <h3 className="feature-title">Mock Interviews</h3>
              <p className="feature-body">
                Rehearse end-to-end interview rounds in a safe environment.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">
                <BarChart3 aria-hidden="true" />
              </div>
              <h3 className="feature-title">Track Progress</h3>
              <p className="feature-body">
                See where you stand and where to focus next, at a glance.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p className="footer-text">
          © {new Date().getFullYear()} Placement Readiness. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

