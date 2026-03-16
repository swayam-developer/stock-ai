import express from "express";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {

    const { script, stock } = req.body;

    if (!script) {
      return res.status(400).json({
        error: "Script required"
      });
    }

    const price = stock?.price || 100;

    const scenes = script.split("\n").filter(Boolean);

    const stockData = [
      { time: "9:30", price: price - 10 },
      { time: "10:30", price: price - 5 },
      { time: "11:30", price: price },
      { time: "12:30", price: price + 5 }
    ];

    res.json({
      hook: scenes[0] || "",
      snapshot: scenes[1] || "",
      news: scenes[2] || "",
      takeaway: scenes[3] || "",
      cta: scenes[4] || "",
      stockData
    });

  } catch (err) {

    console.error("Video error:", err);

    res.status(500).json({
      error: "Video generation failed"
    });

  }
});

export default router;