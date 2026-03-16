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
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const ticker = (searchParams.get("ticker") || "RELIANCE").toUpperCase();

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        if (isMounted) {
          setIsDashboardLoading(true);
          setIsVideoLoading(true);
          setVideoData(null);
          setVideoStatusMessage("");
        }

        const [stockResult, newsResult] = await Promise.allSettled([fetchStock(ticker), fetchNews(ticker)]);

        if (stockResult.status !== "fulfilled") {
          throw stockResult.reason;
        }

        const stockData = stockResult.value.data;
        const newsData = newsResult.status === "fulfilled" ? newsResult.value.data : [];

        if (!isMounted) return;
        setStock(stockData);
        setNews(newsData);
        setIsDashboardLoading(false);

        try {
          const summaryRes = await generateSummary({ stock: stockData, news: newsData });
          const videoRes = await generateVideo({ script: summaryRes.data.script, stock: stockData, ticker });

          if (!isMounted) return;
          setVideoData(videoRes.data);
          setVideoStatusMessage(videoRes.data?.message || "");
        } catch (videoError) {
          console.error(videoError);
          if (isMounted) {
            setVideoStatusMessage("Video generation is taking longer than expected. Please try again.");
          }
        } finally {
          if (isMounted) setIsVideoLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setIsDashboardLoading(false);
          setIsVideoLoading(false);
          setVideoStatusMessage("We couldn't load dashboard data. Please retry in a moment.");
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [ticker]);

  if (isDashboardLoading) return <div className="p-10 text-slate-600">Loading dashboard...</div>;
  if (!stock) return <div className="p-10 text-rose-600">Unable to load stock details.</div>;

  const intradayData = buildIntradaySeries(stock);

  return (
    <div className="min-h-[calc(100vh-74px)] bg-slate-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[1.25fr,1fr]">
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
