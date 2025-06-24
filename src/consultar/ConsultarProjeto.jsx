import { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';
import '../functions/csv'
import { exportToCsv } from '../functions/csv';

const ConsultarProjeto = () => {
  const [projetos, setProjetos] = useState([]);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/projeto/buscar')
      .then(response => response.json())
      .then(data => setProjetos(data))
      .catch(error => console.error('Erro ao carregar os projetos:', error));
  }, []);

  const carregarItens = (projetoId) => {
    fetch(`http://localhost:8080/conjuntoitens/projeto/${projetoId}`)
      .then(response => response.json())
      .then(data => setItens(data))
      .catch(error => console.error('Erro ao carregar os itens:', error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const projetoId = event.target.projetoId.value;
    carregarItens(projetoId);
  };

  return (
    <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />

      <div className="container mx-auto w-[90%] max-w-6xl mt-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Consulta de Projeto</h1>

        {/* Tabela de Projetos */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6 mb-12">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Nome</th>
                <th className="px-6 py-4 text-left">Descrição</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {projetos.map((projeto, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-t">{projeto.id}</td>
                  <td className="px-6 py-4 border-t">{projeto.nome}</td>
                  <td className="px-6 py-4 border-t">{projeto.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulário de seleção do projeto */}
        <form
          id="alterarForm"
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg space-y-4 mt-8 w-full max-w-md mx-auto"
        >
          <div>
            <label
              htmlFor="projetoId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ID do Projeto para consultar:
            </label>
            <input
              type="text"
              id="projetoId"
              name="projetoId"
              required
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            id="alterarBtn"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Selecionar
          </button>
        </form>

        {/* Tabela de Itens do Projeto */}
        <form id="formProjeto" method="POST" className="w-full mt-16">
          <h1 className="text-3xl font-bold mb-8 text-center text-black">Itens do Projeto</h1>

          <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Nome do item</th>
                  <th className="px-6 py-4 text-left">Quantidade</th>
                  <th className="px-6 py-4 text-left">Tipo</th>
                  <th className="px-6 py-4 text-left">Descrição</th>
                  <th className="px-6 py-4 text-left">Sala</th>
                  <th className="px-6 py-4 text-left">Armário</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm">
                {itens.map((projetoItens, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-t">{projetoItens.item.id}</td>
                    <td className="px-6 py-4 border-t">{projetoItens.item.nome}</td>
                    <td className="px-6 py-4 border-t">{projetoItens.quantidade}</td>
                    <td className="px-6 py-4 border-t">{projetoItens.item.tipo}</td>
                    <td className="px-6 py-4 border-t">{projetoItens.item.descricao}</td>
                    <td className="px-6 py-4 border-t">{projetoItens.localArmazen.sala}</td>
                    <td className="px-6 py-4 border-t">{projetoItens.localArmazen.armario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
            type="button"
            onClick={() => exportToCsv('consulta_itens.csv', itens)}
            className="mb-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Exportar CSV
          </button>
          </div>
        </form>
        
      </div>
    </div>
    
  );
};

export default ConsultarProjeto;