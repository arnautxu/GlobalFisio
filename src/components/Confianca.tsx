import { gsap } from '../lib/gsap';
import { useGsap } from '../lib/useGsap';
import './Confianca.css';

type Stat = {
  num: number;
  suffix?: string;
  label: string;
  sub: string;
  accent: 'vermilion' | 'indigo';
};

const stats: Stat[] = [
  { num: 17,  suffix: '',     label: 'Anys cuidant',         sub: 'Des de 2007 a Calonge',  accent: 'vermilion' },
  { num: 11,  suffix: '',     label: 'Especialitats',        sub: 'D\'esport a neurologia', accent: 'indigo' },
  { num: 9,   suffix: '+',    label: 'Mútues',               sub: 'Privats i derivats',     accent: 'vermilion' },
  { num: 448, suffix: ' kHz', label: 'INDIBA',               sub: 'Radiofreqüència mèdica', accent: 'indigo' },
];

export default function Confianca() {
  const ref = useGsap<HTMLElement>((_ctx, el) => {
    // Counters
    el.querySelectorAll<HTMLElement>('.confi-num-val').forEach((node) => {
      const target = Number(node.dataset.target ?? '0');
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.6,
        ease: 'expo.out',
        onUpdate: () => { node.textContent = Math.round(obj.v).toLocaleString('ca-ES'); },
        scrollTrigger: { trigger: node, start: 'top 85%', once: true },
      });
    });

    gsap.from(el.querySelectorAll('.confi-cell'), {
      y: 60,
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el.querySelector('.confi-stats'), start: 'top 85%', once: true },
    });

    gsap.from(el.querySelectorAll('.confi-intro > *'), {
      y: 40,
      duration: 0.7,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el.querySelector('.confi-intro'), start: 'top 85%', once: true },
    });
  }, []);

  return (
    <section id="confianca" className="confianca" ref={ref as React.RefObject<HTMLElement>} aria-label="Xifres del centre">
      <div className="container confi-grid">
        <div className="confi-intro">
          <span className="eyebrow">Per què Global Fisio</span>
          <h2 className="confi-title">
            17 anys cuidant el<br />
            <em>moviment</em> de la Costa&nbsp;Brava.
          </h2>
        </div>

        <div className="confi-stats" role="list">
          {stats.map((s) => (
            <div className={`confi-cell confi-cell-${s.accent}`} role="listitem" key={s.label}>
              <div className="confi-num">
                <span className="confi-num-val" data-target={s.num}>0</span>
                {s.suffix && <span className="confi-num-suffix">{s.suffix}</span>}
              </div>
              <div className="confi-label">{s.label}</div>
              <div className="confi-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
