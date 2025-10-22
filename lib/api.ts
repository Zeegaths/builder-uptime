
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class ApiClient {
  private token: string | null = null;
  private tokenReady: Promise<void> | null = null;
  private resolveTokenReady: (() => void) | null = null;

  constructor() {
    // Create a promise that resolves when token is set
    this.tokenReady = new Promise((resolve) => {
      this.resolveTokenReady = resolve;
    });
  }

  setToken(token: string | null) {
    this.token = token;
    console.log('🔑 Token set:', token ? 'EXISTS' : 'NULL');
    
    // Resolve the promise so API calls can proceed
    if (this.resolveTokenReady) {
      this.resolveTokenReady();
      this.resolveTokenReady = null;
    }
  }

  // Wait for token to be initialized before making requests
  async waitForToken() {
    await this.tokenReady;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // Wait for token to be initialized
    await this.waitForToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    };

    console.log('📡 Request:', endpoint, { hasToken: !!this.token });

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

  // Rest of your methods stay the same...
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

  async saveSession(data: any) {
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