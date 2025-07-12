import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

const AlterarLocal = () => {
  const [locais, setLocais] = useState([]);
  const [localId, setLocalId] = useState('');
  const [sala, setSala] = useState('');
  const [armario, setArmario] = useState('');

  const carregarLocais = async () => {
    try {
      const response = await fetch('http://localhost:8080/localarmazen/buscar');
      const data = await response.json();
      setLocais(data);
    } catch (error) {
      console.error('Erro ao carregar os locais:', error);
    }
  };

  const buscarLocal = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/localarmazen/buscarporid/${localId}`);
      const data = await response.json();
      setSala(data.sala);
      setArmario(data.armario);
    } catch (error) {
      console.error('Erro ao buscar local:', error);
    }
  };

  const alterarLocal = async (event) => {
    event.preventDefault();
    try {
      const dados = { id: localId, sala, armario };
      const response = await fetch(`http://localhost:8080/localarmazen/alterar/${localId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      const result = await response.json();
      console.log('Resposta do servidor:', result);
      carregarLocais();
    } catch (error) {
      console.error('Erro ao alterar local:', error);
    }
  };

  useEffect(() => {
    carregarLocais();
  }, []);

  return (
  <div className="div-container gradient-background min-h-screen flex">
    <Sidebar />

    <div className="container mx-auto w-[90%] max-w-6xl mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Alterar Local</h1>

      {/* Tabela de Locais */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Sala</th>
              <th className="px-6 py-4 text-left">Armário</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {locais.map((local) => (
              <tr key={local.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-t">{local.id}</td>
                <td className="px-6 py-4 border-t">{local.sala}</td>
                <td className="px-6 py-4 border-t">{local.armario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulário de Busca */}
      <form
        onSubmit={buscarLocal}
        className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto mb-10"
      >
        <h3 className="text-xl font-semibold mb-2 text-center text-black">Buscar Local</h3>

        <div>
          <label htmlFor="localId" className="block text-sm font-medium text-gray-700 mb-1">
            ID do local para alterar:
          </label>
          <input
            type="number"
            id="localId"
            name="localId"
            value={localId}
            onChange={(e) => setLocalId(e.target.value)}
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

      {/* Formulário de Alteração */}
      <form
        onSubmit={alterarLocal}
        className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto"
      >
        <h3 className="text-xl font-semibold mb-4 text-center text-black">Local</h3>

        <div>
          <label htmlFor="sala" className="block text-sm font-medium text-gray-700 mb-1">
            Sala:
          </label>
          <input
            type="text"
            id="sala"
            name="sala"
            value={sala}
            onChange={(e) => setSala(e.target.value)}
            required
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="armario" className="block text-sm font-medium text-gray-700 mb-1">
            Armário:
          </label>
          <input
            type="text"
            id="armario"
            name="armario"
            value={armario}
            onChange={(e) => setArmario(e.target.value)}
            required
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          id="enviarBtn"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  </div>
);
};

export default AlterarLocal;