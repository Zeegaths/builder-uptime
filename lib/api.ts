const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

export class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Task endpoints
  async createTask(text: string) {
    return this.request('/api/uptime/tasks', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  async getTasks() {
    return this.request('/api/uptime/tasks');
  }

  async updateTask(id: string, updates: { text?: string; completed?: boolean; has_blocker?: boolean }) {
    return this.request(`/api/uptime/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteTask(id: string) {
    return this.request(`/api/uptime/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Session endpoints
  async saveSession(data: {
    uptime_score: number;
    energy_level?: number;
    focus_minutes: number;
    tasks: Array<{ id: number; text: string; completed: boolean; hasBlocker: boolean }>;
    had_break?: boolean;
  }) {
    return this.request('/api/uptime/session', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getHistory(days: number = 7) {
    return this.request(`/api/uptime/history?days=${days}`);
  }

  async getWeeklyStats() {
    return this.request('/api/uptime/stats/weekly');
  }
}

export const apiClient = new ApiClient();