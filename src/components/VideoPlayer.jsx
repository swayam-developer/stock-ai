import { Loader2, PlayCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

function getTotalDurationMs(scenes) {
  return scenes.reduce((sum, s) => sum + (s.durationMs || 0), 0);
}

function wrapText(ctx, text, maxWidth, x, y, lineHeight) {
  const words = (text || "").split(" ");
  let line = "";
  let cursorY = y;

  for (let i = 0; i < words.length; i += 1) {
    const testLine = `${line}${words[i]} `;
    const width = ctx.measureText(testLine).width;
    if (width > maxWidth && i > 0) {
      ctx.fillText(line, x, cursorY);
      line = `${words[i]} `;
      cursorY += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, cursorY);
}

async function createSceneVideo(scenes) {
  if (!scenes.length || typeof window === "undefined" || !window.MediaRecorder) return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  const stream = canvas.captureStream(30);

  const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
  const chunks = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  const renderScene = (scene) => new Promise((resolve) => {
    const duration = scene.durationMs || 12000;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min(1, (now - start) / duration);
      const fade = Math.min(1, progress * 2.2);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#0f172a");
      gradient.addColorStop(1, "#111827");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(37, 99, 235, 0.14)";
      ctx.fillRect(68, 56, canvas.width - 136, canvas.height - 112);

      ctx.fillStyle = `rgba(148,163,184,${fade})`;
      ctx.font = "600 26px Inter";
      ctx.fillText(scene.title || "Market update", 120, 130);

      ctx.fillStyle = `rgba(248,250,252,${fade})`;
      ctx.font = "700 52px Inter";
      wrapText(ctx, scene.text, 1030, 120, 250, 62);

      ctx.fillStyle = "#cbd5e1";
      ctx.font = "500 27px Inter";
      wrapText(ctx, scene.subtext || "", 1030, 120, 570, 35);

      ctx.fillStyle = "#22d3ee";
      ctx.fillRect(0, canvas.height - 8, canvas.width * progress, 8);

      if (progress < 1) requestAnimationFrame(frame);
      else resolve();
    }

    requestAnimationFrame(frame);
  });

  recorder.start(500);
  for (const scene of scenes) {
    await renderScene(scene);
  }
  recorder.stop();

  return new Promise((resolve) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      resolve(URL.createObjectURL(blob));
    };
  });
}

export default function VideoPlayer({ videoData, isLoading, statusMessage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState("");
  const [isRenderingVideo, setIsRenderingVideo] = useState(false);
  const narrationStartedRef = useRef(false);
  const scenes = useMemo(() => videoData?.scenes || [], [videoData]);

  const totalDuration = useMemo(() => getTotalDurationMs(scenes), [scenes]);
  const progress = useMemo(() => {
    if (!scenes.length || !totalDuration) return 0;
    const elapsed = scenes.slice(0, activeIndex).reduce((sum, scene) => sum + (scene.durationMs || 0), 0);
    return Math.min(100, (elapsed / totalDuration) * 100);
  }, [activeIndex, scenes, totalDuration]);

  useEffect(() => {
    if (!scenes.length) return;

    let timeoutId;
    if (activeIndex < scenes.length - 1) {
      timeoutId = setTimeout(() => setActiveIndex((current) => current + 1), scenes[activeIndex].durationMs || 12000);
    }

    return () => clearTimeout(timeoutId);
  }, [activeIndex, scenes]);

  useEffect(() => {
    if (!scenes.length) return;

    let isMounted = true;
    let previousUrl = "";
    narrationStartedRef.current = false;

    async function generateVideoFile() {
      setIsRenderingVideo(true);
      const url = await createSceneVideo(scenes);
      if (isMounted && url) {
        previousUrl = url;
        setGeneratedVideoUrl(url);
        setActiveIndex(0);
      }
      if (isMounted) {
        setIsRenderingVideo(false);
      }
    }

    generateVideoFile();

    return () => {
      isMounted = false;
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }
    };
  }, [scenes]);

  useEffect(() => () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    if (!generatedVideoUrl || narrationStartedRef.current || typeof window === "undefined" || !window.speechSynthesis) return;

    narrationStartedRef.current = true;
    const narration = scenes.map((scene) => scene.voiceText || scene.text).filter(Boolean).join(". ");
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    return () => window.speechSynthesis.cancel();
  }, [generatedVideoUrl, scenes]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">AI Video Update</h2>
        {videoData?.renderMode && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{videoData.renderMode}</span>
        )}
      </div>

      {isLoading ? (
        <div className="flex h-72 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
          <Loader2 className="mb-3 size-7 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Generating script and preparing scenes...</p>
        </div>
      ) : scenes.length ? (
        <>
          {generatedVideoUrl ? (
            <video controls className="h-[320px] w-full rounded-xl border border-slate-200 bg-black object-cover" src={generatedVideoUrl} />
          ) : (
            <div className="relative h-[320px] overflow-hidden rounded-xl border border-slate-200 bg-slate-900 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300">{scenes[activeIndex]?.title}</p>
              <p className="mt-5 text-2xl font-semibold leading-tight">{scenes[activeIndex]?.text}</p>
              <p className="mt-5 text-sm text-slate-300">{scenes[activeIndex]?.subtext}</p>
              <div className="absolute bottom-0 left-0 h-1 bg-cyan-400" style={{ width: `${progress}%` }} />
            </div>
          )}

          <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            {isRenderingVideo ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Rendering medium-size video output. Voice starts after export completes.
              </>
            ) : (
              <>
                <PlayCircle className="size-3.5 text-emerald-500" />
                Video ready with synchronized narration.
              </>
            )}
          </p>
        </>
      ) : (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          {statusMessage || "Video could not be generated."}
        </div>
      )}
    </div>
  );
}
