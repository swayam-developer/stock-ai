import express from "express";
import { getNews } from "../services/newsService.js";

const router = express.Router();

router.get("/:ticker", async (req, res) => {

  try {

    const ticker = req.params.ticker;

    const news = await getNews(ticker);

    res.json(news);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch news"
    });

  }

});

export default router;