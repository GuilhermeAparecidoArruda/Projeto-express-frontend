export default function StatsRow({ stats }) {
  const uptimeLabel =
    stats.uptimePct === null
      ? '—'
      : `${stats.uptimePct.toFixed(stats.uptimePct === 100 || stats.uptimePct === 0 ? 0 : 1)}%`;
  const lastLabel = stats.lastLog ? stats.lastLog.clientTime.toLocaleTimeString('pt-BR') : '—';

  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-label">total de registros</div>
        <div className="stat-value">{stats.total}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">uptime</div>
        <div className={`stat-value ${stats.uptimePct >= 99.5 ? 'amber' : ''}`}>{uptimeLabel}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">latência média</div>
        <div className="stat-value">{stats.avgLatency !== null ? `${stats.avgLatency} ms` : '—'}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">último registro</div>
        <div className="stat-value small">{lastLabel}</div>
      </div>
    </div>
  );
}
