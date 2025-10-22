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
  const { authenticated, ready } = usePrivy(); // ← Add ready here

  // CRITICAL: Wait for Privy to be ready before loading
  useEffect(() => {
    console.log('🔄 usePersistentTasks effect:', { ready, authenticated });

    if (!ready) {
      console.log('⏳ Privy not ready yet, waiting...');
      return;
    }

    if (authenticated) {
      console.log('✅ Privy ready + authenticated, loading tasks...');
      loadTasks();
    } else {
      console.log('❌ Not authenticated, clearing tasks');
      setLoading(false);
      setTasks([]);
    }
  }, [authenticated, ready]); // ← Must include both!

  const loadTasks = async () => {
    setLoading(true);
    try {
      console.log('📡 Fetching tasks from API...');
      const data = await api.getTasks();
      console.log('✅ Tasks loaded:', data.length);
      const formattedTasks = data.map((t: any) => ({
        id: t.id,
        text: t.text,
        completed: t.completed,
        hasBlocker: t.hasBlocker || false,
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error('❌ Failed to load tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Rest of your functions stay the same...
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
        hasBlocker: newTask.hasBlocker || false,
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
      setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
      return;
    }

    try {
      const backendUpdates: any = {};
      if (updates.text !== undefined) backendUpdates.text = updates.text;
      if (updates.completed !== undefined) backendUpdates.completed = updates.completed;
      if (updates.hasBlocker !== undefined) backendUpdates.has_blocker = updates.hasBlocker;

      const updated = await api.updateTask(id.toString(), backendUpdates);

      const formattedTask: Task = {
        id: updated.id,
        text: updated.text,
        completed: updated.completed,
        hasBlocker: updated.hasBlocker || false,
      };
      setTasks(tasks.map(t => t.id === id ? formattedTask : t));
      return formattedTask;
    } catch (error) {
      console.error('Failed to update task:', error);
      setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
    }
  };

  const deleteTask = async (id: number) => {
    if (!authenticated) {
      setTasks(tasks.filter(t => t.id !== id));
      return;
    }

    try {
      await api.deleteTask(id.toString());
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
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