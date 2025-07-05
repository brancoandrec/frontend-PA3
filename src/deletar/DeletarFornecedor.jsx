import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

const DeletarFornecedor = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorId, setFornecedorId] = useState('');

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const carregarFornecedores = () => {
    fetch('http://localhost:8080/fornecedor/buscar')
      .then(response => response.json())
      .then(data => setFornecedores(data))
      .catch(error => console.error('Erro ao carregar os fornecedores:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/fornecedor/excluir/${fornecedorId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setFornecedorId('');
        setTimeout(() => carregarFornecedores(), 500);
      })
      .catch(error => console.error('Erro ao deletar o fornecedor:', error));
  };

  return (
    <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />

      {/* Tabela de Fornecedores */}
      <div className="container mx-auto w-[90%] max-w-6xl mt-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Deletar Fornecedor</h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Nome</th>
                <th className="px-6 py-4 text-left">Contato</th>
                <th className="px-6 py-4 text-left">Endereço</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {fornecedores.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-t">{f.id}</td>
                  <td className="px-6 py-4 border-t">{f.nome}</td>
                  <td className="px-6 py-4 border-t">{f.contato}</td>
                  <td className="px-6 py-4 border-t">{f.endereco}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Formulário de deleção */}
          <form
            id="deleteForm"
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-xl mx-auto mt-8"
          >
            <div>
              <label
                htmlFor="fornecedorId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID do fornecedor:
              </label>
              <input
                type="number"
                id="fornecedorId"
                name="fornecedorId"
                required
                value={fornecedorId}
                onChange={(e) => setFornecedorId(e.target.value)}
                className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
            >
              Deletar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeletarFornecedor;
