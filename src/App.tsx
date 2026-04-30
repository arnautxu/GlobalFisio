import { useEffect } from 'react';
import Lenis from 'lenis';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Sobre from './components/Sobre';
import Serveis from './components/Serveis';
import Indiba from './components/Indiba';
import Mutualitats from './components/Mutualitats';
import Horaris from './components/Horaris';
import Contacte from './components/Contacte';
import Footer from './components/Footer';
import FloatBtn from './components/FloatBtn';

export default function App() {
  // Smooth scroll (Emil-style buttery)
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf: number;
    const tick = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Saltar al contingut</a>
      <Nav />
      <main id="main">
        <Hero />
        <Sobre />
        <Serveis />
        <Indiba />
        <Mutualitats />
        <Horaris />
        <Contacte />
      </main>
      <Footer />
      <FloatBtn />
    </>
  );
}
