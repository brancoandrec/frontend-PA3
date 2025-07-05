import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

const DeletarConjuntoItens = () => {
  const [itens, setItens] = useState([]);
  const [itemId, setItemId] = useState('');

  const carregarConjuntoItens = async () => {
    try {
      const response = await fetch('http://localhost:8080/conjuntoitens/buscar');
      const data = await response.json();
      setItens(data);
    } catch (error) {
      console.error('Erro ao carregar os itens:', error);
    }
  };

  useEffect(() => {
    carregarConjuntoItens();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:8080/conjuntoitens/excluir/${itemId}`, {
        method: 'DELETE',
      });
      setItemId('');
      setTimeout(() => {
        carregarConjuntoItens();
      }, 500);
    } catch (error) {
      console.error('Erro ao deletar item:', error);
    }
  };

  return (
    <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />

      {/* Tabela de Conjunto de Itens */}
      <div className="container mx-auto w-[90%] max-w-6xl mt-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Deletar Conjunto de Itens</h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Quantidade</th>
                <th className="px-6 py-4 text-left">Item</th>
                <th className="px-6 py-4 text-left">Sala</th>
                <th className="px-6 py-4 text-left">Armário</th>
                <th className="px-6 py-4 text-left">Projeto</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {itens.map((conjunto) => (
                <tr key={conjunto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-t">{conjunto.id}</td>
                  <td className="px-6 py-4 border-t">{conjunto.quantidade}</td>
                  <td className="px-6 py-4 border-t">{conjunto.item?.nome || '-'}</td>
                  <td className="px-6 py-4 border-t">{conjunto.localArmazen?.sala || '-'}</td>
                  <td className="px-6 py-4 border-t">{conjunto.localArmazen?.armario || '-'}</td>
                  <td className="px-6 py-4 border-t">{conjunto.projeto?.nome || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Formulário de deleção */}
          <form
            onSubmit={handleDelete}
            className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-xl mx-auto mt-8"
          >
            <div>
              <label htmlFor="itemId" className="block text-sm font-medium text-gray-700 mb-1">
                ID do Conjunto de Itens:
              </label>
              <input
                type="number"
                id="itemId"
                name="itemId"
                required
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
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

export default DeletarConjuntoItens;
