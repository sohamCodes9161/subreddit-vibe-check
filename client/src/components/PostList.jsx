import React from 'react';

export default function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-lg">
        No threads match the selected filter.
      </div>
    );
  }

  const getBadgeStyle = (label) => {
    switch (label) {
      case 'positive':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'negative':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-3.5 bg-white border border-gray-200 rounded-lg flex items-center justify-between gap-4 hover:border-gray-300 transition-colors"
        >
          <div className="space-y-1 min-w-0">
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm text-gray-900 hover:underline block truncate"
            >
              {post.title}
            </a>
            <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
              <span>u/{post.author}</span>
              <span>•</span>
              <span>{post.timeAgo}</span>
              <span>•</span>
              <span>{post.num_comments} comments</span>
            </div>
          </div>

          <span className={`px-2 py-0.5 text-[11px] font-mono font-medium rounded border shrink-0 ${getBadgeStyle(post.sentimentLabel)}`}>
            {post.sentimentScore > 0 ? `+${post.sentimentScore}` : post.sentimentScore}
          </span>
        </div>
      ))}
    </div>
  );
}