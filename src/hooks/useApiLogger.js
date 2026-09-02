import { useCallback, useEffect, useRef, useState } from 'react';
import { API_URL, REQUEST_TIMEOUT_MS, LOG_LIMIT } from '../lib/config';

const STORAGE_KEY = 'dashboard-logs:entries';

function loadStoredLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((e) => ({ ...e, clientTime: new Date(e.clientTime) }));
  } catch {
    return [];
  }
}

function persistLogs(logs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs.slice(0, LOG_LIMIT)));
  } catch {
    // localStorage indisponível (modo privado, quota etc) — segue só em memória
  }
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `${Date.now()}-${idCounter}`;
}

/**
 * Faz o ping na API e mantém o histórico de "logs" (uma linha por verificação),
 * incluindo a data/hora que a própria API devolveu no corpo da resposta.
 */
export function useApiLogger() {
  const [logs, setLogs] = useState(() => loadStoredLogs());
  const [liveState, setLiveState] = useState('idle'); // 'idle' | 'checking' | 'online' | 'offline'
  const inFlight = useRef(false);

  useEffect(() => {
    persistLogs(logs);
  }, [logs]);

  const ping = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLiveState('checking');

    const start = performance.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const clientTime = new Date();

    try {
      const res = await fetch(API_URL, { signal: controller.signal, cache: 'no-store' });
      clearTimeout(timeoutId);
      const latency = Math.round(performance.now() - start);
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();

      setLiveState('online');
      setLogs((prev) =>
        [
          {
            id: nextId(),
            clientTime,
            apiDate: data.date ?? null,
            apiStatus: data.status ?? null,
            ok: true,
            latency,
          },
          ...prev,
        ].slice(0, LOG_LIMIT)
      );
    } catch (err) {
      clearTimeout(timeoutId);
      const reason = err.name === 'AbortError' ? 'tempo limite excedido' : 'sem resposta';
      setLiveState('offline');
      setLogs((prev) =>
        [
          {
            id: nextId(),
            clientTime,
            apiDate: null,
            apiStatus: reason,
            ok: false,
            latency: null,
          },
          ...prev,
        ].slice(0, LOG_LIMIT)
      );
    } finally {
      inFlight.current = false;
    }
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return { logs, liveState, ping, clearLogs };
}
