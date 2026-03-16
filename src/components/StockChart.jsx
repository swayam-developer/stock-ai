import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Brush
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/95 p-3 text-xs">
      <p className="font-semibold text-cyan-300">{label}</p>
      <p>Price: ₹{point.price.toFixed(2)}</p>
      <p>Volume: {(point.volume / 1000000).toFixed(2)}M</p>
      <p className={point.change >= 0 ? "text-emerald-400" : "text-rose-400"}>Move: {point.change.toFixed(2)}%</p>
    </div>
  );
}

export default function StockChart({ data }) {
  const highest = data.reduce((max, d) => (d.price > max.price ? d : max), data[0]);
  const lowest = data.reduce((min, d) => (d.price < min.price ? d : min), data[0]);

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-xl">
      <h2 className="mb-4 text-xl font-semibold">Price Action & Liquidity</h2>

      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart data={data} margin={{ top: 10, right: 25, left: 5, bottom: 30 }}>
          <defs>
            <linearGradient id="priceGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" stroke="#94a3b8" domain={["dataMin - 2", "dataMax + 2"]} />
          <YAxis yAxisId="right" orientation="right" stroke="#64748b" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <Bar yAxisId="right" dataKey="volume" fill="#334155" barSize={18} name="Volume" radius={[4, 4, 0, 0]} />
          <Area yAxisId="left" type="monotone" dataKey="price" stroke="#22d3ee" fill="url(#priceGlow)" strokeWidth={2.5} name="Price" />

          <ReferenceDot yAxisId="left" x={highest.time} y={highest.price} r={5} fill="#10b981" stroke="none" />
          <ReferenceDot yAxisId="left" x={lowest.time} y={lowest.price} r={5} fill="#f43f5e" stroke="none" />

          <Brush dataKey="time" height={20} stroke="#22d3ee" travellerWidth={8} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
