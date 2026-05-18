import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from '../lib/gsap';
import { useGsap } from '../lib/useGsap';
import './Indiba.css';

/* Shader: concentric pulsing rings (radiofreq metaphor) */
const fragShader = `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    float r = length(uv);
    float waves = 0.0;
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float speed = 0.35 + fi * 0.06;
      float phase = fract(uTime * speed - fi * 0.3);
      float ringR = phase * 1.8;
      float thickness = 0.045 + 0.025 * (1.0 - phase);
      float intensity = (1.0 - phase) * smoothstep(thickness, 0.0, abs(r - ringR));
      waves += intensity * 0.55;
    }
    float core = exp(-r * 3.2) * 0.55;
    vec3 col = mix(vec3(0.91, 0.31, 0.11), vec3(0.72, 0.20, 0.04), r);
    col *= (waves + core);
    col += vec3(0.06, 0.10, 0.28) * smoothstep(1.0, 1.6, r) * 0.5;
    gl_FragColor = vec4(col, (waves + core) * 0.9);
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
        uniforms={{ uTime: { value: 0 } }}
      />
    </mesh>
  );
}

export default function Indiba() {
  const ref = useGsap<HTMLElement>((_ctx, el) => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.8,
        },
      });
      // Counter ticks up while pinned
      const numEl = el.querySelector<HTMLElement>('.indiba-num');
      const obj = { v: 0 };
      tl.to(obj, {
        v: 448,
        onUpdate: () => { if (numEl) numEl.textContent = Math.round(obj.v).toString(); },
        duration: 1,
        ease: 'none',
      }, 0);
      tl.fromTo('.indiba-glyph', { scale: 0.6, rotate: -20 }, { scale: 1, rotate: 0, ease: 'none' }, 0);
      tl.from('.indiba-stat', { y: 80, stagger: 0.15, ease: 'none' }, 0.4);
      tl.to('.indiba-canvas', { opacity: 1, ease: 'none' }, 0);
    });

    // Tech extras reveal
    gsap.from('.tec-extra', {
      y: 50,
      duration: 0.7,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '.indiba-extras', start: 'top 80%', once: true },
    });
  }, []);

  return (
    <section id="tecnologia" className="indiba" ref={ref}>
      <div className="indiba-stage">
        <div className="indiba-canvas">
          <Suspense fallback={null}>
            <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 4], fov: 40 }}>
              <WavesScene />
            </Canvas>
          </Suspense>
        </div>

        <div className="indiba-content">
          <div className="indiba-eyebrow">
            <span className="eyebrow">Tecnologia avançada</span>
            <span className="indiba-pill">Líder mundial</span>
          </div>

          <h2 className="indiba-h2">
            INDIBA<br />
            <em>Activ Therapy.</em>
          </h2>

          <div className="indiba-hero">
            <div className="indiba-glyph" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div className="indiba-freq">
              <span className="indiba-num">0</span>
              <span className="indiba-unit">kHz</span>
            </div>
          </div>

          <p className="indiba-desc">
            Radiofreqüència no-invasiva que activa el metabolisme cel·lular i accelera
            la recuperació tissular. La mateixa tecnologia que utilitzen
            <strong> clubs esportius d'elit </strong>i centres de referència.
          </p>

          <div className="indiba-stats">
            <div className="indiba-stat">
              <div className="indiba-stat-num">3×</div>
              <div className="indiba-stat-label">Recuperació<br />més ràpida</div>
            </div>
            <div className="indiba-stat">
              <div className="indiba-stat-num">CE</div>
              <div className="indiba-stat-label">Certificació<br />mèdica</div>
            </div>
            <div className="indiba-stat">
              <div className="indiba-stat-num">100%</div>
              <div className="indiba-stat-label">No invasiva<br />ni dolorosa</div>
            </div>
          </div>
        </div>
      </div>

      <div className="indiba-extras container">
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
