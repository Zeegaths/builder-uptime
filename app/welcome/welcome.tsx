import { useState, useEffect } from 'react';

export default function MinimalBuilderUptime() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Fix auth bug', completed: true, hasBlocker: false },
    { id: 2, text: 'Deploy contract', completed: true, hasBlocker: false },
    { id: 3, text: 'Implement frames', completed: false, hasBlocker: true },
  ]);
  const [energy, setEnergy] = useState(4);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [lastBreak, setLastBreak] = useState(null);
  const [showBreakReminder, setShowBreakReminder] = useState(false);
  const [timelineView, setTimelineView] = useState('week'); // 'day', 'week', 'month', 'year'

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setFocusSeconds(prev => {
          const newSeconds = prev + 1;
          // Show reminder at 90 minutes (5400 seconds)
          if (newSeconds === 5400) {
            setShowBreakReminder(true);
          }
          // Show reminder every 30 minutes after that
          if (newSeconds > 5400 && (newSeconds - 5400) % 1800 === 0) {
            setShowBreakReminder(true);
          }
          return newSeconds;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: taskInput,
        completed: false,
        hasBlocker: false
      }]);
      setTaskInput('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleBlocker = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, hasBlocker: !task.hasBlocker } : task
    ));
  };

  const takeBreak = () => {
    setLastBreak(Date.now());
    setIsTimerRunning(false);
    setFocusSeconds(0);
    setShowBreakReminder(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateUptime = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    const taskScore = (completed / tasks.length) * 50;
    const energyScore = (energy / 5) * 25;
    const blockers = tasks.filter(t => t.hasBlocker && !t.completed).length;
    const blockerPenalty = blockers * 10;
    const focusMinutes = Math.floor(focusSeconds / 60);
    const sustainableBonus = (focusMinutes > 120 || lastBreak) ? 0 : 10;
    const breakBonus = lastBreak ? 15 : 0;
    const total = taskScore + energyScore - blockerPenalty + sustainableBonus + breakBonus;
    return Math.max(0, Math.min(100, Math.round(total)));
  };

  const uptime = calculateUptime();

  const energyEmojis = ['😫', '😔', '😐', '😊', '🚀'];
  const energyLabels = ['Exhausted', 'Low', 'Okay', 'Good', 'Peak'];

  // Mock timeline data
  const timelineData = {
    day: [
      { label: '9am', uptime: 0 },
      { label: '10am', uptime: 65 },
      { label: '11am', uptime: 78 },
      { label: '12pm', uptime: 85 },
      { label: '1pm', uptime: 70 },
      { label: '2pm', uptime: 82 },
      { label: '3pm', uptime: 88 },
      { label: '4pm', uptime: 75 },
      { label: 'Now', uptime: uptime },
    ],
    week: [
      { label: 'Mon', uptime: 75, tasks: 12, energy: 4 },
      { label: 'Tue', uptime: 85, tasks: 15, energy: 5 },
      { label: 'Wed', uptime: 68, tasks: 10, energy: 3 },
      { label: 'Thu', uptime: 92, tasks: 18, energy: 5 },
      { label: 'Fri', uptime: 78, tasks: 14, energy: 4 },
      { label: 'Sat', uptime: 65, tasks: 8, energy: 3 },
      { label: 'Today', uptime: uptime, tasks: tasks.filter(t => t.completed).length, energy: energy },
    ],
    month: [
      { label: 'Week 1', uptime: 78 },
      { label: 'Week 2', uptime: 85 },
      { label: 'Week 3', uptime: 72 },
      { label: 'Week 4', uptime: 88 },
    ],
    year: [
      { label: 'Jan', uptime: 75 },
      { label: 'Feb', uptime: 82 },
      { label: 'Mar', uptime: 78 },
      { label: 'Apr', uptime: 85 },
      { label: 'May', uptime: 90 },
      { label: 'Jun', uptime: 87 },
      { label: 'Jul', uptime: 83 },
      { label: 'Aug', uptime: 88 },
      { label: 'Sep', uptime: 92 },
      { label: 'Oct', uptime: 85 },
      { label: 'Nov', uptime: 80 },
      { label: 'Dec', uptime: uptime },
    ]
  };

  const currentData = timelineData[timelineView];
  const averageUptime = Math.round(currentData.reduce((sum, d) => sum + d.uptime, 0) / currentData.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-gray-800/50 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="./logo.png" 
              alt="Builder Uptime Logo" 
              className="w-10 h-10 rounded-xl shadow-lg shadow-cyan-500/30"
            />
            <div>
              <div className="font-bold text-base">Builder Uptime</div>
              <div className="text-xs text-gray-500">Real Productivity Tracking</div>
            </div>
          </div>
          <button className="px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-orange-500/20 border border-cyan-500/50 rounded-xl text-sm font-medium text-cyan-400 hover:from-cyan-500/30 hover:to-orange-500/30 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
            Connect Wallet
          </button>
        </div>
      </header>

      {/* Break Reminder Notification */}
      {showBreakReminder && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-green-500/95 to-emerald-500/95 backdrop-blur-xl border-2 border-green-400 rounded-2xl shadow-2xl shadow-green-500/50 p-6 max-w-md">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🌱</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Time for a Break!</h3>
                <p className="text-green-50 text-sm mb-4">
                  You've been focusing for {Math.floor(focusSeconds / 60)} minutes. Take a 15-20 minute break to stay productive!
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={takeBreak}
                    className="flex-1 px-4 py-2 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all duration-300"
                  >
                    Take Break
                  </button>
                  <button
                    onClick={() => setShowBreakReminder(false)}
                    className="px-4 py-2 bg-green-600/30 text-white rounded-xl font-medium hover:bg-green-600/50 transition-all duration-300"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero with Live Uptime */}
      <section className="relative px-4 py-12 max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          {/* Live Uptime Display */}
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className={`absolute inset-0 blur-2xl opacity-30 ${
              uptime >= 80 ? 'bg-cyan-500' : uptime >= 50 ? 'bg-orange-500' : 'bg-red-500'
            }`}></div>
            
            <svg className="relative w-40 h-40 mx-auto transform -rotate-90">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-800/50"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - uptime / 100)}`}
                className="transition-all duration-700 ease-out drop-shadow-lg"
                style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">{uptime}%</span>
              <span className="text-xs text-gray-400 font-medium tracking-wide uppercase mt-1">Uptime</span>
            </div>
          </div>

          {/* Catchphrase */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-950/60 to-orange-950/60 border border-cyan-500/30 rounded-full backdrop-blur-sm shadow-lg shadow-cyan-500/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-400 font-semibold text-sm">99.99% uptime or we're not doing it right</span>
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
              Track What <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-orange-400 bg-clip-text text-transparent">Actually</span> Ships
            </h1>
            <p className="text-gray-400 text-base max-w-lg mx-auto">
              Tasks · Energy · Focus · Sustainable Pace
            </p>
          </div>
        </div>
      </section>

      {/* Productivity Factors Grid */}
      <section className="relative px-4 pb-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {/* Energy Level */}
          <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent rounded-2xl transition-all duration-300"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Energy Level</div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{energyEmojis[energy - 1]}</span>
                <span className="text-lg font-bold text-cyan-400">{energyLabels[energy - 1]}</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={energy}
                  onChange={(e) => setEnergy(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(energy - 1) * 25}%, #1f2937 ${(energy - 1) * 25}%, #1f2937 100%)`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Focus Time */}
          <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
            {focusSeconds >= 4800 && focusSeconds < 5400 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            )}
            {focusSeconds >= 5400 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent rounded-2xl transition-all duration-300"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Focus Session</div>
                {focusSeconds >= 4800 && focusSeconds < 5400 && (
                  <span className="text-xs text-yellow-400">• Break soon</span>
                )}
                {focusSeconds >= 5400 && (
                  <span className="text-xs text-green-400">• Break recommended</span>
                )}
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">{formatTime(focusSeconds)}</span>
                </div>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isTimerRunning 
                      ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/50 shadow-lg shadow-orange-500/20' 
                      : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20'
                  }`}
                >
                  {isTimerRunning ? '⏸ Pause' : '▶ Start'}
                </button>
              </div>
              {focusSeconds >= 5400 && (
                <button
                  onClick={takeBreak}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl text-sm font-semibold text-green-400 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
                >
                  🌱 Take Break
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Task Tracker */}
      <section className="relative px-4 pb-12 max-w-4xl mx-auto space-y-5">
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
          
          {/* Add Task */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="What are you building today?"
              className="flex-1 px-4 py-3.5 bg-black/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 text-sm placeholder-gray-600"
            />
            <button
              onClick={handleAddTask}
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105"
            >
              Add
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`group p-4 rounded-xl border-2 transition-all duration-300 ${
                  task.completed 
                    ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/40 shadow-lg shadow-cyan-500/10' 
                    : task.hasBlocker
                    ? 'bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/40 shadow-lg shadow-red-500/10'
                    : 'bg-black/40 border-gray-700 hover:border-gray-600 hover:bg-black/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      task.completed 
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-500 border-cyan-500 shadow-lg shadow-cyan-500/50' 
                        : 'border-gray-600 hover:border-cyan-500 hover:scale-110'
                    }`}
                  >
                    {task.completed && <span className="text-white text-xs font-bold">✓</span>}
                  </button>
                  <span className={`flex-1 text-sm font-medium transition-all duration-300 ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-200'
                  }`}>
                    {task.text}
                  </span>
                  <button
                    onClick={() => toggleBlocker(task.id)}
                    className={`text-lg px-2.5 py-1 rounded-lg transition-all duration-300 ${
                      task.hasBlocker
                        ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50 shadow-lg shadow-red-500/20 scale-110'
                        : 'text-gray-600 hover:text-gray-400 hover:scale-110'
                    }`}
                  >
                    {task.hasBlocker ? '🚨' : '⚠️'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-6 pt-5 border-t border-gray-700/50 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-black/40 rounded-xl">
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Tasks</div>
              <div className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {tasks.filter(t => t.completed).length}/{tasks.length}
              </div>
            </div>
            <div className="text-center p-3 bg-black/40 rounded-xl">
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Blockers</div>
              <div className="text-xl font-black text-red-400">
                {tasks.filter(t => t.hasBlocker).length}
              </div>
            </div>
            <div className="text-center p-3 bg-black/40 rounded-xl">
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Uptime</div>
              <div className={`text-xl font-black ${uptime >= 80 ? 'text-cyan-400' : 'text-orange-400'}`}>
                {uptime}%
              </div>
            </div>
          </div>
        </div>

        {/* Factor Breakdown */}
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 border border-gray-700/30 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">Uptime Factors</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between items-center p-2 rounded-lg bg-black/30">
              <span className="text-gray-400 font-medium">Task Completion</span>
              <span className="text-cyan-400 font-bold font-mono">{Math.round((tasks.filter(t => t.completed).length / Math.max(tasks.length, 1)) * 50)}%</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-black/30">
              <span className="text-gray-400 font-medium">Energy Level</span>
              <span className="text-cyan-400 font-bold font-mono">{Math.round((energy / 5) * 25)}%</span>
            </div>
            {tasks.filter(t => t.hasBlocker && !t.completed).length > 0 && (
              <div className="flex justify-between items-center p-2 rounded-lg bg-black/30">
                <span className="text-gray-400 font-medium">Blocker Penalty</span>
                <span className="text-red-400 font-bold font-mono">-{tasks.filter(t => t.hasBlocker && !t.completed).length * 10}%</span>
              </div>
            )}
            {lastBreak && (
              <div className="flex justify-between items-center p-2 rounded-lg bg-black/30">
                <span className="text-gray-400 font-medium">Break Bonus</span>
                <span className="text-green-400 font-bold font-mono">+15%</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Uptime Timeline Review */}
      <section className="relative px-4 pb-12 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
          
          {/* Header with Timeline Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Uptime Overview</h3>
              <p className="text-sm text-gray-400">
                Average: <span className={`font-bold ${averageUptime >= 80 ? 'text-cyan-400' : 'text-orange-400'}`}>{averageUptime}%</span>
              </p>
            </div>
            <div className="flex gap-1 bg-black/50 p-1 rounded-xl">
              {['day', 'week', 'month', 'year'].map((view) => (
                <button
                  key={view}
                  onClick={() => setTimelineView(view)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    timelineView === view
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="mb-6">
            <div className="flex items-end justify-between gap-2 h-48">
              {currentData.map((data, idx) => (
                <div key={idx} className="group flex-1 flex flex-col items-center justify-end gap-2">
                  <div className="relative w-full">
                    <div className="w-full bg-gray-800 rounded-t-lg overflow-hidden" style={{ height: '12rem' }}>
                      <div
                        className={`w-full rounded-t-lg transition-all duration-700 group-hover:opacity-80 ${
                          data.uptime >= 80
                            ? 'bg-gradient-to-t from-cyan-500 to-blue-500'
                            : data.uptime >= 60
                            ? 'bg-gradient-to-t from-orange-500 to-yellow-500'
                            : 'bg-gradient-to-t from-red-500 to-orange-500'
                        }`}
                        style={{
                          height: `${data.uptime}%`,
                          marginTop: 'auto',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                        }}
                      />
                    </div>
                    {/* Value on hover */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                      {data.uptime}%
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{data.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          {timelineView === 'week' && (
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-700/50">
              <div className="text-center p-3 bg-black/40 rounded-xl">
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Best Day</div>
                <div className="text-lg font-black text-cyan-400">
                  {currentData.reduce((max, d) => d.uptime > max.uptime ? d : max).label}
                </div>
                <div className="text-xs text-gray-600">
                  {Math.max(...currentData.map(d => d.uptime))}% uptime
                </div>
              </div>
              <div className="text-center p-3 bg-black/40 rounded-xl">
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Total Tasks</div>
                <div className="text-lg font-black text-orange-400">
                  {currentData.reduce((sum, d) => sum + (d.tasks || 0), 0)}
                </div>
                <div className="text-xs text-gray-600">completed</div>
              </div>
              <div className="text-center p-3 bg-black/40 rounded-xl">
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Avg Energy</div>
                <div className="text-lg font-black text-green-400">
                  {energyEmojis[Math.round(currentData.reduce((sum, d) => sum + (d.energy || 3), 0) / currentData.length) - 1]}
                </div>
                <div className="text-xs text-gray-600">
                  {energyLabels[Math.round(currentData.reduce((sum, d) => sum + (d.energy || 3), 0) / currentData.length) - 1]}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}