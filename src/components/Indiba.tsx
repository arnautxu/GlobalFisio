import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import './Indiba.css';

// Shader: concentric pulsing rings (radiofreq metaphor)
const fragShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    float r = length(uv);
    // Multiple pulsing rings
    float waves = 0.0;
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      float speed = 0.4 + fi * 0.05;
      float phase = fract(uTime * speed - fi * 0.3);
      float ringR = phase * 1.8;
      float thickness = 0.04 + 0.02 * (1.0 - phase);
      float intensity = (1.0 - phase) * smoothstep(thickness, 0.0, abs(r - ringR));
      waves += intensity * 0.6;
    }
    // Soft center glow
    float core = exp(-r * 3.5) * 0.6;
    vec3 col = mix(vec3(0.97, 0.45, 0.09), vec3(0.55, 0.20, 0.05), r);
    col *= (waves + core);
    // Slight blue rim
    col += vec3(0.06, 0.12, 0.18) * smoothstep(1.2, 1.6, r) * 0.4;
    gl_FragColor = vec4(col, waves + core);
  }
`;

const vertShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function WavesScene() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame((_, dt) => { if (mat.current) mat.current.uniforms.uTime.value += dt; });
  return (
    <mesh>
      <planeGeometry args={[6, 6]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertShader}
        fragmentShader={fragShader}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) },
        }}
      />
    </mesh>
  );
}

function useCounter(target: number, trigger: boolean, dur = 1500) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf: number, start: number;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, trigger]);
  return v;
}

export default function Indiba() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const freq = useCounter(448, inView);

  return (
    <section id="tecnologia" className="section indiba" ref={ref}>
      <div className="container indiba-header">
        <span className="eyebrow" style={{ justifyContent: 'center' }}>Tecnologia Avançada</span>
        <h2 className="indiba-h2">
          INDIBA &amp; Electroteràpia<br /><span className="blue">d'última generació</span>
        </h2>
        <p className="indiba-sub">
          Incorporem les tecnologies més avançades per oferir tractaments més eficaços,
          ràpids i amb millors resultats.
        </p>
      </div>

      <motion.div
        className="indiba-card container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="indiba-canvas">
          <Suspense fallback={null}>
            <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 4], fov: 40 }}>
              <WavesScene />
            </Canvas>
          </Suspense>
        </div>

        <div className="indiba-content">
          <div className="indiba-meta">
            <span className="indiba-pill">Líder mundial</span>
            <span className="indiba-cat">Radiofreqüència 448 kHz</span>
          </div>

          <div className="indiba-hero">
            <div className="indiba-glyph" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div className="indiba-freq">
              <span className="indiba-num">{freq}</span>
              <span className="indiba-unit">kHz</span>
            </div>
          </div>

          <h3 className="indiba-title">INDIBA Activ Therapy</h3>
          <p className="indiba-desc">
            Tecnologia de radiofreqüència no-invasiva que activa el metabolisme cel·lular
            accelerant la recuperació tissular. La mateixa tecnologia que utilitzen
            <strong> clubs esportius d'elit</strong> i centres de rehabilitació de referència.
          </p>

          <div className="indiba-stats">
            <div className="indiba-stat">
              <div className="indiba-stat-num">3×</div>
              <div className="indiba-stat-label">Recuperació més ràpida</div>
            </div>
            <div className="indiba-stat">
              <div className="indiba-stat-num">CE</div>
              <div className="indiba-stat-label">Certificació mèdica</div>
            </div>
            <div className="indiba-stat">
              <div className="indiba-stat-num">100%</div>
              <div className="indiba-stat-label">No invasiva</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container indiba-extras">
        <article className="tec-extra">
          <div className="tec-extra-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          </div>
          <div>
            <div className="tec-extra-eyebrow">Control del dolor</div>
            <h4>Electroteràpia Especialitzada</h4>
            <p>TENS, corrents interferencials i electroestimulació per al control del dolor i la recuperació muscular.</p>
          </div>
        </article>
        <article className="tec-extra">
          <div className="tec-extra-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </div>
          <div>
            <div className="tec-extra-eyebrow">Antigravitatori</div>
            <h4>Hidroteràpia</h4>
            <p>Instal·lacions aquàtiques especialitzades per a tractaments en medi aquàtic.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
