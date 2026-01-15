import { apiClient, setToken, clearToken } from '../apiClient';

// Types based on ENDPOINTS.md
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: 'success';
  user_id: number;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: 'success';
  token: string;
  user_id: number;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  is_active?: boolean;
  created_at?: string;
}

export interface MeResponse {
  status: 'success';
  user: User;
}

export interface VerifyResponse {
  status: 'success';
  user_id: number;
  valid: boolean;
}

export interface LogoutResponse {
  status: 'success';
  message: string;
}

/**
 * Auth API module
 * Handles user authentication and authorization
 */
export const authApi = {
  /**
   * Register a new user
   * POST /api/auth/register
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>('/auth/register', data);
  },

  /**
   * Login user and save JWT token
   * POST /api/auth/login
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    // Automatically save token after successful login
    setToken(response.token);
    return response;
  },

  /**
   * Get current user data
   * GET /api/auth/me
   * Requires: Authorization header
   */
  async me(): Promise<MeResponse> {
    return apiClient.get<MeResponse>('/auth/me');
  },

  /**
   * Verify JWT token validity
   * GET /api/auth/verify
   * Requires: Authorization header
   */
  async verify(): Promise<VerifyResponse> {
    return apiClient.get<VerifyResponse>('/auth/verify');
  },

  /**
   * Logout user (clears token)
   * POST /api/auth/logout
   * Requires: Authorization header
   * 
   * Note: Token is cleared locally regardless of API call success (best effort)
   */
  async logout(): Promise<void> {
    try {
      // Try to call logout endpoint (optional, best effort)
      await apiClient.post<LogoutResponse>('/auth/logout');
    } catch (error) {
      // Ignore API errors - we'll clear token anyway
      console.warn('Logout API call failed, clearing token locally:', error);
    } finally {
      // ALWAYS clear token, even if API call fails
      clearToken();
    }
  },
};
