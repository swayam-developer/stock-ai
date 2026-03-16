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
    <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-sm">
      <p className="font-semibold text-slate-700">{label}</p>
      <p>Price: ₹{point.price.toFixed(2)}</p>
      <p>Volume: {(point.volume / 1000000).toFixed(2)}M</p>
      <p className={point.change >= 0 ? "text-emerald-600" : "text-rose-600"}>Move: {point.change.toFixed(2)}%</p>
    </div>
  );
}

export default function StockChart({ data }) {
  const highest = data.reduce((max, d) => (d.price > max.price ? d : max), data[0]);
  const lowest = data.reduce((min, d) => (d.price < min.price ? d : min), data[0]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Price action</h2>

      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart data={data} margin={{ top: 10, right: 25, left: 5, bottom: 30 }}>
          <defs>
            <linearGradient id="priceGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.03} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" stroke="#64748b" domain={["dataMin - 2", "dataMax + 2"]} />
          <YAxis yAxisId="right" orientation="right" stroke="#64748b" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <Bar yAxisId="right" dataKey="volume" fill="#cbd5e1" barSize={18} name="Volume" radius={[4, 4, 0, 0]} />
          <Area yAxisId="left" type="monotone" dataKey="price" stroke="#0284c7" fill="url(#priceGlow)" strokeWidth={2.5} name="Price" />

          <ReferenceDot yAxisId="left" x={highest.time} y={highest.price} r={4} fill="#16a34a" stroke="none" />
          <ReferenceDot yAxisId="left" x={lowest.time} y={lowest.price} r={4} fill="#dc2626" stroke="none" />

          <Brush dataKey="time" height={20} stroke="#0284c7" travellerWidth={8} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
