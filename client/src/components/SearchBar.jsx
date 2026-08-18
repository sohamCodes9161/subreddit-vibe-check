import React, { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('technology');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-mono">r/</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="technology"
          className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-7 pr-4 text-sm focus:outline-none focus:border-black font-medium text-gray-900"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-medium text-xs rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'Fetching...' : 'Analyze'}
      </button>
    </form>
  );
}