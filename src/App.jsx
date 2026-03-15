import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, ExternalLink, Code, Download, ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   DESIGN SYSTEM — unified token set
   Merged from: Favaz red/black identity + parthh.in aesthetic DNA
───────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@1,400;1,500;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');

  :root {
    /* Core palette */
    --red:        #D91C1C;
    --red-bright: #FF2222;
    --red-halo:   rgba(217, 28, 28, 0.13);
    --red-dim:    rgba(217, 28, 28, 0.25);
    --black:      #080808;
    --dark2:      #0f0f0f;
    --dark3:      #141414;
    --border:     rgba(255,255,255,0.065);
    --border-red: rgba(217,28,28,0.22);
    --text:       #EFEFEF;
    --muted:      #777;
    --white:      #fff;

    /* Typography */
    --font-display: 'Bebas Neue', cursive;
    --font-body:    'DM Sans', sans-serif;
    --font-mono:    'DM Mono', monospace;
    --font-accent:  'Cormorant Garamond', serif;

    /* Spacing scale */
    --sp-xs:  0.5rem;
    --sp-sm:  1rem;
    --sp-md:  2rem;
    --sp-lg:  4rem;
    --sp-xl:  8rem;
    --sp-2xl: 12rem;

    /* Motion */
    --ease:    cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
    --fast:  0.2s;
    --base:  0.4s;
    --slow:  0.7s;

    /* Shape */
    --radius-pill: 999px;
    --radius-sm:   4px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--black);
    color: var(--text);
    font-family: var(--font-body);
    font-weight: 300;
    overflow-x: hidden;
    cursor: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* ─── SCROLL REVEAL SYSTEM ─── */
  [data-reveal] {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity var(--slow) var(--ease-out), transform var(--slow) var(--ease-out);
  }
  [data-reveal].visible {
    opacity: 1;
    transform: translateY(0);
  }
  [data-reveal][data-delay="1"] { transition-delay: 0.1s; }
  [data-reveal][data-delay="2"] { transition-delay: 0.2s; }
  [data-reveal][data-delay="3"] { transition-delay: 0.3s; }
  [data-reveal][data-delay="4"] { transition-delay: 0.4s; }
  [data-reveal][data-delay="5"] { transition-delay: 0.5s; }

  /* ─── CURSOR ─── */
  .fv-cursor {
    position: fixed; width: 7px; height: 7px;
    background: var(--red); border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.18s, height 0.18s, background 0.2s;
  }
  .fv-cursor-ring {
    position: fixed; width: 30px; height: 30px;
    border: 1px solid rgba(217,28,28,0.4); border-radius: 50%;
    pointer-events: none; z-index: 9998;
    transform: translate(-50%, -50%);
    transition: width 0.25s, height 0.25s, border-color 0.25s;
  }
  .fv-cursor.big   { width: 11px; height: 11px; }
  .fv-cursor-ring.big { width: 46px; height: 46px; border-color: rgba(217,28,28,0.6); }

  /* ─── FLOATING PILL NAV ─── */
  .fv-nav {
    position: fixed; top: 1.4rem; left: 50%; transform: translateX(-50%);
    z-index: 100; display: flex; align-items: center; gap: 0;
    background: rgba(10,10,10,0.75);
    backdrop-filter: blur(24px) saturate(1.6);
    -webkit-backdrop-filter: blur(24px) saturate(1.6);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radius-pill);
    padding: 0.5rem 0.5rem 0.5rem 1.4rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(217,28,28,0.06);
    white-space: nowrap;
  }
  .fv-nav-logo {
    display: flex; align-items: center; gap: 0.6rem;
    text-decoration: none; margin-right: 2.2rem;
  }
  .fv-nav-logo:hover .fv-logo-svg { filter: drop-shadow(0 0 8px rgba(217,28,28,0.55)); }
  .fv-nav-wordmark {
    font-family: var(--font-display);
    font-size: 0.9rem; letter-spacing: 0.2em;
    color: var(--white); line-height: 1;
  }
  .fv-nav-wordmark small {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.44rem; letter-spacing: 0.28em;
    color: var(--muted); font-weight: 400; margin-top: 2px;
  }
  .fv-nav-links { display: flex; gap: 0; list-style: none; }
  .fv-nav-links a {
    display: block;
    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--muted); text-decoration: none;
    padding: 0.55rem 1rem;
    border-radius: var(--radius-pill);
    transition: color var(--fast), background var(--fast);
  }
  .fv-nav-links a:hover { color: var(--text); background: rgba(255,255,255,0.05); }
  .fv-nav-cta {
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.55rem 1.4rem;
    background: var(--red); color: white;
    text-decoration: none; font-weight: 500;
    border-radius: var(--radius-pill);
    margin-left: 0.5rem;
    transition: background var(--fast), transform var(--fast);
  }
  .fv-nav-cta:hover { background: var(--red-bright); transform: scale(1.03); }

  /* ─── HERO ─── */
  .fv-hero {
    min-height: 100vh; display: flex; align-items: center;
    position: relative; overflow: hidden;
    padding: 10rem 3rem 5rem;
  }

  /* Warm halo — the signature visual borrowed from parthh.in, kept in red */
  .fv-hero-halo {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 70% at 50% 60%, rgba(217,28,28,0.11) 0%, transparent 65%),
      radial-gradient(ellipse 45% 55% at 65% 45%, rgba(217,28,28,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 35% 40% at 20% 75%, rgba(217,28,28,0.05) 0%, transparent 55%);
    pointer-events: none;
  }

  /* Very subtle grid for texture */
  .fv-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 72px 72px; pointer-events: none;
    mask-image: radial-gradient(ellipse 80% 80% at 30% 50%, black 40%, transparent 100%);
  }

  /* Watermark logo */
  .fv-hero-watermark {
    position: absolute; right: -3rem; top: 50%;
    transform: translateY(-50%);
    opacity: 0.03; pointer-events: none; user-select: none;
  }

  .fv-hero-content { position: relative; z-index: 2; max-width: 820px; }

  .fv-eyebrow {
    display: inline-flex; align-items: center; gap: 0.75rem;
    font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--red); margin-bottom: 2rem; font-weight: 500;
    animation: fvFadeUp 0.7s 0.1s both;
  }
  .fv-eyebrow::before {
    content: ''; width: 28px; height: 1px; background: var(--red);
    flex-shrink: 0;
  }

  .fv-hero-name {
    font-family: var(--font-display);
    font-size: clamp(5rem, 12vw, 10rem);
    line-height: 0.88; letter-spacing: 0.02em; color: var(--white);
    margin-bottom: 2.2rem; animation: fvFadeUp 0.7s 0.2s both;
  }
  .fv-hero-name .red { color: var(--red); }

  /* serif italic accent — the key element borrowed from parthh.in */
  .fv-hero-role {
    font-size: clamp(1.05rem, 1.6vw, 1.25rem);
    color: rgba(239,239,239,0.6);
    letter-spacing: 0.04em;
    margin-bottom: 2.8rem;
    animation: fvFadeUp 0.7s 0.3s both;
    line-height: 1.5;
  }
  .fv-hero-role em {
    font-family: var(--font-accent);
    font-style: italic;
    font-size: 1.35em;
    color: rgba(239,239,239,0.85);
    letter-spacing: 0;
    font-weight: 500;
  }

  .fv-hero-desc {
    font-size: clamp(1rem, 1.4vw, 1.12rem); line-height: 1.8;
    color: rgba(239,239,239,0.55); max-width: 520px; margin-bottom: 3.2rem;
    animation: fvFadeUp 0.7s 0.4s both;
  }

  .fv-actions { display: flex; gap: 1rem; align-items: center; animation: fvFadeUp 0.7s 0.5s both; }
  .fv-btn-primary {
    padding: 0.9rem 2.6rem; background: var(--red); color: white;
    text-decoration: none; font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    border-radius: 2px;
    transition: background var(--fast), transform var(--fast);
    display: inline-flex; align-items: center; gap: 0.5rem;
  }
  .fv-btn-primary:hover { background: var(--red-bright); transform: translateY(-2px); }
  .fv-btn-secondary {
    padding: 0.9rem 2.4rem; border: 1px solid rgba(255,255,255,0.12);
    color: var(--text); text-decoration: none; font-size: 0.78rem;
    font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase;
    border-radius: 2px;
    transition: border-color var(--fast), color var(--fast), transform var(--fast);
  }
  .fv-btn-secondary:hover { border-color: var(--red-dim); color: var(--white); transform: translateY(-2px); }

  .fv-available {
    display: inline-flex; align-items: center; gap: 0.5rem;
    margin-top: 4.5rem; font-size: 0.75rem; color: var(--muted);
    animation: fvFadeUp 0.7s 0.65s both;
    letter-spacing: 0.06em;
  }
  .fv-dot {
    width: 6px; height: 6px; background: #22c55e; border-radius: 50%;
    box-shadow: 0 0 6px rgba(34,197,94,0.7);
    animation: fvPulse 2.2s ease-in-out infinite;
  }

  /* ─── STATS ─── */
  .fv-stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .fv-stat {
    padding: 2.8rem 3rem; border-right: 1px solid var(--border);
    position: relative; overflow: hidden; transition: background var(--base);
    cursor: default;
  }
  .fv-stat:last-child { border-right: none; }
  .fv-stat::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(to right, var(--red), transparent);
    transform: scaleX(0); transition: transform var(--base) var(--ease);
    transform-origin: left;
  }
  .fv-stat:hover { background: rgba(217,28,28,0.03); }
  .fv-stat:hover::after { transform: scaleX(1); }
  .fv-stat-num {
    font-family: var(--font-display); font-size: 3rem; color: var(--white);
    letter-spacing: 0.02em; line-height: 1; margin-bottom: 0.5rem;
  }
  .fv-stat-num span { color: var(--red); }
  .fv-stat-label { font-size: 0.73rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }

  /* ─── SECTION STRUCTURE ─── */
  .fv-section { padding: var(--sp-xl) 3rem; }
  .fv-section-alt {
    background: var(--dark2);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .fv-section-header {
    display: flex; align-items: center; gap: 1.5rem;
    margin-bottom: 5.5rem;
  }
  .fv-section-tag {
    font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--red); font-weight: 500;
    writing-mode: vertical-rl; transform: rotate(180deg);
  }
  .fv-section-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 6vw, 5.2rem); color: var(--white);
    letter-spacing: 0.02em; line-height: 0.88;
  }
  .fv-section-divider {
    flex: 1; height: 1px;
    background: linear-gradient(to right, var(--border-red), transparent);
  }

  /* ─── PROJECT CARDS — full-width feature style ─── */
  .fv-projects-list { display: flex; flex-direction: column; gap: 0; }

  .fv-project-card {
    border: 1px solid var(--border);
    border-bottom-width: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 340px;
    position: relative; overflow: hidden;
    transition: background var(--base);
    text-decoration: none; color: inherit;
  }
  .fv-project-card:last-child { border-bottom-width: 1px; }

  /* Red left-edge stripe on hover */
  .fv-project-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 0;
    background: var(--red);
    transition: height 0.5s var(--ease);
  }
  .fv-project-card:hover { background: rgba(217,28,28,0.025); }
  .fv-project-card:hover::before { height: 100%; }

  /* Card body (left half) */
  .fv-project-body {
    padding: 3.2rem;
    display: flex; flex-direction: column; justify-content: space-between;
    border-right: 1px solid var(--border);
    position: relative; z-index: 2;
  }

  /* Card visual (right half) */
  .fv-project-visual {
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .fv-project-visual-bg {
    position: absolute; inset: 0;
    transition: transform 0.6s var(--ease);
  }
  .fv-project-card:hover .fv-project-visual-bg { transform: scale(1.04); }

  /* Ghost number overlaid on visual */
  .fv-project-ghost {
    font-family: var(--font-display);
    font-size: 8rem; line-height: 1;
    letter-spacing: -0.04em;
    color: rgba(255,255,255,0.06);
    position: relative; z-index: 2;
    user-select: none;
    transition: color var(--base);
  }
  .fv-project-card:hover .fv-project-ghost { color: rgba(217,28,28,0.12); }

  /* Arrow icon in top-right corner of visual panel */
  .fv-project-arrow {
    position: absolute; top: 1.5rem; right: 1.5rem; z-index: 3;
    color: var(--muted); opacity: 0;
    transition: opacity var(--base), transform var(--base);
  }
  .fv-project-card:hover .fv-project-arrow {
    opacity: 1; transform: translate(3px, -3px);
  }

  .fv-project-top { display: flex; flex-direction: column; gap: 0.8rem; }

  .fv-project-badge {
    display: inline-block; align-self: flex-start;
    font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--red); border: 1px solid var(--border-red);
    padding: 0.2rem 0.6rem;
  }
  .fv-project-title {
    font-family: var(--font-display);
    font-size: 2.1rem; letter-spacing: 0.04em; color: var(--white);
    line-height: 1; transition: color var(--fast);
  }
  .fv-project-card:hover .fv-project-title { color: var(--white); }

  .fv-project-desc {
    font-size: 0.88rem; line-height: 1.75; color: var(--muted);
  }

  .fv-project-bottom {}

  .fv-tech-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 2rem; }
  .fv-tech-tag {
    font-family: var(--font-mono); font-size: 0.63rem;
    padding: 0.22rem 0.55rem;
    background: rgba(255,255,255,0.035); border: 1px solid var(--border);
    color: var(--muted); letter-spacing: 0.05em;
  }
  .fv-project-links { display: flex; gap: 1.5rem; align-items: center; }
  .fv-plink {
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text); text-decoration: none;
    display: flex; align-items: center; gap: 0.45rem;
    transition: color var(--fast);
  }
  .fv-plink:hover { color: var(--red); }
  .fv-plink-main {
    color: var(--red); border-bottom: 1px solid rgba(217,28,28,0.3);
    padding-bottom: 2px;
  }
  .fv-plink-main:hover { color: var(--red-bright); }

  /* ─── ABOUT ─── */
  .fv-about-inner {
    display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 5.5rem;
    align-items: start;
  }
  .fv-about-text p {
    font-size: 1.08rem; line-height: 1.85;
    color: rgba(239,239,239,0.6); margin-bottom: 1.6rem;
  }
  .fv-about-text strong { color: var(--white); font-weight: 500; }

  /* Mini experience timeline */
  .fv-timeline { margin-top: 3.5rem; }
  .fv-timeline-label {
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--red); margin-bottom: 1.5rem; font-weight: 500;
  }
  .fv-timeline-item {
    display: flex; gap: 1.2rem; padding: 1.4rem 0;
    border-top: 1px solid var(--border);
    position: relative;
  }
  .fv-timeline-item:last-child { border-bottom: 1px solid var(--border); }
  .fv-timeline-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--red); flex-shrink: 0;
    margin-top: 0.35rem;
    box-shadow: 0 0 8px rgba(217,28,28,0.4);
  }
  .fv-timeline-content {}
  .fv-timeline-role {
    font-size: 0.88rem; font-weight: 500; color: var(--white); margin-bottom: 0.2rem;
  }
  .fv-timeline-company {
    font-size: 0.78rem; color: var(--red); margin-bottom: 0.3rem;
    letter-spacing: 0.05em;
  }
  .fv-timeline-date {
    font-family: var(--font-mono); font-size: 0.63rem; color: var(--muted);
    letter-spacing: 0.08em;
  }

  /* Right column: skills */
  .fv-about-right {}
  .fv-skills-label {
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--red); margin-bottom: 1.2rem; font-weight: 500;
  }
  .fv-skills-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    border: 1px solid var(--border);
  }
  .fv-skill {
    padding: 1.1rem 1.3rem; border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    font-family: var(--font-mono); font-size: 0.73rem;
    color: var(--muted); letter-spacing: 0.04em;
    display: flex; align-items: center; gap: 0.5rem;
    transition: background var(--fast), color var(--fast);
  }
  .fv-skill:nth-child(even) { border-right: none; }
  .fv-skill:nth-last-child(-n+2) { border-bottom: none; }
  .fv-skill:hover { background: rgba(217,28,28,0.05); color: var(--text); }
  .fv-skill::before { content: '//'; color: var(--red); font-size: 0.63rem; flex-shrink: 0; }

  /* ─── CONTACT ─── */
  .fv-contact {
    background: var(--dark2);
    border-top: 1px solid var(--border);
    padding: var(--sp-xl) 3rem;
    position: relative; overflow: hidden;
  }
  .fv-contact::before {
    content: 'CONTACT';
    position: absolute; right: -1.5rem; top: 50%; transform: translateY(-50%);
    font-family: var(--font-display);
    font-size: clamp(7rem, 17vw, 15rem);
    color: rgba(217,28,28,0.035); letter-spacing: -0.02em;
    pointer-events: none; user-select: none; white-space: nowrap; line-height: 1;
  }
  .fv-contact-inner { position: relative; z-index: 2; max-width: 640px; }
  .fv-contact-headline {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5.5vw, 5rem); color: var(--white);
    line-height: 0.9; margin-bottom: 1.8rem; letter-spacing: 0.02em;
  }
  .fv-contact-headline span { color: var(--red); }
  .fv-contact-sub {
    font-size: 0.95rem; color: var(--muted); margin-bottom: 4rem;
    line-height: 1.75; max-width: 420px;
  }
  .fv-contact-list { display: flex; flex-direction: column; border: 1px solid var(--border); }
  .fv-clink {
    display: flex; align-items: center; gap: 1.5rem;
    padding: 1.4rem 2rem; border-bottom: 1px solid var(--border);
    text-decoration: none; color: var(--text);
    transition: background var(--fast); position: relative; overflow: hidden;
  }
  .fv-clink:last-child { border-bottom: none; }
  .fv-clink::before {
    content: ''; position: absolute; inset: 0;
    background: rgba(217,28,28,0.05); transform: translateX(-100%);
    transition: transform 0.32s var(--ease);
  }
  .fv-clink:hover::before { transform: translateX(0); }
  .fv-clink:hover .fv-clink-icon { background: var(--red); color: white; }
  .fv-clink-icon {
    width: 36px; height: 36px; background: rgba(217,28,28,0.1);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: background var(--fast); color: var(--red);
    position: relative; z-index: 1;
  }
  .fv-clink-label {
    font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--muted); display: block; margin-bottom: 0.2rem;
    position: relative; z-index: 1;
  }
  .fv-clink-value { font-size: 0.9rem; font-weight: 400; position: relative; z-index: 1; }
  .fv-clink-arrow {
    margin-left: auto; color: var(--red); font-size: 1rem;
    transition: transform var(--fast); position: relative; z-index: 1;
  }
  .fv-clink:hover .fv-clink-arrow { transform: translateX(5px); }

  /* ─── FOOTER ─── */
  .fv-footer {
    padding: 1.8rem 3rem; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: var(--black);
  }
  .fv-footer-left { display: flex; align-items: center; gap: 0.8rem; }
  .fv-footer-text { font-size: 0.7rem; color: rgba(136,136,136,0.4); letter-spacing: 0.04em; }
  .fv-footer-mark {
    font-family: var(--font-display); font-size: 0.95rem;
    color: rgba(217,28,28,0.3); letter-spacing: 0.18em;
  }

  /* ─── ANIMATIONS ─── */
  @keyframes fvFadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fvPulse {
    0%,100% { opacity: 1; transform: scale(1); box-shadow: 0 0 6px rgba(34,197,94,0.7); }
    50%     { opacity: 0.5; transform: scale(1.6); box-shadow: 0 0 10px rgba(34,197,94,0.3); }
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 960px) {
    .fv-nav {
      top: 1rem; left: 1rem; right: 1rem;
      transform: none; 
      justify-content: space-between;
      border-radius: var(--radius-pill);
    }
    .fv-nav-links { display: none; }
    .fv-hero { padding: 8rem 1.5rem 3rem; }
    .fv-hero-watermark { display: none; }
    .fv-stats { grid-template-columns: 1fr 1fr; }
    .fv-stat:nth-child(2) { border-right: none; }
    .fv-section { padding: 5.5rem 1.5rem; }
    .fv-project-card { grid-template-columns: 1fr; min-height: auto; }
    .fv-project-body { border-right: none; border-bottom: 1px solid var(--border); }
    .fv-project-visual { min-height: 200px; }
    .fv-about-inner { grid-template-columns: 1fr; gap: 3.5rem; }
    .fv-contact { padding: 5.5rem 1.5rem; }
    .fv-footer { padding: 1.5rem; flex-direction: column; gap: 0.6rem; text-align: center; }
    .fv-section-header { margin-bottom: 3.5rem; }
  }

  @media (max-width: 600px) {
    .fv-hero-name { font-size: clamp(3.5rem, 16vw, 6rem); }
    .fv-stat { padding: 1.8rem 1.5rem; }
    .fv-project-body { padding: 2rem; }
    .fv-clink { padding: 1.2rem 1.5rem; }
  }
