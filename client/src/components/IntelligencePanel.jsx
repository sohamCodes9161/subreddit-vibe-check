import React from 'react';
import { ShieldAlert, Flame, MessageSquare, Activity } from 'lucide-react';

export default function IntelligencePanel({ stats, darkMode }) {
  if (!stats) return null;

  return (
    <div className={`p-5 rounded-2xl border ${
      darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
    } space-y-4`}>
      <div className="flex items-center justify-between border-b pb-3 border-slate-700/30">
        <h3 className="text-sm font-bold tracking-wide uppercase text-indigo-400 flex items-center gap-2">
          <Activity className="w-4 h-4" /> Community Intelligence & Health Diagnostics
        </h3>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Engine Insights
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Momentum Metric */}
        <div className={`p-3.5 rounded-xl border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" /> Sentiment Momentum
          </div>
          <div className="text-sm font-bold">{stats.momentum}</div>
          <p className="text-[11px] text-slate-400 mt-1">Tracks score shifts in recent vs older posts.</p>
        </div>

        {/* Data Integrity / Sarcasm Warning */}
        <div className={`p-3.5 rounded-xl border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Sarcasm & Clickbait Risk
          </div>
          <div className="text-sm font-bold text-rose-400">
            {stats.sarcasmFlaggedCount} / {stats.total} titles flagged
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Identifies potential false-positive scores.</p>
        </div>

        {/* Community Health Diagnosis */}
        <div className={`p-3.5 rounded-xl border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> Community Health
          </div>
          <div className="text-sm font-bold text-indigo-400">{stats.healthRating}</div>
          <p className="text-[11px] text-slate-400 mt-1">Average ~{stats.avgCommentsPerPost} comments per thread.</p>
        </div>
      </div>
    </div>
  );
}