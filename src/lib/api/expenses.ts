import { apiClient } from '../apiClient';

// Types based on ENDPOINTS.md
export interface Expense {
  id: number;
  amount: number;
  pln_amount: number;
  explanation?: string;
  payed_at?: string; // YYYY-MM-DD
  currency_id?: number;
  category_id?: number;
  delegation_id?: number;
  created_at?: string;
}

export interface CreateExpenseRequest {
  explanation: string;
  payed_at: string; // YYYY-MM-DD
  amount: number;
  currency_id: number;
  category_id: number;
}

/**
 * Expenses API module
 * Handles expenses for delegations
 * All endpoints require Authorization header
 */
export const expensesApi = {
  /**
   * Get all expenses for a delegation
   * GET /api/delegations/:delegation_id/expenses
   */
  async getExpenses(delegationId: number): Promise<Expense[]> {
    return apiClient.get<Expense[]>(`/delegations/${delegationId}/expenses`);
  },

  /**
   * Create new expense for a delegation
   * POST /api/delegations/:delegation_id/expenses
   */
  async createExpense(delegationId: number, data: CreateExpenseRequest): Promise<Expense> {
    return apiClient.post<Expense>(`/delegations/${delegationId}/expenses`, data);
  },
};
