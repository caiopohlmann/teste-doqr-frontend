import apiClient from '@/api/client';
import { Employee } from '@/components/EmployeeTable';

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    const response = await apiClient.get('/employees');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await apiClient.get(`/employees/${id}`);
    return response.data;
  },
  
  create: async (employeeData: Employee) => {
    const response = await apiClient.post('/employees', employeeData);
    return response.data;
  },
  
  update: async (id: number, employeeData: Employee) => {
    const response = await apiClient.put(`/employees/${id}`, employeeData);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await apiClient.delete(`/employees/${id}`);
    return response.data;
  },
  
  search: async (searchTerm: string): Promise<Employee[]> => {
    const response = await apiClient.get('/employees', {
      params: { name: searchTerm }
    });
    return response.data;
  },
};