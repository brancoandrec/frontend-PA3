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
    <div className="tudo div-container gradient-background">
      <Sidebar />
      {/* Tabela de Conjunto de Itens */} 
      <div className="container">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Deletar Conjunto de Itens</h1>
        <table className="table w-full" id="tabelaItens">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Quantidade</th>
              <th className="text-left">Item</th>
              <th className="text-left">Sala</th>
              <th className="text-left">Armario</th>
              <th className="text-left">Projeto</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((conjunto, index) => (
              <tr key={index}>
                <td>{conjunto.id}</td>
                <td>{conjunto.quantidade}</td>
                <td>{conjunto.item?.nome || '-'}</td>
                <td>{conjunto.localArmazen?.sala || '-'}</td>
                <td>{conjunto.localArmazen?.armario || '-'}</td>
                <td>{conjunto.projeto?.nome || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <form
  id="deleteForm"
  onSubmit={handleDelete}
  className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-md mx-auto mt-8"
>
  <div>
    <label
      htmlFor="itemId"
      className="block text-sm font-medium text-gray-700 mb-1">
      ID do Conjunto Itens:
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
    className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition">
    Deletar
  </button>
</form>
      </div>
    </div>
  );
};

export default DeletarConjuntoItens;
