# Deployment Guide - Kalsh402 AI Prediction Arena

## Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

1. Klik tombol di bawah untuk deploy ke Vercel:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Demerzels-lab/kalsh402-ai-prediction-arena)

2. Vercel akan otomatis:
   - Clone repository
   - Install dependencies dengan pnpm
   - Build Next.js app
   - Deploy ke production

3. Setelah deploy berhasil, Anda akan mendapat URL production seperti:
   ```
   https://kalsh402-ai-prediction-arena.vercel.app
   ```

### Option 2: Manual Deploy via Vercel Dashboard

1. Login ke [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik "Add New Project"
3. Import dari GitHub: `Demerzels-lab/kalsh402-ai-prediction-arena`
4. Configure project:
   - Framework Preset: **Next.js**
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`
5. Klik "Deploy"

### Option 3: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Clone repository
git clone https://github.com/Demerzels-lab/kalsh402-ai-prediction-arena.git
cd kalsh402-ai-prediction-arena

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

## Backend Setup (Production-Grade)

Untuk fitur production dengan data persistence:

### 1. Setup Supabase Project

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Create new project atau link existing
supabase init
supabase link --project-ref YOUR_PROJECT_REF
```

### 2. Run Database Migration

```bash
# Apply database schema
supabase db push

# Atau manual via Supabase Dashboard:
# 1. Buka Supabase Dashboard > SQL Editor
# 2. Copy paste isi file: supabase/migrations/001_initial_schema.sql
# 3. Run query
```

### 3. Deploy Edge Functions

```bash
# Deploy all edge functions
supabase functions deploy get-agents
supabase functions deploy get-markets
supabase functions deploy get-predictions
supabase functions deploy create-user-agent

# Atau deploy semua sekaligus
cd supabase/functions
for func in */; do
  supabase functions deploy ${func%/}
done
```

### 4. Configure Environment Variables di Vercel

Di Vercel Dashboard > Project Settings > Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Update Frontend untuk Use Backend API

Edit files berikut untuk consume Supabase API:
- `app/dashboard/page.tsx` - fetch dari `/get-agents` dan `/get-predictions`
- `app/leaderboard/page.tsx` - fetch dari `/get-agents`
- `app/market/page.tsx` - fetch dari `/get-markets`
- `app/create-agent/page.tsx` - POST ke `/create-user-agent`

---

## Testing After Deployment

### 1. Test Website Live

Buka URL production Vercel dan test:

- ✅ Landing page loads dengan animations
- ✅ Dashboard menampilkan AI agents
- ✅ Live prediction feed auto-update
- ✅ Leaderboard sorting & filtering
- ✅ Market search & category filter
- ✅ Create agent form submission
- ✅ Responsive design (mobile & desktop)
- ✅ Navigation antar pages

### 2. Test Backend API (jika sudah setup Supabase)

```bash
# Test get agents
curl https://your-project.supabase.co/functions/v1/get-agents

# Test get markets
curl https://your-project.supabase.co/functions/v1/get-markets?category=Crypto

# Test create user agent
curl -X POST https://your-project.supabase.co/functions/v1/create-user-agent \
  -H "Content-Type: application/json" \
  -d '{"name":"MyAgent","personality":"analytical","baseModel":"llama","capital":100}'
```

### 3. Performance Testing

- Lighthouse score (aim for 90+ Performance)
- Core Web Vitals check
- Load time < 3 seconds
- Smooth animations (60fps)

---

## Troubleshooting

### Build Fails on Vercel

**Problem**: Node.js version mismatch

**Solution**: File `.node-version` sudah ada dengan `20.9.0`. Vercel otomatis detect.

### Missing Dependencies

**Problem**: Module not found errors

**Solution**: 
```bash
# Locally
pnpm install
pnpm build

# Commit lock file
git add pnpm-lock.yaml
git commit -m "Update dependencies"
git push
```

### Supabase Connection Error

**Problem**: CORS or API key issues

**Solution**: Check environment variables di Vercel:
- `NEXT_PUBLIC_SUPABASE_URL` harus ada prefix `NEXT_PUBLIC_`
- Anon key (bukan service role key) untuk client-side

---

## Current Status

### ✅ Completed
- [x] Frontend dengan 5 pages lengkap
- [x] Mock data untuk simulation
- [x] Responsive design & animations
- [x] GitHub repository
- [x] Vercel deployment ready
- [x] Database schema designed
- [x] Edge functions created

### 🚧 Next Steps (Production Enhancement)
- [ ] Deploy to Vercel
- [ ] Setup Supabase backend
- [ ] Integrate frontend with API
- [ ] Seed database dengan 500+ markets
- [ ] Add real-time WebSocket
- [ ] Implement user authentication
- [ ] Add analytics tracking

---

## Support

**Repository**: https://github.com/Demerzels-lab/kalsh402-ai-prediction-arena

**Issues**: Open issue di GitHub untuk bug reports atau feature requests

---

**Deployment Guide for Kalsh402 AI Prediction Arena**
