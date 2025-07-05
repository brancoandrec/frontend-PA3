import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

export default function DeletarCompra() {
  const [compras, setCompras] = useState([]);
  const [compraId, setCompraId] = useState('');

  useEffect(() => {
    carregarCompras();
  }, []);

  const carregarCompras = () => {
    fetch('http://localhost:8080/compra/buscar')
      .then((response) => response.json())
      .then((data) => setCompras(data))
      .catch((error) => console.error('Erro ao carregar as compras:', error));
  };

  const handleDelete = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/compra/excluir/${compraId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCompraId('');
        setTimeout(carregarCompras, 500);
      })
      .catch((error) => console.error('Erro ao deletar a compra:', error));
  };

  return (
    <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />
      {/* Tabela de Compras */}
      <div className="container mx-auto w-[90%] max-w-6xl mt-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Deletar Compra</h1>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
          <table className="min-w-full table-auto border-collapse">
          <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Projeto</th>
              <th className="px-6 py-4 text-left">Data compra</th>
              <th className="px-6 py-4 text-left">Fornecedor</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {compras.map((compra) => (
              <tr key={compra.id} className="hover:bg-gray-50"> 
                 <td className="px-6 py-4 border-t">{compra.id}</td>
                <td className="px-6 py-4 border-t">{compra.projeto?.nome}</td>
               <td className="px-6 py-4 border-t">{compra.dataCompra}</td>
               <td className="px-6 py-4 border-t">{compra.fornecedor?.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={handleDelete} className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-xl mx-auto mt-8">
  <div>
    <label htmlFor="compraId" className="block text-sm font-medium text-gray-700 mb-1">
      ID da compra:
    </label>
    <input
      type="number"
      id="compraId"
      name="compraId"
      required
      value={compraId}
      onChange={(e) => setCompraId(e.target.value)}
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
}
