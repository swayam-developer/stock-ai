import { useEffect, useState } from "react";
import { fetchStock, fetchNews, generateSummary, generateVideo } from "../services/api";

import StockChart from "../components/StockChart";
import NewsList from "../components/NewsList";
import VideoPlayer from "../components/VideoPlayer";

export default function Dashboard(){

  const [stock,setStock] = useState(null);
  const [news,setNews] = useState([]);
  const [script,setScript] = useState("");
  const [videoUrl,setVideoUrl] = useState("");

  const ticker = "RELIANCE";

  useEffect(()=>{

    async function loadData(){

      try{

        const stockRes = await fetchStock(ticker);
        const newsRes = await fetchNews(ticker);

        setStock(stockRes.data);
        setNews(newsRes.data);

        const summaryRes = await generateSummary({
          stock: stockRes.data,
          news: newsRes.data
        });

        const aiScript = summaryRes.data.script;

        setScript(aiScript);

        const videoRes = await generateVideo({
          script: aiScript
        });

        setVideoUrl(videoRes.data.videoUrl);

      }catch(err){
        console.error(err);
      }

    }

    loadData();

  },[]);

  if(!stock) return <div className="p-10">Loading...</div>;

  return(

    <div className="p-10 grid grid-cols-2 gap-8">

      <div>

        <StockChart data={[
          {time:"10:00",price:stock.price-20},
          {time:"11:00",price:stock.price-10},
          {time:"12:00",price:stock.price}
        ]}/>

        <NewsList news={news}/>

      </div>

      <div className="space-y-6">

        <VideoPlayer videoUrl={videoUrl}/>

        <div className="bg-slate-800 p-6 rounded-xl">

          <h2 className="text-xl mb-4">
            AI Script
          </h2>

          <p className="text-gray-300 whitespace-pre-line">
            {script}
          </p>

        </div>

      </div>

    </div>

  );

}