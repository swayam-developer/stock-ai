import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [ticker, setTicker] = useState("RELIANCE");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSearch = () => {
    if (!ticker) return;
    const target = `/dashboard?ticker=${encodeURIComponent(ticker.toUpperCase())}`;

    if (isAuthenticated) navigate(target);
    else navigate("/login", { state: { from: target } });
  };

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center">
      <section>
        <p className="text-sm font-medium text-slate-500">Market Briefs for everyday investors</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900">Turn live stock data into a concise narrated video update.</h1>
        <p className="mt-4 max-w-xl text-slate-600">Get a practical dashboard with chart insights, latest headlines, and a generated video summary from the Groq script pipeline.</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="Enter ticker"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
          />
          <button onClick={handleSearch} className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800">Open dashboard</button>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Included in one flow</h2>
        <ul className="mt-4 space-y-2 text-slate-600">
          <li>• Login-protected dashboard</li>
          <li>• Advanced chart + news context</li>
          <li>• Auto-generated scripted video with scene timing</li>
        </ul>
      </section>
    </main>
  );
}
