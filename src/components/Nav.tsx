import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PHONE_DISPLAY, PHONE } from '../data/services';
import './Nav.css';

const links = [
  { href: '#sobre', label: 'El Centre' },
  { href: '#serveis', label: 'Serveis' },
  { href: '#tecnologia', label: 'Tecnologia' },
  { href: '#horaris', label: 'Horaris' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const progressW = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      <motion.div className="progress-bar" style={{ width: progressW }} />
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`} aria-label="Navegació principal">
        <a href="#" className="nav-logo">
          <div className="nav-logo-text">
            Global Fisio
            <span>Centre de Fisioteràpia</span>
          </div>
        </a>

        <ul className="nav-links" role="list">
          {links.map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>

        <a href={`tel:${PHONE}`} className="nav-cta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.05a16 16 0 0 0 5.86 5.86l1.21-1.21a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
          </svg>
          <span>{PHONE_DISPLAY}</span>
        </a>

        <button className={`nav-burger ${open ? 'open' : ''}`} aria-label="Menú" onClick={() => setOpen(o => !o)}>
          <span/><span/><span/>
        </button>

        <div className={`nav-mobile ${open ? 'open' : ''}`}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href={`tel:${PHONE}`} className="nav-mobile-cta" onClick={() => setOpen(false)}>{PHONE_DISPLAY}</a>
        </div>
      </nav>
    </>
  );
}
