# Builder Uptime 🤖⚡

**AI-powered productivity agent for builders.** Track tasks, get real-time insights, and prove your work on-chain.

**📱 Launch as a Farcaster Frame** • Built with **Coinbase Agent Kit** • Deployed on **Monad Testnet**

---

## What It Does

**Farcaster Frame:**
- 📱 Track productivity directly in Warpcast
- 🔗 Share your uptime score in casts
- 👥 Compare productivity with other builders
- 🎯 Launch miniapp with one tap

**AI Agent Features:**
- 🧠 Real-time productivity analysis
- 💡 Smart break reminders
- 🚨 Burnout prevention
- 📊 Pattern learning from your work habits

**Productivity Tracking:**
- ✅ Task management with blocker detection
- ⚡ Energy & focus time tracking
- 🎯 Live uptime score (target: 99.99%)
- 📈 Historical data & insights

**Web3 Integration:**
- 🔐 Smart accounts (ERC-4337)
- 🔗 Farcaster native login via Privy
- ⛓️ On-chain timestamping (coming soon)
- 🏆 Proof-of-work achievements

---

## Tech Stack

**Frontend:** React, TypeScript, TailwindCSS  
**Backend:** NestJS, PostgreSQL (Neon), Prisma  
**AI:** Coinbase Agent Kit  
**Blockchain:** Monad Testnet, MetaMask SDK  
**Auth:** Privy (wallet + Farcaster)  
**Frame:** Farcaster Miniapp SDK

---

## Quick Start

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

### Frontend
```bash
npm install
npm run dev
```

**Environment Variables:**
```env
# Backend
DATABASE_URL="postgresql://..."
PRIVY_APP_ID="your-app-id"
ALLOWED_ORIGINS="http://localhost:5173"

# Frontend
VITE_API_URL="http://localhost:3001"
VITE_PRIVY_APP_ID="your-app-id"
```

---

## Use as Farcaster Frame

**Cast it:** Share `https://builderuptime.xyz` in any cast  
**Launch:** Users click to open the miniapp directly in Warpcast  
**Track:** Full productivity tracking without leaving Farcaster

Frame features:
- One-tap launch from any cast
- Native Farcaster profile integration
- Share uptime scores with friends
- Leaderboards (coming soon!)

---

## How It Works

1. **Track** → Add tasks, monitor energy & focus time
2. **Analyze** → AI detects patterns and suggests improvements
3. **Optimize** → Get break reminders, resolve blockers
4. **Prove** → Hash productivity data on-chain (coming tomorrow!)
5. **Share** → Cast your uptime score on Farcaster

**Uptime Score = Task completion (50%) + Energy (25%) + Sustainable pace (25%) - Blockers**

---

## Roadmap

- [x] Farcaster Frame integration
- [x] AI productivity insights
- [x] Smart account support
- [x] On-chain timestamping
- [ ] Farcaster leaderboards
- [ ] Achievement NFTs
- [ ] Team collaboration
- [ ] Mobile app

---

## Deploy

**Backend:** Railway (`railway up`)  
**Frontend:** Vercel (`vercel --prod`)  
**Database:** Neon (serverless Postgres)

---

## Built With ❤️

**Team:** Builder Uptime  
**Contact:** zarahgathoni76@gmail.com  
**Twitter:** [@BuilderUptime](https://x.com/builderuptime)

**Powered by:** [Coinbase Agent Kit](https://www.coinbase.com/developer-platform/products/agentkit) • [Monad](https://monad.xyz) • [Privy](https://privy.io) • [Farcaster](https://farcaster.xyz)

---

**📱 Native on Farcaster • 🤖 AI-powered • ⛓️ On-chain • 🚀 Shipped**

*99.99% uptime or we're not doing it right*