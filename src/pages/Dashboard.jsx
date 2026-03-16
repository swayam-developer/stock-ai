import { CandlestickChart } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NewsList from "../components/NewsList";
import StockChart from "../components/StockChart";
import VideoPlayer from "../components/VideoPlayer";
import { fetchStock, fetchNews, generateSummary, generateVideo } from "../services/api";

function buildIntradaySeries(stock) {
  const base = stock.price || 100;
  const steps = [
    ["09:15", -1.8, 1800000],
    ["10:00", -0.7, 2300000],
    ["10:45", 0.3, 2100000],
    ["11:30", 1.1, 2500000],
    ["12:15", 0.2, 1700000],
    ["13:00", 1.6, 2800000],
    ["13:45", 2.4, 3100000],
    ["14:30", 1.8, 2600000],
    ["15:15", 0.9, 3400000]
  ];

  return steps.map(([time, delta, volume]) => ({
    time,
    price: base + delta,
    volume,
    change: (delta / base) * 100
  }));
}

export default function Dashboard() {
  const [stock, setStock] = useState(null);
  const [news, setNews] = useState([]);
  const [videoData, setVideoData] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoStatusMessage, setVideoStatusMessage] = useState("");
  const [searchParams] = useSearchParams();

  const ticker = (searchParams.get("ticker") || "RELIANCE").toUpperCase();

  useEffect(() => {
    async function loadData() {
      try {
        setIsVideoLoading(true);
        const [stockRes, newsRes] = await Promise.all([fetchStock(ticker), fetchNews(ticker)]);
        setStock(stockRes.data);
        setNews(newsRes.data);

        const summaryRes = await generateSummary({ stock: stockRes.data, news: newsRes.data });
        const videoRes = await generateVideo({ script: summaryRes.data.script, stock: stockRes.data, ticker });

        setVideoData(videoRes.data);
        setVideoStatusMessage(videoRes.data?.message || "");
      } catch (err) {
        console.error(err);
        setVideoStatusMessage("We couldn't generate your video right now. Please retry in a moment.");
      } finally {
        setIsVideoLoading(false);
      }
    }

    loadData();
  }, [ticker]);

  if (!stock) return <div className="p-10 text-slate-600">Loading dashboard...</div>;

  const intradayData = buildIntradaySeries(stock);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:flex lg:gap-8">
        <div>
          <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Tracking</p>
            <h1 className="mt-1 flex items-center gap-2 text-3xl font-semibold text-slate-900"><CandlestickChart className="size-8 text-blue-600" />{stock.symbol}</h1>
            <p className="mt-2 text-slate-600">
              ₹{stock.price} · <span className={stock.change >= 0 ? "text-emerald-600" : "text-rose-600"}>{stock.change?.toFixed(2)}%</span>
            </p>
          </div>

          <StockChart data={intradayData} />
          <NewsList news={news} />
        </div>

        <div className="space-y-6">
          <VideoPlayer videoData={videoData} isLoading={isVideoLoading} statusMessage={videoStatusMessage} />
        </div>
      </div>
    </div>
  );
}
