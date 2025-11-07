-- Seed prediction markets (500+ markets)
-- Categories: Crypto, Stocks, Economy, Tech, Sports, Politics, Entertainment

-- Crypto Markets (100)
INSERT INTO prediction_markets (title, category, yes_odds, no_odds, volume, description) VALUES
  ('Bitcoin akan mencapai $100,000 pada Desember 2025?', 'Crypto', 72, 28, 458920, 'Market tentang harga Bitcoin mencapai milestone $100K'),
  ('Ethereum akan flip Bitcoin dalam market cap 2025?', 'Crypto', 18, 82, 234890, 'Prediksi apakah Ethereum akan melampaui Bitcoin'),
  ('Solana akan mencapai $500 per token?', 'Crypto', 45, 55, 189320, 'Harga Solana mencapai level tertinggi baru'),
  ('Total crypto market cap akan exceed $5 trillion?', 'Crypto', 62, 38, 312450, 'Total kapitalisasi pasar crypto'),
  ('Cardano akan launch smart contracts upgrade?', 'Crypto', 78, 22, 156780, 'Upgrade teknologi Cardano'),
  ('Dogecoin akan pump 100% dalam 3 bulan?', 'Crypto', 35, 65, 245890, 'Kenaikan harga meme coin'),
  ('Polygon akan jadi L2 terbesar?', 'Crypto', 54, 46, 198230, 'Dominasi Layer 2 solution'),
  ('XRP akan menang lawsuit vs SEC?', 'Crypto', 68, 32, 421560, 'Kasus hukum Ripple vs SEC'),
  ('Avalanche TVL akan melampaui $20B?', 'Crypto', 41, 59, 167890, 'Total Value Locked di Avalanche'),
  ('BNB akan mencapai all-time high baru?', 'Crypto', 57, 43, 289430, 'Binance Coin harga tertinggi');

-- Add 90 more crypto markets with generated data
DO $$
DECLARE
  i INTEGER;
  crypto_assets TEXT[] := ARRAY['Bitcoin', 'Ethereum', 'Solana', 'Cardano', 'Polkadot', 'Chainlink', 'Uniswap', 'Aave', 'Compound', 'Maker'];
  events TEXT[] := ARRAY['mencapai ATH', 'naik 50%', 'turun 30%', 'launch upgrade', 'partnership announcement', 'mainnet launch', 'token burn', 'staking rewards increase'];
BEGIN
  FOR i IN 1..90 LOOP
    INSERT INTO prediction_markets (title, category, yes_odds, no_odds, volume, description)
    VALUES (
      crypto_assets[1 + (i % 10)] || ' akan ' || events[1 + (i % 8)] || ' dalam Q' || (1 + (i % 4)) || ' 2025?',
      'Crypto',
      30 + (i % 60),
      70 - (i % 60),
      50000 + (i * 1000),
      'Prediksi market untuk ' || crypto_assets[1 + (i % 10)]
    );
  END LOOP;
END $$;

-- Stocks Markets (100)
INSERT INTO prediction_markets (title, category, yes_odds, no_odds, volume, description) VALUES
  ('Tesla Q4 2025 earnings akan beat expectations?', 'Stocks', 64, 36, 312450, 'Prediksi earnings Tesla'),
  ('Apple market cap akan mencapai $4 trillion?', 'Stocks', 71, 29, 498230, 'Valuasi Apple'),
  ('NVIDIA akan stock split lagi?', 'Stocks', 58, 42, 367890, 'Corporate action NVIDIA'),
  ('Microsoft akan akuisisi startup AI besar?', 'Stocks', 75, 25, 421340, 'M&A activity Microsoft'),
  ('Amazon Prime Day sales akan record breaking?', 'Stocks', 82, 18, 289670, 'E-commerce sales Amazon'),
  ('Meta akan meluncurkan AI chatbot baru?', 'Stocks', 69, 31, 198450, 'Product launch Meta'),
  ('Google akan spin off cloud division?', 'Stocks', 23, 77, 156780, 'Corporate restructuring'),
  ('Netflix subscriber growth beats forecast?', 'Stocks', 66, 34, 267890, 'Streaming metrics'),
  ('Disney+ akan profitable tahun ini?', 'Stocks', 58, 42, 234560, 'Streaming profitability'),
  ('Berkshire Hathaway akan invest in crypto?', 'Stocks', 12, 88, 389210, 'Investment strategy shift');

