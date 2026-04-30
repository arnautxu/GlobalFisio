import { motion } from 'framer-motion';
import './Sobre.css';

const pills = ['Traumatologia','Esport','Neurologia','Geriatria','Pediatria','Aquàtica','ATM','Pilates'];

export default function Sobre() {
  return (
    <section id="sobre" className="section sobre">
      <div className="container sobre-grid">
        <motion.div
          className="sobre-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="sobre-ring sobre-ring-1" />
          <span className="sobre-ring sobre-ring-2" />
          <span className="sobre-ring sobre-ring-3" />
          <div className="sobre-center">17</div>
          <div className="sobre-center-label">anys</div>
        </motion.div>

        <div className="sobre-content">
          <span className="eyebrow">El Centre</span>
          <h2 className="sobre-title">
            Fisioteràpia de<br />
            <span className="orange">confiança</span> des de 2007
          </h2>
          <p className="sobre-desc">
            Global Centre de Fisioteràpia va néixer a Sant Antoni de Calonge amb la vocació
            d'oferir un servei de fisioteràpia proper, professional i d'alta qualitat. El nostre
            equip treballa per millorar la teva qualitat de vida a través de tractaments
            personalitzats.
          </p>
          <div className="sobre-pills">
            {pills.map(p => <span key={p} className="pill">{p}</span>)}
          </div>
          <blockquote className="sobre-quote">
            "Atenem pacients privats i derivats de mútues d'accident i salut.
            El tracte personalitzat és la nostra essència."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
