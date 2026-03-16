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
    if (isAuthenticated) {
      navigate(target);
    } else {
      navigate("/login", { state: { from: target } });
    }
  };

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
      <section>
        <p className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-wider text-cyan-300">Realtime AI Market Copilot</p>
        <h1 className="mt-5 text-5xl font-black leading-tight">Generate cinematic stock video briefs from live market data.</h1>
        <p className="mt-5 max-w-xl text-slate-300">Search any Indian ticker and get an analyst-style chart + auto-generated narrated video summary from live prices and latest headlines.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value)} placeholder="Enter ticker (RELIANCE, TCS...)" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-5 py-3" />
          <button onClick={handleSearch} className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-900 hover:bg-cyan-400">Open Dashboard</button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-2xl">
        <h2 className="text-2xl font-bold">What you get</h2>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li>• Institutional-grade charting with trend zones and volume overlays.</li>
          <li>• AI narrative generated with Groq based on live stock + latest news.</li>
          <li>• Auto-paced animated video scene playback with voice narration.</li>
        </ul>
      </section>
    </main>
  );
}
