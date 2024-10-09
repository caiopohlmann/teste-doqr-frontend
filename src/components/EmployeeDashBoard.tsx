import { Suspense } from 'react';
import Plus from "@/assets/icons/Plus";
import EmployeeTable from "@/components/EmployeeTable";
import { employeeService } from "@/services/employeeService";
import Link from 'next/link';

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

const EmployeeTableWrapper = async () => {
  const employees = await employeeService.getAll();
  
  if (employees.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <h2 className="text-xl font-semibold text-gray-600">Nenhum funcionário encontrado</h2>
        <p className="text-gray-500 mt-2">Adicione novos funcionários para vê-los aqui.</p>
      </div>
    );
  }
  
  return <EmployeeTable headers={headers} employees={employees} rowsPerPage={5} />;
}

const EmployeeDashboard = () => {
  return (
    <div className="flex flex-col px-32 pt-12">
      <h1 className="text-4xl font-bold text-black m-0">Controle de Funcionários</h1>
      <h2 className="text-xl font-bold text-black opacity-70 mt-2">Empresa DoQR Tecnologia</h2>

      <div className="flex items-center justify-between mt-8">
        <input type="text" placeholder="Buscar Funcionário..." className="w-full max-w-96 py-2 pl-3 rounded-md border border-gray" />

        <Link href="/cadastrar-funcionario" className="bg-primary text-white px-4 py-2 rounded-md ml-4 flex items-center gap-2">
          <Plus />
          Novo Funcionário
        </Link>
      </div>

      <Suspense fallback={<EmployeeTableLoader />}>
        <EmployeeTableWrapper />
      </Suspense>
    </div>
  );
}

export default EmployeeDashboard;