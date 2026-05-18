import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PHONE_DISPLAY, PHONE } from '../data/services';
import './Nav.css';

const links = [
  { href: '#sobre',      label: 'Centre',     n: '01' },
  { href: '#serveis',    label: 'Serveis',    n: '02' },
  { href: '#tecnologia', label: 'Tecnologia', n: '03' },
  { href: '#horaris',    label: 'Horaris',    n: '04' },
  { href: '#contacte',   label: 'Contacte',   n: '05' },
];

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function useClinicStatus(now: Date) {
  const month = now.getMonth();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const isSummer = month >= 5 && month <= 8;
  const closeHour = isSummer ? 18 : 20;
  const openHour = 9;
  const isWeekday = day >= 1 && day <= 5;
  const isOpen = isWeekday && hour >= openHour && hour < closeHour;
  let label: string;
  if (isOpen) {
    const closesIn = Math.max(0, (closeHour - hour) * 60);
    if (closesIn >= 120) {
      const h = Math.floor(closesIn / 60);
      const m = Math.round(closesIn - h * 60);
      label = `tanca en ${h}h ${m.toString().padStart(2, '0')}m`;
    } else {
      label = `tanca en ${Math.round(closesIn)}m`;
    }
  } else if (isWeekday && hour < openHour) {
    label = `obre a les ${openHour}:00`;
  } else if (day === 6) {
    label = 'amb cita prèvia';
  } else {
    label = `obre dl ${openHour}:00`;
  }
  return { isOpen, label };
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const sections = ids
      .map(id => document.getElementById(id.replace(/^#/, '')))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive('#' + visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, [ids.join(',')]);
  return active;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const now = useNow();
  const { isOpen, label } = useClinicStatus(now);
  const active = useActiveSection(['hero', ...links.map(l => l.href)]);

  const { scrollYProgress } = useScroll();
  const progressW = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const progressPct = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [pct, setPct] = useState(0);
  useEffect(() => progressPct.on('change', v => setPct(Math.round(v))), [progressPct]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const timeStr = now.toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <>
      <motion.div className="progress-bar" style={{ width: progressW }} aria-hidden />

      <nav className="nav" aria-label="Navegació principal">
        {/* ── Status strip (terminal-style) ──────────────────────────── */}
        <div className="nav-status">
          <div className="nav-status-inner">
            <span className={`nav-stat ${isOpen ? 'is-open' : 'is-closed'}`}>
              <span className="nav-stat-dot" />
              <span className="nav-stat-key">{isOpen ? 'OBERT' : 'TANCAT'}</span>
              <span className="nav-stat-val">/ {label}</span>
            </span>
            <span className="nav-stat-sep" />
            <span className="nav-stat">
              <span className="nav-stat-key">LOC</span>
              <span className="nav-stat-val">41.85° N · 3.07° E</span>
            </span>
            <span className="nav-stat-sep nav-stat-sep-md" />
            <span className="nav-stat nav-stat-md">
              <span className="nav-stat-key">EST</span>
              <span className="nav-stat-val">2007 · 17.5 anys actiu</span>
            </span>
            <span className="nav-status-spacer" />
            <span className="nav-stat nav-stat-mono">
              <span className="nav-stat-key">{timeStr}</span>
              <span className="nav-stat-val">CET</span>
            </span>
            <span className="nav-stat-sep" />
            <span className="nav-stat nav-stat-mono">
              <span className="nav-stat-key">SCROLL</span>
              <span className="nav-stat-val">{String(pct).padStart(3, '0')}%</span>
            </span>
          </div>
        </div>

        {/* ── Main row ───────────────────────────────────────────────── */}
        <div className="nav-main">
          <a href="#hero" className="nav-logo" aria-label="Inici">
            <span className="nav-logo-mark" aria-hidden>
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gfgrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e94e1b"/>
                    <stop offset="50%" stopColor="#f06d3f"/>
                    <stop offset="100%" stopColor="#27348b"/>
                  </linearGradient>
                </defs>
                <path d="M16 2 L29 9.5 L29 22.5 L16 30 L3 22.5 L3 9.5 Z" fill="url(#gfgrad)" />
                <path d="M11 13.5 L11 19 Q11 21.5 13.5 21.5 L18 21.5 Q20.5 21.5 20.5 19 L20.5 16 L15.5 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </span>
            <span className="nav-logo-text">
              <strong className="gradient-text">Global Fisio</strong>
              <em>v.2026 · Sant Antoni de Calonge</em>
            </span>
          </a>

          <ul className="nav-links" role="list">
            {links.map(l => {
              const isActive = active === l.href;
              return (
                <li key={l.href}>
                  <a href={l.href} className={isActive ? 'is-active' : ''} aria-current={isActive ? 'true' : undefined}>
                    <span className="nav-link-n">[{l.n}]</span>
                    <span className="nav-link-label">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <a href={`tel:${PHONE}`} className="nav-cta">
            <span className="nav-cta-prefix">tel://</span>
            <span className="nav-cta-number">{PHONE_DISPLAY}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>

          <button
            className={`nav-burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Tancar menú' : 'Obrir menú'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span/><span/>
          </button>
        </div>
      </nav>

      <div className={`nav-mobile ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="nav-mobile-status">
          <span className={`nav-mobile-dot ${isOpen ? 'is-open' : ''}`} />
          {isOpen ? 'OBERT' : 'TANCAT'} · {label}
        </div>
        <ul>
          {links.map((l, i) => (
            <li key={l.href} style={{ ['--i' as any]: i }}>
              <a href={l.href} onClick={() => setOpen(false)}>
                <span className="nav-mobile-n">[{l.n}]</span>
                <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href={`tel:${PHONE}`} className="nav-mobile-cta" onClick={() => setOpen(false)}>
          <span className="nav-cta-prefix">tel://</span>
          {PHONE_DISPLAY}
        </a>
      </div>
    </>
  );
}
