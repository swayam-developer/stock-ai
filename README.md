## FinVise — AI Stock Insights & Video Generator

FinVise is a full-stack fintech application that converts stock market data and financial news into concise AI-generated insights and narrated video summaries. The platform allows users to search for a stock ticker and instantly view price charts, related news, and an AI-generated explanation of the market trend. It demonstrates integration of financial APIs, LLM-based summarization, and automated video generation in a single dashboard.

## ⚠️ Current Limitation

This version of the application supports a limited set of stock tickers:

- TCS  
- RELIANCE  

The restriction is intentional for demonstration and API usage control. The system is designed to be easily extendable to support multiple tickers with dynamic API integration.

## Live Application Link

https://stock-ai-delta-dusky.vercel.app/


## GitHub Repository

https://github.com/swayam-developer/stock-ai




## LOOM Video

https://www.loom.com/share/846d689561a7497fa055cf1db266c8d7


## Tech Stack [Full Stack]


## 1. Frontend


React


Vite


Axios


Chart.js / Recharts


Tailwind / CSS


## 2. Backend


Node.js


Express.js


AI & Video


Groq LLM for AI summaries and Text-to-Speech


Remotion for video generation


## Deployment

1. Frontend: Vercel

2. Backend: Render

3. UptimeRobot - Server Monitoring


## APIs Used to Fetch Data

1. Stock Market Data

 Yahoo Finance


2. Financial News

 GNews API


3. LLM Model

 Groq LLM


## Setup instructions

 Environment Variables

Create .env inside backend

PORT=5000

GNEWS_API_KEY=your_api_key

GROQ_API_KEY=your_api_key



## Clone the repository

git clone https://github.com/swayam-developer/stock-ai.git

cd stock-ai

## Install backend dependencies

cd backend

npm install

npm start


Run frontend

npm install

npm run dev

## Frontend runs at

http://localhost:5173

## Backend runs at

http://localhost:5000

## Future Improvements

1. Real-time stock streaming


2. AI sentiment analysis of financial news


3. More advanced chart indicators


4. Portfolio tracking for users


5. Improved AI video visualization