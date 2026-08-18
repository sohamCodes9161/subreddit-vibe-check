import Sentiment from 'sentiment';

const sentimentAnalyzer = new Sentiment();

function formatTimeAgo(utcSeconds) {
  const diffMinutes = Math.floor((Date.now() / 1000 - utcSeconds) / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function analyzePosts(posts) {
  let totalScore = 0;
  let positiveCount = 0;
  let neutralCount = 0;
  let negativeCount = 0;

  const processedPosts = posts.map((post) => {
    const result = sentimentAnalyzer.analyze(post.title);
    totalScore += result.score;

    let label = 'neutral';
    if (result.score > 0) {
      label = 'positive';
      positiveCount++;
    } else if (result.score < 0) {
      label = 'negative';
      negativeCount++;
    } else {
      neutralCount++;
    }

    return {
      ...post,
      sentimentScore: result.score,
      sentimentLabel: label,
      timeAgo: formatTimeAgo(post.created_utc)
    };
  });

  const total = posts.length;
  const averageScore = total > 0 ? Number((totalScore / total).toFixed(2)) : 0;

  return {
    processedPosts,
    stats: {
      total,
      averageScore,
      positivePct: total ? Math.round((positiveCount / total) * 100) : 0,
      neutralPct: total ? Math.round((neutralCount / total) * 100) : 0,
      negativePct: total ? Math.round((negativeCount / total) * 100) : 0,
    },
  };
}