`;

/* ─── SKILLS DATA ─── */
const SKILLS = [
  "React / Next.js", "Node.js",
  "TypeScript",       "MongoDB",
  "WebSockets",       "WebRTC",
  "Redis",            "JWT Auth",
  "REST APIs",        "Docker",
];

/* ─── EXPERIENCE TIMELINE DATA ─── */
const TIMELINE = [
  {
    role: "MERN Stack Developer",
    company: "DevXtra Community · Apprenticeship",
    date: "2025 — Present",
  },
  {
    role: "Independent Projects",
    company: "Self-directed",
    date: "2024 — Present",
  },
];

/* ─── PROJECTS DATA ─── */
const PROJECTS = [
  {
    num: "01",
    badge: "Live · Production",
    title: "Local Café Queue & Status Management",
    desc:
      "Production system built for a high-traffic café handling 250+ daily users — live queue tracking, real-time status updates, and a simple operator dashboard.",
    stack: ["Next.js", "Google Sheets API", "Real-time sync", "Vercel"],
    liveUrl: "https://chai-couple-chafe.vercel.app",
    sourceUrl: "https://github.com/javaadde/order-table",
    // Visual accent color for the right panel
    accent: "rgba(217,28,28,0.07)",
    accentBright: "rgba(217,28,28,0.14)",
  },
  {
    num: "02",
    badge: "In Progress",
    title: "Confero — Professional Networking Platform",
    desc:
      "A scalable real-time communication and networking platform. Built with a focus on backend architecture — JWT auth, WebRTC video calling, WebSocket messaging, and Redis pub/sub.",
    stack: ["Node.js", "TypeScript", "MongoDB", "WebRTC", "Redis", "Socket.io"],
    sourceUrl: "https://github.com/devxtra-community/confero",
    accent: "rgba(217,28,28,0.05)",
    accentBright: "rgba(217,28,28,0.10)",
  },
];

/* ─────────────────────────────────────────────────────────
   AF LOGO — pure SVG, no font, scales perfectly
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
      <line x1="15" y1="46" x2="15" y2="84" stroke={color} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="85" y1="46" x2="85" y2="84" stroke={color} strokeWidth={sw} strokeLinecap="square"/>
      <polyline points="15,84 50,104 85,84" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter"/>
      <path d="M15,46 A35,35 0 0,1 85,46" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="13" y1="46" x2="17" y2="46" stroke={accent} strokeWidth={sw + 1} strokeLinecap="square"/>
      <line x1="83" y1="46" x2="87" y2="46" stroke={accent} strokeWidth={sw + 1} strokeLinecap="square"/>
      <line x1="33" y1="82" x2="50" y2="34" stroke={color} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="67" y1="82" x2="50" y2="34" stroke={color} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="38" y1="64" x2="62" y2="64" stroke={accent} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="50" y1="34" x2="50" y2="16" stroke={accent} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="50" y1="16" x2="43" y2="25" stroke={accent} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="50" y1="16" x2="57" y2="25" stroke={accent} strokeWidth={sw} strokeLinecap="square"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────────── */
export default function App() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  const mousePos  = useRef({ x: 0, y: 0 });
  const ringPos   = useRef({ x: 0, y: 0 });
  const rafRef    = useRef(null);

  /* ── Custom cursor ── */
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
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.09;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.09;
      ring.style.left = ringPos.current.x + "px";
      ring.style.top  = ringPos.current.y + "px";
      rafRef.current = requestAnimationFrame(animate);
    };
    const onEnter = () => { cursor.classList.add("big"); ring.classList.add("big"); };
    const onLeave = () => { cursor.classList.remove("big"); ring.classList.remove("big"); };

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);
    document
      .querySelectorAll("a, button, .fv-project-card, .fv-stat, .fv-skill, .fv-timeline-item")
      .forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Scroll reveal (IntersectionObserver) ── */
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* ── Cursor ── */}
      <div className="fv-cursor" ref={cursorRef} />
      <div className="fv-cursor-ring" ref={ringRef} />

      {/* ══════════════════════════════════════════
          NAV — Floating pill
      ══════════════════════════════════════════ */}
      <nav className="fv-nav">
        <a href="#" className="fv-nav-logo">
          <AFLogo size={32} color="#EFEFEF" accent="#D91C1C" sw={2.4} />
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

      {/* ══════════════════════════════════════════
          HERO — Cinematic + halo glow + serif accent
      ══════════════════════════════════════════ */}
      <section className="fv-hero" id="home">
        {/* Warm red halo — borrowed soul from parthh.in */}
        <div className="fv-hero-halo" />
        <div className="fv-hero-grid" />
        <div className="fv-hero-watermark">
          <AFLogo size={580} color="#D91C1C" accent="#D91C1C" sw={0.7} />
        </div>

        <div className="fv-hero-content">
          <div className="fv-eyebrow">Software Developer · MERN Stack</div>

          <h1 className="fv-hero-name">
            AHAMMED<br />
            <span className="red">FAVAZ</span><br />
            KM
          </h1>

          {/* Cormorant Garamond italic accent — the soul of parthh.in typography, adapted */}
          <p className="fv-hero-role">
            Building systems that work in <em>real production</em>
          </p>

          <p className="fv-hero-desc">
            I build backend-heavy web applications with a focus on clean architecture,
            real-time features, and code that scales beyond the demo.
          </p>

          <div className="fv-actions">
            <a href="#projects" className="fv-btn-primary">
              View Projects <ArrowUpRight size={14} />
            </a>
            <a href="#contact" className="fv-btn-secondary">Contact Me</a>
          </div>

          <div className="fv-available">
            <div className="fv-dot" />
            Available for full-time &amp; freelance
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
      <div className="fv-stats">
        {[
          { num: "1",    accent: "+",  label: "Year Experience" },
          { num: "250",  accent: "+",  label: "Daily Active Users" },
          { num: "Full", accent: "—",  label: "Stack Ownership" },
          { num: "Live", accent: ".",  label: "Production Deployments" },
        ].map(({ num, accent, label }) => (
          <div className="fv-stat" key={label} data-reveal>
            <div className="fv-stat-num">{num}<span>{accent}</span></div>
            <div className="fv-stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          PROJECTS — Full-width feature cards
      ══════════════════════════════════════════ */}
      <section className="fv-section" id="projects">
        <div className="fv-section-header" data-reveal>
          <div className="fv-section-tag">Work</div>
          <h2 className="fv-section-title">Featured<br />Projects</h2>
          <div className="fv-section-divider" />
        </div>

        <div className="fv-projects-list">
          {PROJECTS.map((p) => (
            <div className="fv-project-card" key={p.num} data-reveal>
              {/* Left: content */}
              <div className="fv-project-body">
                <div className="fv-project-top">
                  <span className="fv-project-badge">{p.badge}</span>
                  <h3 className="fv-project-title">{p.title}</h3>
                  <p className="fv-project-desc">{p.desc}</p>
                </div>
                <div className="fv-project-bottom">
                  <div className="fv-tech-stack">
                    {p.stack.map((t) => (
                      <span className="fv-tech-tag" key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="fv-project-links">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="fv-plink fv-plink-main">
                        <ExternalLink size={13} /> Live Demo
                      </a>
                    )}
                    {p.sourceUrl && (
                      <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="fv-plink">
                        <Code size={13} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: visual panel */}
              <div className="fv-project-visual">
                <div
                  className="fv-project-visual-bg"
                  style={{
                    background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${p.accentBright} 0%, ${p.accent} 40%, transparent 75%)`,
                  }}
                />
                <div className="fv-project-ghost">{p.num}</div>
                <div className="fv-project-arrow">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT — Bio + timeline + skills
      ══════════════════════════════════════════ */}
      <section className="fv-section fv-section-alt" id="about">
        <div className="fv-section-header" data-reveal>
          <div className="fv-section-tag">Bio</div>
          <h2 className="fv-section-title">About<br />Me</h2>
          <div className="fv-section-divider" />
        </div>

        <div className="fv-about-inner">
          {/* Left: bio + timeline */}
          <div>
            <div className="fv-about-text" data-reveal>
              <p>I'm a software developer focused on building things that work in <strong>real production environments</strong> — not just sandboxes. I handle the full stack, but my heart is in the backend.</p>
              <p>I care about <strong>system design, performance</strong>, and writing code that a future me or a teammate can still read six months later.</p>
              <p>Open to <strong>full-time roles and freelance</strong> where I can contribute meaningfully from day one — no handholding needed.</p>
            </div>

            {/* Mini experience timeline */}
            <div className="fv-timeline" data-reveal data-delay="2">
              <div className="fv-timeline-label">Experience</div>
              {TIMELINE.map((item, i) => (
                <div className="fv-timeline-item" key={i}>
                  <div className="fv-timeline-dot" />
                  <div className="fv-timeline-content">
                    <div className="fv-timeline-role">{item.role}</div>
                    <div className="fv-timeline-company">{item.company}</div>
                    <div className="fv-timeline-date">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: skills grid */}
          <div className="fv-about-right" data-reveal data-delay="3">
            <div className="fv-skills-label">Tech Arsenal</div>
            <div className="fv-skills-grid">
              {SKILLS.map((s) => (
                <div className="fv-skill" key={s}>{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section className="fv-contact" id="contact">
        <div className="fv-contact-inner">
          <h2 className="fv-contact-headline" data-reveal>
            LET'S BUILD<br /><span>SOMETHING.</span>
          </h2>
          <p className="fv-contact-sub" data-reveal data-delay="1">
            No contact forms. No gatekeeping. Just direct lines — pick whichever works for you.
          </p>
          <div className="fv-contact-list" data-reveal data-delay="2">
            <a href="mailto:favazkoppath10@gmail.com" className="fv-clink">
              <div className="fv-clink-icon"><Mail size={16} /></div>
              <div>
                <span className="fv-clink-label">Email</span>
                <span className="fv-clink-value">favazkoppath10@gmail.com</span>
              </div>
              <span className="fv-clink-arrow">→</span>
            </a>
            <a href="https://www.linkedin.com/in/favazmubarak" target="_blank" rel="noopener noreferrer" className="fv-clink">
              <div className="fv-clink-icon"><Linkedin size={16} /></div>
              <div>
                <span className="fv-clink-label">LinkedIn</span>
                <span className="fv-clink-value">linkedin.com/in/favazmubarak</span>
              </div>
              <span className="fv-clink-arrow">→</span>
            </a>
            <a href="https://github.com/Favazmubarak" target="_blank" rel="noopener noreferrer" className="fv-clink">
              <div className="fv-clink-icon"><Github size={16} /></div>
              <div>
                <span className="fv-clink-label">GitHub</span>
                <span className="fv-clink-value">github.com/Favazmubarak</span>
              </div>
              <span className="fv-clink-arrow">→</span>
            </a>
            <a href="/Favaz_FullStack_Developer_Resume.pdf" download="AHAMMED FAVAZ SOFTWARE-DEVELOPER CV.pdf" className="fv-clink">
              <div className="fv-clink-icon"><Download size={16} /></div>
              <div>
                <span className="fv-clink-label">Resume</span>
                <span className="fv-clink-value">Download CV — PDF</span>
              </div>
              <span className="fv-clink-arrow">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="fv-footer">
        <div className="fv-footer-left">
          <AFLogo size={20} color="rgba(136,136,136,0.22)" accent="rgba(217,28,28,0.3)" sw={2} />
          <span className="fv-footer-text">© 2025 Ahammed Favaz KM — Full portfolio in progress.</span>
        </div>
        <span className="fv-footer-mark">FAVAZ.DEV</span>
      </footer>
    </>
  );
}