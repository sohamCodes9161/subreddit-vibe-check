const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/vibe-check', async (req, res) => {
  const { subreddit } = req.query;

  if (!subreddit) {
    return res.status(400).json({ error: 'Subreddit parameter is required.' });
  }

  const cleanedSubreddit = subreddit.trim().replace(/^r\//, '');

  try {
    // Primary URL
    const targetUrl = `https://www.reddit.com/r/${encodeURIComponent(cleanedSubreddit)}/hot.json?limit=50&raw_json=1`;

    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
      },
      timeout: 8000,
    });

    if (!response.data || !response.data.data || !response.data.data.children) {
      return res.status(400).json({ error: 'Invalid subreddit or no posts found.' });
    }

    const posts = response.data.data.children.map((child) => ({
      id: child.data.id,
      title: child.data.title,
      score: child.data.score,
      num_comments: child.data.num_comments,
      author: child.data.author,
      permalink: `https://reddit.com${child.data.permalink}`,
      created_utc: child.data.created_utc,
      thumbnail: child.data.thumbnail && child.data.thumbnail.startsWith('http') ? child.data.thumbnail : null,
    }));

    return res.json({ subreddit: cleanedSubreddit, count: posts.length, posts });
  } catch (error) {
    console.error('Error fetching Reddit data:', error.message);

    // Fallback strategy if standard fetch gets blocked
    try {
      const fallbackUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.reddit.com/r/${encodeURIComponent(cleanedSubreddit)}/hot.rss`;
      const fallbackRes = await axios.get(fallbackUrl);

      if (fallbackRes.data && fallbackRes.data.items) {
        const posts = fallbackRes.data.items.slice(0, 50).map((item, index) => ({
          id: `rss_${index}`,
          title: item.title,
          score: 0,
          num_comments: 0,
          author: item.author || 'Reddit User',
          permalink: item.link,
          created_utc: Math.floor(new Date(item.pubDate).getTime() / 1000),
          thumbnail: null,
        }));

        return res.json({ subreddit: cleanedSubreddit, count: posts.length, posts, fallback: true });
      }
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError.message);
    }

    return res.status(500).json({ error: 'Unable to fetch posts for this subreddit right now.' });
  }
});

module.exports = router;