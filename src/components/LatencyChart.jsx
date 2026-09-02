import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { toChartData } from '../lib/stats';

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-time">{label}</div>
      <div className="chart-tooltip-value">{payload[0].value} ms</div>
    </div>
  );
}

export default function LatencyChart({ logs }) {
  const data = toChartData(logs);

  return (
    <div className="panel chart-panel">
      <div className="panel-title">latência dos últimos registros</div>
      {data.length < 2 ? (
        <div className="chart-empty">registre pelo menos 2 verificações para ver o gráfico</div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="#3a322a" strokeDasharray="0" vertical={false} />
            <XAxis dataKey="time" stroke="#7a7061" fontSize={10.5} tickLine={false} axisLine={{ stroke: '#3a322a' }} />
            <YAxis stroke="#7a7061" fontSize={10.5} tickLine={false} axisLine={false} width={48} />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#ffb000', strokeWidth: 1, strokeOpacity: 0.3 }} />
            <Line
              type="monotone"
              dataKey="latency"
              stroke="#ffb000"
              strokeWidth={2}
              dot={{ r: 2.5, fill: '#ffb000', strokeWidth: 0 }}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
