import { apiClient } from '../apiClient';
import { Delegation } from './delegations';
import { EmployeeResponse } from './admin';

// Manager API Types
export interface EmployeeDelegation extends Delegation {
  employee_id: number;
  employee_name?: string;
  employee_email?: string;
}

export interface ManagerDelegationsResponse {
  status: 'success';
  delegations: EmployeeDelegation[];
}

/**
 * Manager API module
 * Handles manager-specific operations
 */
export const managerApi = {
  /**
   * Get all employees assigned to the current manager
   * Uses /api/manager/delegations and extracts unique employees
   */
  async listMyEmployees(): Promise<EmployeeResponse[]> {
    const response = await apiClient.get<ManagerDelegationsResponse>('/manager/delegations');
    
    // Extract unique employees from delegations
    const employeesMap = new Map<number, EmployeeResponse>();
    
    response.delegations.forEach(delegation => {
      if (delegation.employee_id && !employeesMap.has(delegation.employee_id)) {
        employeesMap.set(delegation.employee_id, {
          id: delegation.employee_id,
          username: delegation.employee_name || '',
          email: delegation.employee_email || '',
          role: 'employee',
          is_active: true,
        });
      }
    });
    
    return Array.from(employeesMap.values());
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
};
