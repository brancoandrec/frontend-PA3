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
      .then(response => response.json())
      .then(() => {
        setFornecedorId('');
        setTimeout(() => carregarFornecedores(), 500);
      });
  };

  return (
    <div className="tudo">
      <div className="div-container gradient-background">
        <Sidebar />
        {/* Tabela de Fornecedores */} 
        <div className="container">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Deletar Fornecedor</h1>
          <table className="table w-full" id="tabelaFornecedores">
            <thead>
              <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Nome</th>
                <th className="text-left">Contato</th>
                <th className="text-left">Endereço</th>
              </tr>
            </thead>
            <tbody>
              {fornecedores.map(f => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.nome}</td>
                  <td>{f.contato}</td>
                  <td>{f.endereco}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <br /><br />
          <form
  id="deleteForm"
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-md mx-auto mt-8">
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
