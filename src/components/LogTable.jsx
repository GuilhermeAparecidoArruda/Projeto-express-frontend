import { useMemo, useState } from 'react';

export default function LogTable({ logs }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'online' | 'offline'

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      if (filter === 'online' && !l.ok) return false;
      if (filter === 'offline' && l.ok) return false;
      if (!query.trim()) return true;
      const q = query.trim().toLowerCase();
      return (
        (l.apiDate ?? '').toLowerCase().includes(q) ||
        (l.apiStatus ?? '').toLowerCase().includes(q) ||
        l.clientTime.toLocaleTimeString('pt-BR').includes(q)
      );
    });
  }, [logs, query, filter]);

  return (
    <div className="panel table-panel">
      <div className="table-toolbar">
        <div className="panel-title">registros</div>
        <div className="table-controls">
          <div className="filter-group">
            {['all', 'online', 'offline'].map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'todos' : f}
              </button>
            ))}
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="buscar por horário ou mensagem…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>horário</th>
              <th>status</th>
              <th>data/hora retornada pela API</th>
              <th>latência</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="table-empty">
                  nenhum registro encontrado
                </td>
              </tr>
            ) : (
              filtered.map((l) => (
                <tr key={l.id}>
                  <td>{l.clientTime.toLocaleTimeString('pt-BR')}</td>
                  <td>
                    <span className={`badge ${l.ok ? 'online' : 'offline'}`}>{l.ok ? 'online' : 'offline'}</span>
                  </td>
                  <td className="dim">{l.apiDate ?? l.apiStatus ?? '—'}</td>
                  <td>{l.ok ? `${l.latency} ms` : '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        {filtered.length} de {logs.length} registros
      </div>
    </div>
  );
}
