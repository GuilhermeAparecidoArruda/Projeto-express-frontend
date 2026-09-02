export default function StatusBreakdown({ logs }) {
  const total = logs.length;
  const online = logs.filter((l) => l.ok).length;
  const offline = total - online;
  const onlinePct = total ? (online / total) * 100 : 0;
  const offlinePct = total ? (offline / total) * 100 : 0;

  return (
    <div className="panel breakdown-panel">
      <div className="panel-title">distribuição de status</div>
      {total === 0 ? (
        <div className="chart-empty">sem registros ainda</div>
      ) : (
        <>
          <div className="breakdown-bar">
            <div className="breakdown-seg online" style={{ width: `${onlinePct}%` }} />
            <div className="breakdown-seg offline" style={{ width: `${offlinePct}%` }} />
          </div>
          <div className="breakdown-legend">
            <div className="breakdown-legend-item">
              <span className="swatch online" /> online <b>{online}</b>
            </div>
            <div className="breakdown-legend-item">
              <span className="swatch offline" /> offline <b>{offline}</b>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
