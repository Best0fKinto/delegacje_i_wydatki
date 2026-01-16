import { apiClient } from '../apiClient';

// Types based on ENDPOINTS.md
export interface Delegation {
  id: number;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  status: string;
  country?: string;
  city?: string;
  name?: string;
  purpose?: string;
  user_id?: number;
  created_at?: string;
  expenses?: Expense[];
}

export interface Expense {
  id: number;
  amount: number;
  explanation?: string;
  payed_at?: string;
  currency_id?: number;
  category_id?: number;
}

export interface ExpenseFormData {
  explanation: string;
  amount: number;
  currency_id: number;
  category_id: number;
  payed_at?: string;
}

export interface CreateDelegationRequest {
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  name?: string;
  country?: string;
  city?: string;
  purpose?: string;
  status?: string; // optional, default: 'draft'
  expenses?: ExpenseFormData[];
}

export interface UpdateDelegationRequest {
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  status: string;
}

export interface DeleteDelegationResponse {
  status: 'success';
  message: string;
}

/**
 * Delegations API module
 * Handles CRUD operations for user delegations
 * All endpoints require Authorization header
 */
export const delegationsApi = {
  /**
   * Get all delegations for current user
   * GET /api/delegations
   */
  async getDelegations(): Promise<Delegation[]> {
    return apiClient.get<Delegation[]>('/delegations');
  },

  /**
   * Get single delegation by ID
   * GET /api/delegations/:id
   */
  async getDelegation(id: number): Promise<Delegation> {
    return apiClient.get<Delegation>(`/delegations/${id}`);
  },

  /**
   * Create new delegation
   * POST /api/delegations
   */
  async createDelegation(data: CreateDelegationRequest): Promise<Delegation> {
    return apiClient.post<Delegation>('/delegations', data);
  },

  /**
   * Update existing delegation
   * PUT /api/delegations/:id
   */
  async updateDelegation(id: number, data: UpdateDelegationRequest): Promise<Delegation> {
    return apiClient.put<Delegation>(`/delegations/${id}`, data);
  },

  /**
   * Delete delegation
   * DELETE /api/delegations/:id
   */
  async deleteDelegation(id: number): Promise<DeleteDelegationResponse> {
    return apiClient.delete<DeleteDelegationResponse>(`/delegations/${id}`);
  },
};
