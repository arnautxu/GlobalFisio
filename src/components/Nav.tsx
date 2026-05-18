import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PHONE_DISPLAY, PHONE } from '../data/services';
import './Nav.css';

const links = [
  { href: '#sobre', label: 'Centre', n: '01' },
  { href: '#serveis', label: 'Serveis', n: '02' },
  { href: '#tecnologia', label: 'Tecnologia', n: '03' },
  { href: '#horaris', label: 'Horaris', n: '04' },
  { href: '#contacte', label: 'Contacte', n: '05' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressW = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <motion.div className="progress-bar" style={{ width: progressW }} aria-hidden />

      <nav className="nav" aria-label="Navegació principal">
        <div className="nav-inner">
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
                <path d="M16 3 L29 10 L29 22 L16 29 L3 22 L3 10 Z" fill="url(#gfgrad)" />
                <path d="M11 14 L11 19 Q11 21 13 21 L18 21 Q20 21 20 19 L20 16 L15 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </span>
            <span className="nav-logo-text">
              <strong className="gradient-text">Global Fisio</strong>
              <em>Sant Antoni de Calonge · est. 2007</em>
            </span>
          </a>

          <ul className="nav-links" role="list">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href}>
                  <span className="nav-link-n">{l.n}</span>
                  <span className="nav-link-label">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <a href={`tel:${PHONE}`} className="nav-cta">
            <span className="nav-cta-label">Trucar</span>
            <span className="nav-cta-number">{PHONE_DISPLAY}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
        <ul>
          {links.map((l, i) => (
            <li key={l.href} style={{ ['--i' as any]: i }}>
              <a href={l.href} onClick={() => setOpen(false)}>
                <span className="nav-mobile-n">{l.n}</span>
                <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href={`tel:${PHONE}`} className="nav-mobile-cta" onClick={() => setOpen(false)}>
          {PHONE_DISPLAY}
        </a>
      </div>
    </>
  );
}
