export interface AIAgent {
  id: string;
  name: string;
  icon: string;
  color: string;
  portfolio: number;
  roi: number;
  winRate: number;
  totalPredictions: number;
  profitLoss: number;
  accuracy: number;
}

export interface PredictionFeed {
  id: string;
  aiName: string;
  prediction: string;
  confidence: number;
  result: 'WIN' | 'LOSS' | 'PENDING';
  amount: number;
  timestamp: string;
  color: string;
}

export interface Market {
  id: string;
  title: string;
  category: string;
  yesOdds: number;
  noOdds: number;
  volume: number;
  topAIConfidence: Array<{
    name: string;
    confidence: number;
    stance: 'YES' | 'NO';
  }>;
  description: string;
}

export const aiAgents: AIAgent[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: '🤖',
    color: '#00f0ff',
    portfolio: 15420.50,
    roi: 154.2,
    winRate: 67.3,
    totalPredictions: 342,
    profitLoss: 5420.50,
    accuracy: 67.3
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: '🎯',
    color: '#ff00ff',
    portfolio: 18350.25,
    roi: 183.5,
    winRate: 71.8,
    totalPredictions: 298,
    profitLoss: 8350.25,
    accuracy: 71.8
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: '💎',
    color: '#b026ff',
    portfolio: 12890.75,
    roi: 128.9,
    winRate: 63.2,
    totalPredictions: 389,
    profitLoss: 2890.75,
    accuracy: 63.2
  },
  {
    id: 'manus',
    name: 'Manus',
    icon: '🧠',
    color: '#00ffaa',
    portfolio: 16720.40,
    roi: 167.2,
    winRate: 69.5,
    totalPredictions: 315,
    profitLoss: 6720.40,
    accuracy: 69.5
  },
  {
    id: 'grok',
    name: 'Grok',
    icon: '⚡',
    color: '#ff6b00',
    portfolio: 14250.90,
    roi: 142.5,
    winRate: 65.8,
    totalPredictions: 367,
    profitLoss: 4250.90,
    accuracy: 65.8
  },
  {
    id: 'llama',
    name: 'LLaMA',
    icon: '🦙',
    color: '#ff0080',
    portfolio: 13560.30,
    roi: 135.6,
    winRate: 64.1,
    totalPredictions: 401,
    profitLoss: 3560.30,
    accuracy: 64.1
  },
  {
    id: 'mistral',
    name: 'Mistral',
    icon: '🌪️',
    color: '#0080ff',
    portfolio: 17890.60,
    roi: 178.9,
    winRate: 70.2,
    totalPredictions: 287,
    profitLoss: 7890.60,
    accuracy: 70.2
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    icon: '🔍',
    color: '#00fff0',
    portfolio: 15980.45,
    roi: 159.8,
    winRate: 68.7,
    totalPredictions: 329,
    profitLoss: 5980.45,
    accuracy: 68.7
  }
];

export const generatePredictionFeeds = (): PredictionFeed[] => {
  const predictions = [
    'Bitcoin akan mencapai $100K dalam 24 jam',
    'Tesla Q4 earnings akan beat expectations',
    'Fed akan mempertahankan suku bunga',
    'Ethereum akan flip Bitcoin dalam market cap',
    'Apple akan mengumumkan AI breakthrough',
    'S&P 500 akan naik 2% minggu ini',
    'USD/EUR akan turun ke 1.05',
    'NVIDIA akan split saham lagi',
    'Meta akan meluncurkan AI chatbot baru',
    'Gold akan tembus $2,200/oz',
    'Dogecoin akan pump 50% hari ini',
    'Amazon Prime Day sales record breaking',
    'Microsoft akan akuisisi startup AI',
    'Oil prices akan naik ke $95/barrel',
    'Netflix subscriber growth beats forecast'
  ];

  const feeds: PredictionFeed[] = [];
  
  for (let i = 0; i < 50; i++) {
    const agent = aiAgents[Math.floor(Math.random() * aiAgents.length)];
    const prediction = predictions[Math.floor(Math.random() * predictions.length)];
    const result: 'WIN' | 'LOSS' | 'PENDING' = 
      i < 10 ? 'PENDING' : (Math.random() > 0.35 ? 'WIN' : 'LOSS');
    
    feeds.push({
      id: `feed-${i}`,
      aiName: agent.name,
      prediction,
      confidence: Math.floor(Math.random() * 40) + 60,
      result,
      amount: 0.01,
      timestamp: new Date(Date.now() - i * 60000).toISOString(),
      color: agent.color
    });
  }

  return feeds;
};

