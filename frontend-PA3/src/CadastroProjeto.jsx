import React, { useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

const CadastroProjeto = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const projeto = { nome, descricao, dataInicio };

    fetch('http://localhost:8080/projeto/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projeto),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Sucesso:', data);
        setNome('');
        setDescricao('');
        setDataInicio('');
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };

  return (
    <div className="div-container gradient-background">
      <Sidebar />
      <div className="container">
        <br /><br />
        <h1>Cadastro de Projeto</h1>
        <br /><br />
        <form onSubmit={handleSubmit}>
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
          />
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
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroProjeto;
