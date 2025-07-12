import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

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
  <div className="div-container gradient-background min-h-screen flex">
    <Sidebar />

    <div className="container mx-auto w-[90%] max-w-6xl mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Alterar Itens</h1>

      {/* Tabela de Itens */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Nome</th>
              <th className="px-6 py-4 text-left">Tipo</th>
              <th className="px-6 py-4 text-left">Descrição</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {itens.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-t">{item.id}</td>
                <td className="px-6 py-4 border-t">{item.nome}</td>
                <td className="px-6 py-4 border-t">{item.tipo}</td>
                <td className="px-6 py-4 border-t">{item.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulário de busca */}
      <form
        id="deleteForm"
        onSubmit={buscarItemPorId}
        className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto mb-10"
      >
        <h3 className="text-xl font-semibold mb-2 text-center text-black">Buscar Item</h3>

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
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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

      {/* Formulário de edição */}
      <form
        id="formItem"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto mb-16"
      >
        <h3 className="text-xl font-semibold mb-4 text-center text-black">Item</h3>

        {[
          { id: 'nome', label: 'Nome' },
          { id: 'tipo', label: 'Tipo' },
          { id: 'descricao', label: 'Descrição' },
        ].map(({ id, label }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
              {label}:
            </label>
            <input
              type="text"
              id={id}
              value={formData[id]}
              onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
              required
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

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
);
};