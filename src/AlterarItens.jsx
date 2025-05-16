import React, { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

export default function AlterarItens() {
  const [itens, setItens] = useState([]);
  const [itemId, setItemId] = useState('');
  const [formData, setFormData] = useState({ nome: '', tipo: '', descricao: '' });

  useEffect(() => {
    carregarItens();
  }, []);

  const carregarItens = () => {
    fetch('http://localhost:8080/item/buscar')
      .then(res => res.json())
      .then(data => setItens(data))
      .catch(err => console.error('Erro ao carregar os itens:', err));
  };

  const buscarItemPorId = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/item/buscar/${itemId}`)
      .then(res => res.json())
      .then(data => setFormData({ nome: data.nome, tipo: data.tipo, descricao: data.descricao }))
      .catch(err => console.error('Erro ao buscar item:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dados = { id: itemId, ...formData };
    fetch(`http://localhost:8080/item/alterar/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Resposta do servidor:', data);
        carregarItens();
      })
      .catch(err => console.error('Erro:', err));
  };

  return (
    <div className="tudo div-container gradient-background">
      <Sidebar />
      <div className="flex-1 flex justify-center items-start mt-20">
    <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Alterar Itens</h1>
        <table className="table w-full" id="tabelaItens">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Nome</th>
              <th className="text-left">Tipo</th>
              <th className="text-left">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {itens.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.tipo}</td>
                <td>{item.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
<form
  id="deleteForm"
  onSubmit={buscarItemPorId}
  className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto mb-8"
>
  <h3 className="text-lg font-semibold">Buscar Item</h3>

  <div>
    <label htmlFor="itemId" className="block text-sm font-medium text-gray-700 mb-1">
      ID do Item para alterar:
    </label>
    <input
      type="number"
      id="itemId"
      value={itemId}
      onChange={(e) => setItemId(e.target.value)}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    id="alterarBtn"
    className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
  >
    Alterar
  </button>
</form>
<form
  id="formItem"
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto"
>
  <h3 className="text-xl font-semibold mb-4">Item</h3>

  <div>
    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
      Nome:
    </label>
    <input
      type="text"
      id="nome"
      value={formData.nome}
      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
      Tipo:
    </label>
    <input
      type="text"
      id="tipo"
      value={formData.tipo}
      onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
      Descrição:
    </label>
    <input
      type="text"
      id="descricao"
      value={formData.descricao}
      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    id="enviarBtn"
    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
  >
    Enviar
  </button>
</form>
            </div>
      </div>
    </div>
  );
}
