import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SentimentStats from './components/SentimentStats';
import PostList from './components/PostList';
import { analyzePosts } from './utils/sentiment';

export default function App() {
  const [subreddit, setSubreddit] = useState('technology');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [dataSource, setDataSource] = useState('demo');
  const [filter, setFilter] = useState('all');

  const fetchSubredditData = async (sub) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://subreddit-vibe-check-pjz3.onrender.com/api/v1/vibe-check?subreddit=${encodeURIComponent(sub)}`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || 'Failed to fetch data');

      const analyzed = analyzePosts(json.posts);
      setSubreddit(json.subreddit);
      setDataSource(json.source || 'demo');
      setData({
        posts: analyzed.processedPosts,
        stats: analyzed.stats,
      });
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubredditData('technology');
  }, []);

  const filteredPosts = data
    ? data.posts.filter((p) => (filter === 'all' ? true : p.sentimentLabel === filter))
    : [];

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111] antialiased">
      {/* Compliance / API Notice Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <span>
            <strong>API Notice:</strong> Official Reddit Data API key approval is pending. Currently operating in 
            <span className="font-semibold text-amber-950"> Demo Mode</span> with structured sample data to showcase sentiment analysis functionality.
          </span>
          <span className="px-2 py-0.5 bg-amber-200 text-amber-900 font-mono rounded text-[10px] uppercase font-bold shrink-0">
            Compliance Mode
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
            <span className="font-semibold text-sm tracking-tight">Subreddit Vibe Check</span>
          </div>
          <span className="text-xs text-gray-500 font-mono">
            Source: {dataSource === 'live' ? 'Reddit OAuth API' : 'Sample Dataset'}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Community Sentiment Engine
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time sentiment analyzer for active subreddit discussions.
          </p>
        </div>

        {/* Search */}
        <SearchBar onSearch={fetchSubredditData} loading={loading} />

        {/* Error State */}
        {error && (
          <div className="p-4 text-xs font-mono bg-red-50 border border-red-200 text-red-700 rounded-lg">
            Status: {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-12 text-center text-xs font-mono text-gray-400">
            Loading data for r/{subreddit}...
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && data && (
          <div className="space-y-6">
            <SentimentStats stats={data.stats} subreddit={subreddit} />

            {/* Filter Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Analyzed Threads ({filteredPosts.length})
              </span>
              <div className="flex gap-1 bg-gray-100 p-0.5 rounded-md text-xs font-medium">
                {['all', 'positive', 'neutral', 'negative'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-3 py-1 rounded capitalize transition-colors ${
                      filter === type ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <PostList posts={filteredPosts} />
          </div>
        )}
      </main>
    </div>
  );
}