import React from 'react';

export default function SentimentStats({ stats, subreddit }) {
  if (!stats) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
      <div className="flex justify-between items-baseline">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400">Target</span>
          <h2 className="text-xl font-bold text-gray-900">r/{subreddit}</h2>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400">Average Score</span>
          <p className="text-xl font-mono font-bold text-gray-900">{stats.averageScore}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden flex">
          <div style={{ width: `${stats.positivePct}%` }} className="bg-emerald-500" />
          <div style={{ width: `${stats.neutralPct}%` }} className="bg-gray-300" />
          <div style={{ width: `${stats.negativePct}%` }} className="bg-rose-500" />
        </div>
        <div className="flex justify-between text-xs text-gray-500 font-mono">
          <span className="text-emerald-600 font-medium">Positive {stats.positivePct}%</span>
          <span>Neutral {stats.neutralPct}%</span>
          <span className="text-rose-600 font-medium">Negative {stats.negativePct}%</span>
        </div>
      </div>
    </div>
  );
}