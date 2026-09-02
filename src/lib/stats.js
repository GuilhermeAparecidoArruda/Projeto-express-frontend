export function computeStats(logs) {
  const total = logs.length;
  if (total === 0) {
    return { total: 0, uptimePct: null, avgLatency: null, lastLog: null };
  }
  const successes = logs.filter((l) => l.ok);
  const uptimePct = (successes.length / total) * 100;
  const avgLatency = successes.length
    ? Math.round(successes.reduce((sum, l) => sum + l.latency, 0) / successes.length)
    : null;
  const lastLog = logs[0]; // logs vêm mais recente primeiro
  return { total, uptimePct, avgLatency, lastLog };
}

/** Dados prontos para o gráfico de latência, em ordem cronológica (mais antigo -> mais recente). */
export function toChartData(logs, limit = 40) {
  return logs
    .filter((l) => l.ok)
    .slice(0, limit)
    .reverse()
    .map((l) => ({
      time: l.clientTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      latency: l.latency,
    }));
}

export function toCsv(logs) {
  const header = 'horario_cliente,data_api,status_api,ok,latencia_ms';
  const rows = logs.map((l) =>
    [
      l.clientTime.toISOString(),
      l.apiDate ?? '',
      (l.apiStatus ?? '').replace(/,/g, ';'),
      l.ok ? 'true' : 'false',
      l.latency ?? '',
    ].join(',')
  );
  return [header, ...rows].join('\n');
}
