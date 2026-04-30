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

          <div className="serveis-legend" aria-label="Especialitats disponibles">
            {services.map((service) => (
              <span
                key={service.num}
                className="serveis-legend-item"
                style={{ '--legend-accent': service.accent } as CSSProperties}
              >
                {service.short}
              </span>
            ))}
          </div>
        </div>

        <MotionCarousel
          items={services}
          options={{ loop: true, align: 'start' }}
          className="serveis-carousel"
          viewportClassName="overflow-visible"
          trackClassName="items-stretch"
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
