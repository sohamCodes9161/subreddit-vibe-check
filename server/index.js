const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Environment variables for Reddit OAuth (if credentials exist)
const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID || '';
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET || '';

let cachedAccessToken = null;
let tokenExpiryTime = 0;

// Helper to obtain OAuth token from Reddit
async function getRedditAccessToken() {
  if (cachedAccessToken && Date.now() < tokenExpiryTime) {
    return cachedAccessToken;
  }

  if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET) {
    throw new Error('Reddit API credentials missing');
  }

  const authHeader = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64');
  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'VibeCheckApp/1.0.0'
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) throw new Error(`OAuth token request failed (${response.status})`);
  const data = await response.json();
  cachedAccessToken = data.access_token;
  tokenExpiryTime = Date.now() + (data.expires_in - 60) * 1000;
  return cachedAccessToken;
}

// Sample dataset generator for Demo Mode
function generateDemoPosts(subreddit) {
  const now = Math.floor(Date.now() / 1000);
  return [
    {
      id: 'demo_1',
      title: `Breakthrough development announced regarding r/${subreddit} community tools`,
      author: 'dev_lead',
      ups: 1420,
      num_comments: 312,
      created_utc: now - 3600,
      permalink: `https://reddit.com/r/${subreddit}`
    },
    {
      id: 'demo_2',
      title: `Critical discussion: Evaluating performance and user sentiment in modern applications`,
      author: 'tech_analyst',
      ups: 890,
      num_comments: 145,
      created_utc: now - 7200,
      permalink: `https://reddit.com/r/${subreddit}`
    },
    {
      id: 'demo_3',
      title: `Community guidelines update and upcoming release roadmap for r/${subreddit}`,
      author: 'moderator_team',
      ups: 2150,
      num_comments: 520,
      created_utc: now - 10800,
      permalink: `https://reddit.com/r/${subreddit}`
    },
    {
      id: 'demo_4',
      title: `Disappointing latency regression observed in recent version update`,
      author: 'sys_admin',
      ups: 410,
      num_comments: 98,
      created_utc: now - 14400,
      permalink: `https://reddit.com/r/${subreddit}`
    },
    {
      id: 'demo_5',
      title: `Excellent summary of key trends and future outlook for r/${subreddit}`,
      author: 'insights_bot',
      ups: 1890,
      num_comments: 210,
      created_utc: Math.floor(now - 18000),
      permalink: `https://reddit.com/r/${subreddit}`
    }
  ];
}

app.get('/api/v1/vibe-check', async (req, res) => {
  const subreddit = req.query.subreddit || 'technology';

  // If credentials exist, attempt official OAuth request
  if (REDDIT_CLIENT_ID && REDDIT_CLIENT_SECRET) {
    try {
      const token = await getRedditAccessToken();
      const response = await fetch(`https://oauth.reddit.com/r/${encodeURIComponent(subreddit)}/hot?limit=25`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'VibeCheckApp/1.0.0'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const rawPosts = data?.data?.children || [];
        const posts = rawPosts
          .map((item) => item.data)
          .filter((post) => !post.stickied)
          .map((post) => ({
            id: post.id,
            title: post.title,
            author: post.author,
            ups: post.ups,
            num_comments: post.num_comments,
            created_utc: post.created_utc,
            permalink: `https://reddit.com${post.permalink}`
          }));

        return res.json({ subreddit, posts, source: 'live' });
      }
    } catch (err) {
      console.warn(`[WARN] Reddit OAuth error: ${err.message}. Serving Demo Data.`);
    }
  }

  // Demo Fallback Mode (Compliant with API policies)
  return res.json({
    subreddit,
    posts: generateDemoPosts(subreddit),
    source: 'demo',
    message: 'Demo dataset active due to pending Reddit API key verification.'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));