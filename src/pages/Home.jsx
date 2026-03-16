import { Sparkles, Video } from "lucide-react";
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
        <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          <Sparkles className="size-4" />
          Market Briefs for investors
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900">
          Turn live stock data into a concise narrated video update.
        </h1>
        <p className="mt-4 max-w-xl text-slate-600">
          Get a practical dashboard with chart insights, latest headlines, and
          generated video summary from the Groq script pipeline.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="Enter ticker"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <button
            onClick={handleSearch}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 class="text-xl font-bold text-gray-800 mb-4">
          Everything you need to understand the market
        </h2>

        <p class="text-gray-600 mb-6">
          FinVise combines stock data, news context, and AI-driven insights in
          one simple workflow.
        </p>
        <div class="space-y-4">
          <div>
            <h3 class="font-semibold text-lg">Clear market insights</h3>
            <p class="text-gray-600 text-sm">
              Combine charts, news, and context to understand why prices move.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-lg">AI-powered summaries</h3>
            <p class="text-gray-600 text-sm">
              Save hours of research with concise insights generated
              automatically.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-lg">All in one workflow</h3>
            <p class="text-gray-600 text-sm">
              Analyze data, read news, and generate video explanations in one
              place.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
