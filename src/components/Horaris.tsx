import './Horaris.css';

export default function Horaris() {
  return (
    <section id="horaris" className="section horaris">
      <div className="container horaris-grid">
        <div>
          <span className="eyebrow">Quan ens trobaràs</span>
          <h2 className="horaris-title">Horaris d'atenció</h2>
          <p className="horaris-desc">
            Adaptem el nostre horari a les necessitats de la temporada per estar
            sempre disponibles per a tu.
          </p>
        </div>

        <div className="horaris-cols">
          <article className="horari-card">
            <div className="horari-season">
              <SunIcon /> Horari d'Estiu
            </div>
            <div className="horari-time">9h–18h</div>
            <div className="horari-days">Dilluns a Divendres</div>
            <div className="horari-note">De juny a setembre</div>
          </article>

          <article className="horari-card horari-active">
            <span className="horari-dot" />
            <div className="horari-season">
              <SnowIcon /> Horari d'Hivern
            </div>
            <div className="horari-time">9h–20h</div>
            <div className="horari-days">Dilluns a Divendres</div>
            <div className="horari-note">D'octubre a maig</div>
          </article>
        </div>

        <div className="horari-full">
          <h4>Tota la setmana</h4>
          <div className="horari-row">
            <span>Dilluns – Divendres</span>
            <span className="orange">9:00–18:00 / 20:00</span>
          </div>
          <div className="horari-row">
            <span>Dissabte</span>
            <span>Matins amb cita prèvia</span>
          </div>
          <div className="horari-row">
            <span>Diumenge i festius</span>
            <span style={{ color: 'oklch(1 0 0 / 0.3)' }}>Tancat</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);

const SnowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="2" y1="12" x2="22" y2="12"/>
    <line x1="12" y1="2" x2="12" y2="22"/>
    <path d="M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/>
  </svg>
);
