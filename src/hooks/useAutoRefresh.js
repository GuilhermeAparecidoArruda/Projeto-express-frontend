import { useEffect, useRef } from 'react';

/** Dispara `callback` a cada `intervalMs` enquanto intervalMs > 0. */
export function useAutoRefresh(callback, intervalMs) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!intervalMs) return undefined;
    const id = setInterval(() => savedCallback.current(), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
}
