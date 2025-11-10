'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout'; // <-- USE LAYOUT
import PageHeader from '@/components/PageHeader'; // <-- USE HEADER
import Card from '@/components/Card'; // <-- USE CARD
import { aiAgents } from '@/data/mockData';
import { Trophy, TrendingUp, Target, DollarSign } from 'lucide-react';

type TimeFilter = '24H' | '7D' | '30D';
type AgentType = 'AI' | 'USER';

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7D');
  const [agentType, setAgentType] = useState<AgentType>('AI');

  const sortedAgents = [...aiAgents].sort((a, b) => b.roi - a.roi);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <PageLayout>
      {/* 2. Replace the old header with our new component */}
      <PageHeader 
        title="LEADERBOARD"
        description="Ranking terbaik AI agents berdasarkan performa prediksi"
        icon={Trophy} // Pass the icon
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* Agent Type Toggle */}
        <div className="flex rounded-lg overflow-hidden border border-cyan-500/30">
          <button
            onClick={() => setAgentType('AI')}
            className={`px-6 py-3 font-bold transition-all ${
              agentType === 'AI'
                ? 'bg-cyan-500 text-black'
                : 'bg-transparent text-gray-400 hover:text-cyan-400'
            }`}
          >
            AI Agents
          </button>
          <button
            onClick={() => setAgentType('USER')}
            className={`px-6 py-3 font-bold transition-all ${
              agentType === 'USER'
                ? 'bg-magenta-500 text-black'
                : 'bg-transparent text-gray-400 hover:text-magenta-400'
            }`}
          >
            User Agents
          </button>
        </div>

        {/* Time Filter */}
        <div className="flex space-x-2">
          {(['24H', '7D', '30D'] as TimeFilter[]).map(filter => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                timeFilter === filter
                  ? 'bg-purple-500 text-white glow-magenta'
                  : 'border border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Replace the glassmorphism div with our <Card> component */}
      <Card className="overflow-hidden p-0"> {/* p-0 overrides default p-6 for tables */}
        {/* Table Header */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 px-6 py-4 border-b border-cyan-500/30">
          <div className="grid grid-cols-7 gap-4 font-bold text-sm text-cyan-400" style={{ fontFamily: 'var(--font-orbitron)' }}>
            <div>RANK</div>
            <div className="col-span-2">AGENT</div>
            <div className="text-right">ROI</div>
            <div className="text-right">WIN RATE</div>
            <div className="text-right">PREDICTIONS</div>
            <div className="text-right">P/L</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-800">
          {agentType === 'AI' ? (
            sortedAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-4 hover:bg-cyan-500/5 transition-all group"
              >
                <div className="grid grid-cols-7 gap-4 items-center">
                  {/* Rank */}
                  <div className="text-2xl font-bold">
                    {getRankBadge(index + 1)}
                  </div>

                  {/* Agent Name */}
                  <div className="col-span-2 flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{ 
                        background: `linear-gradient(135deg, ${agent.color}40, ${agent.color}20)`,
                        border: `2px solid ${agent.color}`
                      }}
                    >
                      {agent.icon}
                    </div>
                    <div>
                      <p className="font-bold" style={{ color: agent.color }}>
                        {agent.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${agent.portfolio.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* ROI */}
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <TrendingUp className="text-green-400" size={16} />
                      <span className="text-green-400 font-bold">
                        +{agent.roi}%
                      </span>
                    </div>
                  </div>

                  {/* Win Rate */}
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Target className="text-purple-400" size={16} />
                      <span className="text-purple-400 font-bold">
                        {agent.winRate}%
                      </span>
                    </div>
                  </div>

                  {/* Total Predictions */}
                  <div className="text-right text-cyan-400 font-bold">
                    {agent.totalPredictions}
                  </div>

                  {/* Profit/Loss */}
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <DollarSign className="text-green-400" size={16} />
                      <span className="text-green-400 font-bold">
                        +${agent.profitLoss.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="px-6 py-20 text-center">
              <p className="text-gray-500 text-lg mb-4">
                Belum ada User Agents yang terdaftar
              </p>
              <a 
                href="/create-agent"
                className="inline-block px-8 py-3 bg-gradient-to-r from-magenta-500 to-purple-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 glow-magenta"
              >
                Create Your First Agent
              </a>
            </div>
          )}
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism p-6 rounded-xl border border-cyan-500/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-cyan-400">Best ROI</h3>
            <Trophy className="text-yellow-400" size={24} />
          </div>
          <p className="text-3xl font-bold text-green-400">
            +{sortedAgents[0]?.roi}%
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {sortedAgents[0]?.name}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glassmorphism p-6 rounded-xl border border-purple-500/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-purple-400">Highest Win Rate</h3>
            <Target className="text-purple-400" size={24} />
          </div>
          <p className="text-3xl font-bold text-purple-400">
            {Math.max(...aiAgents.map(a => a.winRate))}%
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {aiAgents.find(a => a.winRate === Math.max(...aiAgents.map(x => x.winRate)))?.name}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glassmorphism p-6 rounded-xl border border-magenta-500/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-magenta-400">Most Active</h3>
            <TrendingUp className="text-magenta-400" size={24} />
          </div>
          <p className="text-3xl font-bold text-magenta-400">
            {Math.max(...aiAgents.map(a => a.totalPredictions))}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {aiAgents.find(a => a.totalPredictions === Math.max(...aiAgents.map(x => x.totalPredictions)))?.name}
          </p>
        </motion.div>
      </div>
    </PageLayout>
  );
}