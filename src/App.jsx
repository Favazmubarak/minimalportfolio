import React from "react";
import { Github, Linkedin, Mail, ExternalLink, Code } from "lucide-react";

function App() {
  return (
    <div className="portfolio">
      <main className="container">
        <section className="hero">
          <h1 className="accent">AHAMMED FAVAZ KM</h1>
          <h2
            style={{
              marginTop: "0.5rem",
              marginBottom: "2rem",
              color: "var(--text-primary)",
            }}
          >
            Software Developer
          </h2>

          <div
            className="hero-description"
            style={{ maxWidth: "600px", marginBottom: "3rem" }}
          >
            <p
              style={{
                fontSize: "1.2rem",
                marginBottom: "1.5rem",
                color: "var(--text-primary)",
              }}
            >
              I build production-ready web applications with a strong focus on
              backend systems, real-time features, and clean architecture.
            </p>
            <p>
              Currently working as a MERN Stack Developer (Apprenticeship),
              delivering applications used by real users.
            </p>
          </div>

          <div className="cta-group" style={{ display: "flex", gap: "1rem" }}>
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>
          </div>

          <div className="launch-status" style={{ marginTop: "4rem" }}>
            <span className="status-text">Portfolio launching soon</span>
          </div>
        </section>

        <section className="credibility">
          <div
            className="grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
            }}
          >
            <div className="point">
              <h3>2+ Years</h3>
              <p>Hands-on coding experience</p>
            </div>
            <div className="point">
              <h3>Full-stack</h3>
              <p>Ownership from frontend to backend</p>
            </div>
            <div className="point">
              <h3>Production</h3>
              <p>Real-world applications with live users</p>
            </div>
            <div className="point">
              <h3>Scalable</h3>
              <p>Experience with auth, real-time, and deployments</p>
            </div>
          </div>
        </section>

        <section id="projects" className="projects">
          <span className="badge">Featured Projects</span>

          <div
            className="project-list"
            style={{ display: "flex", flexDirection: "column", gap: "4rem" }}
          >
            <article className="project-card">
              <div
                className="project-header"
                style={{ marginBottom: "1.5rem" }}
              >
                <h3 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
                  Local Café Queue & Status Management System
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    marginTop: "0.5rem",
                  }}
                >
                  {["Nextjs", "Google API"].map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "0.8rem",
                        padding: "0.2rem 0.6rem",
                        border: "1px solid var(--border-color)",
                        borderRadius: "2px",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
                Production system built for a high-traffic café handling over
                250 daily users, providing live queue tracking and real-time
                status updates.
              </p>
              <ul
                style={{
                  color: "var(--text-muted)",
                  marginBottom: "2rem",
                  listStyle: "disc",
                  paddingLeft: "1.5rem",
                }}
              >
                <li>Real-time customer-facing interface</li>
                <li>
                  Built to handle real traffic and operational constraints
                </li>
              </ul>
              <div
                className="project-links"
                style={{ display: "flex", gap: "1.5rem" }}
              >
                <a
                  href="https://chai-couple-chafe.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  <ExternalLink size={18} /> Live Link
                </a>
                <a
                  href="https://github.com/javaadde/order-table"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  <Code size={18} /> Source Code
                </a>
              </div>
            </article>

            <article className="project-card">
              <div
                className="project-header"
                style={{ marginBottom: "1.5rem" }}
              >
                <h3 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
                  Confero{" "}
                  <span
                    style={{
                      opacity: 0.5,
                      fontSize: "0.9rem",
                      fontWeight: 400,
                    }}
                  >
                    (In Progress)
                  </span>
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    marginTop: "0.5rem",
                  }}
                >
                  {[
                    "Node.js",
                    "TypeScript",
                    "MongoDB",
                    "WebRTC",
                    "Redis",
                  ].map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "0.8rem",
                        padding: "0.2rem 0.6rem",
                        border: "1px solid var(--border-color)",
                        borderRadius: "2px",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
                A professional networking and real-time communication platform
                focused on scalable backend architecture.
              </p>
              <ul
                style={{
                  color: "var(--text-muted)",
                  marginBottom: "2rem",
                  listStyle: "disc",
                  paddingLeft: "1.5rem",
                }}
              >
                <li>
                  Backend services for user profiles, connections, and discovery
                </li>
                <li>JWT-based authentication and role handling</li>
                <li>Real-time features using WebSockets and WebRTC</li>
                <li>
                  Emphasis on clean architecture and long-term scalability
                </li>
              </ul>
              <div
                className="project-links"
                style={{ display: "flex", gap: "1.5rem" }}
              >
                <a
                  href="https://github.com/devxtra-community/confero"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  <Code size={18} /> Source Code
                </a>
              </div>
            </article>
          </div>
        </section>

        <section id="about" className="about">
          <span className="badge">About</span>
          <div style={{ maxWidth: "700px" }}>
            <p
              style={{
                fontSize: "1.2rem",
                marginBottom: "1.5rem",
                color: "var(--text-primary)",
              }}
            >
              I’m a software developer focused on building systems that work in
              real production environments, not just demo projects.
            </p>
            <p style={{ fontSize: "1.1rem" }}>
              I care about backend design, performance, and writing maintainable
              code that scales as products grow. I’m open to both full-time
              roles and freelance opportunities.
            </p>
          </div>
        </section>

        <section
          id="contact"
          className="contact"
          style={{ borderTop: "1px solid var(--border-color)" }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Contact</h2>
          <p style={{ marginBottom: "3rem" }}>Simple and direct. No forms.</p>
          <div
            className="contact-links"
            style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem" }}
          >
            <a
              href="mailto:favazkoppath10@gmail.com"
              className="contact-item"
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <Mail className="accent" size={24} />
              <span>favazkoppath10@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/favazmubarak"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <Linkedin className="accent" size={24} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/Favazmubarak"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <Github className="accent" size={24} />
              <span>GitHub</span>
            </a>
          </div>
        </section>

        <footer
          style={{
            padding: "4rem 0",
            borderTop: "1px solid var(--border-color)",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
          }}
        >
          Full portfolio in progress.
        </footer>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .launch-status .status-text {
          font-size: 0.9rem;
          opacity: 0.7;
          animation: pulseFade 2.5s ease-in-out infinite;
          letter-spacing: 0.05em;
        }

        @keyframes pulseFade {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .project-card {
          padding-left: 1.5rem;
          border-left: 1px solid var(--border-color);
          transition: border-color 0.3s ease;
        }
        
        .project-card:hover {
          border-left-color: var(--accent-color);
        }

        .point h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .contact-item span {
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease;
        }

        .contact-item:hover span {
          border-bottom-color: var(--accent-color);
        }
      `,
        }}
      />
    </div>
  );
}

export default App;
