import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';
import { exportToCsv } from '../functions/csv2';

const ConsultarCompra = () => {
  const [compras, setCompras] = useState([]);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/compra/buscar')
      .then(response => response.json())
      .then(data => setCompras(data))
      .catch(error => console.error('Erro ao carregar os itens:', error));
  }, []);

    const carregarCompras = (projetoId) => {
    fetch(`http://localhost:8080/compra/projeto/${projetoId}`)
      .then(response => response.json())
      .then(data => setItens(data))
      .catch(error => console.error('Erro ao carregar os itens:', error));
  };

    const handleSubmit = (event) => {
    event.preventDefault();
    const projetoId = event.target.projetoId.value;
    carregarCompras(projetoId);
  };

  const formataData = (data) => {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

 return (
    <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />

      {/* Tabela de Compras */}
      <div className="container mx-auto w-[90%] max-w-6xl mt-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Consulta de Compra</h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Itens</th>
                <th className="px-6 py-4 text-left">Data Compra</th>
                <th className="px-6 py-4 text-left">Data Invoice</th>
                <th className="px-6 py-4 text-left">Data Recebimento</th>
                <th className="px-6 py-4 text-left">Preço</th>
                <th className="px-6 py-4 text-left">Fornecedor</th>
                <th className="px-6 py-4 text-left">Projeto</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {compras.map((compra, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-t">{compra.id}</td>
                  <td className="px-6 py-4 border-t">
                    {Array.isArray(compra.item)
                      ? compra.item.map(i => i.nome).join(', ')
                      : compra.item?.nome || 'Nenhum item'}
                  </td>
                  <td className="px-6 py-4 border-t">{formataData(compra.dataCompra)}</td>
                  <td className="px-6 py-4 border-t">{formataData(compra.dataInvoice)}</td>
                  <td className="px-6 py-4 border-t">{formataData(compra.dataRecebimento)}</td>
                  <td className="px-6 py-4 border-t">R$ {compra.preco?.toFixed(2)}</td>
                  <td className="px-6 py-4 border-t">{compra.fornecedor?.id ? compra.fornecedor.nome : ''}</td>
                  <td className="px-6 py-4 border-t">{compra.projeto?.id ? compra.projeto.nome : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
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
                    <h1 className="text-3xl font-bold mb-8 text-center text-black">Compras do Projeto</h1>
          
                    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
                      <table className="min-w-full table-auto border-collapse">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                            <th className="px-6 py-4 text-left">Data Compra</th>
                            <th className="px-6 py-4 text-left">Data Invoice</th>
                            <th className="px-6 py-4 text-left">Data Recebimento</th>
                            <th className="px-6 py-4 text-left">Preço</th>
                            <th className="px-6 py-4 text-left">Nome Fornecedor</th>
                            <th className="px-6 py-4 text-left">ID Projeto</th>
                            <th className="px-6 py-4 text-left">Nome do Projeto</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-800 text-sm">
                          {itens.map((compra, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 border-t">{compra.dataCompra}</td>
                              <td className="px-6 py-4 border-t">{compra.dataInvoice}</td>
                              <td className="px-6 py-4 border-t">{compra.dataRecebimento}</td>
                              <td className="px-6 py-4 border-t">{compra.preco}</td>
                              <td className="px-6 py-4 border-t">{compra.fornecedor.nome}</td>
                              <td className="px-6 py-4 border-t">{compra.projeto.id}</td>
                              <td className="px-6 py-4 border-t">{compra.projeto.nome}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button
                      type="button"
                      onClick={() => exportToCsv('consulta_compras.csv', itens)}
                      className="mb-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                    >
                      Exportar CSV
                    </button>
                    </div>
                    </form>
        </div>
      </div>
    </div>
  );
};

export default ConsultarCompra;