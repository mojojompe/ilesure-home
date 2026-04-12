import { useEffect, useRef, useCallback } from 'react';

interface MagneticOptions {
  strength?: number;
  ease?: number;
}

export function useMagnetic(options: MagneticOptions = {}) {
  const { strength = 0.5, ease = 0.1 } = options;
  const ref = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  }, []);

  const setRef = useCallback((el: HTMLElement | null) => {
    if (ref.current) {
      ref.current.removeEventListener('mousemove', handleMouseMove);
      ref.current.removeEventListener('mouseleave', handleMouseLeave);
    }
    
    ref.current = el;
    
    if (ref.current) {
      ref.current.addEventListener('mousemove', handleMouseMove);
      ref.current.addEventListener('mouseleave', handleMouseLeave);
      ref.current.style.transition = `transform ${ease}s ease-out`;
    }
  }, [handleMouseMove, handleMouseLeave, ease]);

  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousemove', handleMouseMove);
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  return setRef;
}
