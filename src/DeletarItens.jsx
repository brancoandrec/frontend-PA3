import React, { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

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
      .then(response => response.json())
      .then(() => {
        setItemId('');
        setTimeout(carregarItens, 500);
      });
  };

  return (
    <div className="tudo div-container gradient-background">
      <Sidebar />
      <div className="container">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Deletar Itens</h1>
        <table className="table w-full" id="tabelaItens">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Nome</th>
              <th className="text-left">Descrição</th>
              <th className="text-left">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.descricao}</td>
                <td>{item.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br /><br />
        <form onSubmit={handleDelete} id="deleteForm" className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-md mx-auto mt-8">
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
  );
};

export default DeletarItem;