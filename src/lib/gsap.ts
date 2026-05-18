import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register at module load — guarantees ScrollTrigger is available
// before ANY component's useLayoutEffect runs (child layout effects fire
// before parent effects, so doing this from App.tsx is too late).
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function registerGsap() {
  // No-op kept for API compatibility (registration now happens on import).
}

/**
 * Bridge Lenis's RAF tick to GSAP's ticker so ScrollTrigger reads the same
 * scroll values Lenis is interpolating. Without this, pinned sections will
 * jitter because GSAP and Lenis tick on different schedules.
 */
export function bridgeLenisToGsap(lenis: any) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000); // GSAP delivers seconds; Lenis wants ms
  });
  gsap.ticker.lagSmoothing(0);
}

/** Helper: split a string into per-word spans for staggered reveals. */
export function splitWords(text: string): { word: string; isSpace: boolean }[] {
  return text.split(/(\s+)/).map((w) => ({
    word: w === ' ' ? ' ' : w,
    isSpace: /\s+/.test(w),
  }));
}

export { gsap, ScrollTrigger };
