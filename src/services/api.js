import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const fetchStock = ticker =>
  API.get(`/stock/${ticker}`);

export const fetchNews = ticker =>
  API.get(`/news/${ticker}`);

export const generateSummary = data =>
  API.post(`/ai/summary`, data);

export const generateVideo = data =>
  API.post("/video/generate", data);