'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { generateMarkets, Market } from '@/data/mockData';
import { Search, TrendingUp, Filter } from 'lucide-react';

export default function MarketPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [markets] = useState<Market[]>(generateMarkets());
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  const categories = ['All', 'Crypto', 'Stocks', 'Economy', 'Tech', 'Sports', 'Politics', 'Entertainment'];

  const filteredMarkets = useMemo(() => {
    return markets.filter(market => {
      const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || market.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [markets, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-orbitron)' }}>
              PREDICTION MARKETS
            </h1>
            <p className="text-gray-400 text-lg">
              {filteredMarkets.length} markets tersedia untuk diprediksi
            </p>
          </motion.div>

          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari prediction market..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              <Filter className="text-purple-400 flex-shrink-0" size={20} />
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'border border-gray-700 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Markets Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market, index) => (
              <motion.div
                key={market.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 1) }}
                className="glassmorphism p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/60 transition-all group cursor-pointer"
                onClick={() => setSelectedMarket(market)}
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                    {market.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    Vol: ${(market.volume / 1000).toFixed(0)}K
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {market.title}
                </h3>

                {/* Odds */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-xs text-green-400 mb-1">YES</p>
                    <p className="text-2xl font-bold text-green-400">{market.yesOdds}%</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-xs text-red-400 mb-1">NO</p>
                    <p className="text-2xl font-bold text-red-400">{market.noOdds}%</p>
                  </div>
                </div>

                {/* Top AI Predictions */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-2">Top AI Confidence:</p>
                  <div className="space-y-1">
                    {market.topAIConfidence.slice(0, 2).map((ai, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="text-gray-300">{ai.name}</span>
                        <span className={`font-bold ${
                          ai.stance === 'YES' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {ai.confidence}% {ai.stance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-sm font-bold rounded-lg hover:bg-cyan-500/30 transition-all">
                    View Details
                  </button>
                  <button className="flex-1 py-2 bg-gradient-to-r from-magenta-500 to-purple-600 text-white text-sm font-bold rounded-lg hover:scale-105 transition-all">
                    Predict $0.01
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMarkets.length === 0 && (
            <div className="text-center py-20">
              <TrendingUp className="mx-auto mb-4 text-gray-600" size={64} />
              <p className="text-gray-400 text-lg">
                Tidak ada market yang cocok dengan pencarian Anda
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Market Detail Modal */}
      {selectedMarket && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMarket(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glassmorphism max-w-2xl w-full p-8 rounded-2xl border border-cyan-500/50"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                  {selectedMarket.category}
                </span>
                <h2 className="text-2xl font-bold mt-4 text-cyan-400" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  {selectedMarket.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedMarket(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-300 mb-6">{selectedMarket.description}</p>

            {/* Odds Detail */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-sm text-green-400 mb-2">YES Odds</p>
                <p className="text-4xl font-bold text-green-400">{selectedMarket.yesOdds}%</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-red-400 mb-2">NO Odds</p>
                <p className="text-4xl font-bold text-red-400">{selectedMarket.noOdds}%</p>
              </div>
            </div>

            {/* AI Confidence */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-purple-400">AI Agent Reasoning</h3>
              <div className="space-y-3">
                {selectedMarket.topAIConfidence.map((ai, i) => (
                  <div key={i} className="bg-black/40 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-cyan-400">{ai.name}</span>
                      <span className={`font-bold ${
                        ai.stance === 'YES' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {ai.confidence}% {ai.stance}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      "Berdasarkan analisis historical data dan trend saat ini..."
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <button className="w-full py-4 bg-gradient-to-r from-magenta-500 to-purple-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 glow-magenta">
              Place Prediction ($0.01)
            </button>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
