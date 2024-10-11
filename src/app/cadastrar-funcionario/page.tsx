'use client';

import { employeeService } from '@/services/employeeService';
import { Employee } from '@/components/EmployeeTable';
import EmployeeForm from '@/components/EmployeeForm';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Arrow from '@/assets/icons/Arrow';

const CadastrarFuncionario = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col px-32 pt-12">
      <Link href="/" className="flex items-center mb-4">
        <Arrow />
        <h1 className="text-base font-bold text-black m-0 ml-2">Voltar</h1>
      </Link>
      <h1 className="text-4xl font-bold text-black m-0">Cadastrar Funcionário</h1>
      <h2 className="text-xl font-bold text-black opacity-70 mt-2">Empresa DoQR Tecnologia</h2>

      <EmployeeForm 
        onSubmit={async (employeeData) => {
          try {
            await employeeService.create(employeeData as Employee);
            alert('Funcionário cadastrado com sucesso!');
            router.push('/');
          } catch (error) {
            console.error('Error creating employee:', error);
            alert('Erro ao cadastrar funcionário. Por favor, tente novamente.');
          }
        }}
      />
    </div>
  );
}

export default CadastrarFuncionario;