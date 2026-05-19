import { useGsap } from '../lib/useGsap';
import { gsap } from '../lib/gsap';
import './Sobre.css';

const pills = ['Traumatologia', 'Esport', 'Neurologia', 'Geriatria', 'Pediatria', 'Aquàtica', 'ATM', 'Pilates'];

export default function Sobre() {
  const ref = useGsap<HTMLElement>((_ctx, el) => {
    gsap.from(el.querySelectorAll('.sobre-num span'), {
      autoAlpha: 0,
      y: 40,
      ease: 'expo.out',
      duration: 1.1,
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
    gsap.from(el.querySelectorAll('.sobre-body > *'), {
      y: 40,
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el.querySelector('.sobre-body'), start: 'top 80%', once: true },
    });
    gsap.from(el.querySelectorAll('.pill'), {
      scale: 0.6,
      duration: 0.5,
      ease: 'back.out(2)',
      stagger: 0.04,
      scrollTrigger: { trigger: el.querySelector('.sobre-pills'), start: 'top 85%', once: true },
    });
  }, []);

  return (
    <section id="sobre" className="section sobre" ref={ref}>
      <div className="container sobre-grid">
        {/* Massive numeral */}
        <div className="sobre-numeral">
          <span className="eyebrow">El centre</span>
          <div className="sobre-num" aria-label="17 anys">
            <span>1</span><span>7</span>
          </div>
          <div className="sobre-num-label">anys cuidant<br />la Costa Brava</div>
        </div>

        <div className="sobre-body">
          <h2 className="sobre-title">
            Fisioteràpia de <em>confiança</em><br />des de 2007.
          </h2>
          <p className="sobre-lead">
            Global Centre de Fisioteràpia va néixer a Sant Antoni de Calonge amb la
            vocació d'oferir un servei proper, professional i d'alta qualitat. El
            nostre equip treballa per millorar la teva qualitat de vida amb
            tractaments personalitzats.
          </p>
          <div className="sobre-pills">
            {pills.map(p => <span key={p} className="pill">{p}</span>)}
          </div>
          <blockquote className="sobre-quote">
            <span className="sobre-quote-mark" aria-hidden>"</span>
            Atenem pacients privats i derivats de mútues d'accident i salut.
            El tracte personalitzat és la nostra essència.
          </blockquote>
        </div>
      </div>
    </section>
  );
}
