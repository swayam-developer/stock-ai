import { useEffect, useMemo, useState } from "react";

function getTotalDurationMs(scenes) {
  return scenes.reduce((sum, s) => sum + (s.durationMs || 0), 0);
}

function wrapText(ctx, text, maxWidth, x, y, lineHeight) {
  const words = text.split(" ");
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
  canvas.width = 1080;
  canvas.height = 1920;
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
      const opacity = Math.min(1, progress * 2.5);

      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#334155";
      ctx.fillRect(80, 120, canvas.width - 160, canvas.height - 240);

      ctx.fillStyle = `rgba(148,163,184,${opacity})`;
      ctx.font = "bold 46px Inter";
      ctx.fillText(scene.title, 120, 260);

      ctx.fillStyle = `rgba(241,245,249,${opacity})`;
      ctx.font = "bold 62px Inter";
      wrapText(ctx, scene.text, 840, 120, 430, 84);

      ctx.fillStyle = "#cbd5e1";
      ctx.font = "36px Inter";
      wrapText(ctx, scene.subtext || "", 840, 120, 1450, 52);

      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(0, canvas.height - 12, canvas.width * progress, 12);

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
    if (!scenes.length) return;
    let isMounted = true;

    async function generateVideoFile() {
      setIsRenderingVideo(true);
      const url = await createSceneVideo(scenes);
      if (isMounted && url) setGeneratedVideoUrl(url);
      if (isMounted) setIsRenderingVideo(false);
    }

    generateVideoFile();

    return () => {
      isMounted = false;
      if (generatedVideoUrl) URL.revokeObjectURL(generatedVideoUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenes]);

  useEffect(() => {
    if (!scenes.length || typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const narration = scenes.map((s) => s.voiceText).join(". ");
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);

    return () => window.speechSynthesis.cancel();
  }, [scenes]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Generated Video Brief</h2>
        {videoData?.renderMode && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{videoData.renderMode}</span>}
      </div>

      {isLoading ? (
        <div className="text-slate-500">Preparing script scenes and video output...</div>
      ) : scenes.length ? (
        <>
          {generatedVideoUrl ? (
            <video controls className="w-full rounded-lg border border-slate-200" src={generatedVideoUrl} />
          ) : (
            <div className="relative h-[420px] overflow-hidden rounded-lg border border-slate-200 bg-slate-900 p-8 text-white">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">{scenes[activeIndex]?.title}</p>
              <p className="mt-6 text-3xl font-semibold leading-tight">{scenes[activeIndex]?.text}</p>
              <p className="mt-6 text-sm text-slate-300">{scenes[activeIndex]?.subtext}</p>
              <div className="absolute bottom-0 left-0 h-1 bg-sky-400" style={{ width: `${progress}%` }} />
            </div>
          )}

          <p className="mt-3 text-xs text-slate-500">
            {isRenderingVideo ? "Rendering downloadable video from Groq-generated script..." : "Video generated from Groq scene script. Voice narration is auto-played in browser."}
          </p>
        </>
      ) : (
        <div className="text-amber-600 text-sm">{statusMessage || "Video could not be generated."}</div>
      )}
    </div>
  );
}
