import { useState } from 'react';
import { useApiLogger } from './hooks/useApiLogger';
import { useAutoRefresh } from './hooks/useAutoRefresh';
import { computeStats, toCsv } from './lib/stats';
import Topbar from './components/Topbar';
import StatsRow from './components/StatsRow';
import LatencyChart from './components/LatencyChart';
import StatusBreakdown from './components/StatusBreakdown';
import LogTable from './components/LogTable';
import './App.css';

function downloadCsv(logs) {
  const csv = toCsv(logs);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `logs-api-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const { logs, liveState, ping, clearLogs } = useApiLogger();
  const [intervalMs, setIntervalMs] = useState(0);

  useAutoRefresh(ping, intervalMs);

  const stats = computeStats(logs);
  const isBusy = liveState === 'checking';

  return (
    <div className="dashboard">
      <div className="dashboard-inner">
        <Topbar
          liveState={liveState}
          onPing={ping}
          isBusy={isBusy}
          intervalMs={intervalMs}
          onChangeInterval={setIntervalMs}
          onClear={clearLogs}
          onExport={() => downloadCsv(logs)}
        />

        <StatsRow stats={stats} />

        <div className="panels-row">
          <LatencyChart logs={logs} />
          <StatusBreakdown logs={logs} />
        </div>

        <LogTable logs={logs} />

        <div className="footnote">
          Cada linha da tabela é uma verificação de <code>GET /</code> na API. Ela devolve a data/hora
          do servidor e uma mensagem de status — não existe um endpoint de logs dedicado, então este
          painel constrói o histórico a partir dessas verificações. Os registros ficam salvos no
          navegador (localStorage) entre sessões.
        </div>
      </div>
    </div>
  );
}
