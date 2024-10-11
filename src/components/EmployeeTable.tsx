"use client";
import React, { useState } from 'react';
import Edit from "@/assets/icons/Edit";
import Trash from "@/assets/icons/Trash";
import Link from 'next/link';
import { employeeService } from '@/services/employeeService';
import { toast } from 'react-toastify';

export interface Employee {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  dateOfBirth: string;
  employmentType: string;
  status: boolean;
}

interface EmployeeTableProps {
  headers: string[];
  employees: Employee[];
  rowsPerPage: number;
  onEmployeeDeleted: (employeeId: number) => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


const EmployeeTable: React.FC<EmployeeTableProps> = ({ headers, employees, rowsPerPage, onEmployeeDeleted }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);

  const openDeleteDialog = (employeeId: number) => {
    setEmployeeToDelete(employeeId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      try {
        await employeeService.delete(employeeToDelete);
        onEmployeeDeleted(employeeToDelete);
        closeDeleteDialog();
        toast.success('Funcionário excluído com sucesso');
      } catch (error) {
        toast.error('Erro ao excluir funcionário. Por favor, tente novamente.');
      }
    }
  };

  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col justify-between mt-3 overflow-x-auto overflow-hidden border border-gray rounded-lg min-h-[427px]">
      <div>
        <table className="w-full border-collapse">
          <thead className="bg-grayTable">
            <tr>
              {headers.map((header, index) => (
                <th 
                  key={index} 
                  className={`p-4 text-left whitespace-nowrap text-gray font-bold text-base
                    ${index === 0 ? 'rounded-tl-lg' : ''}
                    ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id} className="border-b border-gray">
                <td className="p-4 font-normal text-sm whitespace-nowrap">{employee.name}</td>
                <td className="p-4 font-normal text-sm whitespace-nowrap">{employee.email}</td>
                <td className="p-4 font-normal text-sm whitespace-nowrap">{employee.cpf}</td>
                <td className="p-4 font-normal text-sm whitespace-nowrap">{employee.phoneNumber}</td>
                <td className="p-4 font-normal text-sm whitespace-nowrap">{formatDate(employee.dateOfBirth)}</td>
                <td className="p-4 font-normal text-sm whitespace-nowrap">{employee.employmentType}</td>
                <td className="p-4 font-medium text-sm whitespace-nowrap">
                  <span className={`${employee.status ? (employee.name === 'Caio Pohlmann' ? 'bg-primary text-white font-bold' : 'bg-greenTable text-greenTable') : 'bg-redTable text-redTable'} p-2 rounded-full`}>
                    {employee.status ? (employee.name === 'Caio Pohlmann' ? "Pendente" : "Ativo") : "Inativo"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link href={`/editar-funcionario/${employee.id}`} className="p-1 text-blue-600 hover:text-blue-800">
                      <Edit />
                    </Link>
                    <button 
                      className="p-1 text-red-600 hover:text-red-800"
                      onClick={() => openDeleteDialog(employee.id)}
                    >
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-4 bg-grayTable">
        <div className='text-gray font-bold text-base'>
          Mostrando {startIndex + 1}-{Math.min(endIndex, employees.length)} de {employees.length}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-primary disabled:bg-primary2 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-primary disabled:bg-primary2 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>

      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out scale-90 opacity-0 animate-dialog">
            <h2 className="text-xl font-bold mb-4">Confirmar exclusão</h2>
            <p className="mb-4">Tem certeza que deseja excluir este funcionário?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                onClick={closeDeleteDialog}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                onClick={confirmDelete}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;