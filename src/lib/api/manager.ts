import { apiClient } from '../apiClient';
import { Delegation } from './delegations';
import { EmployeeResponse } from './admin';

// Manager API Types
export interface EmployeeDelegation extends Omit<Delegation, 'status'> {
  employee_id: number;
  employee_name?: string;
  employee_email?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface ManagerDelegationsResponse {
  status: 'success';
  delegations: EmployeeDelegation[];
}

export interface ManagerEmployeesResponse {
  status: 'success';
  employees: EmployeeResponse[];
}

export interface ManagerEmployeeDetailsResponse {
  status: 'success';
  employee: EmployeeResponse;
  delegations: EmployeeDelegation[];
}

export interface DelegationItem {
  id: number;
  name: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  category_id: number;
  created_at?: string;
}

export interface DelegationDetailsSummary {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface DelegationDetailsResponse {
  status: 'success';
  delegation: EmployeeDelegation;
  employee: EmployeeResponse;
  items: DelegationItem[];
  summary: DelegationDetailsSummary;
  pending_items_count: number;
  total_items_count: number;
}

/**
 * Manager API module
 * Handles manager-specific operations
 */
export const managerApi = {
  /**
   * Get all employees assigned to the current manager
   * GET /api/manager/employees
   */
  async listMyEmployees(): Promise<EmployeeResponse[]> {
    const response = await apiClient.get<ManagerEmployeesResponse>('/manager/employees');
    return response.employees;
  },

  /**
   * Get employee details with delegations
   * GET /api/manager/employees/:id
   */
  async getEmployeeDetails(employeeId: number): Promise<ManagerEmployeeDetailsResponse> {
    return apiClient.get<ManagerEmployeeDetailsResponse>(`/manager/employees/${employeeId}`);
  },

  /**
   * Get all delegations for a specific employee
   * Filters delegations from /api/manager/delegations by employee_id
   */
  async getEmployeeDelegations(employeeId: number): Promise<EmployeeDelegation[]> {
    const response = await apiClient.get<ManagerDelegationsResponse>('/manager/delegations');
    return response.delegations.filter(d => d.employee_id === employeeId);
  },

  /**
   * Get all delegations of subordinates
   * GET /api/manager/delegations
   */
  async getAllDelegations(): Promise<EmployeeDelegation[]> {
    const response = await apiClient.get<ManagerDelegationsResponse>('/manager/delegations');
    return response.delegations;
  },

  /**
   * Approve a delegation
   * POST /api/manager/delegations/:id/approve
   */
  async approveDelegation(delegationId: number): Promise<{ status: 'success'; message: string }> {
    return apiClient.post<{ status: 'success'; message: string }>(
      `/manager/delegations/${delegationId}/approve`
    );
  },

  /**
   * Reject a delegation
   * POST /api/manager/delegations/:id/reject
   */
  async rejectDelegation(delegationId: number, reason?: string): Promise<{ status: 'success'; message: string }> {
    return apiClient.post<{ status: 'success'; message: string }>(
      `/manager/delegations/${delegationId}/reject`,
      { reason }
    );
  },

  /**
   * Get delegation details with items (expenses)
   * GET /api/manager/delegations/:id
   */
  async getDelegationDetails(delegationId: number): Promise<DelegationDetailsResponse> {
    return apiClient.get<DelegationDetailsResponse>(`/manager/delegations/${delegationId}`);
  },

  /**
   * Approve a single delegation item (expense)
   * POST /api/manager/delegations/:delegationId/items/:itemId/approve
   */
  async approveItem(delegationId: number, itemId: number): Promise<{ status: 'success'; message: string }> {
    return apiClient.post<{ status: 'success'; message: string }>(
      `/manager/delegations/${delegationId}/items/${itemId}/approve`
    );
  },

  /**
   * Reject a single delegation item (expense)
   * POST /api/manager/delegations/:delegationId/items/:itemId/reject
   */
  async rejectItem(delegationId: number, itemId: number): Promise<{ status: 'success'; message: string }> {
    return apiClient.post<{ status: 'success'; message: string }>(
      `/manager/delegations/${delegationId}/items/${itemId}/reject`
    );
  },

  /**
   * Approve all pending items in delegation
   * POST /api/manager/delegations/:delegationId/items/approve_all
   */
  async approveAllItems(delegationId: number): Promise<{ status: 'success'; message: string; count: number }> {
    return apiClient.post<{ status: 'success'; message: string; count: number }>(
      `/manager/delegations/${delegationId}/items/approve_all`
    );
  },

  /**
   * Reject all pending items in delegation
   * POST /api/manager/delegations/:delegationId/items/reject_all
   */
  async rejectAllItems(delegationId: number): Promise<{ status: 'success'; message: string; count: number }> {
    return apiClient.post<{ status: 'success'; message: string; count: number }>(
      `/manager/delegations/${delegationId}/items/reject_all`
    );
  },
};
