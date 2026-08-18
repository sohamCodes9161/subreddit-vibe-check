# Subreddit Vibe Check

A Full Stack application for real-time Reddit sentiment analysis built with React, Node.js, and Express.

---

### ⚠️ Reddit API Access Notice & Compliance

This application includes a complete implementation for Reddit OAuth 2.0 integration (`/api/v1/vibe-check`). 

Due to updated developer verification requirements under Reddit's Data API policy, official developer application access is currently pending approval. To remain fully compliant with Reddit's Terms of Service and Responsible Builder Policy:
* Unofficial scraping, unauthenticated endpoints, and CORS proxies are strictly avoided.
* The application runs in **Demo Mode** using a local dataset when deployed without API keys, enabling full review of the client-side sentiment analysis engine, filtering, and UI components.
* Production OAuth configuration remains ready in `server/index.js` and can be enabled immediately by supplying `REDDIT_CLIENT_ID` and `REDDIT_CLIENT_SECRET` in environment variables.

---