import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, ExternalLink, Code, Download } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --red: #D91C1C;
    --red-bright: #FF2222;
    --black: #080808;
    --dark2: #161616;
    --border: rgba(255,255,255,0.07);
    --border-red: rgba(217,28,28,0.3);
    --text: #EFEFEF;
    --muted: #888;
    --white: #fff;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    overflow-x: hidden;
    cursor: none;
  }

  /* ── CURSOR — minimal dot + slow trailing ring ── */
  .fv-cursor {
    position: fixed;
    width: 7px; height: 7px;
    background: var(--red);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s;
  }
  .fv-cursor-ring {
    position: fixed;
    width: 30px; height: 30px;
    border: 1px solid rgba(217,28,28,0.4);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: width 0.25s, height 0.25s, border-color 0.25s;
  }
  .fv-cursor.big   { width: 11px; height: 11px; }
  .fv-cursor-ring.big { width: 44px; height: 44px; border-color: rgba(217,28,28,0.65); }

  /* ── NAV ── */
  .fv-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 3rem;
    background: rgba(8,8,8,0.92);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }
  .fv-nav-logo {
    display: flex; align-items: center; gap: 0.7rem;
    text-decoration: none;
  }
  .fv-nav-logo:hover .fv-logo-svg { filter: drop-shadow(0 0 6px rgba(217,28,28,0.5)); }
  .fv-nav-wordmark {
    font-family: 'Bebas Neue', cursive;
    font-size: 1rem; letter-spacing: 0.2em;
    color: var(--white); line-height: 1;
  }
  .fv-nav-wordmark small {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 0.48rem; letter-spacing: 0.28em;
    color: var(--muted); font-weight: 400; margin-top: 2px;
  }
  .fv-nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .fv-nav-links a {
    font-size: 0.76rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--muted); text-decoration: none; transition: color 0.2s;
  }
  .fv-nav-links a:hover { color: var(--red); }
  .fv-nav-cta {
    font-size: 0.76rem; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.55rem 1.4rem; background: var(--red); color: white;
    text-decoration: none; font-weight: 500; transition: background 0.2s;
  }
  .fv-nav-cta:hover { background: var(--red-bright); }

  /* ── HERO ── */
  .fv-hero {
    min-height: 100vh; display: flex; align-items: center;
    position: relative; overflow: hidden; padding: 8rem 3rem 4rem;
  }
  .fv-hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 70% 50%, rgba(217,28,28,0.08) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 20% 80%, rgba(217,28,28,0.05) 0%, transparent 60%);
    pointer-events: none;
  }
  .fv-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 60px 60px; pointer-events: none;
  }
  /* large watermark logo */
  .fv-hero-watermark {
    position: absolute; right: -2rem; top: 50%;
    transform: translateY(-50%);
    opacity: 0.038; pointer-events: none; user-select: none;
  }
  .fv-hero-content { position: relative; z-index: 2; max-width: 780px; }
  .fv-eyebrow {
    display: inline-flex; align-items: center; gap: 0.75rem;
    font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--red); margin-bottom: 1.5rem; font-weight: 500;
    animation: fvFadeUp 0.7s 0.1s both;
  }
  .fv-eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--red); }
  .fv-hero-name {
    font-family: 'Bebas Neue', cursive;
    font-size: clamp(4rem, 10vw, 8.5rem);
    line-height: 0.9; letter-spacing: 0.02em; color: var(--white);
    margin-bottom: 1.5rem; animation: fvFadeUp 0.7s 0.2s both;
  }
  .fv-hero-name .red { color: var(--red); }
  .fv-hero-role {
    font-size: clamp(0.85rem, 1.4vw, 1rem); color: var(--muted);
    letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 2.5rem;
    animation: fvFadeUp 0.7s 0.3s both;
  }
  .fv-hero-desc {
    font-size: clamp(1rem, 1.4vw, 1.15rem); line-height: 1.75;
    color: rgba(239,239,239,0.68); max-width: 510px; margin-bottom: 3rem;
    animation: fvFadeUp 0.7s 0.4s both;
  }
  .fv-actions { display: flex; gap: 1rem; align-items: center; animation: fvFadeUp 0.7s 0.5s both; }
  .fv-btn-primary {
    padding: 0.85rem 2.4rem; background: var(--red); color: white;
    text-decoration: none; font-size: 0.8rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; transition: background 0.25s;
  }
  .fv-btn-primary:hover { background: var(--red-bright); }
  .fv-btn-secondary {
    padding: 0.85rem 2.4rem; border: 1px solid rgba(255,255,255,0.15);
    color: var(--text); text-decoration: none; font-size: 0.8rem;
    font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.25s;
  }
  .fv-btn-secondary:hover { border-color: var(--red); color: var(--red); }
  .fv-available {
    display: inline-flex; align-items: center; gap: 0.5rem;
    margin-top: 4rem; font-size: 0.78rem; color: var(--muted);
    animation: fvFadeUp 0.7s 0.6s both;
  }
  .fv-dot {
    width: 6px; height: 6px; background: #22c55e; border-radius: 50%;
    animation: fvPulse 2s ease-in-out infinite;
  }

  /* ── STATS ── */
  .fv-stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  }
  .fv-stat {
    padding: 2.5rem 3rem; border-right: 1px solid var(--border);
    position: relative; overflow: hidden; transition: background 0.3s;
  }
  .fv-stat:last-child { border-right: none; }
  .fv-stat::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: var(--red); transform: scaleX(0); transition: transform 0.3s ease; transform-origin: left;
  }
  .fv-stat:hover { background: rgba(217,28,28,0.04); }
  .fv-stat:hover::after { transform: scaleX(1); }
  .fv-stat-num { font-family: 'Bebas Neue', cursive; font-size: 2.8rem; color: var(--white); letter-spacing: 0.02em; line-height: 1; margin-bottom: 0.4rem; }
  .fv-stat-num span { color: var(--red); }
  .fv-stat-label { font-size: 0.75rem; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; }

  /* ── SECTIONS ── */
  .fv-section { padding: 7rem 3rem; }
  .fv-section-alt { background: var(--dark2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .fv-section-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 5rem; }
  .fv-section-tag { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--red); font-weight: 500; writing-mode: vertical-rl; transform: rotate(180deg); }
  .fv-section-title { font-family: 'Bebas Neue', cursive; font-size: clamp(2.8rem, 6vw, 5rem); color: var(--white); letter-spacing: 0.02em; line-height: 0.9; }
  .fv-section-divider { flex: 1; height: 1px; background: linear-gradient(to right, var(--border-red), transparent); }

  /* ── PROJECTS ── */
  .fv-projects-grid { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--border); }
  .fv-project-card {
    padding: 3rem; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border);
    position: relative; overflow: hidden; transition: background 0.3s;
  }
  .fv-project-card:nth-child(even) { border-right: none; }
  .fv-project-card:nth-last-child(-n+2) { border-bottom: none; }
  .fv-project-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 0;
    background: var(--red); transition: height 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .fv-project-card:hover { background: rgba(217,28,28,0.03); }
  .fv-project-card:hover::before { height: 100%; }
  .fv-project-ghost { font-family: 'Bebas Neue', cursive; font-size: 4.5rem; color: rgba(217,28,28,0.07); line-height: 1; letter-spacing: -0.02em; margin-bottom: -0.5rem; }
  .fv-project-badge { display: inline-block; font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--red); border: 1px solid var(--border-red); padding: 0.18rem 0.55rem; margin-bottom: 1rem; }
  .fv-project-title { font-family: 'Bebas Neue', cursive; font-size: 1.85rem; letter-spacing: 0.04em; color: var(--white); margin-bottom: 1rem; line-height: 1; }
  .fv-project-desc { font-size: 0.9rem; line-height: 1.72; color: var(--muted); margin-bottom: 1.5rem; }
  .fv-tech-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 2rem; }
  .fv-tech-tag { font-family: 'DM Mono', monospace; font-size: 0.66rem; padding: 0.22rem 0.55rem; background: rgba(255,255,255,0.04); border: 1px solid var(--border); color: var(--muted); letter-spacing: 0.05em; }
  .fv-project-links { display: flex; gap: 1.5rem; align-items: center; }
  .fv-plink { font-size: 0.76rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text); text-decoration: none; display: flex; align-items: center; gap: 0.45rem; transition: color 0.2s; }
  .fv-plink:hover { color: var(--red); }
  .fv-plink-main { color: var(--red); border-bottom: 1px solid rgba(217,28,28,0.35); padding-bottom: 2px; }
  .fv-plink-main:hover { color: var(--red-bright); }

  /* ── ABOUT ── */
  .fv-about-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
  .fv-about-text p { font-size: 1.1rem; line-height: 1.82; color: rgba(239,239,239,0.68); margin-bottom: 1.5rem; }
  .fv-about-text strong { color: var(--white); font-weight: 500; }
  .fv-skills-label { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--red); margin-bottom: 1.2rem; font-weight: 500; }
  .fv-skills-grid { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--border); }
  .fv-skill { padding: 1.1rem 1.4rem; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); font-family: 'DM Mono', monospace; font-size: 0.76rem; color: var(--muted); letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
  .fv-skill:nth-child(even) { border-right: none; }
  .fv-skill:nth-last-child(-n+2) { border-bottom: none; }
  .fv-skill:hover { background: rgba(217,28,28,0.05); color: var(--text); }
  .fv-skill::before { content: '//'; color: var(--red); font-size: 0.68rem; }

  /* ── CONTACT ── */
  .fv-contact { background: var(--dark2); border-top: 1px solid var(--border); padding: 7rem 3rem; position: relative; overflow: hidden; }
  .fv-contact::before { content: 'CONTACT'; position: absolute; right: -1rem; top: 50%; transform: translateY(-50%); font-family: 'Bebas Neue', cursive; font-size: clamp(8rem, 18vw, 16rem); color: rgba(217,28,28,0.04); letter-spacing: -0.02em; pointer-events: none; user-select: none; white-space: nowrap; }
  .fv-contact-inner { position: relative; z-index: 2; max-width: 680px; }
  .fv-contact-headline { font-family: 'Bebas Neue', cursive; font-size: clamp(2.5rem, 5vw, 4.5rem); color: var(--white); line-height: 1; margin-bottom: 1.5rem; }
  .fv-contact-headline span { color: var(--red); }
  .fv-contact-sub { font-size: 1rem; color: var(--muted); margin-bottom: 4rem; line-height: 1.7; }
  .fv-contact-list { display: flex; flex-direction: column; border: 1px solid var(--border); }
  .fv-clink { display: flex; align-items: center; gap: 1.5rem; padding: 1.4rem 2rem; border-bottom: 1px solid var(--border); text-decoration: none; color: var(--text); transition: all 0.25s; position: relative; overflow: hidden; }
  .fv-clink:last-child { border-bottom: none; }
  .fv-clink::before { content: ''; position: absolute; inset: 0; background: rgba(217,28,28,0.06); transform: translateX(-100%); transition: transform 0.3s ease; }
  .fv-clink:hover::before { transform: translateX(0); }
  .fv-clink:hover .fv-clink-icon { background: var(--red); color: white; }
  .fv-clink-icon { width: 36px; height: 36px; background: rgba(217,28,28,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.25s; color: var(--red); }
  .fv-clink-label { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 0.2rem; }
  .fv-clink-value { font-size: 0.92rem; font-weight: 400; }
  .fv-clink-arrow { margin-left: auto; color: var(--red); font-size: 1.1rem; transition: transform 0.25s; }
  .fv-clink:hover .fv-clink-arrow { transform: translateX(4px); }

  /* ── FOOTER ── */
  .fv-footer { padding: 1.75rem 3rem; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: var(--black); }
  .fv-footer-left { display: flex; align-items: center; gap: 0.75rem; }
  .fv-footer-text { font-size: 0.73rem; color: rgba(136,136,136,0.45); }
  .fv-footer-mark { font-family: 'Bebas Neue', cursive; font-size: 1rem; color: rgba(217,28,28,0.35); letter-spacing: 0.15em; }

  /* ── ANIMATIONS ── */
  @keyframes fvFadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fvPulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.5); } }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .fv-nav { padding: 1rem 1.5rem; }
    .fv-nav-links { display: none; }
    .fv-hero { padding: 7rem 1.5rem 3rem; }
    .fv-hero-watermark { display: none; }
    .fv-stats { grid-template-columns: 1fr 1fr; }
    .fv-stat:nth-child(2) { border-right: none; }
    .fv-section { padding: 5rem 1.5rem; }
    .fv-projects-grid { grid-template-columns: 1fr; }
    .fv-project-card { border-right: none; }
    .fv-about-inner { grid-template-columns: 1fr; gap: 3rem; }
    .fv-contact { padding: 5rem 1.5rem; }
    .fv-footer { padding: 1.5rem; flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`;

const SKILLS = [
  "React / Next.js", "Node.js", "TypeScript", "MongoDB",
  "WebSockets", "WebRTC", "Redis", "JWT Auth", "REST APIs", "Docker",
];

/* ─────────────────────────────────────────────────────────
   AF LOGO COMPONENT
   Redrawn from the uploaded shield/arch mark:
   • Arch top with bracket-style side gaps
   • Geometric A inside with upward arrow from apex
   • Sharp chevron at bottom
   All pure SVG paths — no font, scales perfectly
───────────────────────────────────────────────────────── */
function AFLogo({ size = 40, color = "#EFEFEF", accent = "#D91C1C", sw = 2.2 }) {
  return (
    <svg
      className="fv-logo-svg"
      width={size}
      height={size * 1.1}
      viewBox="0 0 100 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: "filter 0.3s" }}
    >
      {/* ── Left vertical leg ── */}
      <line x1="15" y1="46" x2="15" y2="84" stroke={color} strokeWidth={sw} strokeLinecap="square"/>
      {/* ── Right vertical leg ── */}
      <line x1="85" y1="46" x2="85" y2="84" stroke={color} strokeWidth={sw} strokeLinecap="square"/>
      {/* ── Bottom chevron point ── */}
      <polyline points="15,84 50,104 85,84" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter"/>

      {/* ── Arch — top semicircle ── */}
      <path d="M15,46 A35,35 0 0,1 85,46" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="square"/>

      {/* ── Bracket notch gaps on arch sides (red accent ticks) ── */}
      <line x1="13" y1="46" x2="17" y2="46" stroke={accent} strokeWidth={sw + 1} strokeLinecap="square"/>
      <line x1="83" y1="46" x2="87" y2="46" stroke={accent} strokeWidth={sw + 1} strokeLinecap="square"/>

      {/* ── A: left leg ── */}
      <line x1="33" y1="82" x2="50" y2="34" stroke={color} strokeWidth={sw} strokeLinecap="square"/>
      {/* ── A: right leg ── */}
      <line x1="67" y1="82" x2="50" y2="34" stroke={color} strokeWidth={sw} strokeLinecap="square"/>
      {/* ── A: crossbar (red) ── */}
      <line x1="38" y1="64" x2="62" y2="64" stroke={accent} strokeWidth={sw} strokeLinecap="square"/>

      {/* ── Arrow shaft upward from A apex ── */}
      <line x1="50" y1="34" x2="50" y2="16" stroke={accent} strokeWidth={sw} strokeLinecap="square"/>
      {/* ── Arrow head left ── */}
      <line x1="50" y1="16" x2="43" y2="25" stroke={accent} strokeWidth={sw} strokeLinecap="square"/>
      {/* ── Arrow head right ── */}
      <line x1="50" y1="16" x2="57" y2="25" stroke={accent} strokeWidth={sw} strokeLinecap="square"/>
    </svg>
  );
}

export default function App() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  const mousePos  = useRef({ x: 0, y: 0 });
  const ringPos   = useRef({ x: 0, y: 0 });
  const rafRef    = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring   = ringRef.current;
    if (!cursor || !ring) return;

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = e.clientX + "px";
      cursor.style.top  = e.clientY + "px";
    };
    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.1;
      ring.style.left = ringPos.current.x + "px";
      ring.style.top  = ringPos.current.y + "px";
      rafRef.current = requestAnimationFrame(animate);
    };
    const onEnter = () => { cursor.classList.add("big"); ring.classList.add("big"); };
    const onLeave = () => { cursor.classList.remove("big"); ring.classList.remove("big"); };

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);
    document.querySelectorAll("a, button, .fv-project-card, .fv-stat, .fv-skill").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Cursor */}
      <div className="fv-cursor" ref={cursorRef} />
      <div className="fv-cursor-ring" ref={ringRef} />

      {/* NAV */}
      <nav className="fv-nav">
        <a href="#" className="fv-nav-logo">
          <AFLogo size={36} color="#EFEFEF" accent="#D91C1C" sw={2.4} />
          <div className="fv-nav-wordmark">
            FAVAZ KM
            <small>SOFTWARE DEVELOPER</small>
          </div>
        </a>
        <ul className="fv-nav-links">
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="fv-nav-cta">Hire Me</a>
      </nav>

      {/* HERO */}
      <section className="fv-hero" id="home">
        <div className="fv-hero-bg" />
        <div className="fv-hero-grid" />
        {/* Large watermark behind content */}
        <div className="fv-hero-watermark">
          <AFLogo size={560} color="#D91C1C" accent="#D91C1C" sw={0.8} />
        </div>
        <div className="fv-hero-content">
          <div className="fv-eyebrow">Software Developer · MERN Stack</div>
          <h1 className="fv-hero-name">
            AHAMMED<br />
            <span className="red">FAVAZ</span><br />
            KM
          </h1>
          <p className="fv-hero-role">Building Systems That Work in Production</p>
          <p className="fv-hero-desc">
            I build production-ready web applications with a strong focus on backend systems,
            real-time features, and clean architecture — delivering apps used by real users.
          </p>
          <div className="fv-actions">
            <a href="#projects" className="fv-btn-primary">View Projects</a>
            <a href="#contact" className="fv-btn-secondary">Contact Me</a>
          </div>
          <div className="fv-available">
            <div className="fv-dot" />
            Available for full-time &amp; freelance
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="fv-stats">
        {[
          { num: "1", accent: "+", label: "Years Experience" },
          { num: "250", accent: "+", label: "Daily Active Users" },
          { num: "Full", accent: "—", label: "Stack Ownership" },
          { num: "Live", accent: ".", label: "Production Deployments" },
        ].map(({ num, accent, label }) => (
          <div className="fv-stat" key={label}>
            <div className="fv-stat-num">{num}<span>{accent}</span></div>
            <div className="fv-stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* PROJECTS */}
      <section className="fv-section" id="projects">
        <div className="fv-section-header">
          <div className="fv-section-tag">Work</div>
          <h2 className="fv-section-title">Featured<br />Projects</h2>
          <div className="fv-section-divider" />
        </div>
        <div className="fv-projects-grid">
          <div className="fv-project-card">
            <div className="fv-project-ghost">01</div>
            <div className="fv-project-badge">Live · Production</div>
            <h3 className="fv-project-title">Local Café Queue &amp; Status Management</h3>
            <p className="fv-project-desc">
              Production system built for a high-traffic café handling 250+ daily users,
              with live queue tracking and real-time status updates.
            </p>
            <div className="fv-tech-stack">
              {["Next.js", "Google API", "Real-time"].map(t => <span className="fv-tech-tag" key={t}>{t}</span>)}
            </div>
            <div className="fv-project-links">
              <a href="https://chai-couple-chafe.vercel.app" target="_blank" rel="noopener noreferrer" className="fv-plink fv-plink-main">
                <ExternalLink size={13} /> Live Demo
              </a>
              <a href="https://github.com/javaadde/order-table" target="_blank" rel="noopener noreferrer" className="fv-plink">
                <Code size={13} /> Source
              </a>
            </div>
          </div>
          <div className="fv-project-card">
            <div className="fv-project-ghost">02</div>
            <div className="fv-project-badge">In Progress</div>
            <h3 className="fv-project-title">Confero — Networking Platform</h3>
            <p className="fv-project-desc">
              Professional networking and real-time communication platform focused on scalable
              backend architecture — JWT auth, WebRTC video, WebSocket messaging.
            </p>
            <div className="fv-tech-stack">
              {["Node.js", "TypeScript", "MongoDB", "WebRTC", "Redis"].map(t => <span className="fv-tech-tag" key={t}>{t}</span>)}
            </div>
            <div className="fv-project-links">
              <a href="https://github.com/devxtra-community/confero" target="_blank" rel="noopener noreferrer" className="fv-plink fv-plink-main">
                <Code size={13} /> Source Code
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="fv-section fv-section-alt" id="about">
        <div className="fv-section-header">
          <div className="fv-section-tag">Bio</div>
          <h2 className="fv-section-title">About<br />Me</h2>
          <div className="fv-section-divider" />
        </div>
        <div className="fv-about-inner">
          <div className="fv-about-text">
            <p>I'm a software developer focused on building systems that work in <strong>real production environments</strong>, not just demo projects. Currently working as a MERN Stack Developer (Apprenticeship).</p>
            <p>I care about <strong>backend design, performance</strong>, and writing maintainable code that scales as products grow.</p>
            <p>Open to both <strong>full-time roles</strong> and freelance opportunities where I can contribute meaningfully from day one.</p>
          </div>
          <div>
            <div className="fv-skills-label">Tech Arsenal</div>
            <div className="fv-skills-grid">
              {SKILLS.map(s => <div className="fv-skill" key={s}>{s}</div>)}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="fv-contact" id="contact">
        <div className="fv-contact-inner">
          <h2 className="fv-contact-headline">LET'S BUILD<br /><span>SOMETHING.</span></h2>
          <p className="fv-contact-sub">No contact forms. Simple and direct.</p>
          <div className="fv-contact-list">
            <a href="mailto:favazkoppath10@gmail.com" className="fv-clink">
              <div className="fv-clink-icon"><Mail size={16} /></div>
              <div><span className="fv-clink-label">Email</span><span className="fv-clink-value">favazkoppath10@gmail.com</span></div>
              <span className="fv-clink-arrow">→</span>
            </a>
            <a href="https://www.linkedin.com/in/favazmubarak" target="_blank" rel="noopener noreferrer" className="fv-clink">
              <div className="fv-clink-icon"><Linkedin size={16} /></div>
              <div><span className="fv-clink-label">LinkedIn</span><span className="fv-clink-value">linkedin.com/in/favazmubarak</span></div>
              <span className="fv-clink-arrow">→</span>
            </a>
            <a href="https://github.com/Favazmubarak" target="_blank" rel="noopener noreferrer" className="fv-clink">
              <div className="fv-clink-icon"><Github size={16} /></div>
              <div><span className="fv-clink-label">GitHub</span><span className="fv-clink-value">github.com/Favazmubarak</span></div>
              <span className="fv-clink-arrow">→</span>
            </a>
            <a href="/AHMD CV.pdf" download="AHAMMED FAVAZ SOFTWARE-DEVELOPER CV.pdf" className="fv-clink">
              <div className="fv-clink-icon"><Download size={16} /></div>
              <div><span className="fv-clink-label">Resume</span><span className="fv-clink-value">Download CV</span></div>
              <span className="fv-clink-arrow">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fv-footer">
        <div className="fv-footer-left">
          <AFLogo size={22} color="rgba(136,136,136,0.25)" accent="rgba(217,28,28,0.35)" sw={2} />
          <span className="fv-footer-text">© 2025 Ahammed Favaz KM — Full portfolio in progress.</span>
        </div>
        <span className="fv-footer-mark">FAVAZ.DEV</span>
      </footer>
    </>
  );
}