import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import './Serveis.css';

const STACK_VISIBLE = 4; // visible cards in deck

export default function Serveis() {
  const [idx, setIdx] = useState(0);

  const next = () => setIdx(i => (i + 1) % services.length);
  const prev = () => setIdx(i => (i - 1 + services.length) % services.length);

  // Build visible stack: front, +1, +2, +3 (+4 buffered)
  const stackOrder = Array.from({ length: STACK_VISIBLE + 1 }, (_, i) => (idx + i) % services.length);

  return (
    <section id="serveis" className="section serveis">
      <div className="container serveis-grid">
        <div className="serveis-intro">
          <span className="eyebrow">Els Nostres Serveis</span>
          <h2 className="serveis-title">
            Tractaments<br /><span className="orange">especialitzats</span>
          </h2>
          <p className="serveis-desc">
            11 especialitats per a cada necessitat. Navega l'stack 3D amb les fletxes,
            el teclat (← →) o arrossegant amb el ratolí.
          </p>
          <div className="serveis-controls">
            <button className="ctrl-arrow" onClick={prev} aria-label="Servei anterior">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="ctrl-arrow" onClick={next} aria-label="Servei següent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <div className="ctrl-counter">
              <strong>{String(idx + 1).padStart(2, '0')}</strong>
              <span>/ {String(services.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        <Stack idx={idx} stackOrder={stackOrder} onSwap={next} onPrev={prev} />
      </div>
    </section>
  );
}

function Stack({
  idx, stackOrder, onSwap, onPrev,
}: { idx: number; stackOrder: number[]; onSwap: () => void; onPrev: () => void }) {
  const [drag, setDrag] = useState({ active: false, x: 0 });

  return (
    <div
      className="serveis-stack"
      onPointerDown={e => setDrag({ active: true, x: e.clientX })}
      onPointerMove={e => {
        if (!drag.active) return;
        const dx = e.clientX - drag.x;
        if (Math.abs(dx) > 70) {
          if (dx < 0) onSwap(); else onPrev();
          setDrag({ active: false, x: 0 });
        }
      }}
      onPointerUp={() => setDrag({ active: false, x: 0 })}
      onPointerLeave={() => setDrag({ active: false, x: 0 })}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'ArrowRight') onSwap();
        if (e.key === 'ArrowLeft') onPrev();
      }}
      aria-label="Stack 3D de serveis"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {stackOrder.map((sIdx, depth) => {
          const s = services[sIdx];
          return (
            <motion.article
              key={s.num + '-' + idx} // forces re-mount on swap so new card animates in
              className="servei-card"
              custom={depth}
              initial={depth === 0 ? { y: 80, opacity: 0, rotateX: 14, scale: 0.94 } : false}
              animate={{
                y: depth * -22,
                x: depth * 14,
                z: depth * -60,
                opacity: depth === STACK_VISIBLE ? 0 : 1 - depth * 0.18,
                scale: 1 - depth * 0.04,
                rotateX: 0,
              }}
              exit={{ y: 280, opacity: 0, rotateX: -10, scale: 0.92 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ zIndex: STACK_VISIBLE - depth, transformStyle: 'preserve-3d' }}
            >
              <div className="servei-card-num">{s.num}</div>
              <div className="servei-card-cat">{s.cat}</div>
              <div className="servei-card-icon" aria-hidden>
                <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="url(#g)" /><defs><linearGradient id="g" x1="0" y1="0" x2="64" y2="64"><stop offset="0" stopColor="#f97316"/><stop offset="1" stopColor="#c2410c"/></linearGradient></defs></svg>
              </div>
              <h3 className="servei-card-name">{s.name}</h3>
              <p className="servei-card-desc">{s.desc}</p>
              <div className="servei-card-tags">
                {s.tags.map(t => <span key={t} className="servei-tag">{t}</span>)}
              </div>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
