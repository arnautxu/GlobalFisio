import { useEffect } from 'react';
import Lenis from 'lenis';
import { registerGsap, bridgeLenisToGsap, ScrollTrigger } from './lib/gsap';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Sobre from './components/Sobre';
import Confianca from './components/Confianca';
import Serveis from './components/Serveis';
import Indiba from './components/Indiba';
import Horaris from './components/Horaris';
import Contacte from './components/Contacte';
import Footer from './components/Footer';
import FloatBtn from './components/FloatBtn';

export default function App() {
  useEffect(() => {
    registerGsap();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      // No smooth scroll for reduced-motion users; ScrollTrigger uses native scroll.
      return;
    }

    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    bridgeLenisToGsap(lenis);
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Saltar al contingut</a>
      <Nav />
      <main id="main">
        <Hero />
        <Sobre />
        <Confianca />
        <Serveis />
        <Indiba />
        <Horaris />
        <Contacte />
      </main>
      <Footer />
      <FloatBtn />
    </>
  );
}
