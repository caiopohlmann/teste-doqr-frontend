'use client';

import { useState } from 'react';
import { employeeService } from '@/services/employeeService';
import { Employee } from '@/components/EmployeeTable';
import Chevron from '@/assets/icons/Chevron';

const CadastrarFuncionario = () => {
  const [employee, setEmployee] = useState<Partial<Employee>>({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    birthDate: '',
    contractType: '',
    // @ts-expect-error - status is a boolean
    status: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Employee, boolean>>>({});
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isContractTypeOpen, setIsContractTypeOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const maskedValue = maskPhone(value);
      setEmployee({ ...employee, [name]: maskedValue });
    } else if (name === 'cpf') {
      const maskedValue = maskCPF(value);
      setEmployee({ ...employee, [name]: maskedValue });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const maskPhone = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const match = numericValue.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}`;
    }
    return value;
  };

  const maskCPF = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const match = numericValue.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (match) {
      return !match[2] ? match[1] : `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}${match[4] ? `-${match[4]}` : ''}`;
    }
    return value;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Employee, boolean>> = {};
    let isValid = true;

    if (!employee.name) {
      newErrors.name = true;
      isValid = false;
    }
    if (!employee.email || !/\S+@\S+\.\S+/.test(employee.email)) {
      newErrors.email = true;
      isValid = false;
    }
    if (!employee.cpf || employee.cpf.length !== 14) {
      newErrors.cpf = true;
      isValid = false;
    }
    if (!employee.phone || employee.phone.length !== 15) {
      newErrors.phone = true;
      isValid = false;
    }
    if (!employee.birthDate) {
      newErrors.birthDate = true;
      isValid = false;
    }
    if (!employee.contractType) {
      newErrors.contractType = true;
      isValid = false;
    }
    // @ts-expect-error - status is a boolean
    if (employee.status === '') {
      newErrors.status = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await employeeService.create(employee as Employee);
        alert('Funcionário cadastrado com sucesso!');
        // Reset form or redirect to employee list
        setEmployee({
          name: '',
          email: '',
          cpf: '',
          phone: '',
          birthDate: '',
          contractType: '',
          // @ts-expect-error - status is a boolean
          status: '',
        });
        setErrors({});
      } catch (error) {
        console.error('Error creating employee:', error);
        alert('Erro ao cadastrar funcionário. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="flex flex-col px-32 pt-12">
      <h1 className="text-4xl font-bold text-black m-0">Cadastrar Funcionário</h1>
      <h2 className="text-xl font-bold text-black opacity-70 mt-2">Empresa DoQR Tecnologia</h2>

      <div className="flex items-center justify-between mt-8">
        <div className="bg-white shadow-xl rounded-xl p-6 w-full">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-black">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={employee.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2 ${
                    errors.name ? 'border-red-500' : 'border-gray'
                  }`}
                  placeholder="Digite o nome do funcionário"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-base font-medium text-black">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={employee.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-gray px-3 py-2"
                  placeholder="Digite o email do funcionário"
                  required
                />
              </div>
              <div>
                <label htmlFor="cpf" className="block text-base font-medium text-black">CPF</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={employee.cpf}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-gray px-3 py-2"
                  placeholder="000.000.000-00"
                  required
                  maxLength={14}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-base font-medium text-black">Celular</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={employee.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-gray px-3 py-2"
                  placeholder="(99) 99999-9999"
                  required
                  maxLength={15}
                />
              </div>
              <div>
                <label htmlFor="birthDate" className="block text-base font-medium text-black">Data de Nascimento</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={employee.birthDate}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-gray px-3 py-2 ${employee.birthDate === '' ? 'text-[#B9B9C1] font-medium' : 'text-black'}`}
                  required
                />
              </div>
              <div>
                <label htmlFor="contractType" className="block text-base font-medium text-black">Tipo de Contratação</label>
                <div className="relative">
                  <select
                    id="contractType"
                    name="contractType"
                    value={employee.contractType}
                    onChange={(e) => {
                      handleInputChange(e)
                      setIsContractTypeOpen(false)
                    }}
                    className={`mt-1 cursor-pointer appearance-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-gray px-3 py-2 ${employee.contractType === '' ? 'text-[#B9B9C1] font-medium' : 'text-black'}`}
                    onFocus={() => setIsContractTypeOpen(true)}
                    onBlur={() => setIsContractTypeOpen(false)}
                    required
                  >
                    <option value="" disabled selected className='text-gray-400'>Selecione uma opção...</option>
                    <option value="CLT" className='text-black'>CLT</option>
                    <option value="PJ" className='text-black'>PJ</option>
                  </select>

                  <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer transition-transform duration-300 ${isContractTypeOpen ? 'rotate-180' : ''}`}>
                    <Chevron />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="status" className="block text-base font-medium text-black">Status</label>
                <div className="relative">
                  <select
                    id="status"
                    name="status"
                    // @ts-expect-error - status is a boolean
                    value={employee.status}
                    onChange={(e) => {
                      setEmployee({ ...employee, status: e.target.value === 'active' })
                      setIsStatusOpen(false)
                    }}
                    // @ts-expect-error - status is a boolean
                    className={`mt-1 cursor-pointer appearance-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-gray px-3 py-2 ${employee.status === '' ? 'text-[#B9B9C1] font-medium' : 'text-black'}`}
                    onFocus={() => setIsStatusOpen(true)}
                    onBlur={() => setIsStatusOpen(false)}
                    required
                  >
                    <option value="" disabled selected className='text-gray-400'>Selecione uma opção...</option>
                    <option value="active" className='text-black'>Ativo</option>
                    <option value="inactive" className='text-black'>Inativo</option>
                  </select>

                  <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer transition-transform duration-300 ${isStatusOpen ? 'rotate-180' : ''}`}>
                    <Chevron />
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <button
                  type="submit"
                  className="bg-primary disabled:bg-primary2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastrarFuncionario;