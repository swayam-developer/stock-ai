import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [ticker,setTicker] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if(!ticker) return;
    navigate(`/dashboard?ticker=${ticker}`);
  };

  return (

    <div className="flex flex-col items-center mt-32">

      <h1 className="text-4xl font-bold mb-6">
        AI Stock Market Brief Generator
      </h1>

      <p className="text-gray-400 mb-8">
        Get AI-powered 90-second stock analysis videos
      </p>

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Enter ticker (RELIANCE, TCS...)"
          className="px-6 py-3 rounded-lg bg-slate-800 border border-slate-700"
          value={ticker}
          onChange={(e)=>setTicker(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 px-6 py-3 rounded-lg"
        >
          Generate Brief
        </button>

      </div>

    </div>
  );
}