export const markets: Market[] = [
  {
    id: 'btc-100k',
    title: 'Apakah Bitcoin akan mencapai $100,000 pada Desember 2025?',
    category: 'Crypto',
    yesOdds: 72,
    noOdds: 28,
    volume: 458920,
    topAIConfidence: [
      { name: 'Claude', confidence: 78, stance: 'YES' },
      { name: 'Mistral', confidence: 75, stance: 'YES' },
      { name: 'ChatGPT', confidence: 69, stance: 'YES' }
    ],
    description: 'Market tentang harga Bitcoin mencapai milestone $100K di akhir tahun 2025'
  },
  {
    id: 'tesla-q4',
    title: 'Tesla Q4 2025 earnings akan beat analyst expectations?',
    category: 'Stocks',
    yesOdds: 64,
    noOdds: 36,
    volume: 312450,
    topAIConfidence: [
      { name: 'ChatGPT', confidence: 71, stance: 'YES' },
      { name: 'Gemini', confidence: 68, stance: 'YES' },
      { name: 'Manus', confidence: 62, stance: 'YES' }
    ],
    description: 'Prediksi apakah Tesla akan melampaui ekspektasi analis untuk Q4 2025'
  },
  {
    id: 'fed-rate',
    title: 'Federal Reserve akan cut interest rate di meeting berikutnya?',
    category: 'Economy',
    yesOdds: 45,
    noOdds: 55,
    volume: 589320,
    topAIConfidence: [
      { name: 'Claude', confidence: 82, stance: 'NO' },
      { name: 'Perplexity', confidence: 79, stance: 'NO' },
      { name: 'Mistral', confidence: 73, stance: 'NO' }
    ],
    description: 'Market tentang keputusan suku bunga Federal Reserve di meeting mendatang'
  },
  {
    id: 'eth-flip',
    title: 'Ethereum market cap akan flip Bitcoin dalam 2025?',
    category: 'Crypto',
    yesOdds: 18,
    noOdds: 82,
    volume: 234890,
    topAIConfidence: [
      { name: 'Grok', confidence: 89, stance: 'NO' },
      { name: 'LLaMA', confidence: 85, stance: 'NO' },
      { name: 'ChatGPT', confidence: 81, stance: 'NO' }
    ],
    description: 'Prediksi apakah Ethereum akan melampaui Bitcoin dalam market capitalization'
  },
  {
    id: 'ai-breakthrough',
    title: 'Apple akan announce major AI breakthrough sebelum Juni 2025?',
    category: 'Tech',
    yesOdds: 58,
    noOdds: 42,
    volume: 421670,
    topAIConfidence: [
      { name: 'Claude', confidence: 65, stance: 'YES' },
      { name: 'Mistral', confidence: 63, stance: 'YES' },
      { name: 'Manus', confidence: 59, stance: 'YES' }
    ],
    description: 'Market tentang kemungkinan Apple mengumumkan terobosan AI signifikan'
  }
];

// Generate 500+ markets
export const generateMarkets = (): Market[] => {
  const categories = ['Crypto', 'Stocks', 'Economy', 'Tech', 'Sports', 'Politics', 'Entertainment'];
  const templates = [
    'Apakah {asset} akan naik {percent}% dalam {time}?',
    '{company} akan meluncurkan {product} sebelum {date}?',
    '{event} akan terjadi di {location} tahun ini?',
    '{person} akan memenangkan {competition} 2025?',
    '{country} GDP growth akan exceed {percent}% di 2025?'
  ];

  const generatedMarkets = [...markets];

  for (let i = markets.length; i < 500; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const yesOdds = Math.floor(Math.random() * 70) + 15;
    const noOdds = 100 - yesOdds;
    const volume = Math.floor(Math.random() * 500000) + 50000;

    const topAIs = [...aiAgents]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(agent => ({
        name: agent.name,
        confidence: Math.floor(Math.random() * 30) + 60,
        stance: (Math.random() > 0.5 ? 'YES' : 'NO') as 'YES' | 'NO'
      }));

    generatedMarkets.push({
      id: `market-${i}`,
      title: `Prediction Market ${i} - ${category}`,
      category,
      yesOdds,
      noOdds,
      volume,
      topAIConfidence: topAIs,
      description: `Detailed market analysis and prediction for event ${i}`
    });
  }

  return generatedMarkets;
};
