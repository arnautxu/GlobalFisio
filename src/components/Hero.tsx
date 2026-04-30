import { motion } from 'framer-motion';
import { PHONE } from '../data/services';
import DotField from './DotField';
import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <DotField
          dotRadius={1.8}
          dotSpacing={15}
          bulgeStrength={72}
          glowRadius={220}
          sparkle
          waveAmplitude={0.9}
          gradientFrom="rgba(249, 115, 22, 0.34)"
          gradientTo="rgba(14, 165, 233, 0.22)"
          glowColor="#221611"
        />
      </div>

      <div className="hero-grid container">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <span className="hero-pill">
            <span className="hero-pill-dot" />
            Obert des de 2007 · Sant Antoni de Calonge
          </span>
          <h1 className="hero-title">
            <span className="hero-line">Recupera el teu</span>
            <span className="hero-line hero-line-orange">moviment</span>
            <span className="hero-line">amb professionals</span>
          </h1>
          <p className="hero-desc">
            Fisioteràpia personalitzada i d'alta qualitat a la Costa Brava.
            Tractaments avançats per millorar la teva qualitat de vida.
          </p>
          <div className="hero-actions">
            <a href="#contacte" className="btn btn-primary">Demana cita</a>
            <a href="#serveis" className="btn btn-ghost">Veure serveis →</a>
          </div>
          <div className="hero-trust">
            <div className="hero-trust-avs" aria-hidden="true">
              {['#0ea5e9', '#f97316', '#0f172a'].map((c, i) => (
                <span key={i} className="hero-trust-av" style={{ background: c, zIndex: 3 - i }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>
                  </svg>
                </span>
              ))}
            </div>
            <p className="hero-trust-txt">
              Més de <strong>17 anys</strong> cuidant pacients<br />a Sant Antoni de Calonge
            </p>
          </div>
        </motion.div>
      </div>

      <a href="#sobre" className="hero-scroll" aria-label="Següent secció">
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </a>
    </section>
  );
}
