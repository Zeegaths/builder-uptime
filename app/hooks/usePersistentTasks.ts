import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { usePrivy } from '@privy-io/react-auth';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  hasBlocker: boolean;
}

export function usePersistentTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const { authenticated, ready } = usePrivy(); // ← Add ready

  // Load tasks when BOTH ready AND authenticated
  useEffect(() => {
    if (!ready) {
      // Still loading Privy
      return;
    }

    if (authenticated) {
      loadTasks();
    } else {
      setLoading(false);
      setTasks([]); // Clear tasks if not authenticated
    }
  }, [authenticated, ready]); // ← Add ready to dependencies

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await api.getTasks();
      const formattedTasks = data.map((t: any) => ({
        id: t.id,
        text: t.text,
        completed: t.completed,
        hasBlocker: t.hasBlocker || false,
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (text: string) => {
    if (!authenticated) {
      const newTask: Task = {
        id: Date.now(),
        text,
        completed: false,
        hasBlocker: false,
      };
      setTasks([...tasks, newTask]);
      return newTask;
    }

    try {
      const newTask = await api.createTask(text);
      const formattedTask: Task = {
        id: newTask.id,
        text: newTask.text,
        completed: newTask.completed,
        hasBlocker: newTask.hasBlocker || false,  // Use hasBlocker with fallback
      };
      setTasks([...tasks, formattedTask]);
      return formattedTask;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error;
    }
  };

  const updateTask = async (id: number, updates: Partial<Task>) => {
    if (!authenticated) {
      // Offline mode - just update locally
      setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
      return;
    }

    try {
      // Convert frontend format to backend format
      const backendUpdates: any = {};
      if (updates.text !== undefined) backendUpdates.text = updates.text;
      if (updates.completed !== undefined) backendUpdates.completed = updates.completed;
      if (updates.hasBlocker !== undefined) backendUpdates.has_blocker = updates.hasBlocker;

      console.log('Sending to backend:', { id, backendUpdates });

      const updated = await api.updateTask(id.toString(), backendUpdates);

      console.log('Received from backend:', updated);

      const formattedTask: Task = {
        id: updated.id,
        text: updated.text,
        completed: updated.completed,
        hasBlocker: updated.hasBlocker || false,  // ✅ CHANGED: use hasBlocker not has_blocker
      };
      setTasks(tasks.map(t => t.id === id ? formattedTask : t));
      return formattedTask;
    } catch (error) {
      console.error('Failed to update task:', error);
      // Still update locally even if backend fails
      setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
    }
  };

  const deleteTask = async (id: number) => {
    if (!authenticated) {
      // Offline mode - just delete locally
      setTasks(tasks.filter(t => t.id !== id));
      return;
    }

    try {
      await api.deleteTask(id.toString());
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
      // Still delete locally even if backend fails
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  return {
    tasks,
    setTasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    refreshTasks: loadTasks,
  };
}

// Hook for auto-saving session to backend
export function useAutoSaveSession(
  tasks: Task[],
  energy: number,
  focusSeconds: number,
  uptime: number,
  lastBreak: number | null,
) {
  const api = useApi();
  const { authenticated } = usePrivy();

  useEffect(() => {
    if (!authenticated || tasks.length === 0) return;

    // Auto-save every 5 minutes
    const interval = setInterval(async () => {
      try {
        await api.saveSession({
          uptime_score: uptime,
          energy_level: energy,
          focus_minutes: Math.floor(focusSeconds / 60),
          tasks: tasks.map(t => ({
            id: t.id,
            text: t.text,
            completed: t.completed,
            hasBlocker: t.hasBlocker,
          })),
          had_break: !!lastBreak,
        });
        console.log('✅ Session auto-saved to backend');
      } catch (error) {
        console.error('Failed to auto-save session:', error);
      }
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, [authenticated, tasks, energy, focusSeconds, uptime, lastBreak, api]);
}

// Hook for loading historical data
export function useHistoricalData() {
  const [history, setHistory] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const { authenticated } = usePrivy();

  const loadHistory = useCallback(async (days: number = 7) => {
    if (!authenticated) {
      setLoading(false);
      return;
    }

    try {
      const data = await api.getHistory(days);
      setHistory(data);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  }, [authenticated, api]);

  const loadWeeklyStats = useCallback(async () => {
    if (!authenticated) return;

    try {
      const stats = await api.getWeeklyStats();
      setWeeklyStats(stats);
    } catch (error) {
      console.error('Failed to load weekly stats:', error);
    }
  }, [authenticated, api]);

  useEffect(() => {
    if (authenticated) {
      loadHistory();
      loadWeeklyStats();
    }
  }, [authenticated]);

  return {
    history,
    weeklyStats,
    loading,
    loadHistory,
    loadWeeklyStats,
  };
}