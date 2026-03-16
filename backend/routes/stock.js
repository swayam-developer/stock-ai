import express from "express";
import { getStockData } from "../services/stockService.js";

const router = express.Router();

router.get("/:ticker", async (req, res) => {

  try {

    const ticker = req.params.ticker;

    const data = await getStockData(ticker);

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch stock data"
    });

  }

});

export default router;