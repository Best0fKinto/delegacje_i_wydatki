// Token management helpers
const TOKEN_KEY = 'delegacje_token';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// API Client configuration
const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

export interface ApiError {
  status: 'error';
  message: string;
  statusCode?: number;
}

export class ApiClientError extends Error {
  statusCode: number;
  data: ApiError;

  constructor(statusCode: number, data: ApiError) {
    super(data.message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = 'ApiClientError';
  }
}

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Central API client for all backend communication
 * Automatically handles:
 * - JWT Authorization headers
 * - JSON content-type
 * - HTTP error handling (401, 403, 500)
 */
export const apiClient = {
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const token = getToken();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle non-JSON responses or empty responses
      const contentType = response.headers.get('content-type');
      const hasJson = contentType?.includes('application/json');
      
      let data: any;
      if (hasJson && response.status !== 204) {
        data = await response.json();
      }

      // Handle HTTP errors
      if (!response.ok) {
        const error: ApiError = data || {
          status: 'error',
          message: `HTTP error: ${response.status} ${response.statusText}`,
        };
        
        throw new ApiClientError(response.status, error);
      }

      return data as T;
    } catch (error) {
      // Re-throw ApiClientError as-is
      if (error instanceof ApiClientError) {
        throw error;
      }
      
      // Wrap network errors
      throw new ApiClientError(0, {
        status: 'error',
        message: error instanceof Error ? error.message : 'Network error',
        statusCode: 0,
      });
    }
  },

  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  },
};
