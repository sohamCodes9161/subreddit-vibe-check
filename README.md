# Subreddit Vibe Check 📊

A full-stack web application that performs real-time sentiment analysis on top posts from active subreddits. Built as a technical assignment for the Full Stack Developer Internship role.

**[🚀 Live Application](https://subreddit-vibe-check-xmpm.vercel.app/)** | **[💻 GitHub Repository](https://github.com/sohamCodes9161/subreddit-vibe-check)**

---

### ⚠️ Reddit API Notice & Developer Compliance

This application includes a complete, production-ready implementation for Reddit's OAuth 2.0 client (`/api/v1/vibe-check`). 

Due to updated developer verification guidelines under Reddit's Data API policy, official developer application verification is currently pending. To remain fully compliant with Reddit's Terms of Service and Responsible Builder Policy:
* Unofficial web scraping, unauthenticated endpoints, and fragile CORS proxies were **strictly avoided**.
* The deployed application runs in **Compliance Demo Mode** using structured sample datasets, enabling full review of the client-side sentiment engine, metrics calculations, filtering, and responsive UI components.
* Production OAuth token acquisition and request handling are implemented in `server/index.js` and can be activated immediately by populating `REDDIT_CLIENT_ID` and `REDDIT_CLIENT_SECRET` in environment variables.

---

## 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express.js, CORS
* **Sentiment Engine:** Client-side Lexicon-based Vibe Score Engine
* **Deployment:** 
  * Frontend hosted on **Vercel**
  * Backend hosted on **Render** (Singapore Region)

---

## ✨ Features

* **Subreddit Search:** Analyze discussion trends for any specified subreddit.
* **Sentiment Analysis:** Calculates positive, neutral, and negative sentiment distribution across post titles.
* **Interactive Filtering:** Filter posts by sentiment category (*Positive*, *Neutral*, *Negative*).
* **Defensive Architecture:** Graceful fallback mechanisms ensure 100% frontend uptime without application crashes.

---

## 📁 Repository Structure

```text
subreddit-vibe-check/
├── client/          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # UI Components (SearchBar, SentimentStats, PostList)
│   │   ├── utils/       # Sentiment Analysis Logic
│   │   └── App.jsx      # Main Application Container
├── server/          # Express Backend
│   └── index.js     # API Route & Reddit OAuth Handling
├── .gitignore
└── README.md