export default function NewsList({ news }) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Latest headlines</h2>

      <div className="space-y-3">
        {news.map((item, i) => (
          <a key={i} href={item.url} target="_blank" rel="noreferrer" className="block rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">
            <p className="font-medium text-slate-900">{item.title}</p>
            <p className="mt-1 text-sm text-slate-500">{item.source}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
