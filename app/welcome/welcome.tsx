import { useState } from 'react';

export default function BuilderUptimeLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      console.log('Email submitted:', email);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-lg flex items-center justify-center font-bold text-white">
              ⬆
            </div>
            <span className="text-xl font-semibold">Builder Uptime</span>
          </div>
          <button 
            onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Join Waitlist
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-cyan-500/30 rounded-full text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-400">System Online • Building on Farcaster + Base</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Monitor Your Most
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
                Critical Infrastructure
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              You monitor your apps obsessively. What about your own uptime?
            </p>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl space-y-2 hover:border-cyan-500/40 transition-colors">
              <div className="text-3xl">📊</div>
              <h3 className="font-semibold text-lg text-cyan-400">Track Daily</h3>
              <p className="text-gray-400 text-sm">30-second check-ins. See your patterns over time.</p>
            </div>
            <div className="p-6 bg-gray-900/50 border border-orange-500/20 rounded-xl space-y-2 hover:border-orange-500/40 transition-colors">
              <div className="text-3xl">🔐</div>
              <h3 className="font-semibold text-lg text-orange-400">Own Your Data</h3>
              <p className="text-gray-400 text-sm">Decentralized storage. Your mental health data stays yours.</p>
            </div>
            <div className="p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl space-y-2 hover:border-cyan-500/40 transition-colors">
              <div className="text-3xl">⚡</div>
              <h3 className="font-semibold text-lg text-cyan-400">Optimize Performance</h3>
              <p className="text-gray-400 text-sm">Make better decisions. Build more sustainably.</p>
            </div>
          </div>

          {/* Waitlist */}
          <div id="waitlist" className="pt-12">
            <div className="max-w-md mx-auto space-y-4">
              <h2 className="text-2xl font-semibold">Join the Beta</h2>
              <p className="text-gray-400">First 100 Web3 builders get lifetime access</p>
              
              {!submitted ? (
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-orange-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-orange-600 transition-all whitespace-nowrap"
                  >
                    Get Early Access
                  </button>
                </div>
              ) : (
                <div className="py-3 px-4 bg-gradient-to-r from-cyan-500/10 to-orange-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
                  ✓ You're on the list! Check your email.
                </div>
              )}
            </div>
          </div>

          {/* Status Indicators Demo */}
          <div className="pt-16 space-y-4">
            <p className="text-sm text-gray-500 uppercase tracking-wide">What's your uptime today?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                  <span className="text-cyan-400">Optimal</span>
                </div>
              </button>
              <button className="px-6 py-3 bg-orange-500/10 border border-orange-500/30 rounded-lg hover:bg-orange-500/20 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                  <span className="text-orange-400">Degraded</span>
                </div>
              </button>
              <button className="px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-red-400">Critical</span>
                </div>
              </button>
            </div>
          </div>

          {/* Social Proof */}
          <div className="pt-12 space-y-4">
            <p className="text-sm text-gray-500">Built for builders</p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
              <span className="text-sm">🔗 Farcaster Native</span>
              <span className="text-sm">⚡ Base Chain</span>
              <span className="text-sm">🌐 Ceramic Storage</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>© 2025 Builder Uptime</span>
            </div>
            <div className="flex gap-6">
              <button className="hover:text-emerald-400 transition-colors">Twitter</button>
              <button className="hover:text-emerald-400 transition-colors">Farcaster</button>
              <button className="hover:text-emerald-400 transition-colors">GitHub</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}