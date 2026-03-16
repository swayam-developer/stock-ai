import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchStock, fetchNews, generateSummary, generateVideo } from "../services/api";

import StockChart from "../components/StockChart";
import NewsList from "../components/NewsList";
import VideoPlayer from "../components/VideoPlayer";

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
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-2">
      <div>
        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-slate-500 text-sm">Tracking</p>
          <h1 className="text-3xl font-semibold text-slate-900">{stock.symbol}</h1>
          <p className="mt-1 text-slate-600">₹{stock.price} · {stock.change?.toFixed(2)}%</p>
        </div>

        <StockChart data={intradayData} />
        <NewsList news={news} />
      </div>

      <div className="space-y-6">
        <VideoPlayer videoData={videoData} isLoading={isVideoLoading} statusMessage={videoStatusMessage} />
      </div>
    </div>
  );
}
