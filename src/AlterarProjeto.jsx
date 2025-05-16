import React, { useState, useEffect } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

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
    <div className="tudo div-container gradient-background">
  <Sidebar />
  <div className="flex-1 flex justify-center items-start mt-20">
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">Alterar Projeto</h1>

      <table id="tabelaProjetos" className="table table-bordered w-full mb-10">
        <thead>
          <tr>
            <th className="text-left">ID</th>
            <th className="text-left">Nome</th>
            <th className="text-left">Descrição</th>
            <th className="text-left">Data de Início</th>
          </tr>
        </thead>
        <tbody>
          {projetos.map((projeto) => (
            <tr key={projeto.id}>
              <td>{projeto.id}</td>
              <td>{projeto.nome}</td>
              <td>{projeto.descricao}</td>
              <td>{projeto.dataInicio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
      <form
        onSubmit={handleBuscarProjeto}
        className="bg-white p-6 rounded-xl w-1/2 shadow-lg space-y-4 mb-8"
      >
        <h3 className="text-lg font-semibold">Buscar Projeto para Alteração</h3>

        <div>
          <label
            htmlFor="projetoId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
       </div>
       <div className="flex justify-center">
      <form
        onSubmit={handleAlterarProjeto}
        className="bg-white p-6 rounded-xl w-1/2 shadow-lg space-y-4"
      >
        <h3 className="text-xl font-semibold mb-4">Projeto</h3>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição:
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            className="w-full border border-gray-500 rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="dataInicio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
  </div>
</div>


  );
}