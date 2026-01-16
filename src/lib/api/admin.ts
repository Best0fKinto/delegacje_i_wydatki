import { apiClient } from '../apiClient';
import { User } from './auth';

// Admin API Types
export interface CreateManagerRequest {
  username: string;
  email: string;
  password: string;
}

export interface CreateEmployeeRequest {
  username: string;
  email: string;
  password: string;
  manager_id?: number;
}

export interface EmployeeResponse extends User {
  role: 'employee' | 'manager' | 'admin';
  manager_id?: number;
}

export interface CreateEmployeeResponse {
  status: 'success';
  employee_id: number;
  message: string;
  employee: EmployeeResponse;
}

export interface ListEmployeesResponse {
  status: 'success';
  employees: EmployeeResponse[];
}

/**
 * Admin API module
 * Handles admin-specific operations
 */
export const adminApi = {
  /**
   * Get all managers (users with role='manager')
   * GET /api/admin/employees (filtered client-side)
   */
  async listManagers(): Promise<EmployeeResponse[]> {
    const response = await apiClient.get<ListEmployeesResponse>('/admin/employees');
    return response.employees.filter(emp => emp.role === 'manager');
  },

  /**
   * Get all employees
   * GET /api/admin/employees
   */
  async listEmployees(): Promise<EmployeeResponse[]> {
    const response = await apiClient.get<ListEmployeesResponse>('/admin/employees');
    return response.employees;
  },

  /**
   * Get specific employee by ID
   * This uses the employees list endpoint and filters client-side
   * since there's no dedicated GET /api/admin/employees/:id endpoint
   */
  async getEmployee(id: number): Promise<EmployeeResponse | null> {
    const response = await apiClient.get<ListEmployeesResponse>('/admin/employees');
    return response.employees.find(emp => emp.id === id) || null;
  },

  /**
   * Create a new manager
   * POST /api/admin/employees with role='manager'
   */
  async createManager(data: CreateManagerRequest): Promise<CreateEmployeeResponse> {
    return apiClient.post<CreateEmployeeResponse>('/admin/employees', {
      ...data,
      role: 'manager',
    });
  },

  /**
   * Create a new employee
   * POST /api/admin/employees
   */
  async createEmployee(data: CreateEmployeeRequest): Promise<CreateEmployeeResponse> {
    return apiClient.post<CreateEmployeeResponse>('/admin/employees', {
      ...data,
      role: 'employee',
    });
  },
};
