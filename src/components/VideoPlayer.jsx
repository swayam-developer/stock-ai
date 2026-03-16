import { useEffect, useMemo, useState } from "react";

function getTotalDurationMs(scenes) {
  return scenes.reduce((sum, s) => sum + (s.durationMs || 0), 0);
}

export default function VideoPlayer({ videoData, isLoading, statusMessage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scenes = useMemo(() => videoData?.scenes || [], [videoData]);

  const totalDuration = useMemo(() => getTotalDurationMs(scenes), [scenes]);
  const progress = useMemo(() => {
    if (!scenes.length || !totalDuration) return 0;
    const elapsed = scenes.slice(0, activeIndex).reduce((s, x) => s + x.durationMs, 0);
    return Math.min(100, (elapsed / totalDuration) * 100);
  }, [activeIndex, scenes, totalDuration]);


  useEffect(() => {
    if (!scenes.length) return;

    let timeoutId;
    if (activeIndex < scenes.length - 1) {
      timeoutId = setTimeout(() => setActiveIndex((p) => p + 1), scenes[activeIndex].durationMs);
    }

    return () => clearTimeout(timeoutId);
  }, [activeIndex, scenes]);

  useEffect(() => {
    if (!scenes.length || typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const narration = scenes.map((s) => s.voiceText).join(". ");
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);

    return () => window.speechSynthesis.cancel();
  }, [scenes]);

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/90 p-6 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">AI Video Brief</h2>
        {videoData?.renderMode && <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">{videoData.renderMode}</span>}
      </div>

      {isLoading ? (
        <div className="text-slate-400">Generating scenes, syncing narration, and preparing video...</div>
      ) : scenes.length ? (
        <>
          <div className="relative h-[420px] overflow-hidden rounded-xl border border-slate-700 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{scenes[activeIndex]?.title}</p>
            <p className="mt-6 text-3xl font-bold leading-tight text-white transition-all duration-700">{scenes[activeIndex]?.text}</p>
            <p className="mt-6 text-sm text-slate-300">{scenes[activeIndex]?.subtext}</p>

            <div className="absolute bottom-0 left-0 h-1 bg-cyan-400 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <p className="mt-3 text-xs text-slate-400">Narration is auto-read via voice agent. Scene pacing is synchronized to AI timings.</p>
        </>
      ) : (
        <div className="text-amber-300 text-sm">{statusMessage || "Video could not be generated."}</div>
      )}
    </div>
  );
}
