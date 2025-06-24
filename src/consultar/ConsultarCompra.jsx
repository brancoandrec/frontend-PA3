import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

const ConsultarCompra = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/compra/buscar')
      .then(response => response.json())
      .then(data => setCompras(data))
      .catch(error => console.error('Erro ao carregar os itens:', error));
  }, []);

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
        </div>
      </div>
    </div>
  );
};

export default ConsultarCompra;