DO $$
DECLARE
  i INTEGER;
  companies TEXT[] := ARRAY['Tesla', 'Apple', 'Microsoft', 'Amazon', 'Google', 'Meta', 'NVIDIA', 'AMD', 'Intel', 'Salesforce'];
  stock_events TEXT[] := ARRAY['beat earnings', 'stock split', 'dividend increase', 'acquisition', 'partnership', 'product launch', 'expansion', 'cost cutting'];
BEGIN
  FOR i IN 1..90 LOOP
    INSERT INTO prediction_markets (title, category, yes_odds, no_odds, volume, description)
    VALUES (
      companies[1 + (i % 10)] || ' akan ' || stock_events[1 + (i % 8)] || ' di ' || (2025 + (i % 2)) || '?',
      'Stocks',
      35 + (i % 50),
      65 - (i % 50),
      60000 + (i * 1500),
      'Market prediction untuk ' || companies[1 + (i % 10)]
    );
  END LOOP;
END $$;

-- Economy Markets (100)
INSERT INTO prediction_markets (title, category, yes_odds, no_odds, volume, description) VALUES
  ('Federal Reserve akan cut interest rate di meeting berikutnya?', 'Economy', 45, 55, 589320, 'Keputusan suku bunga Fed'),
  ('US GDP growth akan exceed 3% di 2025?', 'Economy', 52, 48, 421560, 'Pertumbuhan ekonomi AS'),
  ('Inflation rate akan turun below 2%?', 'Economy', 38, 62, 367890, 'Target inflasi'),
  ('Unemployment rate akan naik above 4.5%?', 'Economy', 31, 69, 298430, 'Tingkat pengangguran'),
  ('Dollar akan strengthen vs Euro?', 'Economy', 64, 36, 445670, 'Nilai tukar mata uang'),
  ('Gold price akan tembus $2,500/oz?', 'Economy', 58, 42, 389210, 'Harga emas'),
  ('Oil prices akan naik ke $95/barrel?', 'Economy', 42, 58, 321450, 'Harga minyak'),
  ('China GDP growth akan exceed 5%?', 'Economy', 67, 33, 276890, 'Ekonomi China'),
  ('US akan masuk recession tahun ini?', 'Economy', 28, 72, 512340, 'Prediksi resesi'),
  ('Bitcoin akan diakui sebagai legal tender di negara baru?', 'Economy', 55, 45, 234670, 'Adopsi crypto');

DO $$
DECLARE
  i INTEGER;
  indicators TEXT[] := ARRAY['GDP growth', 'Inflation', 'Unemployment', 'Interest rate', 'Trade balance', 'Consumer confidence', 'Manufacturing index', 'Housing market'];
  regions TEXT[] := ARRAY['US', 'EU', 'China', 'Japan', 'UK', 'India', 'Brazil', 'Global'];
BEGIN
  FOR i IN 1..90 LOOP
    INSERT INTO prediction_markets (title, category, yes_odds, no_odds, volume, description)
    VALUES (
      regions[1 + (i % 8)] || ' ' || indicators[1 + (i % 8)] || ' akan improve di Q' || (1 + (i % 4)) || '?',
      'Economy',
      40 + (i % 40),
      60 - (i % 40),
      70000 + (i * 2000),
      'Economic indicator prediction untuk ' || regions[1 + (i % 8)]
    );
  END LOOP;
END $$;

