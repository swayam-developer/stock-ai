import "dotenv/config";

import express from "express";
import cors from "cors";

import stockRoutes from "./routes/stock.js";
import newsRoutes from "./routes/news.js";
import aiRoutes from "./routes/ai.js";
import videoRoutes from "./routes/video.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/stock", stockRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/video", videoRoutes);
app.use("/videos", express.static("videos"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port", process.env.PORT);
});