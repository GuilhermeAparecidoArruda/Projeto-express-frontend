import { AUTO_REFRESH_OPTIONS } from '../lib/config';

const LIVE_LABEL = {
  idle: 'Aguardando',
  checking: 'Verificando',
  online: 'Online',
  offline: 'Offline',
};

export default function Topbar({ liveState, onPing, isBusy, intervalMs, onChangeInterval, onClear, onExport }) {
  return (
    <div className="topbar">
      <div className="topbar-title">
        <h1>Dashboard de logs</h1>
        <div className="topbar-sub">
          projeto-express-backend-1.onrender.com
          <span className={`live-pill ${liveState}`}>
            <span className="live-dot" />
            {LIVE_LABEL[liveState]}
          </span>
        </div>
      </div>

      <div className="topbar-actions">
        <select value={intervalMs} onChange={(e) => onChangeInterval(Number(e.target.value))}>
          {AUTO_REFRESH_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              atualizar: {opt.label}
            </option>
          ))}
        </select>
        <button className="btn ghost" onClick={onExport}>
          Exportar CSV
        </button>
        <button className="btn ghost danger" onClick={onClear}>
          Limpar logs
        </button>
        <button className="btn primary" onClick={onPing} disabled={isBusy}>
          {isBusy ? 'Registrando…' : 'Novo registro'}
        </button>
      </div>
    </div>
  );
}
