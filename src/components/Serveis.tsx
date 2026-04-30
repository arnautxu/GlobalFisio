import type { CSSProperties } from 'react';
import {
  Activity,
  Baby,
  Bone,
  Brain,
  HandHeart,
  House,
  Orbit,
  ScanFace,
  Shield,
  Sparkles,
  Waves,
} from 'lucide-react';
import { MotionCarousel } from '@/components/animate-ui/components/community/motion-carousel';
import { cn } from '@/lib/utils';
import { services, type Service } from '../data/services';
import './Serveis.css';

const iconMap = {
  activity: Activity,
  bone: Bone,
  brain: Brain,
  waves: Waves,
  sparkles: Sparkles,
  shield: Shield,
  toy: Baby,
  mouth: ScanFace,
  hand: HandHeart,
  house: House,
  pilates: Orbit,
} as const;

const featuredServices = [services[0], services[1], services[2], services[3], services[5], services[10]];
const secondaryServices = services.filter((service) => !featuredServices.includes(service));

export default function Serveis() {
  return (
    <section id="serveis" className="section serveis">
      <div className="container serveis-grid">
        <div className="serveis-intro">
          <span className="eyebrow">Els Nostres Serveis</span>
          <h2 className="serveis-title">
            Cada especialitat,<br />
            <span className="orange">el seu propi llenguatge clínic</span>
          </h2>
          <p className="serveis-desc">
            Hem convertit la secció en un catàleg més visual perquè cada tractament es pugui
            entendre d’un cop d’ull. Fes lliscar el carousel i compara enfocament, perfil de
            pacient i àrees d’intervenció.
          </p>

          <div className="serveis-constellation" aria-label="Mapa d'especialitats">
            <div className="serveis-constellation-grid">
              {featuredServices.map((service, index) => (
                <div
                  key={service.num}
                  className={`serveis-node serveis-node-${index + 1}`}
                  style={{ '--node-accent': service.accent } as CSSProperties}
                >
                  <span className="serveis-node-num">{service.num}</span>
                  <strong>{service.short}</strong>
                </div>
              ))}

              <div className="serveis-core">
                <span className="serveis-core-kicker">Centre actiu</span>
                <strong>11 especialitats</strong>
                <p>Traumatologia, esport, neurologia i programes actius en una sola lectura.</p>
              </div>
            </div>

            <div className="serveis-secondary-rail">
              {secondaryServices.map((service) => (
                <span
                  key={service.num}
                  className="serveis-secondary-chip"
                  style={{ '--chip-accent': service.accent } as CSSProperties}
                >
                  {service.short}
                </span>
              ))}
            </div>
          </div>
        </div>

        <MotionCarousel
          items={services}
          options={{ loop: true, align: 'center' }}
          className="serveis-carousel"
          viewportClassName="serveis-carousel-viewport"
          trackClassName="serveis-carousel-track"
          slideClassName="serveis-slide"
          controlsClassName="serveis-carousel-controls"
          dotsClassName="serveis-carousel-dots"
          getItemKey={(service) => service.num}
          getItemLabel={(service) => service.short}
          renderItem={(service, _index, active) => (
            <ServiceCard service={service} active={active} />
          )}
        />
      </div>
    </section>
  );
}

function ServiceCard({ service, active }: { service: Service; active: boolean }) {
  const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Sparkles;

  return (
    <article
      className={cn('servei-graphic-card', active && 'is-active')}
      style={
        {
          '--service-accent': service.accent,
          '--service-glow': service.glow,
        } as CSSProperties
      }
    >
      <div className="servei-graphic-topline">
        <span className="servei-graphic-cat">{service.cat}</span>
        <span className="servei-graphic-num">{service.num}</span>
      </div>

      <div className="servei-graphic-hero">
        <div className="servei-graphic-icon" aria-hidden>
          <Icon strokeWidth={1.8} />
        </div>
        <div className="servei-graphic-marker">{service.marker}</div>
      </div>

      <div className="servei-graphic-copy">
        <h3 className="servei-graphic-name">{service.name}</h3>
        <p className="servei-graphic-desc">{service.desc}</p>
      </div>

      <div className="servei-graphic-panels">
        <div className="servei-graphic-panel">
          <span className="servei-graphic-label">Focus</span>
          <p>{service.focus}</p>
        </div>
        <div className="servei-graphic-panel">
          <span className="servei-graphic-label">Ideal per</span>
          <p>{service.audience}</p>
        </div>
      </div>

      <div className="servei-graphic-tags">
        {service.tags.map((tag) => (
          <span key={tag} className="servei-graphic-tag">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
