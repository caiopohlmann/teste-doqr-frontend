'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { employeeService } from '@/services/employeeService';
import { Employee } from '@/components/EmployeeTable';
import EmployeeForm from '@/components/EmployeeForm';
import Link from 'next/link';
import Arrow from '@/assets/icons/Arrow';

const EditarFuncionario = ({ params }: { params: { id: string } }) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const fetchedEmployee = await employeeService.getById(Number(params.id));
        setEmployee(fetchedEmployee);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [params.id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col px-32 pt-12">
      <Link href="/" className="flex items-center mb-4">
        <Arrow />
        <h1 className="text-base font-bold text-black m-0 ml-2">Voltar</h1>
      </Link>
      <h1 className="text-4xl font-bold text-black m-0">Editar Funcionário</h1>
      <h2 className="text-xl font-bold text-black opacity-70 mt-2">Empresa DoQR Tecnologia</h2>

      <EmployeeForm 
        initialData={employee} 
        isEditing
        onSubmit={async (updatedEmployee: Partial<Employee>) => {
          try {
            await employeeService.update(employee.id, updatedEmployee as Employee);
            alert('Funcionário atualizado com sucesso!');
            router.push('/');
          } catch (error) {
            console.error('Error updating employee:', error);
            alert('Erro ao atualizar funcionário. Por favor, tente novamente.');
          }
        }}
      />
    </div>
  );
};

export default EditarFuncionario;