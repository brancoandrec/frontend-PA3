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
      <div className="container">
        <br /><br />
        <h1>Alterar Itens</h1>
        <br /><br />

        <table className="table" id="tabelaItens">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Descrição</th>
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

        <form id="deleteForm" onSubmit={buscarItemPorId}>
          <label htmlFor="itemId">ID do Item para alterar: </label>
          <input type="number" id="itemId" value={itemId} onChange={e => setItemId(e.target.value)} required />
          <button type="submit" id="alterarBtn">Alterar</button>
        </form>

        <br /><br />
        <form id="formItem" onSubmit={handleSubmit}>
          <h3>Item</h3>
          <br />
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} required />
          <br /><br />
          <label htmlFor="tipo">Tipo:</label>
          <input type="text" id="tipo" value={formData.tipo} onChange={e => setFormData({ ...formData, tipo: e.target.value })} required />
          <br /><br />
          <label htmlFor="descricao">Descrição:</label>
          <input type="text" id="descricao" value={formData.descricao} onChange={e => setFormData({ ...formData, descricao: e.target.value })} required />
          <br /><br />
          <button type="submit" id="enviarBtn">Enviar</button>
        </form>
      </div>
    </div>
  );
}
