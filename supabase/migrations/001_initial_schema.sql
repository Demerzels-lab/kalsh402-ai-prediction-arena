-- Create ai_agents table
CREATE TABLE IF NOT EXISTS ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(10),
  color VARCHAR(20),
  portfolio DECIMAL(12, 2) DEFAULT 10000.00,
  roi DECIMAL(8, 2) DEFAULT 0.00,
  win_rate DECIMAL(5, 2) DEFAULT 0.00,
  total_predictions INTEGER DEFAULT 0,
  profit_loss DECIMAL(12, 2) DEFAULT 0.00,
  accuracy DECIMAL(5, 2) DEFAULT 0.00,
  is_system_agent BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prediction_markets table
CREATE TABLE IF NOT EXISTS prediction_markets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  yes_odds INTEGER DEFAULT 50,
  no_odds INTEGER DEFAULT 50,
  volume DECIMAL(12, 2) DEFAULT 0.00,
  description TEXT,
  status VARCHAR(20) DEFAULT 'active',
  resolution VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create predictions table
CREATE TABLE IF NOT EXISTS predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES ai_agents(id) ON DELETE CASCADE,
  market_id UUID REFERENCES prediction_markets(id) ON DELETE CASCADE,
  prediction TEXT NOT NULL,
  confidence INTEGER NOT NULL,
  stance VARCHAR(10) NOT NULL,
  amount DECIMAL(10, 2) DEFAULT 0.01,
  result VARCHAR(20) DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create user_agents table
CREATE TABLE IF NOT EXISTS user_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  name VARCHAR(100) NOT NULL,
  personality VARCHAR(50) NOT NULL,
  base_model VARCHAR(50) NOT NULL,
  starting_capital DECIMAL(10, 2) DEFAULT 100.00,
  current_portfolio DECIMAL(12, 2),
  roi DECIMAL(8, 2) DEFAULT 0.00,
  win_rate DECIMAL(5, 2) DEFAULT 0.00,
  total_predictions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_predictions_agent_id ON predictions(agent_id);
CREATE INDEX idx_predictions_market_id ON predictions(market_id);
CREATE INDEX idx_predictions_created_at ON predictions(created_at DESC);
CREATE INDEX idx_markets_category ON prediction_markets(category);
CREATE INDEX idx_markets_status ON prediction_markets(status);

-- Enable Row Level Security
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE prediction_markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_agents ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to ai_agents" ON ai_agents FOR SELECT USING (true);
CREATE POLICY "Allow public read access to prediction_markets" ON prediction_markets FOR SELECT USING (true);
CREATE POLICY "Allow public read access to predictions" ON predictions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to user_agents" ON user_agents FOR SELECT USING (true);

-- Create policies for insert (will be handled by edge functions)
CREATE POLICY "Allow insert to predictions" ON predictions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert to user_agents" ON user_agents FOR INSERT WITH CHECK (true);

-- Insert initial AI agents data
INSERT INTO ai_agents (name, icon, color, portfolio, roi, win_rate, total_predictions, profit_loss, accuracy) VALUES
  ('ChatGPT', '🤖', '#00f0ff', 15420.50, 154.2, 67.3, 342, 5420.50, 67.3),
  ('Claude', '🎯', '#ff00ff', 18350.25, 183.5, 71.8, 298, 8350.25, 71.8),
  ('Gemini', '💎', '#b026ff', 12890.75, 128.9, 63.2, 389, 2890.75, 63.2),
  ('Manus', '🧠', '#00ffaa', 16720.40, 167.2, 69.5, 315, 6720.40, 69.5),
  ('Grok', '⚡', '#ff6b00', 14250.90, 142.5, 65.8, 367, 4250.90, 65.8),
  ('LLaMA', '🦙', '#ff0080', 13560.30, 135.6, 64.1, 401, 3560.30, 64.1),
  ('Mistral', '🌪️', '#0080ff', 17890.60, 178.9, 70.2, 287, 7890.60, 70.2),
  ('Perplexity', '🔍', '#00fff0', 15980.45, 159.8, 68.7, 329, 5980.45, 68.7)
ON CONFLICT DO NOTHING;
