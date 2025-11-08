'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { aiAgents as defaultAgents, generatePredictionFeeds, PredictionFeed, AIAgent } from '@/data/mockData';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { API_ENDPOINTS, callEdgeFunction } from '@/lib/supabase';

export default function DashboardPage() {
  const [feeds, setFeeds] = useState<PredictionFeed[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [aiAgents, setAiAgents] = useState<AIAgent[]>(defaultAgents);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all agents (system + user agents)
  const fetchAllAgents = async () => {
    try {
      const result = await callEdgeFunction(API_ENDPOINTS.getAllAgents);
      
      if (result.data && Array.isArray(result.data)) {
        // Map backend data to frontend format
        const mappedAgents: AIAgent[] = result.data.map((agent: any) => ({
          id: agent.id || agent.agent_id,
          name: agent.name || agent.agent_name,
          icon: agent.icon || getIconForAgent(agent),
          color: agent.color || getColorForAgent(agent),
          portfolio: agent.portfolio || agent.initial_capital || 100,
          roi: agent.roi || 0,
          winRate: agent.win_rate || agent.winRate || 0,
          totalPredictions: agent.total_predictions || agent.totalPredictions || 0,
          profitLoss: agent.profit_loss || agent.profitLoss || 0,
          accuracy: agent.accuracy || agent.win_rate || 0
        }));
        
        setAiAgents(mappedAgents);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      // Fallback ke default agents jika error
      setAiAgents(defaultAgents);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function untuk generate icon berdasarkan personality
  const getIconForAgent = (agent: any) => {
    if (agent.personality === 'analytical') return '🧠';
    if (agent.personality === 'risk-taker') return '⚡';
    if (agent.personality === 'meme') return '📈';
    if (agent.personality === 'contrarian') return '🎲';
    return '🤖';
  };

  // Helper function untuk generate color berdasarkan base model
  const getColorForAgent = (agent: any) => {
    const colors = ['#00f0ff', '#ff00ff', '#b026ff', '#00ffaa', '#ff6b00', '#ff0080', '#0080ff', '#00fff0'];
    const hash = (agent.agent_name || agent.name || '').split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  useEffect(() => {
    // Initial fetch
    fetchAllAgents();

    // Auto-refresh setiap 30 detik untuk update portfolio
    const refreshInterval = setInterval(() => {
      fetchAllAgents();
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    setFeeds(generatePredictionFeeds());

    // Simulate real-time feeds
    const interval = setInterval(() => {
      setFeeds(prev => {
        const agent = aiAgents[Math.floor(Math.random() * aiAgents.length)];
        const predictions = [
          'Bitcoin mencapai ATH baru',
          'Tesla stock surge 15%',
          'Fed akan cut rate bulan ini',
          'NVIDIA akan beat earnings',
          'Gold price tembus $2,500'
        ];
        
        const newFeed: PredictionFeed = {
          id: `feed-${Date.now()}`,
          aiName: agent.name,
          prediction: predictions[Math.floor(Math.random() * predictions.length)],
          confidence: Math.floor(Math.random() * 30) + 65,
          result: 'PENDING',
          amount: 0.01,
          timestamp: new Date().toISOString(),
          color: agent.color
        };

        return [newFeed, ...prev.slice(0, 49)];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [aiAgents]);

  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-orbitron)' }}>
              AI AGENTS ARENA
            </h1>
            <p className="text-gray-400 text-lg">
              Monitor real-time battle antara 8 autonomous AI prediction agents
            </p>
          </motion.div>

          {/* AI Agents Grid */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-cyan-400" style={{ fontFamily: 'var(--font-orbitron)' }}>
                ACTIVE AGENTS
              </h2>
              {isLoading && (
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Activity className="animate-spin" size={16} />
                  <span>Loading agents...</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {aiAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedAgent(agent.id)}
                  className="glassmorphism p-6 rounded-xl border hover:border-cyan-500/60 transition-all cursor-pointer group hover:scale-105"
                  style={{ borderColor: `${agent.color}40` }}
                >
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                      style={{ 
                        background: `linear-gradient(135deg, ${agent.color}40, ${agent.color}20)`,
                        border: `2px solid ${agent.color}`
                      }}
                    >
                      {agent.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-orbitron)', color: agent.color }}>
                      {agent.name}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Portfolio:</span>
                        <span className="text-green-400 font-bold">${agent.portfolio.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI:</span>
                        <span className="text-cyan-400 font-bold">+{agent.roi}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Win Rate:</span>
                        <span className="text-purple-400 font-bold">{agent.winRate}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Live Feed & Stats */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Live Prediction Feed */}
            <div className="lg:col-span-2">
              <div className="glassmorphism p-6 rounded-xl border border-cyan-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-cyan-400" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    LIVE PREDICTION FEED
                  </h2>
                  <Activity className="text-green-400 animate-pulse" size={24} />
                </div>

                <div className="space-y-2 h-[600px] overflow-y-auto pr-2">
                  {feeds.map((feed, index) => (
                    <motion.div
                      key={feed.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-black/40 p-4 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span 
                            className="font-bold text-sm"
                            style={{ color: feed.color }}
                          >
                            {feed.aiName}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {new Date(feed.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          feed.result === 'WIN' ? 'bg-green-500/20 text-green-400' :
                          feed.result === 'LOSS' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {feed.result}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{feed.prediction}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-purple-400">
                          Confidence: {feed.confidence}%
                        </span>
                        <span className="text-cyan-400">
                          ${feed.amount.toFixed(2)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              {/* Portfolio Summary */}
              <div className="glassmorphism p-6 rounded-xl border border-magenta-500/30">
                <h3 className="text-xl font-bold mb-4 text-magenta-400" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  TOTAL STATS
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Total Portfolio</span>
                      <DollarSign className="text-green-400" size={16} />
                    </div>
                    <p className="text-2xl font-bold text-green-400">
                      ${aiAgents.reduce((sum, a) => sum + a.portfolio, 0).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Avg ROI</span>
                      <TrendingUp className="text-cyan-400" size={16} />
                    </div>
                    <p className="text-2xl font-bold text-cyan-400">
                      +{(aiAgents.reduce((sum, a) => sum + a.roi, 0) / aiAgents.length).toFixed(1)}%
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Total Predictions</span>
                      <Activity className="text-purple-400" size={16} />
                    </div>
                    <p className="text-2xl font-bold text-purple-400">
                      {aiAgents.reduce((sum, a) => sum + a.totalPredictions, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Performers */}
              <div className="glassmorphism p-6 rounded-xl border border-cyan-500/30">
                <h3 className="text-xl font-bold mb-4 text-cyan-400" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  TOP PERFORMERS
                </h3>
                <div className="space-y-3">
                  {[...aiAgents]
                    .sort((a, b) => b.roi - a.roi)
                    .slice(0, 3)
                    .map((agent, index) => (
                      <div key={agent.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{agent.icon}</span>
                          <span className="font-bold text-sm">{agent.name}</span>
                        </div>
                        <span className="text-green-400 font-bold text-sm">
                          +{agent.roi}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* CTA */}
              <Link 
                href="/create-agent"
                className="block w-full py-4 bg-gradient-to-r from-magenta-500 to-purple-600 text-white font-bold rounded-lg text-center transition-all duration-300 hover:scale-105 glow-magenta"
              >
                DEPLOY YOUR AGENT
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
