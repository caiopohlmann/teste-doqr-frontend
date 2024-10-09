import Plus from "@/assets/icons/Plus";
import EmployeeTable from "@/components/Table";

const Home = () => {
  const employees = [
    {
      id: 1,
      name: "Caio",
      email: "caio@example.com",
      cpf: "123.456.789-00",
      phone: "(11) 98765-4321",
      birthDate: "1990-01-15",
      contractType: "CLT",
      status: true,
    },
    {
      id: 1,
      name: "João Silva",
      email: "joao@example.com",
      cpf: "123.456.789-00",
      phone: "(11) 98765-4321",
      birthDate: "1990-01-15",
      contractType: "CLT",
      status: false,
    },
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
  ];

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

  return (
    <div className="flex flex-col px-32 pt-12">
      <h1 className="text-4xl font-bold text-black m-0">Controle de Funcionários</h1>
      <h2 className="text-xl font-bold text-black opacity-70 mt-2">Empresa DoQR Tecnologia</h2>

      <div className="flex items-center justify-between mt-8">
        <input type="text" placeholder="Buscar Funcionário..." className="w-full max-w-96 py-2 pl-3 rounded-md border border-gray" />

        <button className="bg-primary text-white px-4 py-2 rounded-md ml-4 flex items-center gap-2">
          <Plus />
          Novo Funcionário
        </button>
      </div>

      <EmployeeTable headers={headers} employees={employees} rowsPerPage={5} />
    </div>
  );
}

export default Home;