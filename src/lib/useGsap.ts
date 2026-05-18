import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from './gsap';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Run a GSAP context scoped to an element ref. Cleanup on unmount.
 * Reduced-motion users skip animation setup.
 *
 * IMPORTANT: setup errors are caught and logged so a broken animation
 * never blanks the page (selectors scoped to the element via gsap.context).
 */
export function useGsap<T extends HTMLElement = HTMLElement>(
  setup: (ctx: gsap.Context, el: T) => void,
  deps: any[] = [],
) {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: gsap.Context | undefined;
    try {
      ctx = gsap.context(() => {
        try {
          setup(ctx as gsap.Context, el);
        } catch (err) {
          console.error('[useGsap] setup error:', err);
        }
      }, el);
    } catch (err) {
      console.error('[useGsap] context error:', err);
    }

    return () => { try { ctx?.revert(); } catch {} };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
