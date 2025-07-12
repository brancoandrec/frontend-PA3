import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

export default function AlterarConjuntoItens() {
  const [conjuntos, setConjuntos] = useState([]);
  const [formData, setFormData] = useState({
    conjuntoItensId: '',
    quantidade: '',
    item: '',
    local: '',
    projeto: ''
  });

  useEffect(() => {
    carregarConjuntoItens();
  }, []);

  const carregarConjuntoItens = async () => {
    try {
      const response = await fetch('http://localhost:8080/conjuntoitens/buscar');
      const data = await response.json();
      setConjuntos(data);
    } catch (error) {
      console.error('Erro ao carregar os itens:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = {
      id: formData.conjuntoItensId,
      quantidade: formData.quantidade,
      item: { id: formData.item },
      localArmazen: { id: formData.local },
      projeto: { id: formData.projeto }
    };

    try {
      const response = await fetch('http://localhost:8080/conjuntoitens/alterar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      const data = await response.json();
      console.log('Atualizado com sucesso:', data);
      carregarConjuntoItens();
    } catch (error) {
      console.error('Erro na atualização:', error);
    }
  };

 return (
  <div className="div-container gradient-background min-h-screen flex">
    <Sidebar />

    <div className="container mx-auto w-[90%] max-w-6xl mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">
        Alterar Conjunto de Itens
      </h1>

      {/* Tabela de Conjuntos */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Quantidade</th>
              <th className="px-6 py-4 text-left">Item ID</th>
              <th className="px-6 py-4 text-left">Item</th>
              <th className="px-6 py-4 text-left">Local ID</th>
              <th className="px-6 py-4 text-left">Sala</th>
              <th className="px-6 py-4 text-left">Armário</th>
              <th className="px-6 py-4 text-left">Projeto ID</th>
              <th className="px-6 py-4 text-left">Projeto</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {conjuntos.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-t">{c.id}</td>
                <td className="px-6 py-4 border-t">{c.quantidade}</td>
                <td className="px-6 py-4 border-t">{c.item.id}</td>
                <td className="px-6 py-4 border-t">{c.item.nome}</td>
                <td className="px-6 py-4 border-t">{c.localArmazen.id}</td>
                <td className="px-6 py-4 border-t">{c.localArmazen.sala}</td>
                <td className="px-6 py-4 border-t">{c.localArmazen.armario}</td>
                <td className="px-6 py-4 border-t">{c.projeto.id}</td>
                <td className="px-6 py-4 border-t">{c.projeto.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulário de seleção */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full mx-auto mt-10 space-y-4"
      >
        <label htmlFor="conjuntoItensId" className="block text-sm font-medium text-gray-700 mb-1">
          ID do Conjunto Itens para alterar:
        </label>
        <input
          type="number"
          id="conjuntoItensId"
          name="conjuntoItensId"
          value={formData.conjuntoItensId}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Alterar
        </button>
      </form>

      {/* Formulário de alteração */}
      <form
        id="formConjuntoItens"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full mx-auto mt-10 space-y-4"
      >
        <h3 className="text-xl font-semibold mb-4 text-center text-black">Conjunto Itens</h3>

        {[
          { label: 'Quantidade', name: 'quantidade', type: 'number' },
          { label: 'ID Item', name: 'item', type: 'number' },
          { label: 'ID Local', name: 'local', type: 'number' },
          { label: 'ID Projeto', name: 'projeto', type: 'number' },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {label}:
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  </div>
);
};