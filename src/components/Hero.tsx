import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { PHONE } from '../data/services';
import './Hero.css';

function MorphBlob() {
  const mat = useRef<any>(null);
  useFrame(({ clock }) => {
    if (mat.current) {
      mat.current.distort = 0.35 + Math.sin(clock.elapsedTime * 0.4) * 0.08;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere args={[1.4, 128, 128]}>
        <MeshDistortMaterial
          ref={mat}
          color="#f97316"
          attach="material"
          distort={0.4}
          speed={1.6}
          roughness={0.1}
          metalness={0.6}
          envMapIntensity={1.4}
        />
      </Sphere>
    </Float>
  );
}

function OrbitParticles() {
  const group = useRef<THREE.Group>(null);
  const count = 80;
  const positions = useRef<THREE.Vector3[]>(
    Array.from({ length: count }, () => {
      const r = 2.2 + Math.random() * 1.4;
      const phi = Math.random() * Math.PI * 2;
      const theta = (Math.random() - 0.5) * Math.PI;
      return new THREE.Vector3(
        r * Math.cos(phi) * Math.cos(theta),
        r * Math.sin(theta),
        r * Math.sin(phi) * Math.cos(theta),
      );
    }),
  );
  useFrame((_, dt) => { if (group.current) group.current.rotation.y += dt * 0.08; });
  return (
    <group ref={group}>
      {positions.current.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.018 + Math.random() * 0.018, 8, 8]} />
          <meshBasicMaterial color={i % 5 === 0 ? '#0ea5e9' : '#f97316'} />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <Suspense fallback={null}>
          <Canvas
            dpr={[1, 1.6]}
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[3, 4, 5]} intensity={1.4} color="#fff" />
            <pointLight position={[-3, -2, 2]} intensity={1.2} color="#0ea5e9" />
            <pointLight position={[3, 2, 2]} intensity={1.4} color="#f97316" />
            <MorphBlob />
            <OrbitParticles />
            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </div>

      <div className="hero-grid container">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <span className="hero-pill">
            <span className="hero-pill-dot" />
            Obert des de 2007 · Sant Antoni de Calonge
          </span>
          <h1 className="hero-title">
            <span className="hero-line">Recupera el teu</span>
            <span className="hero-line hero-line-orange">moviment</span>
            <span className="hero-line">amb professionals</span>
          </h1>
          <p className="hero-desc">
            Fisioteràpia personalitzada i d'alta qualitat a la Costa Brava.
            Tractaments avançats per millorar la teva qualitat de vida.
          </p>
          <div className="hero-actions">
            <a href="#contacte" className="btn btn-primary">Demana cita</a>
            <a href="#serveis" className="btn btn-ghost">Veure serveis →</a>
          </div>
          <div className="hero-trust">
            <div className="hero-trust-avs" aria-hidden="true">
              {['#0ea5e9', '#f97316', '#0f172a'].map((c, i) => (
                <span key={i} className="hero-trust-av" style={{ background: c, zIndex: 3 - i }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>
                  </svg>
                </span>
              ))}
            </div>
            <p className="hero-trust-txt">
              Més de <strong>17 anys</strong> cuidant pacients<br />a Sant Antoni de Calonge
            </p>
          </div>
        </motion.div>
      </div>

      <a href="#sobre" className="hero-scroll" aria-label="Següent secció">
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </a>
    </section>
  );
}
