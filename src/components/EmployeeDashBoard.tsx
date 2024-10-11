"use client";

import {useState, useEffect } from 'react';
import Plus from "@/assets/icons/Plus";
import EmployeeTable from "@/components/EmployeeTable";
import { employeeService } from "@/services/employeeService";
import Link from 'next/link';
import DeleteEmployeeModal from '@/components/DeleteEmployeeModal'; 
import { Employee } from '@/components/EmployeeTable';

const headers = [
  "Nome",
  "E-mail",
  "CPF",
  "Celular",
  "Data de Nascimento",
  "Tipo Contratação",
  "Status",
  "Ação"
];

const EmployeeTableLoader = () => (
  <div className="flex flex-col justify-center items-center h-64 gap-4">
    <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary"></div>
    <h1>Buscando funcionários...</h1>
  </div>
);

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployees = async (term: string = '') => {
    setIsLoading(true);
    try {
      const fetchedEmployees: Employee[] = term 
        ? await employeeService.search(term)
        : await employeeService.getAll();
      setEmployees(fetchedEmployees);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    await fetchEmployees(term);
  };

  const handleEmployeeDeleted = (deletedEmployeeId: number) => {
    setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== deletedEmployeeId));
  };

  const renderEmployeeTable = () => {
    if (isLoading) {
      return <EmployeeTableLoader />;
    }

    if (employees.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center h-64">
          <h2 className="text-xl font-semibold text-gray-600">Nenhum funcionário encontrado</h2>
          <p className="text-gray-500 mt-2">Adicione novos funcionários para vê-los aqui.</p>
        </div>
      );
    }

    return <EmployeeTable headers={headers} employees={employees} rowsPerPage={5} onEmployeeDeleted={handleEmployeeDeleted} />;
  };

  const handleDeleteConfirm = async () => {
    if (employeeToDelete) {
      try {
        await employeeService.delete(employeeToDelete);
        setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== employeeToDelete));
      } catch (error) {
        console.error('Error deleting employee:', error);
      } finally {
        setIsDeleteModalOpen(false);
        setEmployeeToDelete(null);
      }
    }
  };


  return (
    <div className="flex flex-col px-32 pt-12">
      <h1 className="text-4xl font-bold text-black m-0">Controle de Funcionários</h1>
      <h2 className="text-xl font-bold text-black opacity-70 mt-2">Empresa DoQR Tecnologia</h2>

      <div className="flex items-center justify-between mt-8">
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Buscar Funcionário..." className="w-full max-w-96 py-2 pl-3 rounded-md border border-gray" />

        <Link href="/cadastrar-funcionario" className="bg-primary text-white px-4 py-2 rounded-md ml-4 flex items-center gap-2">
          <Plus />
          Novo Funcionário
        </Link>
      </div>

      {renderEmployeeTable()}
      <DeleteEmployeeModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} />
    </div>
  );
}

export default EmployeeDashboard;