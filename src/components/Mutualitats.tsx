import { motion } from 'framer-motion';
import './Mutualitats.css';

const mutues = [
  'Mútua Universal','AXA Seguros','Mapfre','Zurich','Allianz','Sanitas',
  'Mútua de Terrassa','ASISA','DKV','+ Consulta la teva',
];

export default function Mutualitats() {
  return (
    <section id="mutualitats" className="section mutus">
      <div className="container mutus-grid">
        <div className="mutus-head">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Col·laboradors</span>
          <h2 className="mutus-title">Treballem amb mútues<br />i assegurances</h2>
          <p className="mutus-desc">
            Atenem pacients privats i derivats de mútues d'accidents i salut.
            Consulta si la teva assegurança cobreix el tractament.
          </p>
        </div>
        <div className="mutus-list">
          {mutues.map((m, i) => (
            <motion.span
              key={m}
              className="mutu"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              {m}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
