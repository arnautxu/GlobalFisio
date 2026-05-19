import { useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useGsap } from '../lib/useGsap';
import './Hero.css';

function useClinicStatus() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

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
    const closesIn = Math.max(0, Math.round((closeHour - hour) * 60));
    label = closesIn >= 60
      ? `Obert · tanca a ${closeHour}:00h`
      : `Obert · tanca en ${closesIn} min`;
  } else if (isWeekday && hour < openHour) {
    label = `Obrim avui a les ${openHour}:00h`;
  } else if (day === 6) {
    label = 'Dissabte · matins amb cita prèvia';
  } else {
    label = `Obrim dilluns a les ${openHour}:00h`;
  }
  return { isOpen, label };
}

export default function Hero() {
  const { isOpen, label } = useClinicStatus();

  const ref = useGsap<HTMLElement>((_ctx, el) => {
    const words = el.querySelectorAll('.h1-word');
    const intro = gsap.timeline({ delay: 0.05 });
    intro.from(words, {
      yPercent: 110,
      rotateX: -25,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.07,
    });
    intro.from('.hero-meta-row', {
      yPercent: 100,
      duration: 0.7,
      ease: 'expo.out',
      stagger: 0.05,
    }, '-=0.7');
    intro.from('.hero-foot > *', {
      y: 24,
      duration: 0.7,
      ease: 'expo.out',
      stagger: 0.08,
    }, '-=0.6');
    intro.from('.hero-marquee-track', {
      xPercent: 8,
      duration: 1.2,
      ease: 'expo.out',
    }, '-=0.8');
    intro.from('.hero-accent', {
      scaleX: 0,
      duration: 0.9,
      ease: 'expo.out',
    }, '-=1');

    // Pinned scene: parallax + accent stripe scaling + headline scale-down
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=100%',
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
        },
      });
      tl.to('.hero-headline', { scale: 0.78, yPercent: -10, ease: 'none' }, 0);
      tl.to('.hero-accent', { scaleX: 0, transformOrigin: 'right', ease: 'none' }, 0);
      tl.to('.hero-glow-a', { yPercent: -40, scale: 1.4, ease: 'none' }, 0);
      tl.to('.hero-glow-b', { yPercent: 30, scale: 1.6, ease: 'none' }, 0);
      tl.to('.hero-meta', { opacity: 0.4, ease: 'none' }, 0);
    });

    // Infinite marquee
    gsap.to('.hero-marquee-track', {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1,
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section id="hero" className="hero" ref={ref}>
      {/* Ambient glows (clean tech depth) */}
      <div className="hero-glow hero-glow-a" aria-hidden />
      <div className="hero-glow hero-glow-b" aria-hidden />

      <div className="hero-frame">
        <aside className="hero-meta" aria-label="Informació del centre">
          <div className="hero-meta-row hero-meta-label">N° 001 / Calonge</div>
          <div className="hero-meta-row">Est. 2007</div>
          <div className="hero-meta-row hero-meta-em">Costa Brava</div>
        </aside>

        <h1 className="hero-headline">
          <span className="h1-line">
            <span className="h1-word">Recupera</span>{' '}
            <span className="h1-word">el</span>{' '}
            <span className="h1-word">teu</span>
          </span>
          <span className="h1-line h1-line-em">
            <span className="h1-word h1-word-em">moviment.</span>
          </span>
        </h1>

        {/* Accent stripe — vermilion */}
        <div className="hero-accent" aria-hidden />

        <div className="hero-foot">
          <div className={`hero-status ${isOpen ? 'is-open' : 'is-closed'}`} role="status">
            <span className="hero-status-dot" />
            <span>{label}</span>
          </div>
          <p className="hero-desc">
            Fisioteràpia personalitzada d'alta qualitat. 17 anys cuidant pacients
            a Sant Antoni de Calonge.
          </p>
          <div className="hero-actions">
            <a href="#contacte" className="hero-cta">
              <span>Demana cita</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#serveis" className="hero-link">
              11 especialitats →
            </a>
          </div>
        </div>
      </div>

      <div className="hero-marquee" aria-hidden>
        <div className="hero-marquee-track">
          {[...Array(2)].flatMap((_, i) => (
            <span key={i} className="hero-marquee-row">
              <span>Traumatologia</span>
              <span className="dot">●</span>
              <span>Esport</span>
              <span className="dot">●</span>
              <span>Neurologia</span>
              <span className="dot">●</span>
              <span>Geriatria</span>
              <span className="dot">●</span>
              <span>Pediatria</span>
              <span className="dot">●</span>
              <span>Aquàtica</span>
              <span className="dot">●</span>
              <span>ATM</span>
              <span className="dot">●</span>
              <span>Pilates</span>
              <span className="dot">●</span>
              <span>INDIBA 448 kHz</span>
              <span className="dot">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
