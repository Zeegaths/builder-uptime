import { useState, useEffect } from 'react';

export default function BuilderUptimeLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  const [taskInput, setTaskInput] = useState('');
  const [demoTasks, setDemoTasks] = useState([
    { id: 1, text: 'Fix authentication bug', completed: true, blocker: null },
    { id: 2, text: 'Deploy smart contract to testnet', completed: true, blocker: null },
    { id: 3, text: 'Implement Farcaster frames', completed: false, blocker: 'Unclear documentation' },
    { id: 4, text: 'Add MetaMask delegation', completed: false, blocker: null },
  ]);
  const [blockerType, setBlockerType] = useState(null);

  const blockerTypes = [
    { type: 'bug', label: '🐛 Bug/Technical Issue', color: 'red' },
    { type: 'clarity', label: '❓ Unclear Requirements', color: 'orange' },
    { type: 'resources', label: '📚 Missing Info/Resources', color: 'yellow' },
    { type: 'motivation', label: '😓 Low Energy/Motivation', color: 'purple' },
    { type: 'external', label: '🌍 External Distractions', color: 'blue' },
  ];

  const productivityTips = [
    {
      icon: '📋',
      title: 'Smart Task Planning',
      desc: 'AI breaks down your goals into daily actionable tasks based on your energy patterns',
      demo: 'You work best 9-11am? High-priority tasks get scheduled there automatically.'
    },
    {
      icon: '🐛',
      title: 'Blocker Detection',
      flag: 'Track bugs, unclear specs, missing resources in real-time',
      demo: 'Stuck for 2+ hours? AI suggests: "Ask in Discord" or "Take a 15min break"'
    },
    {
      icon: '🎯',
      title: 'Completion Tracking',
      desc: 'Your uptime score = tasks completed + quality of work + sustainable pace',
      demo: '5/7 tasks done + no burnout = 85% uptime. Better than 7/7 + exhausted.'
    },
    {
      icon: '🤝',
      title: 'Dev Community Support',
      desc: 'Get unstuck faster by connecting with devs who solved similar blockers',
      demo: 'Stuck on Web3Auth? Connect with 3 builders who implemented it this week.'
    }
  ];

  const weekData = [
    { day: 'Mon', tasks: 4, completed: 3, blockers: 1, uptime: 75 },
    { day: 'Tue', tasks: 5, completed: 5, blockers: 0, uptime: 95 },
    { day: 'Wed', tasks: 6, completed: 4, blockers: 2, uptime: 65 },
    { day: 'Thu', tasks: 5, completed: 5, blockers: 0, uptime: 90 },
    { day: 'Fri', tasks: 4, completed: 3, blockers: 1, uptime: 70 },
    { day: 'Sat', tasks: 3, completed: 3, blockers: 0, uptime: 85 },
    { day: 'Sun', tasks: 2, completed: 2, blockers: 0, uptime: 80 },
  ];

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setDemoTasks([...demoTasks, {
        id: demoTasks.length + 1,
        text: taskInput,
        completed: false,
        blocker: null
      }]);
      setTaskInput('');
    }
  };

  const toggleTask = (id) => {
    setDemoTasks(demoTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const calculateUptime = () => {
    const completed = demoTasks.filter(t => t.completed).length;
    const total = demoTasks.length;
    const blockers = demoTasks.filter(t => t.blocker).length;
    const base = (completed / total) * 100;
    const penalty = blockers * 10;
    return Math.max(0, Math.round(base - penalty));
  };

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="./logo.png" 
              alt="Builder Uptime Logo" 
              className="w-10 h-10 rounded-xl shadow-lg shadow-cyan-500/20"
            />
            <div>
              <span className="text-xl font-bold">Builder Uptime</span>
              <div className="text-xs text-gray-500">Task-Driven Productivity for Builders</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs">
              <span className="text-cyan-400">⚕️</span>
              <span className="text-gray-400">Backed by behavioral science</span>
            </div>
            <button 
              onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-cyan-950/50 to-orange-950/50 border border-cyan-500/30 rounded-full text-sm backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 font-medium">99.99% uptime or we're not doing it right</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
                Build at Peak Performance
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-orange-400 bg-clip-text text-transparent">
                  Without the Burnout
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Track what actually matters: <span className="text-cyan-400 font-semibold">tasks shipped</span>, <span className="text-orange-400 font-semibold">blockers crushed</span>, <span className="text-white font-semibold">energy sustained</span>.<br />
                AI-powered productivity OS for builders who want to <span className="text-cyan-400">perform at their peak</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button 
                onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-orange-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:scale-105 transition-all"
              >
                Try Live Demo →
              </button>
              <button className="px-8 py-4 bg-gray-800 border border-gray-700 text-white rounded-xl font-semibold text-lg hover:bg-gray-700 hover:border-cyan-500/50 transition-all">
                View on GitHub
              </button>
            </div>

            {/* Real Builder Quote */}
            <div className="pt-12 max-w-3xl mx-auto">
              <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-cyan-500/20 rounded-2xl backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">💬</div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-300 italic mb-3">
                      "Uptime for me is determined by tasks completed. I want to track bugs, unclear requirements, and getting unstuck faster. This shouldn't be just mood tracking to an AI."
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">— Real builder feedback</div>
                      <div className="text-cyan-400 font-semibold">We built this for you ↓</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="demo" className="px-6 py-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              See How It <span className="text-cyan-400">Actually Works</span>
            </h2>
            <p className="text-xl text-gray-400">Add tasks. Track blockers. Watch your uptime update in real-time.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Task Tracker */}
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/20 rounded-2xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Today's Tasks</h3>
                  <p className="text-gray-400 text-sm">Add what you're working on</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-cyan-400">{calculateUptime()}%</div>
                  <div className="text-xs text-gray-500">Current Uptime</div>
                </div>
              </div>

              {/* Add Task Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                  placeholder="What are you building today?"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                />
                <button
                  onClick={handleAddTask}
                  className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Task List */}
              <div className="space-y-2">
                {demoTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      task.completed 
                        ? 'bg-cyan-500/10 border-cyan-500/30' 
                        : task.blocker 
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-gray-800 border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          task.completed 
                            ? 'bg-cyan-500 border-cyan-500' 
                            : 'border-gray-600 hover:border-cyan-500'
                        }`}
                      >
                        {task.completed && <span className="text-white text-xs">✓</span>}
                      </button>
                      <div className="flex-1">
                        <div className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                          {task.text}
                        </div>
                        {task.blocker && (
                          <div className="mt-2 flex items-center gap-2 text-xs text-red-400">
                            <span>🚨</span>
                            <span>Blocker: {task.blocker}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-700 flex items-center justify-between text-sm">
                <div className="text-gray-400">
                  {demoTasks.filter(t => t.completed).length} of {demoTasks.length} completed
                  {demoTasks.filter(t => t.blocker).length > 0 && (
                    <span className="ml-3 text-red-400">• {demoTasks.filter(t => t.blocker).length} blocker(s)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Blocker Tracker */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">What's Blocking You?</h3>
                <p className="text-gray-400 text-sm">AI helps you get unstuck</p>
              </div>

              <div className="space-y-3">
                {blockerTypes.map((blocker) => (
                  <button
                    key={blocker.type}
                    onClick={() => setBlockerType(blocker.type)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      blockerType === blocker.type
                        ? `bg-${blocker.color}-500/20 border-${blocker.color}-500`
                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="font-medium text-sm">{blocker.label}</div>
                  </button>
                ))}
              </div>

              {blockerType && (
                <div className="p-4 bg-cyan-950/50 border border-cyan-500/30 rounded-lg space-y-3 animate-fadeIn">
                  <div className="text-sm font-semibold text-cyan-400">AI Suggestion:</div>
                  {blockerType === 'bug' && (
                    <div className="text-sm text-gray-300">
                      • Log the error details<br />
                      • Check similar issues on GitHub<br />
                      • Ask in project Discord<br />
                      • Take a 15min break if stuck 2+ hours
                    </div>
                  )}
                  {blockerType === 'clarity' && (
                    <div className="text-sm text-gray-300">
                      • Break down the requirement<br />
                      • Sketch out the user flow<br />
                      • Message project lead for clarification<br />
                      • Start with MVP version
                    </div>
                  )}
                  {blockerType === 'resources' && (
                    <div className="text-sm text-gray-300">
                      • Check official docs first<br />
                      • Look for similar implementations<br />
                      • Connect with builder who solved this<br />
                      • 3 devs implemented this feature this week →
                    </div>
                  )}
                  {blockerType === 'motivation' && (
                    <div className="text-sm text-gray-300">
                      • You've been heads-down for 3 hours<br />
                      • Take a 20min walk<br />
                      • Switch to a different task<br />
                      • Come back with fresh energy
                    </div>
                  )}
                  {blockerType === 'external' && (
                    <div className="text-sm text-gray-300">
                      • Block distracting apps for 2 hours<br />
                      • Try a different environment<br />
                      • Communicate you're in deep work<br />
                      • Schedule focus blocks on calendar
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="mt-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Your Week at a Glance</h3>
            <div className="grid grid-cols-7 gap-4">
              {weekData.map((day, idx) => (
                <div key={idx} className="text-center space-y-3">
                  <div className="text-sm text-gray-500 font-medium">{day.day}</div>
                  <div className="relative">
                    <svg className="w-20 h-20 mx-auto transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-800"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 35}`}
                        strokeDashoffset={`${2 * Math.PI * 35 * (1 - day.uptime / 100)}`}
                        className={`${
                          day.uptime >= 85 ? 'text-cyan-500' :
                          day.uptime >= 60 ? 'text-orange-500' :
                          'text-red-500'
                        } transition-all`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">{day.uptime}%</span>
                    </div>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="text-cyan-400">{day.completed}/{day.tasks} done</div>
                    {day.blockers > 0 && (
                      <div className="text-red-400">{day.blockers} blocker</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Built on <span className="text-orange-400">Real Builder Needs</span>
            </h2>
            <p className="text-xl text-gray-400">Not just mood tracking. Actual productivity tools.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {productivityTips.map((tip, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all"
              >
                <div className="text-5xl mb-4">{tip.icon}</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                  {tip.title}
                </h3>
                <p className="text-gray-400 mb-4">{tip.desc}</p>
                <div className="p-4 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-sm">
                  <div className="text-gray-500 mb-1">Example:</div>
                  <div className="text-cyan-400">{tip.demo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Science-Backed Section */}
      <section className="px-6 py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm">
                <span className="text-cyan-400">⚕️</span>
                <span className="text-gray-300">Science-Backed Approach</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                More Than Just an <span className="text-cyan-400">AI Chatbot</span>
              </h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  Built on research in productivity psychology, flow state optimization, and sustainable performance.
                </p>
                <p>
                  We're partnering with <span className="text-white font-semibold">certified mental health professionals</span> and <span className="text-white font-semibold">organizational psychologists</span> to ensure the platform isn't just tracking — it's actually helping you build better.
                </p>
              </div>
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-cyan-400 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">Evidence-Based Interventions</div>
                    <div className="text-sm text-gray-400">AI suggestions based on behavioral research</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-cyan-400 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">Professional Partnerships</div>
                    <div className="text-sm text-gray-400">Collaborating with mental health experts (coming soon)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-cyan-400 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">Privacy-First Design</div>
                    <div className="text-sm text-gray-400">Your data stays yours, encrypted on decentralized storage</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/20 rounded-2xl">
                <h3 className="text-xl font-bold mb-6">What We Measure</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Tasks Completed</span>
                    <span className="text-cyan-400 font-bold">85%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Blocker Resolution Time</span>
                    <span className="text-orange-400 font-bold">1.2 hrs</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Focus Session Length</span>
                    <span className="text-cyan-400 font-bold">2.5 hrs</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Sustainable Pace Score</span>
                    <span className="text-green-400 font-bold">Good</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-lg">
                  <div className="text-sm text-cyan-400 font-semibold mb-1">AI Insight</div>
                  <div className="text-sm text-gray-300">
                    You're completing tasks but resolution time is up 40%. Consider pair programming for blockers.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="px-6 py-32 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-sm mb-4">
              <span className="text-orange-400">🔥</span>
              <span className="text-gray-300">99.99% uptime or we're not doing it right</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">
              Ready to Track <span className="text-cyan-400">Real Productivity</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join 50+ builders already testing the beta. First 100 get lifetime free access + exclusive features.
            </p>
          </div>

          {!submitted ? (
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="your@email.com"
                  className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/20 transition-all text-lg"
                />
                <button
                  onClick={handleSubmit}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:scale-105 transition-all whitespace-nowrap"
                >
                  Get Beta Access
                </button>
              </div>
              <p className="text-sm text-gray-500">
                🔐 Zero spam. Unsubscribe anytime. Your data = your property.
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto py-6 px-8 bg-gradient-to-r from-cyan-500/10 to-orange-500/10 border border-cyan-500/30 rounded-2xl">
              <div className="text-2xl mb-2">✓</div>
              <div className="text-xl font-bold text-cyan-400 mb-1">You're in!</div>
              <div className="text-gray-400">Check your email for beta access instructions.</div>
            </div>
          )}

          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="text-center space-y-2">
              <div className="text-cyan-400 text-2xl">⚡</div>
              <div className="text-gray-400">Built on Monad</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-cyan-400 text-2xl">🦊</div>
              <div className="text-gray-400">MetaMask Smart Accounts</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-cyan-400 text-2xl">🤖</div>
              <div className="text-gray-400">AI-Powered Insights</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-cyan-400 text-2xl">🔗</div>
              <div className="text-gray-400">Farcaster Native</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <img 
                src="./logo.png" 
                alt="Builder Uptime Logo" 
                className="w-6 h-6 rounded-lg"
              />
              <span>© 2025 Builder Uptime</span>
            </div>
            <div className="flex gap-6">
              <button className="hover:text-cyan-400 transition-colors">Twitter</button>
              <button className="hover:text-cyan-400 transition-colors">Farcaster</button>
              <button className="hover:text-cyan-400 transition-colors">GitHub</button>
              <button className="hover:text-cyan-400 transition-colors">Docs</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}