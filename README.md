FinVise — AI Stock Insights & Video Generator

FinVise is a full-stack fintech application that converts stock market data and financial news into concise AI-generated insights and narrated video summaries. The platform allows users to search for a stock ticker and instantly view price charts, related news, and an AI-generated explanation of the market trend. It demonstrates integration of financial APIs, LLM-based summarization, and automated video generation in a single dashboard.

Live Application Link

https://stock-ai-delta-dusky.vercel.app/


GitHub Repository

https://github.com/swayam-developer/stock-ai

The repository includes:

Full frontend and backend source code

Screenshots

Example:

Home Page
![alt text](<Screenshot (132).png>)

Stock Dashboard
![alt text](<Screenshot (133).png>)

 News Section
 ![alt text](<Screenshot (134).png>)

Generated Video Player
![alt text](<Screenshot (135).png>)

Tech Stack

Frontend

React

Vite

Axios

Chart.js / Recharts

Tailwind / CSS

Backend

Node.js

Express.js

AI & Video

Groq LLM for AI summaries and Text-to-Speech

Remotion for video generation

Deployment

Frontend: Vercel

Backend: Render

APIs Used to Fetch Data

Stock Market Data

Yahoo Finance 

Financial News

GNews API

https://gnews.io

AI Model

Groq LLM

Used to generate stock explanation summaries and Text-to-Speech

Setup instructions
Environment Variables

Create .env inside backend

PORT=5000
GNEWS_API_KEY=your_api_key
GROQ_API_KEY=your_api_key

Local Setup

Clone the repository

git clone https://github.com/swayam-developer/stock-ai.git
cd stock-ai

Install backend dependencies

cd backend
npm install
npm start

Run frontend

npm install
npm run dev

Frontend runs at

http://localhost:5173

Backend runs at

http://localhost:5000

Future Improvements

Real-time stock streaming

AI sentiment analysis of financial news

More advanced chart indicators

Portfolio tracking for users

Improved AI video visualization