export default function NewsList({ news }) {
  return (
    <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-xl">
      <h2 className="mb-4 text-xl font-semibold">Latest News Flow</h2>

      <div className="space-y-4">
        {news.map((item, i) => (
          <a key={i} href={item.url} target="_blank" rel="noreferrer" className="block rounded-lg border border-slate-700 bg-slate-950 p-4 transition hover:border-cyan-400/50">
            <p className="font-medium text-slate-100">{item.title}</p>
            <p className="mt-1 text-sm text-slate-400">{item.source}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
