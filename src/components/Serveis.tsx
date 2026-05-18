import { useState } from 'react';
import {
  Activity, Baby, Bone, Brain, HandHeart, House, Orbit, ScanFace, Shield, Sparkles, Waves,
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useGsap } from '../lib/useGsap';
import { services, type Service } from '../data/services';
import './Serveis.css';

const iconMap = {
  activity: Activity, bone: Bone, brain: Brain, waves: Waves,
  sparkles: Sparkles, shield: Shield, toy: Baby, mouth: ScanFace,
  hand: HandHeart, house: House, pilates: Orbit,
} as const;

export default function Serveis() {
  const [activeIdx, setActiveIdx] = useState(0);

  const ref = useGsap<HTMLElement>((_ctx, el) => {
    const track = el.querySelector<HTMLElement>('.serveis-track');
    if (!track) return;

    const mm = gsap.matchMedia();

    // Desktop: horizontal pinned scroll
    mm.add('(min-width: 900px)', () => {
      const distance = () => track.scrollWidth - window.innerWidth + 120;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${distance()}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        animation: gsap.to(track, { x: () => -distance(), ease: 'none' }),
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.min(services.length - 1, Math.floor(progress * services.length));
          setActiveIdx(idx);
        },
      });

      return () => st.kill();
    });

    // Mobile: just reveal cards on scroll
    mm.add('(max-width: 899px)', () => {
      gsap.from('.servei-card', {
        y: 60,
        duration: 0.7,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: track, start: 'top 80%', once: true },
      });
    });

    // Intro
    gsap.from('.serveis-intro > *', {
      y: 40,
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.serveis-intro', start: 'top 80%', once: true },
    });
  }, []);

  const active = services[activeIdx];

  return (
    <section id="serveis" className="serveis" ref={ref}>
      <div className="serveis-stage">
        {/* Header strip stays visible while horizontal scroll happens */}
        <div className="serveis-header">
          <div className="container serveis-intro">
            <span className="eyebrow">Especialitats · 11</span>
            <h2 className="serveis-title">
              Cada cos,<br /><em>el seu propi llenguatge.</em>
            </h2>
          </div>
          <div className="serveis-counter" aria-live="polite">
            <div className="serveis-counter-num">
              {String(activeIdx + 1).padStart(2, '0')}
              <span>/ {String(services.length).padStart(2, '0')}</span>
            </div>
            <div className="serveis-counter-name">{active?.cat}</div>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="serveis-track-wrap">
          <div className="serveis-track">
            {services.map((service, i) => (
              <ServiceCard key={service.num} service={service} index={i} />
            ))}
            <div className="serveis-end-card">
              <div>
                <span className="eyebrow">Següent passa</span>
                <h3>Demana cita<br />o ens truques.</h3>
                <div className="serveis-end-actions">
                  <a href="#contacte" className="serveis-end-cta">Demana cita →</a>
                  <a href="#contacte" className="serveis-end-link">Veure contacte</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="serveis-hint" aria-hidden>
          <span>Continua scrollejant</span>
          <span className="serveis-hint-arrow">→</span>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Sparkles;
  // Alternate accent colors across cards using the brand pair
  const useIndigo = index % 2 === 1;

  return (
    <article
      className={`servei-card ${useIndigo ? 'is-indigo' : 'is-vermilion'}`}
      style={{ ['--card-accent' as any]: useIndigo ? 'var(--indigo)' : 'var(--vermilion)' }}
    >
      <div className="servei-card-topline">
        <span className="servei-card-num">{service.num}</span>
        <span className="servei-card-cat">{service.cat}</span>
      </div>

      <div className="servei-card-icon" aria-hidden>
        <Icon strokeWidth={1.6} />
      </div>

      <h3 className="servei-card-name">{service.name}</h3>
      <p className="servei-card-desc">{service.desc}</p>

      <dl className="servei-card-meta">
        <div>
          <dt>Focus</dt>
          <dd>{service.focus}</dd>
        </div>
        <div>
          <dt>Ideal per</dt>
          <dd>{service.audience}</dd>
        </div>
      </dl>

      <div className="servei-card-tags">
        {service.tags.map((tag) => (
          <span key={tag} className="servei-card-tag">{tag}</span>
        ))}
      </div>

      <div className="servei-card-marker">{service.marker}</div>
    </article>
  );
}