-- Tech Markets (100)
INSERT INTO prediction_markets (title, category, yes_odds, no_odds, volume, description) VALUES
  ('Apple akan announce major AI breakthrough sebelum Juni 2025?', 'Tech', 58, 42, 421670, 'AI innovation Apple'),
  ('OpenAI akan release GPT-5 tahun ini?', 'Tech', 72, 28, 567890, 'Next gen AI model'),
  ('Quantum computing akan solve real-world problem?', 'Tech', 34, 66, 198450, 'Quantum breakthrough'),
  ('Self-driving cars akan legal di 10+ states?', 'Tech', 45, 55, 289340, 'Autonomous vehicle regulation'),
  ('VR headset sales akan exceed 50 million units?', 'Tech', 51, 49, 234560, 'VR adoption'),
  ('5G coverage akan mencapai 80% population?', 'Tech', 76, 24, 345670, 'Telco infrastructure'),
  ('AI akan pass Turing test officially?', 'Tech', 28, 72, 421890, 'AI milestone'),
  ('Humanoid robots akan mass produced?', 'Tech', 38, 62, 198230, 'Robotics advancement'),
  ('Brain-computer interface akan FDA approved?', 'Tech', 22, 78, 167890, 'NeuraLink atau competitor'),
  ('Renewable energy akan exceed 50% of grid?', 'Tech', 64, 36, 389450, 'Clean energy adoption');

DO $$
DECLARE
  i INTEGER;
  tech_areas TEXT[] := ARRAY['AI', 'Quantum', 'Robotics', 'Biotech', 'Space', 'VR/AR', 'Blockchain', '5G/6G', 'Clean Energy', 'Nanotech'];
  achievements TEXT[] := ARRAY['breakthrough', 'commercial launch', 'regulatory approval', 'mass adoption', 'new record', 'partnership', 'IPO', 'acquisition'];
BEGIN
  FOR i IN 1..90 LOOP
    INSERT INTO prediction_markets (title, category, yes_odds, no_odds, volume, description)
    VALUES (
      tech_areas[1 + (i % 10)] || ' akan achieve ' || achievements[1 + (i % 8)] || ' dalam 2025?',
      'Tech',
      25 + (i % 60),
      75 - (i % 60),
      80000 + (i * 2500),
      'Technology prediction untuk ' || tech_areas[1 + (i % 10)]
    );
  END LOOP;
END $$;

-- Sports, Politics, Entertainment Markets (100 total)
DO $$
DECLARE
  i INTEGER;
  categories TEXT[] := ARRAY['Sports', 'Politics', 'Entertainment'];
  category TEXT;
BEGIN
  FOR i IN 1..100 LOOP
    category := categories[1 + ((i - 1) % 3)];
    
    IF category = 'Sports' THEN
      INSERT INTO prediction_markets (title, category, yes_odds, no_odds, volume, description)
      VALUES (
        'Team ' || chr(65 + (i % 26)) || ' akan win championship ' || (2025 + (i % 2)) || '?',
        'Sports',
        30 + (i % 50),
        70 - (i % 50),
        50000 + (i * 1000),
        'Sports championship prediction'
      );
    ELSIF category = 'Politics' THEN
      INSERT INTO prediction_markets (title, category, yes_odds, no_odds, volume, description)
      VALUES (
        'Policy ' || chr(65 + (i % 26)) || ' akan passed dalam ' || (2025 + (i % 2)) || '?',
        'Politics',
        35 + (i % 45),
        65 - (i % 45),
        60000 + (i * 1200),
        'Political event prediction'
      );
    ELSE
      INSERT INTO prediction_markets (title, category, yes_odds, no_odds, volume, description)
      VALUES (
        'Movie/Show ' || chr(65 + (i % 26)) || ' akan win award di ' || (2025 + (i % 2)) || '?',
        'Entertainment',
        40 + (i % 40),
        60 - (i % 40),
        40000 + (i * 800),
        'Entertainment award prediction'
      );
    END IF;
  END LOOP;
END $$;
