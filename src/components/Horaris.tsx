import { gsap } from '../lib/gsap';
import { useGsap } from '../lib/useGsap';
import './Horaris.css';

export default function Horaris() {
  const ref = useGsap<HTMLElement>((_ctx, el) => {
    gsap.from(el.querySelectorAll('.horari-card'), {
      y: 40, duration: 0.7, ease: 'expo.out', stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 75%', once: true },
    });
    gsap.from(el.querySelectorAll('.horari-row'), {
      x: -30, duration: 0.5, ease: 'expo.out', stagger: 0.06,
      scrollTrigger: { trigger: '.horari-table', start: 'top 80%', once: true },
    });
  }, []);

  return (
    <section id="horaris" className="section horaris" ref={ref}>
      <div className="container horaris-grid">
        <div className="horaris-intro">
          <span className="eyebrow">Quan ens trobaràs</span>
          <h2 className="horaris-title">Horaris<br /><em>d'atenció.</em></h2>
          <p className="horaris-desc">
            Adaptem el nostre horari a les necessitats de la temporada per estar
            sempre disponibles per a tu.
          </p>
        </div>

        <div className="horaris-cards">
          <article className="horari-card">
            <div className="horari-season">
              <SunIcon /> Estiu
            </div>
            <div className="horari-time">9–18h</div>
            <div className="horari-days">Dilluns a Divendres</div>
            <div className="horari-note">Juny → Setembre</div>
          </article>

          <article className="horari-card horari-active">
            <span className="horari-active-tag">Ara mateix</span>
            <div className="horari-season">
              <SnowIcon /> Hivern
            </div>
            <div className="horari-time">9–20h</div>
            <div className="horari-days">Dilluns a Divendres</div>
            <div className="horari-note">Octubre → Maig</div>
          </article>
        </div>

        <table className="horari-table">
          <caption className="sr-only">Horari setmanal complet</caption>
          <tbody>
            <tr className="horari-row">
              <td className="horari-row-day">Dilluns – Divendres</td>
              <td className="horari-row-time">9:00 – 18:00 / 20:00</td>
            </tr>
            <tr className="horari-row">
              <td className="horari-row-day">Dissabte</td>
              <td className="horari-row-time">Matins amb cita prèvia</td>
            </tr>
            <tr className="horari-row horari-row-closed">
              <td className="horari-row-day">Diumenge i festius</td>
              <td className="horari-row-time">Tancat</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);

const SnowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="2" y1="12" x2="22" y2="12"/>
    <line x1="12" y1="2" x2="12" y2="22"/>
    <path d="M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/>
  </svg>
);
