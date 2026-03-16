import express from "express";
import { generateScript } from "../services/groqService.js";

const router = express.Router();

router.post("/summary", async (req, res) => {

  try {

    const { stock, news } = req.body;

    const script = await generateScript(stock, news);

    res.json({ script });

  } catch (error) {

    console.error("AI route error:", error);

    res.status(500).json({
      error: "AI generation failed"
    });

  }

});

export default router;