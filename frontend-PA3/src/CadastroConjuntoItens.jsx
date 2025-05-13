import React, { useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

const CadastroConjuntoItens = () => {
  const [quantidade, setQuantidade] = useState('');
  const [itemId, setItemId] = useState('');
  const [localId, setLocalId] = useState('');
  const [projetoId, setProjetoId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const fornecedor = {
      quantidade,
      item: { id: itemId },
      localArmazen: { id: localId },
      projeto: { id: projetoId },
    };

    fetch('http://localhost:8080/conjuntoitens/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fornecedor),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Sucesso:', data);
        setQuantidade('');
        setItemId('');
        setLocalId('');
        setProjetoId('');
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
        <h1>Cadastro Conjunto Itens</h1>
        <br /><br />
        <form onSubmit={handleSubmit}>
          <h3>Itens</h3>
          <label htmlFor="quantidade">Quantidade:</label>
          <input
            type="text"
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
          <br /><br />
          <label htmlFor="item">ID do Item:</label>
          <input
            type="text"
            id="item"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            required
          />
          <br /><br />
          <label htmlFor="local">ID do Local :</label>
          <input
            type="text"
            id="local"
            value={localId}
            onChange={(e) => setLocalId(e.target.value)}
            required
          />
          <br /><br />
          <label htmlFor="projeto">ID do Projeto :</label>
          <input
            type="text"
            id="projeto"
            value={projetoId}
            onChange={(e) => setProjetoId(e.target.value)}
            required
          />
          <br /><br />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroConjuntoItens;
