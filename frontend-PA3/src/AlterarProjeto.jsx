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
    <div className="div-container gradient-background tudo">
      <Sidebar />
      <div className="container">
        <br /><br />
        <h1>Alterar Projeto</h1>
        <br /><br />

        <table id="tabelaProjetos" className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Data de Início</th>
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

        <br /><br />
        <form onSubmit={handleBuscarProjeto}>
          <label htmlFor="projetoId">ID do projeto para alterar: </label>
          <input
            type="number"
            id="projetoId"
            name="projetoId"
            value={projetoId}
            onChange={(e) => setProjetoId(e.target.value)}
            required
          />
          <button type="submit" id="alterarBtn">
            Alterar
          </button>
        </form>

        <br /><br />
        <form onSubmit={handleAlterarProjeto}>
          <h3>Projeto</h3>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <br /><br />
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>
          <br /><br />
          <label htmlFor="dataInicio">Data de início:</label>
          <input
            type="date"
            id="dataInicio"
            name="dataInicio"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            required
          />
          <br /><br />
          <button type="submit" id="enviarBtn">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}