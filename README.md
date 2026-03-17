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

1. Home Page
![alt text](<Screenshot (132).png>)

2. Stock Dashboard
![alt text](<Screenshot (133).png>)

 3. News Section
 ![alt text](<Screenshot (134).png>)

4. Generated Video Player
![alt text](<Screenshot (135).png>)

Tech Stack [Full Stack]

1. Frontend

React

Vite

Axios

Chart.js / Recharts

Tailwind / CSS

2. Backend

Node.js

Express.js

AI & Video

Groq LLM for AI summaries and Text-to-Speech

Remotion for video generation

Deployment

1. Frontend: Vercel

2. Backend: Render

3. UptimeRobot - keep server alive 

APIs Used to Fetch Data

Stock Market Data

1. Yahoo Finance 

2. Financial News

GNews API

https://gnews.io

3. AI Model

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

1. Real-time stock streaming

2. AI sentiment analysis of financial news

3. More advanced chart indicators

4. Portfolio tracking for users

5. Improved AI video visualization