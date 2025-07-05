import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

const DeletarItem = () => {
  const [itens, setItens] = useState([]);
  const [itemId, setItemId] = useState('');

  useEffect(() => {
    carregarItens();
  }, []);

  const carregarItens = () => {
    fetch('http://localhost:8080/item/buscar')
      .then(response => response.json())
      .then(data => setItens(data))
      .catch(error => console.error('Erro ao carregar os itens:', error));
  };

  const handleDelete = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8080/item/excluir/${itemId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setItemId('');
        setTimeout(carregarItens, 500);
      })
      .catch(error => console.error('Erro ao deletar o item:', error));
  };

  return (
    <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />

      <div className="container mx-auto w-[90%] max-w-6xl mt-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Deletar Itens</h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Nome</th>
                <th className="px-6 py-4 text-left">Descrição</th>
                <th className="px-6 py-4 text-left">Tipo</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {itens.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-t">{item.id}</td>
                  <td className="px-6 py-4 border-t">{item.nome}</td>
                  <td className="px-6 py-4 border-t">{item.descricao}</td>
                  <td className="px-6 py-4 border-t">{item.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <form
            onSubmit={handleDelete}
            id="deleteForm"
            className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-xl mx-auto mt-8"
          >
            <div>
              <label htmlFor="itemId" className="block text-sm font-medium text-gray-700 mb-1">
                ID do Item:
              </label>
              <input
                type="number"
                id="itemId"
                name="itemId"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                required
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

export default DeletarItem;
