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
    <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-lg">
      <p className="font-semibold text-slate-700">{label}</p>
      <p className="text-blue-700">Price: ₹{point.price.toFixed(2)}</p>
      <p className="text-violet-700">Volume: {(point.volume / 1000000).toFixed(2)}M</p>
      <p className={point.change >= 0 ? "text-emerald-600" : "text-rose-600"}>Move: {point.change.toFixed(2)}%</p>
    </div>
  );
}

export default function StockChart({ data }) {
  const highest = data.reduce((max, d) => (d.price > max.price ? d : max), data[0]);
  const lowest = data.reduce((min, d) => (d.price < min.price ? d : min), data[0]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-xl font-semibold text-slate-900">Price Action</h2>
      <p className="mb-4 text-sm text-slate-500">Intraday movement with volume confirmation.</p>

      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart data={data} margin={{ top: 10, right: 25, left: 5, bottom: 30 }}>
          <defs>
            <linearGradient id="priceGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.03} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
          <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" stroke="#64748b" domain={["dataMin - 2", "dataMax + 2"]} />
          <YAxis yAxisId="right" orientation="right" stroke="#64748b" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <Bar yAxisId="right" dataKey="volume" fill="#c4b5fd" barSize={18} name="Volume" radius={[4, 4, 0, 0]} />
          <Area yAxisId="left" type="monotone" dataKey="price" stroke="#1d4ed8" fill="url(#priceGlow)" strokeWidth={2.8} name="Price" />

          <ReferenceDot yAxisId="left" x={highest.time} y={highest.price} r={4} fill="#059669" stroke="none" />
          <ReferenceDot yAxisId="left" x={lowest.time} y={lowest.price} r={4} fill="#dc2626" stroke="none" />

          <Brush dataKey="time" height={20} stroke="#2563eb" travellerWidth={8} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
