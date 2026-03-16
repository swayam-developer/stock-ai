import { Newspaper } from "lucide-react";

export default function NewsList({ news }) {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-900"><Newspaper className="size-5 text-blue-600" />Latest headlines</h2>

      <div className="space-y-3">
        {news.map((item, i) => (
          <a key={i} href={item.url} target="_blank" rel="noreferrer" className="block rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50">
            <p className="font-medium text-slate-900">{item.title}</p>
            <p className="mt-1 text-sm text-slate-500">{item.source}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
