import React, { useState, useEffect } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

export default function AlterarProjeto() {
  const [projetos, setProjetos] = useState([]);
  const [projetoId, setProjetoId] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');

  useEffect(() => {
    carregarProjetos();
  }, []);

  const carregarProjetos = () => {
    fetch('http://localhost:8080/projeto/buscar')
      .then((response) => response.json())
      .then((data) => setProjetos(data))
      .catch((error) => console.error('Erro ao carregar os itens:', error));
  };

  const handleBuscarProjeto = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/projeto/buscarporid/${projetoId}`)
      .then((response) => response.json())
      .then((data) => {
        setNome(data.nome);
        setDescricao(data.descricao);
        const date = new Date(data.dataInicio);
        const formattedDate = date.toISOString().split('T')[0];
        setDataInicio(formattedDate);
      })
      .catch((error) => console.error('Erro ao buscar projeto:', error));
  };

  const handleAlterarProjeto = (e) => {
    e.preventDefault();
    const dados = {
      id: projetoId,
      nome,
      descricao,
      dataInicio,
    };

    fetch(`http://localhost:8080/projeto/alterar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Resposta do servidor:', data);
        carregarProjetos();
      })
      .catch((error) => console.error('Erro ao alterar projeto:', error));
  };

 return (
  <div className="div-container gradient-background min-h-screen flex">
    <Sidebar />

    <div className="container mx-auto w-[90%] max-w-6xl mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Alterar Projeto</h1>

      {/* Tabela de Projetos */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Nome</th>
              <th className="px-6 py-4 text-left">Descrição</th>
              <th className="px-6 py-4 text-left">Data de Início</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {projetos.map((projeto) => (
              <tr key={projeto.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-t">{projeto.id}</td>
                <td className="px-6 py-4 border-t">{projeto.nome}</td>
                <td className="px-6 py-4 border-t">{projeto.descricao}</td>
                <td className="px-6 py-4 border-t">{projeto.dataInicio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulário de busca */}
      <form
        onSubmit={handleBuscarProjeto}
        className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto mb-10"
      >
        <h3 className="text-lg font-semibold">Buscar Projeto para Alteração</h3>
        <div>
          <label htmlFor="projetoId" className="block text-sm font-medium text-gray-700 mb-1">
            ID do projeto para alterar:
          </label>
          <input
            type="number"
            id="projetoId"
            name="projetoId"
            value={projetoId}
            onChange={(e) => setProjetoId(e.target.value)}
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

      {/* Formulário de alteração */}
      <form
        onSubmit={handleAlterarProjeto}
        className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto mb-16"
      >
        <h3 className="text-xl font-semibold mb-4">Projeto</h3>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição:
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            className="w-full border border-gray-500 rounded-md h-24 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700 mb-1">
            Data de início:
          </label>
          <input
            type="date"
            id="dataInicio"
            name="dataInicio"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
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
);
};