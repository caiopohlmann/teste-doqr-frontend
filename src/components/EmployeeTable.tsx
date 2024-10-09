"use client";
import React, { useState } from 'react';
import Edit from "@/assets/icons/Edit";
import Trash from "@/assets/icons/Trash";

export interface Employee {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  contractType: string;
  status: boolean;
}

interface EmployeeTableProps {
  headers: string[];
  employees: Employee[];
  rowsPerPage: number;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ headers, employees, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

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
                <td className="p-4 font-normal text-sm whitespace-nowrap">{employee.phone}</td>
                <td className="p-4 font-normal text-sm whitespace-nowrap">{employee.birthDate}</td>
                <td className="p-4 font-normal text-sm whitespace-nowrap">{employee.contractType}</td>
                <td className="p-4 font-medium text-sm whitespace-nowrap">
                  <span className={`${employee.status ? (employee.name === 'Caio' ? 'bg-primary text-white font-bold' : 'bg-greenTable text-greenTable') : 'bg-redTable text-redTable'} p-2 rounded-full`}>
                    {employee.status ? (employee.name === 'Caio' ? "Pendente" : "Ativo") : "Inativo"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <Edit />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-800">
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
    </div>
  );
};

export default EmployeeTable;