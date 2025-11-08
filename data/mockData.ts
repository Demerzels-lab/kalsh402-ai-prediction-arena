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

export const markets2025: Market[] = [
  // CRYPTO MARKETS (20 predictions)
  {
    id: 'btc-ath-2025',
    title: 'Bitcoin akan mencapai All-Time High $150,000+ di Q4 2025?',
    category: 'Crypto',
    yesOdds: 68,
    noOdds: 32,
    volume: 2450000,
    topAIConfidence: [
      { name: 'Claude', confidence: 75, stance: 'YES' },
      { name: 'ChatGPT', confidence: 72, stance: 'YES' },
      { name: 'Mistral', confidence: 69, stance: 'YES' }
    ],
    description: 'Prediksi Bitcoin mencapai rekor tertinggi baru $150K+ pada kuartal terakhir 2025 seiring adopsi institusional dan halving effect.'
  },
  {
    id: 'eth-5k-2025',
    title: 'Ethereum akan menembus $5,000 sebelum Agustus 2025?',
    category: 'Crypto',
    yesOdds: 62,
    noOdds: 38,
    volume: 1890000,
    topAIConfidence: [
      { name: 'Manus', confidence: 71, stance: 'YES' },
      { name: 'Perplexity', confidence: 65, stance: 'YES' },
      { name: 'Claude', confidence: 58, stance: 'YES' }
    ],
    description: 'Market untuk ETH mencapai $5K dengan upgrade Ethereum 2.0 dan adopsi DeFi yang masif di 2025.'
  },
  {
    id: 'sol-300-2025',
    title: 'Solana (SOL) akan mencapai harga $300+ dalam 2025?',
    category: 'Crypto',
    yesOdds: 45,
    noOdds: 55,
    volume: 987000,
    topAIConfidence: [
      { name: 'Grok', confidence: 58, stance: 'NO' },
      { name: 'LLaMA', confidence: 52, stance: 'NO' },
      { name: 'ChatGPT', confidence: 49, stance: 'YES' }
    ],
    description: 'Prediksi Solana mencapai $300 dengan ekosistem DeFi dan NFT yang berkembang pesat.'
  },
  {
    id: 'ada-cardano-2025',
    title: 'Cardano (ADA) akan outperform Bitcoin dalam ROI 2025?',
    category: 'Crypto',
    yesOdds: 23,
    noOdds: 77,
    volume: 654000,
    topAIConfidence: [
      { name: 'Claude', confidence: 82, stance: 'NO' },
      { name: 'Mistral', confidence: 79, stance: 'NO' },
      { name: 'Manus', confidence: 76, stance: 'NO' }
    ],
    description: 'Market apakah ADA akan memberikan return yang lebih tinggi daripada Bitcoin di tahun 2025.'
  },
  {
    id: 'doge-1dollar-2025',
    title: 'Dogecoin akan mencapai $1 sebelum Desember 2025?',
    category: 'Crypto',
    yesOdds: 15,
    noOdds: 85,
    volume: 543000,
    topAIConfidence: [
      { name: 'Grok', confidence: 89, stance: 'NO' },
      { name: 'ChatGPT', confidence: 87, stance: 'NO' },
      { name: 'LLaMA', confidence: 84, stance: 'NO' }
    ],
    description: 'Prediksi DOGE mencapai milestone $1 dengan dukungan komunitas dan adopsi mainstream.'
  },

  // TECH STOCKS (15 predictions)
  {
    id: 'nvidia-split-2025',
    title: 'NVIDIA akan melakukan stock split lagi dalam 2025?',
    category: 'Stocks',
    yesOdds: 78,
    noOdds: 22,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 85, stance: 'YES' },
      { name: 'Mistral', confidence: 82, stance: 'YES' },
      { name: 'Perplexity', confidence: 79, stance: 'YES' }
    ],
    description: 'Market tentang kemungkinan NVIDIA melakukan stock split kedua mengikuti momentum AI boom.'
  },
  {
    id: 'tesla-500-2025',
    title: 'Tesla stock akan mencapai $500+ per share di 2025?',
    category: 'Stocks',
    yesOdds: 42,
    noOdds: 58,
    volume: 1456000,
    topAIConfidence: [
      { name: 'ChatGPT', confidence: 61, stance: 'NO' },
      { name: 'Manus', confidence: 58, stance: 'NO' },
      { name: 'Gemini', confidence: 55, stance: 'NO' }
    ],
    description: 'Prediksi harga saham Tesla mencapai $500 dengan produksi FSD dan robotaxi deployment.'
  },
  {
    id: 'apple-4trillion-2025',
    title: 'Apple akan menjadi perusahaan $4 triliun pertama di 2025?',
    category: 'Stocks',
    yesOdds: 67,
    noOdds: 33,
    volume: 2100000,
    topAIConfidence: [
      { name: 'Claude', confidence: 73, stance: 'YES' },
      { name: 'ChatGPT', confidence: 70, stance: 'YES' },
      { name: 'Mistral', confidence: 68, stance: 'YES' }
    ],
    description: 'Market cap Apple mencapai $4T dengan Vision Pro sukses dan AI integration di semua produk.'
  },
  {
    id: 'meta-400-2025',
    title: 'Meta stock akan melampaui $400 per share dalam 2025?',
    category: 'Stocks',
    yesOdds: 55,
    noOdds: 45,
    volume: 987000,
    topAIConfidence: [
      { name: 'Manus', confidence: 62, stance: 'YES' },
      { name: 'Perplexity', confidence: 59, stance: 'YES' },
      { name: 'Grok', confidence: 56, stance: 'YES' }
    ],
    description: 'Prediksi META mencapai $400 dengan metaverse adoption dan AI advertising revenue.'
  },
  {
    id: 'google-200-2025',
    title: 'Google (GOOGL) akan mencapai $200+ per share di 2025?',
    category: 'Stocks',
    yesOdds: 71,
    noOdds: 29,
    volume: 1345000,
    topAIConfidence: [
      { name: 'Claude', confidence: 78, stance: 'YES' },
      { name: 'ChatGPT', confidence: 75, stance: 'YES' },
      { name: 'Mistral', confidence: 72, stance: 'YES' }
    ],
    description: 'Market Google mencapai $200+ dengan Gemini AI dominance dan cloud growth acceleration.'
  },

  // ENTERTAINMENT & MOVIES (10 predictions)
  {
    id: 'avatar3-highest-2025',
    title: 'Avatar 3 akan menjadi highest-grossing movie 2025?',
    category: 'Entertainment',
    yesOdds: 73,
    noOdds: 27,
    volume: 1567000,
    topAIConfidence: [
      { name: 'Claude', confidence: 81, stance: 'YES' },
      { name: 'ChatGPT', confidence: 78, stance: 'YES' },
      { name: 'Manus', confidence: 75, stance: 'YES' }
    ],
    description: 'Prediksi Avatar 3 mendominasi box office 2025 dengan teknologi underwater yang revolusioner.'
  },
  {
    id: 'avengers-2025',
    title: 'Marvel akan mengumumkan Avengers movie baru untuk 2026-2027?',
    category: 'Entertainment',
    yesOdds: 86,
    noOdds: 14,
    volume: 1234000,
    topAIConfidence: [
      { name: 'ChatGPT', confidence: 92, stance: 'YES' },
      { name: 'Claude', confidence: 89, stance: 'YES' },
      { name: 'Mistral', confidence: 87, stance: 'YES' }
    ],
    description: 'Market tentang pengumuman Avengers film baru sebagai culmination dari Multiverse Saga.'
  },
  {
    id: 'dune3-production-2025',
    title: 'Dune: Part Three akan mulai production di 2025?',
    category: 'Entertainment',
    yesOdds: 79,
    noOdds: 21,
    volume: 876000,
    topAIConfidence: [
      { name: 'Perplexity', confidence: 85, stance: 'YES' },
      { name: 'Claude', confidence: 82, stance: 'YES' },
      { name: 'Manus', confidence: 79, stance: 'YES' }
    ],
    description: 'Prediksi Denis Villeneuve akan memulai produksi Dune: Part Three setelah sukses Part Two.'
  },
  {
    id: 'starwars-movie-2025',
    title: 'Star Wars akan merilis theatrical movie baru di 2025?',
    category: 'Entertainment',
    yesOdds: 34,
    noOdds: 66,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Grok', confidence: 71, stance: 'NO' },
      { name: 'LLaMA', confidence: 68, stance: 'NO' },
      { name: 'ChatGPT', confidence: 65, stance: 'NO' }
    ],
    description: 'Market tentang kemungkinan Star Wars theatrical release di 2025 setelah hiatus panjang.'
  },
  {
    id: 'netflix-sub-300m-2025',
    title: 'Netflix akan mencapai 300 juta subscribers di 2025?',
    category: 'Entertainment',
    yesOdds: 52,
    noOdds: 48,
    volume: 967000,
    topAIConfidence: [
      { name: 'Claude', confidence: 59, stance: 'YES' },
      { name: 'ChatGPT', confidence: 56, stance: 'YES' },
      { name: 'Mistral', confidence: 53, stance: 'YES' }
    ],
    description: 'Prediksi Netflix mencapai 300M subscribers dengan password sharing crackdown dan content expansion.'
  },

  // AI & TECH BREAKTHROUGHS (15 predictions)
  {
    id: 'gpt5-release-2025',
    title: 'OpenAI akan meluncurkan GPT-5 sebelum Q3 2025?',
    category: 'Tech',
    yesOdds: 81,
    noOdds: 19,
    volume: 1890000,
    topAIConfidence: [
      { name: 'ChatGPT', confidence: 87, stance: 'YES' },
      { name: 'Claude', confidence: 84, stance: 'YES' },
      { name: 'Mistral', confidence: 81, stance: 'YES' }
    ],
    description: 'Market tentang rilisan GPT-5 dengan kemampuan reasoning dan multimodal yang breakthrough.'
  },
  {
    id: 'apple-vision-pro-5m-2025',
    title: 'Apple Vision Pro akan terjual 5 juta+ unit dalam 2025?',
    category: 'Tech',
    yesOdds: 28,
    noOdds: 72,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 76, stance: 'NO' },
      { name: 'Manus', confidence: 73, stance: 'NO' },
      { name: 'ChatGPT', confidence: 70, stance: 'NO' }
    ],
    description: 'Prediksi penjualan Apple Vision Pro mencapai 5M unit dengan price reduction dan app ecosystem growth.'
  },
  {
    id: 'google-gemini-ultra-2025',
    title: 'Google Gemini Ultra akan mengalahkan GPT-4o dalam benchmark?',
    category: 'Tech',
    yesOdds: 65,
    noOdds: 35,
    volume: 1456000,
    topAIConfidence: [
      { name: 'Gemini', confidence: 78, stance: 'YES' },
      { name: 'Claude', confidence: 72, stance: 'YES' },
      { name: 'Perplexity', confidence: 69, stance: 'YES' }
    ],
    description: 'Market tentang kompetisi AI model terdepan antara Google dan OpenAI di 2025.'
  },
  {
    id: 'tesla-fsd-level5-2025',
    title: 'Tesla akan achieve true Level 5 FSD di 2025?',
    category: 'Tech',
    yesOdds: 19,
    noOdds: 81,
    volume: 1567000,
    topAIConfidence: [
      { name: 'Claude', confidence: 87, stance: 'NO' },
      { name: 'ChatGPT', confidence: 84, stance: 'NO' },
      { name: 'Manus', confidence: 81, stance: 'NO' }
    ],
    description: 'Prediksi Tesla mencapai Full Self-Driving Level 5 yang benar-benar autonomous tanpa intervention.'
  },
  {
    id: 'quantum-breakthrough-2025',
    title: 'Akan ada major quantum computing breakthrough di 2025?',
    category: 'Tech',
    yesOdds: 42,
    noOdds: 58,
    volume: 987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 65, stance: 'NO' },
      { name: 'Mistral', confidence: 62, stance: 'NO' },
      { name: 'Perplexity', confidence: 59, stance: 'NO' }
    ],
    description: 'Market tentang terobosan signifikan dalam quantum computing yang akan mengubah industri teknologi.'
  },

  // SPORTS & OLYMPICS 2025 (10 predictions)
  {
    id: 'olympics-2025-records',
    title: '10+ world records akan dipecahkan di Olympics Paris 2025?',
    category: 'Sports',
    yesOdds: 67,
    noOdds: 33,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 74, stance: 'YES' },
      { name: 'ChatGPT', confidence: 71, stance: 'YES' },
      { name: 'Manus', confidence: 68, stance: 'YES' }
    ],
    description: 'Prediksi 10+ rekor dunia baru di Olympics 2025 dengan teknologi dan training methods terbaru.'
  },
  {
    id: 'usain-bolt-comeback-2025',
    title: 'Usain Bolt akan announce comeback untuk Olympics 2025?',
    category: 'Sports',
    yesOdds: 8,
    noOdds: 92,
    volume: 876000,
    topAIConfidence: [
      { name: 'Grok', confidence: 95, stance: 'NO' },
      { name: 'LLaMA', confidence: 93, stance: 'NO' },
      { name: 'ChatGPT', confidence: 91, stance: 'NO' }
    ],
    description: 'Market tentang kemungkinan Usain Bolt comeback untuk Olympics terakhirnya di usia 39 tahun.'
  },
  {
    id: 'nba-ratings-2025',
    title: 'NBA Finals 2025 akan memiliki TV ratings tertinggi dalam 5 tahun?',
    category: 'Sports',
    yesOdds: 48,
    noOdds: 52,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 56, stance: 'NO' },
      { name: 'ChatGPT', confidence: 53, stance: 'NO' },
      { name: 'Mistral', confidence: 50, stance: 'YES' }
    ],
    description: 'Prediksi TV ratings NBA Finals 2025 mencapai puncak tertinggi dengan rivalries baru.'
  },
  {
    id: 'fifa-wc-expansion-2025',
    title: 'FIFA akan mengumumkan ekspansi World Cup menjadi 64 tim?',
    category: 'Sports',
    yesOdds: 23,
    noOdds: 77,
    volume: 967000,
    topAIConfidence: [
      { name: 'Claude', confidence: 82, stance: 'NO' },
      { name: 'Perplexity', confidence: 79, stance: 'NO' },
      { name: 'Manus', confidence: 76, stance: 'NO' }
    ],
    description: 'Market tentang kemungkinan FIFA mengumumkan ekspansi World Cup dari 48 menjadi 64 tim.'
  },
  {
    id: 'formula1-vegas-2025',
    title: 'Formula 1 Las Vegas GP 2025 akan jadi race dengan attendance tertinggi?',
    category: 'Sports',
    yesOdds: 34,
    noOdds: 66,
    volume: 789000,
    topAIConfidence: [
      { name: 'Grok', confidence: 71, stance: 'NO' },
      { name: 'LLaMA', confidence: 68, stance: 'NO' },
      { name: 'Claude', confidence: 65, stance: 'NO' }
    ],
    description: 'Prediksi F1 Las Vegas GP akan memiliki attendance tertinggi mengalahkan Monaco dan Silverstone.'
  },

  // ECONOMIC FORECASTS (10 predictions)
  {
    id: 'us-recession-2025',
    title: 'US akan mengalami resesi teknis (2 quarters) di 2025?',
    category: 'Economy',
    yesOdds: 31,
    noOdds: 69,
    volume: 1890000,
    topAIConfidence: [
      { name: 'Claude', confidence: 74, stance: 'NO' },
      { name: 'Perplexity', confidence: 71, stance: 'NO' },
      { name: 'Mistral', confidence: 68, stance: 'NO' }
    ],
    description: 'Market tentang kemungkinan US mengalami resesi teknis dengan 2 consecutive quarters negative growth.'
  },
  {
    id: 'fed-rate-below-3-2025',
    title: 'Federal Reserve rate akan turun di bawah 3% sebelum end of 2025?',
    category: 'Economy',
    yesOdds: 56,
    noOdds: 44,
    volume: 1567000,
    topAIConfidence: [
      { name: 'Claude', confidence: 63, stance: 'YES' },
      { name: 'ChatGPT', confidence: 60, stance: 'YES' },
      { name: 'Manus', confidence: 57, stance: 'YES' }
    ],
    description: 'Prediksi Fed funds rate turun significant di bawah 3% karena economic slowdown dan inflation control.'
  },
  {
    id: 'inflation-2percent-2025',
    title: 'US inflation akan stabil di 2% target sepanjang Q3-Q4 2025?',
    category: 'Economy',
    yesOdds: 41,
    noOdds: 59,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Perplexity', confidence: 66, stance: 'NO' },
      { name: 'Claude', confidence: 63, stance: 'NO' },
      { name: 'Mistral', confidence: 60, stance: 'NO' }
    ],
    description: 'Market tentang inflation US mencapai dan mempertahankan target Fed 2% di akhir 2025.'
  },
  {
    id: 'oil-120-2025',
    title: 'Crude oil akan mencapai $120+ per barrel dalam 2025?',
    category: 'Economy',
    yesOdds: 27,
    noOdds: 73,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 78, stance: 'NO' },
      { name: 'ChatGPT', confidence: 75, stance: 'NO' },
      { name: 'Manus', confidence: 72, stance: 'NO' }
    ],
    description: 'Prediksi crude oil mencapai $120+ karena geopolitical tensions dan supply constraints.'
  },
  {
    id: 'gold-3000-2025',
    title: 'Gold akan menembus $3,000 per ounce di 2025?',
    category: 'Economy',
    yesOdds: 38,
    noOdds: 62,
    volume: 987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 68, stance: 'NO' },
      { name: 'Mistral', confidence: 65, stance: 'NO' },
      { name: 'Perplexity', confidence: 62, stance: 'NO' }
    ],
    description: 'Market tentang gold mencapai $3,000/oz dengan global uncertainty dan dollar weakness.'
  },

  // GAMING INDUSTRY (10 predictions)
  {
    id: 'gta6-delay-2026',
    title: 'GTA 6 akan delayed lagi ke 2026?',
    category: 'Gaming',
    yesOdds: 24,
    noOdds: 76,
    volume: 1456000,
    topAIConfidence: [
      { name: 'Grok', confidence: 81, stance: 'NO' },
      { name: 'LLaMA', confidence: 78, stance: 'NO' },
      { name: 'ChatGPT', confidence: 75, stance: 'NO' }
    ],
    description: 'Prediksi GTA 6 akan mengalami delay lagi dari target release 2025 ke 2026.'
  },
  {
    id: 'nintendo-switch2-2025',
    title: 'Nintendo akan meluncurkan Switch 2 di 2025?',
    category: 'Gaming',
    yesOdds: 89,
    noOdds: 11,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 94, stance: 'YES' },
      { name: 'ChatGPT', confidence: 91, stance: 'YES' },
      { name: 'Mistral', confidence: 88, stance: 'YES' }
    ],
    description: 'Market tentang Nintendo Switch 2 launch di 2025 dengan backwards compatibility dan upgraded specs.'
  },
  {
    id: 'steam-deck2-announce-2025',
    title: 'Valve akan announce Steam Deck 2 dalam 2025?',
    category: 'Gaming',
    yesOdds: 67,
    noOdds: 33,
    volume: 876000,
    topAIConfidence: [
      { name: 'Manus', confidence: 74, stance: 'YES' },
      { name: 'Claude', confidence: 71, stance: 'YES' },
      { name: 'Perplexity', confidence: 68, stance: 'YES' }
    ],
    description: 'Prediksi Valve mengumumkan Steam Deck generasi kedua dengan improved performance dan battery life.'
  },
  {
    id: 'esports-olympics-2025',
    title: 'Esports akan officially included in Olympics 2025?',
    category: 'Gaming',
    yesOdds: 15,
    noOdds: 85,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 89, stance: 'NO' },
      { name: 'ChatGPT', confidence: 86, stance: 'NO' },
      { name: 'Mistral', confidence: 83, stance: 'NO' }
    ],
    description: 'Market tentang esports menjadi cabang resmi Olympics 2025 setelah exhibtion di Paris 2024.'
  },
  {
    id: 'minecraft-2-announce-2025',
    title: 'Microsoft akan announce Minecraft 2 di 2025?',
    category: 'Gaming',
    yesOdds: 12,
    noOdds: 88,
    volume: 967000,
    topAIConfidence: [
      { name: 'Grok', confidence: 92, stance: 'NO' },
      { name: 'LLaMA', confidence: 89, stance: 'NO' },
      { name: 'ChatGPT', confidence: 86, stance: 'NO' }
    ],
    description: 'Prediksi Microsoft mengumumkan Minecraft 2 sebagai next-gen successor dari game terpopuler dunia.'
  },

  // CLIMATE & ENVIRONMENT (10 predictions)
  {
    id: 'global-temp-record-2025',
    title: '2025 akan menjadi tahun terpanas dalam recorded history?',
    category: 'Climate',
    yesOdds: 73,
    noOdds: 27,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 81, stance: 'YES' },
      { name: 'Perplexity', confidence: 78, stance: 'YES' },
      { name: 'Mistral', confidence: 75, stance: 'YES' }
    ],
    description: 'Market tentang 2025 memecahkan rekor suhu global tertinggi mengalahkan 2023 dan 2024.'
  },
  {
    id: 'ev-50percent-2025',
    title: 'Electric vehicles akan capai 50%+ market share di Norway 2025?',
    category: 'Climate',
    yesOdds: 94,
    noOdds: 6,
    volume: 876000,
    topAIConfidence: [
      { name: 'Claude', confidence: 97, stance: 'YES' },
      { name: 'ChatGPT', confidence: 95, stance: 'YES' },
      { name: 'Manus', confidence: 92, stance: 'YES' }
    ],
    description: 'Prediksi Norway mencapai 50%+ EV market share sebagai negara pertama dengan majority electric car sales.'
  },
  {
    id: 'renewable-30percent-global-2025',
    title: 'Renewable energy akan mencapai 30%+ global electricity generation?',
    category: 'Climate',
    yesOdds: 61,
    noOdds: 39,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 68, stance: 'YES' },
      { name: 'Mistral', confidence: 65, stance: 'YES' },
      { name: 'Perplexity', confidence: 62, stance: 'YES' }
    ],
    description: 'Market tentang renewable energy (solar, wind, hydro) mencapai 30% dari total electricity generation global.'
  },
  {
    id: 'carbon-capture-breakthrough-2025',
    title: 'Akan ada major carbon capture technology breakthrough di 2025?',
    category: 'Climate',
    yesOdds: 34,
    noOdds: 66,
    volume: 789000,
    topAIConfidence: [
      { name: 'Claude', confidence: 71, stance: 'NO' },
      { name: 'Mistral', confidence: 68, stance: 'NO' },
      { name: 'Manus', confidence: 65, stance: 'NO' }
    ],
    description: 'Prediksi terobosan signifikan dalam carbon capture technology yang cost-effective dan scalable.'
  },
  {
    id: 'arctic-ice-minimum-2025',
    title: 'Arctic sea ice akan mencapai record minimum baru di 2025?',
    category: 'Climate',
    yesOdds: 42,
    noOdds: 58,
    volume: 654000,
    topAIConfidence: [
      { name: 'Perplexity', confidence: 65, stance: 'NO' },
      { name: 'Claude', confidence: 62, stance: 'NO' },
      { name: 'Mistral', confidence: 59, stance: 'NO' }
    ],
    description: 'Market tentang Arctic sea ice extent mencapai minimum record baru mengalahkan 2012.'
  }
];

// Generate 100 specific 2025 markets
export const generateMarkets = (): Market[] => {
  return markets2025;
};
