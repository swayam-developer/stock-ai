import express from "express";

const router = express.Router();

const SCENE_TITLES = [
  "Opening Bell",
  "Price Snapshot",
  "News Catalyst",
  "Investor Takeaway",
  "Next Action"
];

const ANIMATIONS = ["zoom-fade", "chart-pan", "headline-slide", "spotlight", "cta-glow"];
const SCENE_DURATION_MS = [12000, 21000, 24000, 18000, 15000];

function toSceneLines(script) {
  const lines = script
    .split("\n")
    .map((x) => x.trim().replace(/^\d+[.)-]?\s*/, ""))
    .filter(Boolean);

  while (lines.length < 5) {
    lines.push("Stay tuned for the next market update.");
  }

  return lines.slice(0, 5);
}

router.post("/generate", async (req, res) => {
  try {
    const { script, stock, ticker } = req.body;

    if (!script) {
      return res.status(400).json({ error: "Script required" });
    }

    const sceneLines = toSceneLines(script);

    const scenes = sceneLines.map((text, idx) => ({
      id: idx + 1,
      title: SCENE_TITLES[idx],
      text,
      voiceText: text,
      animation: ANIMATIONS[idx],
      durationMs: SCENE_DURATION_MS[idx],
      subtext: idx === 1 ? `${ticker || stock?.symbol || "Stock"} at ₹${stock?.price ?? "--"}` : "Daily market briefing"
    }));

    return res.json({
      renderMode: "remotion-ready-dynamic",
      message: "Scene package generated and synchronized for narration.",
      totalDurationMs: SCENE_DURATION_MS.reduce((a, b) => a + b, 0),
      scenes,
      remotion: {
        compositionId: "StockVideo",
        fps: 30,
        width: 1080,
        height: 1920
      }
    });
  } catch (err) {
    console.error("Video error:", err);
    return res.status(500).json({ error: "Video generation failed" });
  }
});

export default router;
