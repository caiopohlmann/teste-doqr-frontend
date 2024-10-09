import apiClient from '@/api/client';
import { Employee } from '@/components/EmployeeTable';

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return [
      {
        id: 1,
        name: "João Silva",
        email: "joao@example.com",
        cpf: "123.456.789-00",
        phone: "(11) 98765-4321",
        birthDate: "1990-01-15",
        contractType: "CLT",
        status: true,
      },
    ]
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
};