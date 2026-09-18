import { FaTiktok, FaYoutube } from "react-icons/fa";

function Resources() {
  return (
    <>
      <header className="header">
        <h1>Resources</h1>
        <p>Useful apps and fitness creators for training and nutrition.</p>
      </header>

      <section className="card resources-card">
        <h2>🔗 Recommended Resources</h2>

        <div className="resources-grid">
          <div className="resource-group">
            <h3>📱 Tracking Apps</h3>

            <a
              href="https://www.hevyapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              🏋️ Hevy
              <span>Workout & strength tracking</span>
            </a>

            <a
              href="https://apps.apple.com/au/app/stupid-simple-macro-tracker/id1210995590"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              🍚 Stupid Simple Macro Tracker
              <span>Calories & macro tracking</span>
            </a>
          </div>

          <div className="resource-group">
            <h3>▶️ Fitness Creators</h3>

            <div className="creator-section">
              <h4>🏋️ Training & Overall Fitness</h4>

              <div className="creator-list">
                <a
                  href="https://www.youtube.com/@sam_sulek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="creator-link"
                >
                  <strong>💪 Sam Sulek</strong>

                  <span className="platform">
                    <FaYoutube />
                    YouTube
                  </span>

                  <small>
                    Training, bodybuilding and general fitness content
                  </small>
                </a>

                <a
                  href="https://www.tiktok.com/@jacoboestreichercoaching?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="creator-link"
                >
                  <strong>🏋️ Jacob Oestricher</strong>

                  <span className="platform">
                    <FaTiktok />
                    TikTok
                  </span>

                  <small>
                    Training, physique development and general fitness content
                  </small>
                </a>
              </div>

              <h4>🥗 Diet & Cutting</h4>

              <div className="creator-list">
                <a
                  href="https://www.youtube.com/@AlexGamble"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="creator-link"
                >
                  <strong>🥗 Alex Gamble</strong>

                  <span className="platform">
                    <FaYoutube />
                    YouTube
                  </span>

                  <small>
                    Dieting, cutting tips and practical nutrition strategies
                  </small>
                </a>

                <a
                  href="https://www.tiktok.com/@lmtlsstraining"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="creator-link"
                >
                  <strong>✂️ Chris LMTT</strong>

                  <span className="platform">
                    <FaTiktok />
                    TikTok
                  </span>

                  <small>
                    Cutting, calorie management and dieting techniques
                  </small>
                </a>
              </div>

              <p className="creator-disclaimer">
                Creator recommendations are for general fitness content and
                entertainment, not individualized medical or nutrition advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Resources;