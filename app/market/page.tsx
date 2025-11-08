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

  const categories = ['All', 'Crypto', 'Stocks', 'Tech', 'Entertainment', 'Sports', 'Economy', 'Gaming', 'Climate', 'Politics'];

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
              LIVE PREDICTION MARKETS 2025
            </h1>
            <p className="text-gray-400 text-lg">
              100 prediction markets untuk tahun 2025 • {filteredMarkets.length} markets tersedia
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
            className="glassmorphism max-w-4xl w-full p-8 rounded-2xl border border-cyan-500/50 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                  {selectedMarket.category}
                </span>
                <h2 className="text-2xl font-bold mt-4 text-cyan-400 leading-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  {selectedMarket.title}
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  Volume: ${(selectedMarket.volume / 1000).toFixed(0)}K • Market ID: {selectedMarket.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedMarket(null)}
                className="text-gray-400 hover:text-white text-2xl ml-4 flex-shrink-0"
              >
                ×
              </button>
            </div>

            <p className="text-gray-300 mb-6 text-lg leading-relaxed">{selectedMarket.description}</p>

            {/* Market Stats Grid */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-sm text-green-400 mb-2">YES Odds</p>
                <p className="text-4xl font-bold text-green-400">{selectedMarket.yesOdds}%</p>
                <p className="text-xs text-gray-400 mt-1">
                  Payout: ${(100 / selectedMarket.yesOdds).toFixed(2)}
                </p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-red-400 mb-2">NO Odds</p>
                <p className="text-4xl font-bold text-red-400">{selectedMarket.noOdds}%</p>
                <p className="text-xs text-gray-400 mt-1">
                  Payout: ${(100 / selectedMarket.noOdds).toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-400 mb-2">Market Volume</p>
                <p className="text-2xl font-bold text-blue-400">${(selectedMarket.volume / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-400 mt-1">
                  {Math.floor(selectedMarket.volume / 10)} predictions
                </p>
              </div>
            </div>

            {/* Market Sentiment */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-purple-400">Market Sentiment</h3>
              <div className="bg-black/40 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Confidence Level</span>
                  <span className="text-lg font-bold text-cyan-400">
                    {Math.round(selectedMarket.topAIConfidence.reduce((sum, ai) => sum + ai.confidence, 0) / selectedMarket.topAIConfidence.length)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.round(selectedMarket.topAIConfidence.reduce((sum, ai) => sum + ai.confidence, 0) / selectedMarket.topAIConfidence.length)}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Low Confidence</span>
                  <span>High Confidence</span>
                </div>
              </div>
            </div>

            {/* AI Agent Analysis */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-purple-400">AI Agent Analysis</h3>
              <div className="space-y-4">
                {selectedMarket.topAIConfidence.map((ai, i) => {
                  const reasons = [
                    "Analisis historical patterns menunjukkan trend positif untuk periode ini.",
                    "Market fundamentals dan technical indicators mendukung prediksi ini.",
                    "Macroeconomic factors dan sentiment analysis memberikan sinyal bullish.",
                    "Data correlation dengan events serupa menunjukkan probabilitas tinggi.",
                    "Risk-reward ratio sangat favorable berdasarkan volatility analysis.",
                    "Institutional flow dan retail sentiment alignment mendukung direction ini."
                  ];
                  
                  return (
                    <div key={i} className="bg-black/40 border border-gray-700 rounded-lg p-4 hover:border-cyan-500/30 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{ai.name.charAt(0)}</span>
                          </div>
                          <div>
                            <span className="font-bold text-cyan-400">{ai.name}</span>
                            <p className="text-xs text-gray-400">Advanced AI Model</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xl font-bold ${
                            ai.stance === 'YES' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {ai.confidence}%
                          </span>
                          <p className={`text-sm font-bold ${
                            ai.stance === 'YES' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {ai.stance}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        "{reasons[i % reasons.length]} Confidence level {ai.stance === 'YES' ? 'tinggi' : 'rendah'} untuk outcome positif berdasarkan multi-factor analysis."
                      </p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
                        <span className="text-xs text-gray-500">Analysis Time: 2.3s</span>
                        <span className="text-xs text-cyan-400">Reliability: 94%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-purple-400">Market Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/40 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Liquidity</p>
                  <p className="text-lg font-bold text-white">${(selectedMarket.volume * 0.3 / 1000).toFixed(0)}K</p>
                </div>
                <div className="bg-black/40 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">24h Volume</p>
                  <p className="text-lg font-bold text-white">${(selectedMarket.volume * 0.15 / 1000).toFixed(0)}K</p>
                </div>
                <div className="bg-black/40 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Traders</p>
                  <p className="text-lg font-bold text-white">{Math.floor(selectedMarket.volume / 100)}</p>
                </div>
                <div className="bg-black/40 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Created</p>
                  <p className="text-lg font-bold text-white">
                    {new Date(2025, 0, Math.floor(Math.random() * 30) + 1).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 glow-green">
                <span className="flex items-center justify-center space-x-2">
                  <span>Bet YES ($0.01)</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    Win ${((100 / selectedMarket.yesOdds) * 0.01).toFixed(3)}
                  </span>
                </span>
              </button>
              <button className="py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 glow-red">
                <span className="flex items-center justify-center space-x-2">
                  <span>Bet NO ($0.01)</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    Win ${((100 / selectedMarket.noOdds) * 0.01).toFixed(3)}
                  </span>
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
